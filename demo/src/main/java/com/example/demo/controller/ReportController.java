package com.example.demo.controller;

import com.example.demo.dto.ReportDashboardDTO;
import com.example.demo.service.ReportService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/dashboard")
    public ReportDashboardDTO getDashboardReports() {

        return reportService.getDashboardStats();
    }
}