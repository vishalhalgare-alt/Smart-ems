package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Task;
import com.example.demo.model.TaskStatus;
import com.example.demo.model.Priority;

public interface TaskRepository
        extends JpaRepository<Task, Long> {

    // =========================
    // GET TASKS BY EMPLOYEE
    // =========================

    List<Task> findByEmployee_Email(
            String email
    );

    // =========================
    // GET TASKS BY PROJECT
    // =========================

    List<Task> findByProjectId(
            Long projectId
    );

    // =========================
    // STATUS COUNTS
    // =========================

    long countByStatus(
            TaskStatus status
    );

    // =========================
    // PRIORITY COUNTS
    // =========================

    long countByPriority(
            Priority priority
    );

    // =========================
    // RECENT TASKS
    // =========================

    List<Task> findTop5ByOrderByIdDesc();

    List<Task>
findByProject_Manager_Email(
        String email
);
}