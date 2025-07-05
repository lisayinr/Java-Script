import promptSync from 'prompt-sync';
import { GradebookManager } from './gradebookManager.js';

const prompt = promptSync();
const manager = new GradebookManager();
const filename = 'students.txt';

let running = true;

while (running) {
    console.log("\n--- Student Gradebook ---");
    console.log("1. Add Student");
    console.log("2. Add Grade to Student");
    console.log("3. View Students and Grades");
    console.log("4. Show All Averages");
    console.log("5. Delete Student");
    console.log("6. Save to File");
    console.log("7. Load from File");
    console.log("8. Exit");
    const choice = prompt("Choose an option: ");

    switch (choice) {
        case '1':
            const name = prompt("Enter student name: ");
            manager.addStudent(name);
            console.log("Student added.");
            break;
        
        case '2':
            const studentName = prompt("Enter student name: ")
            const s = manager.findStudent(studentName);
            if (s) {
                const gradeInput = prompt("Enter grade (integer): ");
                const grade = parseInt(gradeInput);
                if (!isNaN(grade)) {
                    s.addGrade(grade);
                    console.log("Grade added.");
                } else  {
                    console.log("Invalid grade.");
                }
            } else {
                console.log("Student not found.");
            }
            break;

        case '3':
            manager.viewStudentsWithGrades();
            break;

        case '4':
            manager.printAllAverages();
            break;

        case '5':
            const nameToDelete = prompt("Enter student name to delete: ");
            const deleted = manager.deleteStudent(nameToDelete);
            if (deleted) {
                console.log(`Student '${nameToDelete}' deleted.`);
            } else {
                console.log(`Student '${nameToDelete}' not found.`);
            }
            break;

        case '6':
            manager.saveToFile(filename);
            break;

        case '7':
            manager.loadFromFile(filename);
            break;

        case '8':
            running = false;
            console.log("Goodbye!");
            break;

        default:
            console.log("Invalid choice. Try again.");
    }
}