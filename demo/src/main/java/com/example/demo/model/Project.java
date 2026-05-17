package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class Project {

    // =========================
    // ID
    // =========================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // =========================
    // BASIC DETAILS
    // =========================

    private String name;

    private String description;

    private String startDate;

    private String endDate;

    // =========================
    // PROJECT STATUS
    // =========================

    private String status;

    // =========================
    // PROJECT PROGRESS
    // =========================

    private int progress;

    // =========================
    // MANAGER RELATION
    // =========================

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private Employee manager;

    // =========================
    // GETTERS
    // =========================

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getStartDate() {
        return startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public String getStatus() {
        return status;
    }

    public int getProgress() {
        return progress;
    }

    public Employee getManager() {
        return manager;
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

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }

    public void setManager(Employee manager) {
        this.manager = manager;
    }
}