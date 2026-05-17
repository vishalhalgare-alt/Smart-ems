package com.example.demo.controller;

import com.example.demo.dto.NotificationStatsResponse;

import com.example.demo.model.Notification;

import com.example.demo.service.NotificationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin
public class NotificationController {

    @Autowired
    private NotificationService service;

    @GetMapping
    public List<Notification> getAll() {

        return service.getNotifications();
    }

    @GetMapping("/unread-count")
    public Map<String, Long> unreadCount() {

        return Map.of(
                "count",
                service.getUnreadCount()
        );
    }

    @GetMapping("/stats")
    public NotificationStatsResponse stats() {

        return service.getStats();
    }
}