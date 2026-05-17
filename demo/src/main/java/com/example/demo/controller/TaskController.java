package com.example.demo.controller;

import com.example.demo.model.Employee;
import com.example.demo.model.Task;
import com.example.demo.service.TaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin
public class TaskController {

    @Autowired
    private TaskService service;

    // =========================
    // CREATE TASK (AI assign)
    // =========================
    @PostMapping
    public Task create(@RequestBody Task task) {
        return service.createTask(task);
    }

    // =========================
    // GET ALL TASKS (ADMIN / MANAGER)
    // =========================
    @GetMapping
    public List<Task> getAll() {
        return service.getAll();
    }

    // =========================
    // UPDATE FULL TASK (ADMIN / MANAGER)
    // =========================
    @PutMapping("/{id}")
    public Task update(@PathVariable Long id, @RequestBody Task task) {
        return service.updateTask(id, task);
    }

    // =========================
    // UPDATE ONLY STATUS (EMPLOYEE)
    // =========================
    @PutMapping("/{id}/status")
    public Task updateStatus(@PathVariable Long id, @RequestBody Task task) {
        return service.updateStatus(id, task.getStatus());
    }

    // =========================
    // DELETE TASK
    // =========================
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteTask(id);
    }

    // =========================
    // AI SUGGEST EMPLOYEE
    // =========================
    @GetMapping("/suggest/{title}")
    public Employee suggest(@PathVariable String title) {
        return service.suggestEmployee(title);
    }

    // =========================
    // GET MY TASKS (EMPLOYEE)
    // =========================
    @GetMapping("/my-tasks")
    public List<Task> myTasks(@RequestParam String email) {
        return service.getMyTasks(email);
    }

    @GetMapping("/manager/{email}")
public List<Task>
getManagerTasks(
        @PathVariable String email
) {

    return service
            .getTasksByManager(
                    email
            );
}
}
