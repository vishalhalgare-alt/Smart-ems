package com.example.demo.dto;

public class ReportDashboardDTO {

    private long totalEmployees;

    private long activeProjects;

    private long completedTasks;

    private double attendanceRate;

    private long pendingLeaves;

    private long approvedLeaves;

    private long rejectedLeaves;

    private long presentEmployees;

    private long absentEmployees;

    private long lateCheckins;

    private long pendingTasks;

    private long overdueTasks;

    private long completedProjects;

    private long delayedProjects;

    // =========================
    // GETTERS & SETTERS
    // =========================

    public long getTotalEmployees() {
        return totalEmployees;
    }

    public void setTotalEmployees(long totalEmployees) {
        this.totalEmployees = totalEmployees;
    }

    public long getActiveProjects() {
        return activeProjects;
    }

    public void setActiveProjects(long activeProjects) {
        this.activeProjects = activeProjects;
    }

    public long getCompletedTasks() {
        return completedTasks;
    }

    public void setCompletedTasks(long completedTasks) {
        this.completedTasks = completedTasks;
    }

    public double getAttendanceRate() {
        return attendanceRate;
    }

    public void setAttendanceRate(double attendanceRate) {
        this.attendanceRate = attendanceRate;
    }

    public long getPendingLeaves() {
        return pendingLeaves;
    }

    public void setPendingLeaves(long pendingLeaves) {
        this.pendingLeaves = pendingLeaves;
    }

    public long getApprovedLeaves() {
        return approvedLeaves;
    }

    public void setApprovedLeaves(long approvedLeaves) {
        this.approvedLeaves = approvedLeaves;
    }

    public long getRejectedLeaves() {
        return rejectedLeaves;
    }

    public void setRejectedLeaves(long rejectedLeaves) {
        this.rejectedLeaves = rejectedLeaves;
    }

    public long getPresentEmployees() {
        return presentEmployees;
    }

    public void setPresentEmployees(long presentEmployees) {
        this.presentEmployees = presentEmployees;
    }

    public long getAbsentEmployees() {
        return absentEmployees;
    }

    public void setAbsentEmployees(long absentEmployees) {
        this.absentEmployees = absentEmployees;
    }

    public long getLateCheckins() {
        return lateCheckins;
    }

    public void setLateCheckins(long lateCheckins) {
        this.lateCheckins = lateCheckins;
    }

    public long getPendingTasks() {
        return pendingTasks;
    }

    public void setPendingTasks(long pendingTasks) {
        this.pendingTasks = pendingTasks;
    }

    public long getOverdueTasks() {
        return overdueTasks;
    }

    public void setOverdueTasks(long overdueTasks) {
        this.overdueTasks = overdueTasks;
    }

    public long getCompletedProjects() {
        return completedProjects;
    }

    public void setCompletedProjects(long completedProjects) {
        this.completedProjects = completedProjects;
    }

    public long getDelayedProjects() {
        return delayedProjects;
    }

    public void setDelayedProjects(long delayedProjects) {
        this.delayedProjects = delayedProjects;
    }
}