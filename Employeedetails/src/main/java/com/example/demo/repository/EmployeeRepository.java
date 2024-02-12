package com.example.demo.repository;
 
import java.util.Optional;
 
import org.springframework.data.jpa.repository.JpaRepository;
 
import com.example.demo.entities.Employee;
 
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    
	Employee findByName(String name);
 
	Optional<Employee> findById(Long id);

	void deleteById(Long id);
	
}