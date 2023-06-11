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

