package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder encoder =
            new BCryptPasswordEncoder();

    public User register(User user) {

        user.setPassword(
                encoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

    public String login(User user) {

        User existingUser =
                userRepository
                .findByEmail(user.getEmail())
                .orElse(null);

        if (existingUser == null) {
            return "User not found";
        }

        if (!encoder.matches(
                user.getPassword(),
                existingUser.getPassword()
        )) {

            return "Invalid password";
        }

        return JwtUtil.generateToken(
                existingUser.getEmail(),
                existingUser.getRole()
        );
    }
}