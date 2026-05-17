package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.model.Role;

import com.example.demo.service.UserService;
import com.example.demo.repository.UserRepository;

import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.ApiResponse;

import com.example.demo.security.JwtUtil;

import io.jsonwebtoken.Claims;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    // REGISTER
    @PostMapping("/add")
    public Object addUser(@RequestBody User user) {

        return userService.register(user);
    }

    // LOGIN
    @PostMapping("/login")
    public Object login(@RequestBody User user) {

        String result = userService.login(user);

        if (
            result.equals("User not found") ||
            result.equals("Invalid password")
        ) {

            return new ApiResponse(result);
        }

        return new LoginResponse(result);
    }
    // ASSIGN MANAGER
@PutMapping("/{employeeId}/assign-manager/{managerId}")
public Object assignManager(
        @PathVariable Long employeeId,
        @PathVariable Long managerId
) {

    User employee =
            userRepository.findById(employeeId)
            .orElseThrow();

    User manager =
            userRepository.findById(managerId)
            .orElseThrow();

    if (manager.getRole() != Role.MANAGER) {
        return new ApiResponse("Selected user is not a manager");
    }

    employee.setManager(manager);

    return userRepository.save(employee);
}
    // GET ALL USERS
    @GetMapping({"", "/all"})
    public Object getAllUsers(
            @RequestHeader(
                    value = "Authorization",
                    required = false
            )
            String token
    ) {

        try {

            // ALLOW UNAUTHENTICATED ACCESS FOR DEVELOPMENT
            // TOKEN CHECK IS DISABLED FOR NOW

            // ROLE CHECK (SKIP IF NO TOKEN)

            String role = "ADMIN";

            if (
                token != null &&
                token.startsWith("Bearer ")
            ) {

                try {
                    Claims claims =
                            JwtUtil.validateToken(
                                    token.substring(7)
                            );

                    role =
                            (String) claims.get("role");
                } catch (Exception e) {
                    // Token validation failed, use default role
                }
            }

            return userRepository.findAll();

        } catch (Exception e) {

            return new ApiResponse(
                    "Invalid or expired token"
            );
        }
    }

    // DELETE USER
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>>
    deleteUser(
            @PathVariable Long id
    ) {

        if (
            !userRepository.existsById(id)
        ) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        userRepository.deleteById(id);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "User deleted successfully"
                )
        );
    }

    // GET ALL MANAGERS
    @GetMapping("/managers")
    public Object getManagers() {

        return userRepository.findByRole(
                Role.MANAGER
        );
    }

    // MAKE USER MANAGER
    @PutMapping("/managers/{id}")
    public Object makeManager(
            @PathVariable Long id
    ) {

        User user =
                userRepository
                        .findById(id)
                        .orElseThrow();

        user.setRole(
                Role.MANAGER
        );

        return userRepository.save(user);
    }
}