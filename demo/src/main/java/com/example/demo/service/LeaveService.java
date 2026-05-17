

package com.example.demo.service;

import com.example.demo.model.Employee;
import com.example.demo.model.LeaveRequest;
import com.example.demo.model.LeaveStatus;

import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.LeaveRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class LeaveService {

    @Autowired
    private LeaveRepository leaveRepo;

    @Autowired
    private EmployeeRepository employeeRepo;

    // ========================================
    // CREATE LEAVE
    // ========================================

    public LeaveRequest createLeave(
        LeaveRequest leave
    ) {

        return leaveRepo.save(leave);
    }

    // ========================================
    // GET ALL LEAVES
    // ========================================

    public List<LeaveRequest> getAllLeaves() {

        List<LeaveRequest> leaves =
            leaveRepo.findAll();

        // Pending first

        leaves.sort(

            Comparator.comparing(
                LeaveRequest::getStatus
            )
        );

        return leaves;
    }

    // ========================================
    // APPROVE LEAVE
    // ========================================

    public LeaveRequest approveLeave(
        Long id
    ) {

        LeaveRequest leave =
            leaveRepo.findById(id)

            .orElseThrow(() ->
                new RuntimeException(
                    "Leave not found"
                )
            );

        leave.setStatus(
            LeaveStatus.APPROVED
        );

        return leaveRepo.save(leave);
    }

    // ========================================
    // REJECT LEAVE
    // ========================================

    public LeaveRequest rejectLeave(
        Long id
    ) {

        LeaveRequest leave =
            leaveRepo.findById(id)

            .orElseThrow(() ->
                new RuntimeException(
                    "Leave not found"
                )
            );

        leave.setStatus(
            LeaveStatus.REJECTED
        );

        return leaveRepo.save(leave);
    }

    // ========================================
    // DELETE LEAVE
    // ========================================

    public void deleteLeave(
        Long id
    ) {

        leaveRepo.deleteById(id);
    }

    // ========================================
    // GET LEAVES BY EMPLOYEE
    // ========================================

    public List<LeaveRequest>
    getLeavesByEmployee(
        Long employeeId
    ) {

        return leaveRepo.findByEmployeeId(
            employeeId
        );
    }
}