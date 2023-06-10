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

const viewEmpByDept = () => {
    console.log("here");
    db.query('SELECT * FROM employees', (error, response) => {
        if (error) throw error;
        console.table(response);
        prompUser();
    })
    };


//=========================-ADD-====================

const addEmp = () => {
    console.log("here");

    prompUser();
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
            console.table(response)});
    })
};

const addRole = () => {
    console.log("here");
    prompUser();
    };


