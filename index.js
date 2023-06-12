// const db = require('./lib/connection');
require('dotenv').config();
const inquirer = require('inquirer');
const table = require('table');
const figlet = require('figlet');
const express = require('express');
const mysql = require('mysql2');


const db = mysql.createConnection(
    {
      host: process.env.DB_HOST,
      // MySQL username,
      user: process.env.DB_USER,
      // TODO: Add MySQL password here
      password: process.env.DB_PASSWORD,
      database: 'emp_db'
    },
    console.log(`Connected to the emp_db database.`)
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
            'Remove Role',
            'Exit'
            ]
        }
      ])
      .then((answers) => {
        const {choices} = answers;
        // console.log(choices);
  
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

          if (choices === 'Update Employee Role') {
            updateEmpRole();
          }

          if (choices === 'Remove Employee') {
            removeEmp();
          }

          if (choices === 'Remove Department') {
            removeDept();
          }

          if (choices === 'Remove Role') {
            removeRole();
          }
  
          if (choices === 'Exit') {
              db.end();
          }
})
};

//========================-VIEW-====================

const viewAllEmp = () => {
    // console.log("here");
    db.query('SELECT * FROM viewAllEmp', (error, response) => {
        if (error) throw error;
        console.table(response);
        prompUser();
    })
    };

const viewAllDept = () => {
    // console.log("here");
    db.query(`SELECT * FROM departments`, (error, response) => {
        if (error) throw error;
        console.table(response);
        prompUser();
    })
    };

const viewAllRoles = () => {
    // console.log("here");
    db.query('SELECT * FROM view_roles', (error, response) => {
        if (error) throw error;
        console.table(response);
        prompUser();
    })
    };


//=========================-ADD-====================

