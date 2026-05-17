package com.example.demo.controller;

import com.example.demo.model.Project;
import com.example.demo.service.ProjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin
public class ProjectController {

    @Autowired
    private ProjectService service;

    // =========================
    // CREATE PROJECT
    // =========================

    @PostMapping
    public Project add(
            @RequestBody Project p
    ) {

        return service.add(p);
    }

    // =========================
    // GET ALL PROJECTS
    // =========================

    @GetMapping
    public List<Project> getAll() {

        return service.getAll();
    }

    // =========================
    // GET PROJECTS BY MANAGER
    // =========================

    @GetMapping("/manager/{email}")
    public List<Project> getManagerProjects(
            @PathVariable String email
    ) {

        return service.getProjectsByManager(
                email
        );
    }

    // =========================
    // UPDATE PROJECT
    // =========================

    @PutMapping("/{id}")
    public Project update(

            @PathVariable Long id,

            @RequestBody Project p
    ) {

        return service.update(id, p);
    }

    // =========================
    // DELETE PROJECT
    // =========================

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id
    ) {

        service.delete(id);
    }
}