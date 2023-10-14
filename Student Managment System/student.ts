import inquirer from "inquirer"
// Define an interface for a Student
import {generateUniqueId} from './UniqueStudentID.js'


interface Student {
    id?: string|number;
    firstName: string;
    lastName: string;
    age: number;
    grade: string;
    password:string;
    email:string
  }

// this is the function 

  async function FurtherAction(){
  let x=await inquirer.prompt([{message:"Please select your action properly",
   type:"list",
   choices:["Remove Record","Update Record"],
  name:"IFurtherAction"
  }
  ]
  )
return {IFurtherAction:x.IFurtherAction}}
  


 async function getStudentInput(){
 let dat =await inquirer.prompt([{
      message:"Enter First Name",
      name:"Ifirstname", 
      type:"input"
    },
    {
      message:"Enter Last Name",
      name:"Ilastname", 
      type:"input"
    },{
      message:"Enter Age ",
      name:"Iage", 
      type:"input"
    },
    {
      message:"Enter grade",
      name:"Igrade", 
      type:"input"
    },
    {
      message:"Enter Password",
      name:"Ipassword", 
      type:"input"
    },
    {
      message:"Enter email",
      name:"Iemail", 
      type:"input"
    }


  ])  
    return dat
  }

  async function verifyStudent(){
    let student_log_in_verification =await inquirer.prompt([{
         message:"Enter ID:",
         name:"IVerify_id", 
         type:"input"
       },
       {
         message:"Enter Password:",
         name:"IVerify_password", 
         type:"input"
       }
   
     ])  
       return student_log_in_verification
       

     }

  class StudentRepository {
    
    private db: any; // SQLite database connection
  
    constructor(db: any) {
      this.db = db || "students.db";
      this.createTable();
    }
  
    // Create the Student table if it doesn't exist
    private createTable() {
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
      
    let studentDetail= await  getStudentInput()
    let id=generateUniqueId()


      const sql = `INSERT INTO students (id,firstName, lastName, age, grade,password,email) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      
      this.db.run(sql, [id,studentDetail.Ifirstname, studentDetail.Ilastname, studentDetail.Iage, studentDetail.Igrade,studentDetail.Ipassword,studentDetail.Iemail])
      console.log(`your Enrollment ID is "${id} please note it`);
    }
  
    // Retrieve a student by ID
    getStudentById(value: number|string,column:string): Promise<Student | null> {
      return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM students WHERE ${column} = ?`;
        this.db.get(sql, [value], (err: any, row: Student) => {
          if (err) {
            reject(err);
          } else {
            resolve(row ? row : null);
          }
        });
      });
    }
  
    // Retrieve all students from the database
    getAllStudents(): Promise<Student[]> {
      return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM students`;
        this.db.all(sql, (err: any, rows: Student[]) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    }
  
    // Update a student's information
    updateStudent(Crit_column:string ,Crit_column_val:string|number|boolean,Update_column:string,Update_val:string|number|boolean) {
//      const { id, firstName, lastName, age, grade } = student;
      const sql = `UPDATE students SET ${Update_column} = ?  WHERE ${Crit_column} = ?`;
      console.log(Update_column, Update_val, Crit_column, Crit_column_val)
      this.db.run(sql, [ Update_val,Crit_column_val]);
    }
  
    // Delete a student by ID
    deleteStudent(column:string,value: number|string|boolean,) {
      const sql = `DELETE FROM students WHERE ${column} = ?`;
      this.db.run(sql, [value]);
    }
  }
  export {Student, StudentRepository,getStudentInput,FurtherAction}