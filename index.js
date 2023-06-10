// const db = require('./lib/connection');
const inquirer = require('inquirer');
const table = require('table');
const figlet = require('figlet');
const express = require('express');
const mysql = require('mysql2')

const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'shba2015',
      database: 'emp_db'
    },
    console.log(`Connected to the movies_db database.`)
  );

function init() {
    figlet("Employee\nTracker", function (err, data) {
        if (err) {
          console.log("Something went wrong...");
          console.dir(err);
          return;
        }
        console.log(data);
        prompUser();
      })
    }; 
    init();
    
const prompUser = () => {
    inquirer.prompt([
        {
          name: 'choices',
          type: 'list',
          message: 'Please select an option:',
          choices: [
            'View All Employees',
            'View All Roles',
            'View All Departments',
            'Add Employee',
            'Add Role',
            'Add Department',
            'Update Employee Role',
            'Remove Employee',
            'Remove Department',
            'Exit'
            ]
        }
      ])
      .then((answers) => {
        const {choices} = answers;
        console.log(choices);
  
          if (choices === 'View All Employees') {
              viewAllEmp();
          }

          if (choices === 'View All Roles') {
            viewAllRoles();
        }
  
          if (choices === 'View All Departments') {
            viewAllDept();
        }
  
          if (choices === 'Add Employee') {
              addEmp();
          }
  
          if (choices === 'Add Role') {
              addRole();
          }
  
          if (choices === 'Add Department') {
              addDept();
          }
  
          if (choices === 'Exit') {
              db.end();
          }
})
};

//========================-VIEW-====================

const viewAllEmp = () => {
    console.log("here");
    db.query('SELECT * FROM employees', (error, response) => {
        if (error) throw error;
        console.table(response);
        prompUser();
    })
    };

const viewAllDept = () => {
    console.log("here");
    db.query('SELECT * FROM departments', (error, response) => {
        if (error) throw error;
        console.table(response);
        prompUser();
    })
    };

const viewAllRoles = () => {
    console.log("here");
    db.query('SELECT * FROM roles', (error, response) => {
        if (error) throw error;
        console.table(response);
        prompUser();
    })
    };


//=========================-ADD-====================

const addEmp = () => {
    console.log("here");
    inquirer.prompt([
    {
          name: 'firstname',
          type: 'input',
          message: 'What is the employees first name?',
    },
    {
        name: 'lastname',
        type: 'input',
        message: 'What is the employees last name?',
  }
]) 
    .then((info) => {
        const addition = [info.firstname, info.lastname];
        console.log(addition);
        db.query(`SELECT roles.id, roles.title 
        FROM roles`,(error, response) => {
        if (error) throw error;
        console.log(response);
        const role = response.map(({ id, title})=>({ name: title, value: id}));
        inquirer.prompt([
                {
                  type: 'list',
                  name: 'role',
                  message: "What is the employee's role?",
                  choices: role
                }
              ])
            .then((answers) => {
            console.log(answers);
            const rl = answers.role;
            addition.push(rl);
            db.query(`SELECT * 
            FROM employees`,(error, data) => {
            if (error) throw error;
            console.log(data);   
            const managers = data.map(({ id, first_name, last_name}) => ({ name: first_name + " " + last_name, value: id}));
            inquirer.prompt([
                {
                  type: 'list',
                  name: 'manager',
                  message: "Who is the employee's manager?",
                  choices: managers
                }
              ])
                .then((answers) => {
                    console.log(answers);
                    const manager = answers.manager;
                    addition.push(manager);
                    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?)`,addition, (error,) => {
                    if (error) throw error;
                    console.log("Employee has ben added!")
                    viewAllEmp();

                })   
            }) 
        })
    // prompUser();
    })
})
})
};

const addDept = () => {
    console.log("here");
    inquirer.prompt([
        {
          name: 'choices',
          type: 'input',
          message: 'Please name the department you want to add:',
    }]) 
    .then((info) => {
        const {choices} = info
        console.log(choices);
        db.query(`INSERT INTO departments (name)
        VALUES ('${choices}')`,(error, response) => {
            if (error) throw error;
            console.log('Department has been added!')});
            viewAllDept();
    })
// prompUser()
};

const addRole = () => {
    console.log("here");
    prompUser();
    };


