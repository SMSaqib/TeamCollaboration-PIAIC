#!usr/bin/env node
import sqlite3 from 'sqlite3';
import inquirer from 'inquirer';
import { FurtherAction, Std_remove_record, Std_update_record } from './functions/student_fucntions.js';
// Define an interface for a Student
import { StudentRepository } from './student/student.js';
// Create a SQLite database connection
let db = new sqlite3.Database('students.db');
// Initialize the StudentRepository
let studentRepo = new StudentRepository(db);
const allStudents = await studentRepo.getAllStudents();
console.table(allStudents);
const singleStudents = await studentRepo.getStudentById(1, "id");
console.table(singleStudents);
// App Start  here
let confirmation = await inquirer.prompt([
    { message: "Are You not Enrolled Student yet?",
        type: "list",
        choices: ["Yes", "NO"],
        name: "IConfirmation"
    }
]);
switch (confirmation.IConfirmation) {
    case "Yes":
        await studentRepo.addStudent();
        break;
    case "NO":
        let b = await FurtherAction();
        switch (b.IFurtherAction) {
            case "Remove Record":
                let x = await Std_remove_record();
                await studentRepo.deleteStudent(x.IEnterColumntoDelete, x.IEnterValuetoDelete);
                break;
            case "Update Record":
                let Update_Std_record = await Std_update_record();
                await studentRepo.updateStudent(Update_Std_record.IUpdate_Crit_column, Update_Std_record.IUpdate_Crit_Val, Update_Std_record.IUpdate_update_column, Update_Std_record.IUpdate_update_Val);
        }
}
