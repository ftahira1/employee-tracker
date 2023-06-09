const db = require('./lib/connection');
const inquirer = require('inquirer');
const Table = require('table');
const figlet = require('figlet');
const validate = require('./lib/validate');

db.connect((error) => {
    figlet("Employee\nTracker", function (err, data) {
        if (err) {
          console.log("Something went wrong...");
          console.dir(err);
          return;
        }
        console.log(data);
        prompUser();
      })
    }); 
    
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
            'View All Employees By Department',
            'Update Employee Role',
            'Update Employee Manager',
            'Add Employee',
            'Add Role',
            'Add Department',
            'Remove Employee',
            'Remove Role',
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
            // console.log("here")
          }
  
          if (choices === 'View All Departments') {
            viewAllDept();
        }
  
          if (choices === 'View All Employees By Department') {
              viewEmpByDept();
          }
  
          if (choices === 'Add Employee') {
              addEmp();
          }
  
          if (choices === 'Remove Employee') {
              removeEmp();
          }
  
          if (choices === 'Update Employee Role') {
              updateEmpRole();
          }
  
          if (choices === 'Update Employee Manager') {
              updateEmpMng();
          }
  
          if (choices === 'View All Roles') {
              viewAllRoles();
          }
  
          if (choices === 'Add Role') {
              addRole();
          }
  
          if (choices === 'Remove Role') {
              removeRole();
          }
  
          if (choices === 'Add Department') {
              addDept();
          }
  
          if (choices === 'Remove Department') {
              removeDept();
          }
  
          if (choices === 'Exit') {
              db.end();
          }
})
};

//========================-VIEW-====================

const viewAllEmp = () => {
    console.log("here");
    prompUser();
    };

const viewAllDept = () => {
    console.log("here");
    prompUser();
    };

const viewAllRoles = () => {
    console.log("here");
    prompUser();
    };

const viewEmpByDept = () => {
    console.log("here");
    prompUser();
    };


//=========================-ADD-====================

const addEmp = () => {
    console.log("here");
    prompUser();
    };

const addDept = () => {
    console.log("here");
    prompUser();
    };

const addRole = () => {
    console.log("here");
    prompUser();
    };


//======================-Update-======================

const updateEmpRole = () => {
    console.log("here");
    prompUser();
    };

const updateEmpMng = () => {
    console.log("here");
    prompUser();
    };


//==================-Remove-===========================

const removeEmp = () => {
    console.log("here");
    prompUser();
    };

const removeRole = () => {
    console.log("here");
    prompUser();
    };

const removeDept = () => {
    console.log("here");
    prompUser();
    };

