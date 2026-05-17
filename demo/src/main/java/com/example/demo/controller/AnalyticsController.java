package com.example.demo.controller;

import com.example.demo.dto.AnalyticsDTO;
import com.example.demo.service.AnalyticsService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    // =========================
    // GET ANALYTICS
    // =========================

    @GetMapping
    public AnalyticsDTO getAnalytics() {

        return analyticsService
                .getAnalyticsData();
    }
}