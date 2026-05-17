package com.example.demo.controller;

import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/managers")
@CrossOrigin
public class ManagerController {

    @Autowired
    private UserRepository userRepository;

    // GET ALL MANAGERS

    @GetMapping
    public List<User> getManagers() {

        return userRepository.findByRole(Role.MANAGER);
    }

    // MAKE USER MANAGER

    @PutMapping("/{id}")
    public User makeManager(@PathVariable Long id) {

        User user =
                userRepository.findById(id).orElseThrow();

        user.setRole(Role.MANAGER);

        return userRepository.save(user);
    }
}