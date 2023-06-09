 INSERT INTO departments (id, name)
 VALUES (1, "IT"),
		(2, "Engineering"),
		(3, "Accounting"),
		(4, "Sales");

INSERT INTO roles (title, salary, department_id) 
VALUES (" IT Lead", 65000, 1),
("IT Tech", 50000, 1),
("Engineer", 85000, 2),
("Lead Engineer", 100000, 2),
("Account Manager", 85000, 3),
("Accountant", 70000, 3),
("Sales Lead", 90000, 4),
("Salesperson", 70000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES  ("Joel", "Iles", 1, NULL ),
		("Theresa", "Louise", 2, 1),
		("Mitch", "Young", 3, NULL),
		("Duke", "Johnson", 4, 3),
		("Leslie", "Knope", 5, NULL),
		("Ron", "Swanson", 6, 5),
        ("Donna", "Awesome", 7, NULL),
        ("Tom", "Haverford", 8, 7);