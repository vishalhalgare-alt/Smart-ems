package com.example.demo.dto;

import java.util.List;

import com.example.demo.model.Task;

public class DashboardResponse {

    private long totalTasks;
    private long completedTasks;
    private long pendingTasks;
    private long totalEmployees;
    private long overdueTasks;
    private long highPriority;

    private long activeProjects;
    private double attendanceRate;

    private List<Task> recentTasks;

    public DashboardResponse(
            long totalTasks,
            long completedTasks,
            long pendingTasks,
            long totalEmployees,
            long overdueTasks,
            long highPriority,
            long activeProjects,
            double attendanceRate,
            List<Task> recentTasks
    ) {
        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;
        this.pendingTasks = pendingTasks;
        this.totalEmployees = totalEmployees;
        this.overdueTasks = overdueTasks;
        this.highPriority = highPriority;
        this.activeProjects = activeProjects;
        this.attendanceRate = attendanceRate;
        this.recentTasks = recentTasks;
    }

    public long getTotalTasks() {
        return totalTasks;
    }

    public long getCompletedTasks() {
        return completedTasks;
    }

    public long getPendingTasks() {
        return pendingTasks;
    }

    public long getTotalEmployees() {
        return totalEmployees;
    }

    public long getOverdueTasks() {
        return overdueTasks;
    }

    public long getHighPriority() {
        return highPriority;
    }

    public long getActiveProjects() {
        return activeProjects;
    }

    public double getAttendanceRate() {
        return attendanceRate;
    }

    public List<Task> getRecentTasks() {
        return recentTasks;
    }
}