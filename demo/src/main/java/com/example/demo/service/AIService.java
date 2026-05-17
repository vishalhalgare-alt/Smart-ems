package com.example.demo.service;

import com.example.demo.model.Employee;
import com.example.demo.model.Project;

import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class AIService {

    // Skill + workload logic
    public Employee assignBestEmployee(List<Employee> employees, String requiredSkill) {

        return employees.stream()
                .filter(e -> e.getSkill() != null &&
                             e.getSkill().equalsIgnoreCase(requiredSkill))
                .min(Comparator.comparingInt(Employee::getWorkload))
                .orElse(null);
    }

    // Simple delay logic (NO tasks dependency)
    public boolean isProjectDelayed(Project project) {

        // Simple logic: check if end date exists
        if (project.getEndDate() == null) return false;

        return false; // keep simple for now
    }
}