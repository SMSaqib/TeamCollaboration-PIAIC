import inquirer from "inquirer";
// Define an interface for a Student
let Std_columnName = ["id", "firstName", "lastName", "age", "grade", "password", "email"];
let std_options = ["Remove Record", "Update Record"];
async function Std_remove_record() {
    let EnterIDtoDelete = await inquirer.prompt([
        { message: "Please Enter  Column Name",
            type: "list",
            name: "IEnterColumntoDelete",
            choices: Std_columnName
            // validate: (x) => {
            //   if (typeof x === "string" && x.match(/^\d{1,4}$/)) {
            //     return true;
            //   } else {
            //     return false;
            //   }
            // },
        },
        { message: "Please Enter Value",
            type: "input",
            name: "IEnterValuetoDelete",
        }
    ]);
    return EnterIDtoDelete;
}
async function Std_update_record() {
    let Update_Std_record = await inquirer.prompt([
        { message: "Please Enter Criteria Column Name",
            type: "list",
            name: "IUpdate_Crit_column",
            choices: Std_columnName
        },
        { message: "Please Enter lookup/Criteria Value",
            type: "input",
            name: "IUpdate_Crit_Val",
        },
        { message: "Please Select Filed for update ",
            type: "list",
            name: "IUpdate_update_column",
            choices: Std_columnName
        },
        { message: "Please Enter  Value to update",
            type: "input",
            name: "IUpdate_update_Val",
        }
    ]);
    return Update_Std_record;
}
async function FurtherAction() {
    let x = await inquirer.prompt([{ message: "Please select your action properly",
            type: "list",
            choices: std_options,
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
export { getStudentInput, FurtherAction, Std_remove_record, Std_update_record };
