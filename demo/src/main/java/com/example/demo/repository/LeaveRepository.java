
package com.example.demo.repository;

import com.example.demo.model.LeaveRequest;
import com.example.demo.model.LeaveStatus;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRepository
    extends JpaRepository<
        LeaveRequest,
        Long
    > {

    List<LeaveRequest>
    findByStatus(
        LeaveStatus status
    );

    List<LeaveRequest>
    findByEmployeeId(
        Long employeeId
    );
}
