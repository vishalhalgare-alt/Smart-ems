package com.example.demo.controller;

import com.example.demo.model.Task;
import com.example.demo.repository.TaskRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportExportController {

    @Autowired
    private TaskRepository taskRepo;

    @GetMapping("/export")
    public ResponseEntity<byte[]> exportReports() {

        List<Task> tasks = taskRepo.findAll();

        StringBuilder csv = new StringBuilder();

        csv.append("ID,Title,Status,Priority,Due Date\n");

        for (Task task : tasks) {

            csv.append(task.getId()).append(",");

            csv.append(task.getTitle()).append(",");

            csv.append(task.getStatus()).append(",");

            csv.append(task.getPriority()).append(",");

            csv.append(task.getDueDate()).append("\n");
        }

        byte[] data = csv.toString().getBytes();

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=reports.csv"
                )
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(data);
    }
}