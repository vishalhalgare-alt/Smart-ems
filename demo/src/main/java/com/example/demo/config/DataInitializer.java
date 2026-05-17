package com.example.demo.config;

import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        upsertUser(
                "Admin",
                "admin@test.com",
                "admin123",
                Role.ADMIN
        );

        upsertUser(
                "Manager",
                "manager@test.com",
                "manager123",
                Role.MANAGER
        );

        upsertUser(
                "Rahul",
                "rahul@company.com",
                "employee123",
                Role.EMPLOYEE
        );
    }

    private void upsertUser(
            String name,
            String email,
            String password,
            Role role
    ) {

       User user = userRepository
        .findByEmail(email)
        .orElse(null);

        if (user == null) {

            user = new User();

            user.setEmail(email);
        }

        user.setName(name);

        user.setPassword(
                passwordEncoder.encode(password)
        );

        user.setRole(role);

        userRepository.save(user);
    }
}