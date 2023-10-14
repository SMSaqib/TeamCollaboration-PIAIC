import inquirer from "inquirer";
// Define an interface for a Student
import { generateUniqueId } from './UniqueStudentID.js';
// this is the function 
async function FurtherAction() {
    let x = await inquirer.prompt([{ message: "Please select your action properly",
            type: "list",
            choices: ["Remove Record", "Update Record"],
            name: "IFurtherAction"
        }
    ]);
    return { IFurtherAction: x.IFurtherAction };
}
async function getStudentInput() {
    let dat = await inquirer.prompt([{
            message: "Enter First Name",
            name: "Ifirstname",
            type: "input"
        },
        {
            message: "Enter Last Name",
            name: "Ilastname",
            type: "input"
        }, {
            message: "Enter Age ",
            name: "Iage",
            type: "input"
        },
        {
            message: "Enter grade",
            name: "Igrade",
            type: "input"
        },
        {
            message: "Enter Password",
            name: "Ipassword",
            type: "input"
        },
        {
            message: "Enter email",
            name: "Iemail",
            type: "input"
        }
    ]);
    return dat;
}
async function verifyStudent() {
    let student_log_in_verification = await inquirer.prompt([{
            message: "Enter ID:",
            name: "IVerify_id",
            type: "input"
        },
        {
            message: "Enter Password:",
            name: "IVerify_password",
            type: "input"
        }
    ]);
    return student_log_in_verification;
}
class StudentRepository {
    db; // SQLite database connection
    constructor(db) {
        this.db = db || "students.db";
        this.createTable();
    }
    // Create the Student table if it doesn't exist
    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS students (
          id TEXT PRIMARY KEY ,
          firstName TEXT,
          lastName TEXT,
          age INTEGER,
          grade TEXT,
          Password TEXT,
          email TEXT
        )
      `;
        this.db.run(sql);
    }
    // Add a new student to the database
    async addStudent() {
        let studentDetail = await getStudentInput();
        let id = generateUniqueId();
        const sql = `INSERT INTO students (id,firstName, lastName, age, grade,password,email) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        this.db.run(sql, [id, studentDetail.Ifirstname, studentDetail.Ilastname, studentDetail.Iage, studentDetail.Igrade, studentDetail.Ipassword, studentDetail.Iemail]);
        console.log(`your Enrollment ID is "${id} please note it`);
    }
    // Retrieve a student by ID
    getStudentById(value, column) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM students WHERE ${column} = ?`;
            this.db.get(sql, [value], (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(row ? row : null);
                }
            });
        });
    }
    // Retrieve all students from the database
    getAllStudents() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM students`;
            this.db.all(sql, (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }
    // Update a student's information
    updateStudent(Crit_column, Crit_column_val, Update_column, Update_val) {
        //      const { id, firstName, lastName, age, grade } = student;
        const sql = `UPDATE students SET ${Update_column} = ?  WHERE ${Crit_column} = ?`;
        console.log(Update_column, Update_val, Crit_column, Crit_column_val);
        this.db.run(sql, [Update_val, Crit_column_val]);
    }
    // Delete a student by ID
    deleteStudent(column, value) {
        const sql = `DELETE FROM students WHERE ${column} = ?`;
        this.db.run(sql, [value]);
    }
}
export { StudentRepository, getStudentInput, FurtherAction };