const addEmp = () => {
    // console.log("here");
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
        // console.log(addition);
        db.query(`SELECT roles.id, roles.title 
        FROM roles`,(error, response) => {
        if (error) throw error;
        // console.log(response);
        const role = response.map(({ id, title})=>({ name: title, value: id}));
        role.push('Create role.');
        inquirer.prompt([
                {
                  type: 'list',
                  name: 'role',
                  message: "What is the employee's role?",
                  choices: role
                }
              ])
            .then((answers) => {
            // console.log(answers);
            if (answers.role === 'Create role.') {
                addRole();
            } else {
            const rl = answers.role;
            addition.push(rl);
            db.query(`SELECT * 
            FROM employees`,(error, data) => {
            if (error) throw error;
            // console.log(data);   
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
                    // console.log(answers);
                    const manager = answers.manager;
                    addition.push(manager);
                    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?)`,addition, (error,) => {
                    if (error) throw error;
                    console.log("Employee has ben added!")
                    viewAllEmp();

                })   
            }) 
        })}
    // prompUser();
    })
})
})
};

const addDept = () => {
    // console.log("here");
    inquirer.prompt([
        {
          name: 'choices',
          type: 'input',
          message: 'Please name the department you want to add:',
    }]) 
    .then((info) => {
        const {choices} = info
        // console.log(choices);
        db.query(`INSERT INTO departments (name)
        VALUES ('${choices}')`,(error, response) => {
            if (error) throw error;
            console.log('Department has been added!')});
            viewAllDept();
    })

};

const addRole = () => {
    // console.log("here");
    db.query(`SELECT * 
    FROM departments`,(error, response) => {
    if (error) throw (error);
    // console.log(response);
    const deptNames = response.map(({id, name}) => ({name: name, value: id}));
    // console.log(deptNames);
    inquirer.prompt([
        {
            name: 'departmentName',
            type: 'list',
            message: 'Which department is this new role in?',
            choices: deptNames 
        }
    ])
    .then((answers) => {
        const roleData = [answers.departmentName];
        // console.log(roleData);
        inquirer.prompt([
            {
                  name: 'name',
                  type: 'input',
                  message: 'What is the name of the role?',
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary for the role?',
          }
        ])
        .then((answers) => {
            // console.log(answers);
            roleData.push(answers.name, answers.salary);
            // console.log(roleData);
            db.query(`INSERT INTO roles (department_id, title, salary)
            VALUES (?, ?, ?)`,roleData, (error) => {
            if (error) throw error;
            console.log("Role has ben added!")
            viewAllRoles();
            
        })

        }) 
    })

    })
    };


//==========================================-UPDATE-=================================

const updateEmpRole = () => {
    db.query(`SELECT * FROM employees`, (error, data) => {
        const empNames = data.map(({ id, first_name, last_name}) => ({ name: first_name + " " + last_name, value: id}));
        inquirer.prompt([
            {
                name: 'updateEmp',
                type: 'list',
                message: 'Which employee will you choose to update the role?',
                choices: empNames 
            }
        ])
        .then((answers)=> {
            console.log(answers);
            const updateData = [answers.updateEmp];
            db.query(`SELECT * FROM roles`, (error, data) => {
                const empRoles = data.map(({id, title})=>({name: title, value: id}));
                empRoles.push('Create role.');

                inquirer.prompt([
                    {
                        name: 'updateRole',
                        type: 'list',
                        message: 'Which role will you choose for the employee?',
                        choices: empRoles
                    }
                ])
                .then((answers) => {
                    if (answers.updateRole === 'Create role.') {
                        addRole();
                    } else {
                        updateData.push(answers.updateRole);
                        console.log(updateData);
                        db.query(`UPDATE employees SET employees.id = ? WHERE employees.role_id = ?`, 
                        updateData, (error) => {
                            if (error) throw (error);
                            console.log('Employee Role Updated!');
                            viewAllEmp();
                        })
                    }
                })
            })
        })
    })
};


//======================================================-Remove-=======================================================

const removeEmp = () => {
    db.query(`SELECT * FROM employees`, (error, response)=> {
        if (error) throw (error);
        const remEmp = response.map(({id, first_name, last_name}) => ({name: first_name + " " + last_name, value: id}));
        inquirer.prompt([
            {
                name: 'removEmp',
                type: 'list',
                message: 'Which employee do you want to remove?',
                choices: remEmp 
            }
        ])
        .then((answers) => {
            const rEmp = answers.removEmp;
            console.log(rEmp);
            db.query(`DELETE FROM employees WHERE id = ${rEmp}`, (error, data)=>{
                if (error) throw (error);
                console.log('Employee Successfully Removed');
                viewAllEmp();
            })
        })
    })
};



const removeDept = () => {
    db.query(`SELECT * FROM departments`, (error, response)=> {
        if (error) throw (error);
        const remDept = response.map(({id, name}) => ({name: name, value: id}));
        inquirer.prompt([
            {
                name: 'removDept',
                type: 'list',
                message: 'Which department do you want to remove?',
                choices: remDept 
            }
        ])
        .then((answers) => {
            const rDept = answers.removDept;
            console.log(rDept);
            db.query(`DELETE FROM departments WHERE id = ${rDept}`, (error, data)=>{
                if (error) throw (error);
                console.log('Department Successfully Removed');
                viewAllDept();
            })
        })
    })
};


const removeRole = () => {
    db.query(`SELECT * FROM roles`, (error, response)=> {
        if (error) throw (error);
        const remRole = response.map(({id, title}) => ({name: title, value: id}));
        inquirer.prompt([
            {
                name: 'removRole',
                type: 'list',
                message: 'Which role do you want to remove?',
                choices: remRole 
            }
        ])
        .then((answers) => {
            const rRole = answers.removRole;
            console.log(rRole);
            db.query(`DELETE FROM roles WHERE id = ${rRole}`, (error, data)=>{
                if (error) throw (error);
                console.log('Role Successfully Removed');
                viewAllRoles();
            })
        })
    })
};




