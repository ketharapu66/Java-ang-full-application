package com.example.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.entities.Employee;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "*")
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;
    // Endpoint to fetch all employees
    @GetMapping
    public List<Employee> getAllEmployeeDetails() {
        return employeeRepository.findAll();
    }
    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable Long id) {
        Optional<Employee> employeeOptional = employeeRepository.findById(id);
        if (employeeOptional.isPresent()) {
            return employeeOptional.get();
        } else {
            throw new RuntimeException("Employee not found for id: " + id);
        }
    }
    @Transactional
    @GetMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployeeById(@PathVariable Long id) {
        Optional<Employee> employeeOptional = employeeRepository.findById(id);
        if (employeeOptional.isPresent()) {
            employeeRepository.deleteById(id);
            return ResponseEntity.ok("Employee with ID: " + id + " has been deleted.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("Employee not found for id: " + id);
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable("id") Integer id, @RequestBody Employee employee) {
        Optional<Employee> employeeData = employeeRepository.findById(id);
     
        if (employeeData.isPresent()) {
            Employee existingEmployee = employeeData.get();
     
            // Check if the ID in the path is the same as the ID in the request body
            if (!id.equals(employee.getId())) {
                return new ResponseEntity<>("Cannot update Employee ID. ID in path and request body do not match.", HttpStatus.BAD_REQUEST);
            }
     
            // Update other fields
            existingEmployee.setName(employee.getName());
            existingEmployee.setSalary(employee.getSalary());
            existingEmployee.setAge(employee.getAge());
     
            return new ResponseEntity<>(employeeRepository.save(existingEmployee), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Employee with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
 
    @PostMapping("/create")
    public ResponseEntity<?> createEmployee(@RequestBody Employee employee) {
        try {
            // Check if the employee with the given ID already exists
            Optional<Employee> existingEmployee = employeeRepository.findById(employee.getId());
            // If the employee with the given ID exists, return a 400 Bad Request status with an error message
            if (existingEmployee.isPresent()) {
                return ResponseEntity.badRequest().body("Employee with ID " + employee.getId() + " already exists.");
            }
            // Save the new employee record to the database
            Employee savedEmployee = employeeRepository.save(employee);
            // Return the saved employee with a 201 Created status
            return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
        } catch (Exception e) {
            // If there's an error while saving, return a 500 Internal Server Error status
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/search/{id}")
    public ResponseEntity<?> searchEmployeeById(@PathVariable Long id) {
        try {
            // Check if the employee with the given ID exists
            Optional<Employee> searchedEmployee = employeeRepository.findById(id);
            
            // If the employee with the given ID exists, return the employee details with a 200 OK status
            if (searchedEmployee.isPresent()) {
                return new ResponseEntity<>(searchedEmployee.get(), HttpStatus.OK);
            } else {
                // If the employee with the given ID does not exist, return a 404 Not Found status
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee with ID " + id + " not found.");
            }
        } catch (Exception e) {
            // If there's an error during the search, return a 500 Internal Server Error status
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
 
}