#! /usr/bin/env node

import inquirer  from "inquirer";
import chalk from "chalk";

// Define the student class.
class Student {
    static id = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.id = Student.id++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }

    // Enroll a student in a course.
    enroll_course(course: string) {
        this.courses.push(course);
    }

    // View a student balance.
    view_balance() {
        console.log(chalk.greenBright(`Balance for ${this.name} $${this.balance}`));
        console.log(chalk.yellow("*".repeat(50)));
    }

    // Pay student fees.
    pay_fees(amount: number) {
        this.balance -= amount;
        console.log(chalk.blue(`$${amount} Fees paid successfully for ${this.name}`));
        console.log(chalk.green(`Remaining balance: $${this.balance}`));
        console.log(chalk.yellow("*".repeat(50)));
    }

    // Display student status.
    show_status() {
        console.log(`ID ${this.id}`);
        console.log(`Name ${this.name}`)
        console.log(`Courses ${this.courses}`);
        console.log(`Balance ${this.balance}`);
    }
}

// Define a student_manager class to manage students.
class StudentManager {
    students: Student[];

    constructor() {
        this.students = [];
    }

    // Method to add a new student.
    add_student(name: string) {
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.green(`Student ${name} added successfully. student ID ${Student.id}`));
        console.log(chalk.yellow("*".repeat(50)));
    }

    // Enroll a student in a course.
    enroll_student(student_id: number, course: string) {
        let student = this.students.find(std => std.id === student_id);
        if (student) {
            student.enroll_course(course);
            console.log(chalk.green(`${student.name} enrolled in ${course} successfully`));
            console.log(chalk.yellow("*".repeat(50)));
        }
    }

    // View a student balance.
    view_student_balance(student_id: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        } else {
            console.log(chalk.red("Student not found. Please enter a correct student ID"));
            console.log(chalk.yellow("*".repeat(50)));
        }
    }

    // Pay student fees.
    pay_student_fees(student_id: number, amount: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        } else {
            console.log(chalk.red("Student not found. Please enter correct student ID"));
            console.log(chalk.yellow("*".repeat(50)));
        }
    }

    // Show student status.
    show_student_status(student_id: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        } else {
            console.log(chalk.red("Student not found. Please enter correct student ID"));
            console.log(chalk.yellow("*".repeat(50)));
        }
    }

    find_student(student_id: number) {
        return this.students.find(std => std.id === student_id);
    }
}

async function main() {
    console.log(chalk.blue("Welcome to student management system"));
    console.log(chalk.yellow("*".repeat(50)));

    let students_manager = new StudentManager();
    while (true) {
        let Choice: any = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay fees",
                    "Show status",
                    "Exit"
                ]
            }
        ]);

        switch (Choice.choice) {
            case "Add Student":
                let nameInput = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message:chalk.green("Enter a Student Name")
                    }
                ]);
                students_manager.add_student(nameInput.name);
                break;
            case "Enroll Student":
                let courseInput = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.green("Enter a student ID")
                    },
                    {
                        name: "course",
                        type: "input",
                        message: chalk.green("Enter a course Name"),
                    }
                ]);
                students_manager.enroll_student(courseInput.student_id, courseInput.course);
                break;
            case "View Student Balance":
                let balanceInput = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.green("Enter a student ID"),
                    }
                ]);
                students_manager.view_student_balance(balanceInput.student_id);
                break;
            case "Pay fees":
                let feesInput = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.green("Enter a student ID"),
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: chalk.green("Enter the amount to pay"),
                    }
                ]);
                students_manager.pay_student_fees(feesInput.student_id, feesInput.amount);
                break;
            case "Show status":
                let statusInput = await inquirer.prompt([
                    {
                        name: "status_id",
                        type: "number",
                        message: chalk.green("Enter a student ID"),
                    }
                ]);
                students_manager.show_student_status(statusInput.status_id);
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}

main();

