package com.example.demo.service;

import com.example.demo.dto.AnalyticsDTO;

import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.ProjectRepository;
import com.example.demo.repository.TaskRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnalyticsService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TaskRepository taskRepository;

    // =========================
    // GET ANALYTICS
    // =========================

    public AnalyticsDTO getAnalyticsData() {

        AnalyticsDTO dto =
                new AnalyticsDTO();

        // =========================
        // REAL DATABASE DATA
        // =========================

        dto.setTotalEmployees(
                employeeRepository.count()
        );

        dto.setActiveProjects(
                projectRepository.count()
        );

        dto.setCompletedTasks(
                taskRepository.count()
        );

        // TEMP STATIC VALUE

        dto.setAttendanceRate(94);

        return dto;
    }
}