package com.example.demo.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // =========================
    // BASIC INFO
    // =========================

    @NotBlank
    private String name;

    @NotBlank
    @Email
    @Column(unique = true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotBlank
    @Size(min = 6)
    private String password;

    // =========================
    // ROLE
    // =========================

    @Enumerated(EnumType.STRING)
    private Role role;

    // =========================
    // MANAGER RELATION
    // =========================

    @ManyToOne
    @JoinColumn(name = "manager_id")
    @JsonIgnoreProperties({
            "manager",
            "password",
            "email"
    })
    private User manager;

    // =========================
    // CREATED DATE
    // =========================

    private LocalDateTime createdAt;

    // =========================
    // AUTO BEFORE SAVE
    // =========================

    @PrePersist
    public void beforeSave() {

        createdAt = LocalDateTime.now();

        if (role == null) {
            role = Role.EMPLOYEE;
        }
    }

    // =========================
    // GETTERS
    // =========================

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Role getRole() {
        return role;
    }

    public User getManager() {
        return manager;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    // =========================
    // SETTERS
    // =========================

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setManager(User manager) {
        this.manager = manager;
    }
}