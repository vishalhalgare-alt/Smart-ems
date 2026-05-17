package com.example.demo.service;

import com.example.demo.dto.NotificationStatsResponse;

import com.example.demo.model.Notification;

import com.example.demo.repository.NotificationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository repo;

    public List<Notification> getNotifications() {

        return repo
                .findTop10ByOrderByCreatedAtDesc();
    }

    public long getUnreadCount() {

        return repo.countByUnreadTrue();
    }

    public NotificationStatsResponse getStats() {

        long unread =
                repo.countByUnreadTrue();

        long resolved =
                repo.countByUnreadFalse();

        long critical =
                repo.countByType("TASK");

        return new NotificationStatsResponse(

                unread,

                critical,

                resolved,

                "Stable"
        );
    }
}