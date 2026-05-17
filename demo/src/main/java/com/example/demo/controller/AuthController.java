package com.example.demo.controller;

import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // =========================
    // REGISTER
    // =========================

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(
            @RequestBody Map<String, String> request
    ) {

        Map<String, Object> response = new HashMap<>();

        if (
                request == null ||
                !request.containsKey("email") ||
                !request.containsKey("password")
        ) {

            response.put("error", "Email and password required");

            return ResponseEntity
                    .badRequest()
                    .body(response);
        }

        String email = request.get("email").trim();
        String password = request.get("password").trim();
        String name = request.get("name");

        // EMAIL EXISTS

        if (
                userRepository
                        .findByEmail(email)
                        .isPresent()
        ) {

            response.put("error", "Email already exists");

            return ResponseEntity
                    .badRequest()
                    .body(response);
        }

        // CREATE USER

        User user = new User();

        user.setName(name);

        user.setEmail(email);

        user.setPassword(
                passwordEncoder.encode(password)
        );

        // DEFAULT ROLE

        user.setRole(Role.EMPLOYEE);

        User saved = userRepository.save(user);

        response.put("id", saved.getId());
        response.put("name", saved.getName());
        response.put("email", saved.getEmail());
        response.put("role", saved.getRole());

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @RequestBody Map<String, String> request
    ) {

        Map<String, Object> response = new HashMap<>();

        if (
                request == null ||
                !request.containsKey("email") ||
                !request.containsKey("password")
        ) {

            response.put("error", "Email and password required");

            return ResponseEntity
                    .badRequest()
                    .body(response);
        }

        String email = request.get("email").trim();
        String password = request.get("password").trim();

        User user = userRepository
                .findByEmail(email)
                .orElse(null);

        // INVALID LOGIN

        if (
                user == null ||
                !passwordEncoder.matches(password, user.getPassword())
        ) {

            response.put("error", "Invalid credentials");

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        }

        // JWT TOKEN

        String token = JwtUtil.generateToken(
                user.getEmail(),
                user.getRole()
        );

        response.put("token", token);

        response.put("id", user.getId());

        response.put("name", user.getName());

        response.put("email", user.getEmail());

        response.put("role", user.getRole());

        return ResponseEntity.ok(response);
    }

    // =========================
    // CREATE USER
    // =========================

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createUser(
            @RequestBody User user
    ) {

        Map<String, Object> response = new HashMap<>();

        if (
                user.getEmail() == null ||
                user.getPassword() == null
        ) {

            response.put("error", "Email and password required");

            return ResponseEntity
                    .badRequest()
                    .body(response);
        }

        // EMAIL EXISTS

        if (
                userRepository
                        .findByEmail(user.getEmail())
                        .isPresent()
        ) {

            response.put("error", "Email already exists");

            return ResponseEntity
                    .badRequest()
                    .body(response);
        }

        // PASSWORD ENCODE

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        // DEFAULT ROLE

        if (user.getRole() == null) {

            user.setRole(Role.EMPLOYEE);
        }

        User saved = userRepository.save(user);

        response.put("id", saved.getId());

        response.put("name", saved.getName());

        response.put("email", saved.getEmail());

        response.put("role", saved.getRole());

        return ResponseEntity.ok(response);
    }
}