package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;

import com.example.demo.model.Employee;
import com.example.demo.model.User;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.UserRepository;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {

		SpringApplication.run(
			DemoApplication.class,
			args
		);
	}

	@Bean
	public CommandLineRunner loadTestData(

			EmployeeRepository employeeRepository,
			UserRepository userRepository

	) {

		return args -> {

			// avoid duplicate data

			if (employeeRepository.count() == 0) {

				// =========================
				// EMPLOYEE 1
				// =========================

				User u1 =
					userRepository
						.findById(3L)
						.orElse(null);

				if (u1 != null) {

					Employee emp1 =
						new Employee();

					emp1.setManager(u1);

					emp1.setSkill("Java");

					emp1.setExperience(5);

					emp1.setWorkload(80);

					employeeRepository.save(emp1);
				}

				// =========================
				// EMPLOYEE 2
				// =========================

				User u2 =
					userRepository
						.findById(4L)
						.orElse(null);

				if (u2 != null) {

					Employee emp2 =
						new Employee();

					emp2.setManager(u2);

					emp2.setSkill("Python");

					emp2.setExperience(7);

					emp2.setWorkload(75);

					employeeRepository.save(emp2);
				}

				// =========================
				// EMPLOYEE 3
				// =========================

				User u3 =
					userRepository
						.findById(5L)
						.orElse(null);

				if (u3 != null) {

					Employee emp3 =
						new Employee();

					emp3.setManager(u3);

					emp3.setSkill("React");

					emp3.setExperience(3);

					emp3.setWorkload(85);

					employeeRepository.save(emp3);
				}

				System.out.println(
					"✅ Employee test data loaded!"
				);
			}
		};
	}
}