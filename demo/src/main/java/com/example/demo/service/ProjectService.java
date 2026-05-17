package com.example.demo.service;

import com.example.demo.model.Project;
import com.example.demo.repository.ProjectRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository repo;

    // =========================
    // CREATE PROJECT
    // =========================

    public Project add(Project p) {

        return repo.save(p);
    }

    // =========================
    // GET ALL PROJECTS
    // =========================

    public List<Project> getAll() {

        return repo.findAll();
    }

    // =========================
    // GET PROJECTS BY MANAGER
    // =========================

    public List<Project> getProjectsByManager(
            String email
    ) {

        return repo.findByManagerEmail(
                email
        );
    }

    // =========================
    // UPDATE PROJECT
    // =========================

    public Project update(
            Long id,
            Project p
    ) {

        Project existing =
                repo.findById(id)

                .orElseThrow(
                        () -> new RuntimeException(
                                "Project not found"
                        )
                );

        existing.setName(
                p.getName()
        );

        existing.setDescription(
                p.getDescription()
        );

        existing.setStartDate(
                p.getStartDate()
        );

        existing.setEndDate(
                p.getEndDate()
        );

        existing.setStatus(
                p.getStatus()
        );

        existing.setProgress(
                p.getProgress()
        );

        existing.setManager(
                p.getManager()
        );

        return repo.save(existing);
    }

    // =========================
    // DELETE PROJECT
    // =========================

    public void delete(Long id) {

        repo.deleteById(id);
    }
}