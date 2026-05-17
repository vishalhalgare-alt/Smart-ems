package com.example.demo.service;

import com.example.demo.model.Employee;
import com.example.demo.model.Role;
import com.example.demo.model.User;

import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repo;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // =========================
    // ADD EMPLOYEE
    // =========================

    public Employee add(Employee e) {

        // SAVE EMPLOYEE
        System.out.println(
    "EMPLOYEE ADD STARTED"
);
        Employee savedEmployee =
                repo.save(e);

        // =========================
        // CREATE LOGIN ACCOUNT
        // =========================

        boolean userExists =
                userRepository
                .findByEmail(e.getEmail())
                .isPresent();

        if (!userExists) {

            User user = new User();

            user.setName(
                    e.getName()
            );

            user.setEmail(
                    e.getEmail()
            );

            // DEFAULT PASSWORD

            user.setPassword(
                    passwordEncoder.encode("1234")
            );

            // DEFAULT ROLE

            user.setRole(
                    Role.EMPLOYEE
            );

            userRepository.save(user);
        }

        return savedEmployee;
    }

    // =========================
    // GET ALL
    // =========================

    public List<Employee> getAll() {

        return repo.findAll();
    }

    // =========================
    // UPDATE
    // =========================

    public Employee update(
            Long id,
            Employee e
    ) {

        Employee existing =
                repo.findById(id)
                .orElseThrow();

        existing.setSkill(
                e.getSkill()
        );

        existing.setExperience(
                e.getExperience()
        );

        existing.setWorkload(
                e.getWorkload()
        );

        existing.setName(
                e.getName()
        );

        existing.setEmail(
                e.getEmail()
        );

        existing.setRole(
                e.getRole()
        );

        // =========================
        // UPDATE USER ACCOUNT
        // =========================

        userRepository
                .findByEmail(
                        existing.getEmail()
                )
                .ifPresent(user -> {

                    user.setName(
                            e.getName()
                    );

                    user.setEmail(
                            e.getEmail()
                    );

                    userRepository.save(user);
                    System.out.println(
    "USER CREATED SUCCESSFULLY"
);
                });

        return repo.save(existing);
    }

    // =========================
    // DELETE
    // =========================

    public void delete(Long id) {

        Employee employee =
                repo.findById(id)
                .orElseThrow();

        // DELETE LOGIN ACCOUNT

        userRepository
                .findByEmail(
                        employee.getEmail()
                )
                .ifPresent(user -> {

                    userRepository.delete(user);
                });

        // DELETE EMPLOYEE

        repo.deleteById(id);
    }
}