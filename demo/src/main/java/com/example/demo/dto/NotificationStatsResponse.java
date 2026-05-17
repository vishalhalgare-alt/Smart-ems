package com.example.demo.dto;

public class NotificationStatsResponse {

    private long unread;

    private long critical;

    private long resolved;

    private String systemHealth;

    public NotificationStatsResponse(
            long unread,
            long critical,
            long resolved,
            String systemHealth
    ) {

        this.unread = unread;
        this.critical = critical;
        this.resolved = resolved;
        this.systemHealth = systemHealth;
    }

    public long getUnread() {
        return unread;
    }

    public long getCritical() {
        return critical;
    }

    public long getResolved() {
        return resolved;
    }

    public String getSystemHealth() {
        return systemHealth;
    }
}