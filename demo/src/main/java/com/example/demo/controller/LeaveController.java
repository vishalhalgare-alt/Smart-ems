

package com.example.demo.controller;

import com.example.demo.model.LeaveRequest;
import com.example.demo.service.LeaveService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin

public class LeaveController {

    @Autowired
    private LeaveService leaveService;

    // ========================================
    // CREATE LEAVE
    // ========================================

    @PostMapping
    public LeaveRequest createLeave(
        @RequestBody
        LeaveRequest leave
    ) {

        return leaveService
            .createLeave(leave);
    }

    // ========================================
    // GET ALL LEAVES
    // ========================================

    @GetMapping
    public List<LeaveRequest>
    getAllLeaves() {

        return leaveService
            .getAllLeaves();
    }

    // ========================================
    // APPROVE LEAVE
    // ========================================

    @PutMapping("/{id}/approve")
    public LeaveRequest approveLeave(
        @PathVariable Long id
    ) {

        return leaveService
            .approveLeave(id);
    }

    // ========================================
    // REJECT LEAVE
    // ========================================

    @PutMapping("/{id}/reject")
    public LeaveRequest rejectLeave(
        @PathVariable Long id
    ) {

        return leaveService
            .rejectLeave(id);
    }

    // ========================================
    // DELETE LEAVE
    // ========================================

    @DeleteMapping("/{id}")
    public void deleteLeave(
        @PathVariable Long id
    ) {

        leaveService.deleteLeave(id);
    }

    // ========================================
    // GET EMPLOYEE LEAVES
    // ========================================

    @GetMapping("/employee/{id}")
    public List<LeaveRequest>
    getEmployeeLeaves(
        @PathVariable Long id
    ) {

        return leaveService
            .getLeavesByEmployee(id);
    }
}