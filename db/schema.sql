DROP DATABASE IF EXISTS emp_db;
CREATE DATABASE emp_db;

USE emp_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT, 
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
    );

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    department_id INT NOT NULL,
    salary DECIMAL(10, 2),
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
        REFERENCES departments(id)
        
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id)
        REFERENCES roles(id),
    FOREIGN KEY (manager_id)
        REFERENCES employees(id)
        
);


CREATE TABLE view_roles (
SELECT roles.id, roles.title, departments.name, roles.salary
FROM roles
RIGHT JOIN departments ON departments.id = roles. department_id
);

CREATE TABLE vw_emp (
SELECT employees.id, employees.first_name, 
employees.last_name, view_roles.title, view_roles.name, view_roles.salary
FROM employees
JOIN view_roles ON view_roles.id = employees.role_id
);

CREATE TABLE views (
SELECT *,CONCAT(first_name,' ',last_name) AS manager
FROM employees
);

CREATE TABLE viewAllEmp (
SELECT vw_emp.id, vw_emp.first_name, vw_emp.last_name, 
vw_emp.title, vw_emp.name, vw_emp.salary, views.manager
FROM vw_emp
LEFT JOIN views ON views.manager_id = vw_emp.id
);

