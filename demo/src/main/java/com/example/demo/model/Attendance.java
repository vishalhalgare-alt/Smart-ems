package com.example.demo.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class Attendance {

    @Id
    @GeneratedValue(
            strategy =
            GenerationType.IDENTITY
    )
    private Long id;

    // =========================
    // EMPLOYEE
    // =========================

    private Long employeeId;

    // =========================
    // DATE & TIME
    // =========================

    private LocalDate date;

    private LocalTime checkIn;

    private LocalTime checkOut;

    // =========================
    // STATUS
    // =========================

    private String status;

    private double workingHours;

    // =========================
    // LOCATION
    // =========================

    private Double latitude;

    private Double longitude;

    // =========================
    // GETTERS
    // =========================

    public Long getId() {

        return id;
    }

    public Long getEmployeeId() {

        return employeeId;
    }

    public LocalDate getDate() {

        return date;
    }

    public LocalTime getCheckIn() {

        return checkIn;
    }

    public LocalTime getCheckOut() {

        return checkOut;
    }

    public String getStatus() {

        return status;
    }

    public double getWorkingHours() {

        return workingHours;
    }

    public Double getLatitude() {

        return latitude;
    }

    public Double getLongitude() {

        return longitude;
    }

    // =========================
    // SETTERS
    // =========================

    public void setId(Long id) {

        this.id = id;
    }

    public void setEmployeeId(
            Long employeeId
    ) {

        this.employeeId =
                employeeId;
    }

    public void setDate(
            LocalDate date
    ) {

        this.date = date;
    }

    public void setCheckIn(
            LocalTime checkIn
    ) {

        this.checkIn = checkIn;
    }

    public void setCheckOut(
            LocalTime checkOut
    ) {

        this.checkOut = checkOut;
    }

    public void setStatus(
            String status
    ) {

        this.status = status;
    }

    public void setWorkingHours(
            double workingHours
    ) {

        this.workingHours =
                workingHours;
    }

    public void setLatitude(
            Double latitude
    ) {

        this.latitude =
                latitude;
    }

    public void setLongitude(
            Double longitude
    ) {

        this.longitude =
                longitude;
    }
}