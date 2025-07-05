import { Student } from './student.js';
import fs from 'fs';

// Manages a list of students and manages the operations of the gradebook
export class GradebookManager {
    constructor() {
        this.students = [];
    }

    // Adds a new student to the gradebook
    addStudent(name) {
        this.students.push(new Student(name));
    }

    // Deletes a student from the gradebook
    deleteStudent(name) {
        const cleanedName = name.trim().toLowerCase();
        const initialLength = this.students.length;
        this.students = this.students.filter(s => s.name.trim().toLowerCase() !== cleanedName);
        return this.students.length < initialLength;
    }

    // Prints all students with all of their grades
    viewStudentsWithGrades() {
        if (this.students.length === 0) {
            console.log("Np students in gradebook.");
            return;
        }
        this.students.forEach(s => {
            if (Array.isArray(s.grades) && s.grades.length > 0) {
                console.log(`${s.name} - Grades: ${s.grades.join(', ') || "No grades"}`);
            } else {
                console.log(`${s.name} - No grades`);
            }
        });
    }

    // Finds a student by name
    findStudent(name) {
        return this.students.find(s => s.name.toLowerCase() === name.toLowerCase());
    }

    // Prints all students with their average grades
    printAllAverages() {
        if (this.students.length === 0) {
            console.log("No students in gradebook.");
            return;
        }
        this.students.forEach(s => console.log(s.toString()));
    }

    // Saves the students and their grades to a text file
    saveToFile(filename) {
        const data = this.students.map(s => {
            return [s.name, ...s.grades].join(',');
        }).join('\n');

        // Try writing to the file, handling any errors
        try {
            fs.writeFileSync(filename, data);
            console.log(`Data saved to ${filename}`);
        } catch (err) {
            console.error("Error saving file:", err.message);
        }
    }

    // Loads student data from a text file
    loadFromFile(filename) {
        this.students =  [];
        // Try reading from the file, handling any errors
        try  {
            const content = fs.readFileSync(filename, 'utf-8');
            const lines = content.trim().split('\n');

            lines.forEach(line => {
                const parts = line.split(',');
                if (parts.length >= 1) {
                    const student = new Student(parts[0]);
                    for (let i = 1; i < parts.length; i++) {
                        student.addGrade(parseInt(parts[i]));
                    }
                    this.students.push(student);
                }
            });
            console.log(`Data loaded from ${filename}`);
        } catch (err) {
            console.error("Error  loading file:", err.message);
        }
    }
}