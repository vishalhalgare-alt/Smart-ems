package com.example.demo.service;

import com.example.demo.dto.ReportDashboardDTO;

import com.example.demo.repository.AttendanceRepository;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.LeaveRepository;
import com.example.demo.repository.ProjectRepository;
import com.example.demo.repository.TaskRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private LeaveRepository leaveRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    // =========================
    // DASHBOARD REPORTS
    // =========================

    public ReportDashboardDTO getDashboardStats() {

        ReportDashboardDTO dto =
                new ReportDashboardDTO();

        // =========================
        // REAL DATABASE COUNTS
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

        dto.setPendingLeaves(
                leaveRepository.count()
        );

        // =========================
        // TEMP DATA
        // UNTIL ADVANCED QUERIES
        // =========================

        dto.setApprovedLeaves(0);

        dto.setRejectedLeaves(0);

        dto.setAttendanceRate(94);

        dto.setPresentEmployees(
                attendanceRepository.count()
        );

        dto.setAbsentEmployees(0);

        dto.setLateCheckins(0);

        dto.setPendingTasks(0);

        dto.setOverdueTasks(0);

        dto.setCompletedProjects(0);

        dto.setDelayedProjects(0);

        return dto;
    }
}