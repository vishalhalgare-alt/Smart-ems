package com.example.demo.controller;

import com.example.demo.model.Attendance;
import com.example.demo.service.AttendanceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attendance")
@CrossOrigin
public class AttendanceController {

    @Autowired
    private AttendanceService service;

    // =========================
    // CHECK IN
    // =========================

    @PostMapping("/checkin/{id}")
    public Attendance checkIn(

            @PathVariable Long id,

            @RequestParam Double latitude,

            @RequestParam Double longitude
    ) {

        return service.checkIn(
                id,
                latitude,
                longitude
        );
    }

    // =========================
    // CHECK OUT
    // =========================

    @PostMapping("/checkout/{id}")
    public Attendance checkOut(
            @PathVariable Long id
    ) {

        return service.checkOut(id);
    }

    // =========================
    // GET EMPLOYEE ATTENDANCE
    // =========================

    @GetMapping("/employee/{id}")
    public List<Attendance> getEmployeeAttendance(
            @PathVariable Long id
    ) {

        return service.getAttendanceByEmployee(id);
    }

    // =========================
// GET ALL ATTENDANCE
// =========================

@GetMapping
public List<Attendance> getAllAttendance() {

    return service.getAllAttendance();
}
}