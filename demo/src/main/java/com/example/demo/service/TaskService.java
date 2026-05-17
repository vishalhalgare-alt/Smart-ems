package com.example.demo.service;

import com.example.demo.model.Employee;
import com.example.demo.model.Project;
import com.example.demo.model.Task;
import com.example.demo.model.TaskStatus;

import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.ProjectRepository;
import com.example.demo.repository.TaskRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepo;

    @Autowired
    private EmployeeRepository empRepo;

    @Autowired
    private ProjectRepository projectRepo;

    // =========================
    // CREATE TASK
    // =========================

    public Task createTask(Task task) {

        // =========================
        // SET EMPLOYEE
        // =========================

        if (task.getEmployee() != null) {

            Employee employee =

                    empRepo.findById(
                            task.getEmployee().getId()
                    ).orElse(null);

            task.setEmployee(employee);

            // UPDATE WORKLOAD

            if (employee != null) {

                employee.setWorkload(
                        employee.getWorkload() + 1
                );

                empRepo.save(employee);
            }
        }

        // =========================
        // SET PROJECT
        // =========================

        if (task.getProject() != null) {

            Project project =

                    projectRepo.findById(
                            task.getProject().getId()
                    ).orElse(null);

            task.setProject(project);
        }

        // =========================
        // SAVE TASK
        // =========================

        Task savedTask =
                taskRepo.save(task);

        // =========================
        // UPDATE PROJECT PROGRESS
        // =========================

        if (savedTask.getProject() != null) {

            updateProjectProgress(
                    savedTask.getProject().getId()
            );
        }

        return savedTask;
    }

    // =========================
    // PROJECT PROGRESS UPDATE
    // =========================

    public void updateProjectProgress(
            Long projectId
    ) {

        Project project =

                projectRepo.findById(projectId)

                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Project not found"
                                )
                        );

        List<Task> tasks =
                taskRepo.findByProjectId(projectId);

        int totalTasks =
                tasks.size();

        int completedTasks =

                (int) tasks.stream()

                        .filter(
                                task ->
                                        task.getStatus()
                                                == TaskStatus.DONE
                        )

                        .count();

        int progress =

                totalTasks > 0

                        ? (completedTasks * 100)
                        / totalTasks

                        : 0;

        project.setProgress(progress);

        // =========================
        // AUTO STATUS
        // =========================

        if (progress == 100) {

            project.setStatus(
                    "COMPLETED"
            );

        } else if (progress > 0) {

            project.setStatus(
                    "IN_PROGRESS"
            );

        } else {

            project.setStatus(
                    "PENDING"
            );
        }

        projectRepo.save(project);
    }

    // =========================
    // GET ALL TASKS
    // =========================

    public List<Task> getAll() {

        return taskRepo.findAll();
    }

    // =========================
    // UPDATE FULL TASK
    // =========================

    public Task updateTask(
            Long id,
            Task t
    ) {

        Task existing =

                taskRepo.findById(id)

                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Task not found"
                                )
                        );

        existing.setTitle(
                t.getTitle()
        );

        existing.setDescription(
                t.getDescription()
        );

        existing.setStatus(
                t.getStatus()
        );

        existing.setPriority(
                t.getPriority()
        );

        existing.setDueDate(
                t.getDueDate()
        );

        existing.setProject(
                t.getProject()
        );

        Task updatedTask =
                taskRepo.save(existing);

        if (updatedTask.getProject() != null) {

            updateProjectProgress(
                    updatedTask.getProject().getId()
            );
        }

        return updatedTask;
    }

    // =========================
    // UPDATE STATUS
    // =========================

    public Task updateStatus(
            long id,
            TaskStatus status
    ) {

        Task task =

                taskRepo.findById(id)

                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Task not found"
                                )
                        );

        task.setStatus(status);

        Task updatedTask =
                taskRepo.save(task);

        if (updatedTask.getProject() != null) {

            updateProjectProgress(
                    updatedTask.getProject().getId()
            );
        }

        return updatedTask;
    }

    // =========================
    // DELETE TASK
    // =========================

    public void deleteTask(
            Long id
    ) {

        Task task =

                taskRepo.findById(id)

                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Task not found"
                                )
                        );

        Employee emp =
                task.getEmployee();

        if (
                emp != null &&
                emp.getWorkload() > 0
        ) {

            emp.setWorkload(
                    emp.getWorkload() - 1
            );

            empRepo.save(emp);
        }

        taskRepo.deleteById(id);

        if (task.getProject() != null) {

            updateProjectProgress(
                    task.getProject().getId()
            );
        }
    }

    // =========================
    // AI SUGGEST EMPLOYEE
    // =========================

    public Employee suggestEmployee(
            String title
    ) {

        List<Employee> employees =
                empRepo.findAll();

        return employees.stream()

                .filter(e ->

                        e.getSkill() != null &&

                                title.toLowerCase()

                                        .contains(
                                                e.getSkill()
                                                        .toLowerCase()
                                        )
                )

                .min(
                        Comparator.comparingInt(
                                Employee::getWorkload
                        )
                )

                .orElse(
                        employees.stream()

                                .min(
                                        Comparator.comparingInt(
                                                Employee::getWorkload
                                        )
                                )

                                .orElse(null)
                );
    }

    // =========================
    // GET MY TASKS
    // =========================

    public List<Task> getMyTasks(
            String email
    ) {

        return taskRepo.findByEmployee_Email(
                email
        );
    }

    // =========================
    // GET MANAGER TASKS
    // =========================

    public List<Task> getTasksByManager(
            String email
    ) {

        return taskRepo.findByProject_Manager_Email(
                email
        );
    }
}