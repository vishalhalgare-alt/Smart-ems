package com.example.demo.service;

import com.example.demo.dto.DashboardResponse;

import com.example.demo.model.Task;
import com.example.demo.model.Role;
import com.example.demo.model.TaskStatus;
import com.example.demo.model.Priority;

import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.ProjectRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private TaskRepository taskRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ProjectRepository projectRepo;

    // =========================
    // DASHBOARD STATS
    // =========================

    public DashboardResponse getStats() {

        // TOTAL TASKS
        long total =
                taskRepo.count();

        // COMPLETED TASKS
        long completed =
                taskRepo.countByStatus(
                        TaskStatus.DONE
                );

        // PENDING TASKS
        long pending =
                taskRepo.countByStatus(
                        TaskStatus.PENDING
                );

        // EMPLOYEES
        long employees =
                userRepo.countByRole(
                        Role.EMPLOYEE
                );

        // OVERDUE TASKS
        long overdue = 0;

        // HIGH PRIORITY TASKS
        long high =
                taskRepo.countByPriority(
                        Priority.HIGH
                );

        // ACTIVE PROJECTS
        long activeProjects =
                projectRepo.count();

        // ATTENDANCE
        double attendanceRate = 94.0;

        // RECENT TASKS
        List<Task> recent =
                taskRepo.findTop5ByOrderByIdDesc();

        // RESPONSE
        return new DashboardResponse(

                total,

                completed,

                pending,

                employees,

                overdue,

                high,

                activeProjects,

                attendanceRate,

                recent
        );
    }
}