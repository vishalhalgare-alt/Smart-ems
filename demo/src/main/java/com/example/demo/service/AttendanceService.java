package com.example.demo.service;

import com.example.demo.model.Attendance;
import com.example.demo.repository.AttendanceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.*;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository repo;

    // =========================
    // CHECK IN
    // =========================

    public Attendance checkIn(
            Long empId,
            Double latitude,
            Double longitude
    ) {

        LocalDate today =
                LocalDate.now();

        Attendance existing =
                repo.findByEmployeeIdAndDate(
                        empId,
                        today
                );

        if (existing != null) {

            return existing;
        }

        Attendance a =
                new Attendance();

        a.setEmployeeId(empId);

        a.setDate(today);

        a.setCheckIn(
                LocalTime.now()
        );

        a.setLatitude(latitude);

        a.setLongitude(longitude);

        if (
                LocalTime.now().isAfter(
                        LocalTime.of(9,30)
                )
        ) {

            a.setStatus("LATE");

        } else {

            a.setStatus("PRESENT");
        }

        return repo.save(a);
    }

    // =========================
    // CHECK OUT
    // =========================

    public Attendance checkOut(
            Long empId
    ) {

        LocalDate today =
                LocalDate.now();

        Attendance a =
                repo.findByEmployeeIdAndDate(
                        empId,
                        today
                );

        if (a == null) {

            return null;
        }

        a.setCheckOut(
                LocalTime.now()
        );

        double hours =
                Duration.between(
                        a.getCheckIn(),
                        a.getCheckOut()
                ).toMinutes() / 60.0;

        a.setWorkingHours(hours);

        return repo.save(a);
    }

    // =========================
    // GET ATTENDANCE
    // =========================

    public List<Attendance>
    getAttendanceByEmployee(
            Long employeeId
    ) {

        return repo.findByEmployeeId(
                employeeId
        );
    }

    // =========================
// GET ALL ATTENDANCE
// =========================

public List<Attendance> getAllAttendance() {

    return repo.findAll();
}
}