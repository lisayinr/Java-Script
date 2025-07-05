import { Student } from './student.js';
import fs from 'fs';

export class GradebookManager {
    constructor() {
        this.students = [];
    }

    addStudent(name) {
        this.students.push(new Student(name));
    }

    deleteStudent(name) {
        const cleanedName = name.trim().toLowerCase();
        const initialLength = this.students.length;
        this.students = this.students.filter(s => s.name.trim().toLowerCase() !== cleanedName);
        return this.students.length < initialLength;
    }

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

    findStudent(name) {
        return this.students.find(s => s.name.toLowerCase() === name.toLowerCase());
    }

    printAllAverages() {
        if (this.students.length === 0) {
            console.log("No students in gradebook.");
            return;
        }
        this.students.forEach(s => console.log(s.toString()));
    }

    saveToFile(filename) {
        const data = this.students.map(s => {
            return [s.name, ...s.grades].join(',');
        }).join('\n');

        try {
            fs.writeFileSync(filename, data);
            console.log(`Data saved to ${filename}`);
        } catch (err) {
            console.error("Error saving file:", err.message);
        }
    }

    loadFromFile(filename) {
        this.students =  [];
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