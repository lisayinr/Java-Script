// Single student with a name and list of grades
export class Student {
    constructor(name) {
        this.name = name;
        this.grades = [];
    }

    // Adds a grade to student's list of grades
    addGrade(grade) {
        this.grades.push(grade);
    }

    // Calculates and returns the average of the student's grades
    getAverage() {
        if (this.grades.length === 0) return 0;
        let sum = this.grades.reduce((a, b) => a + b, 0);
        return sum / this.grades.length;
    }

    // Returns a string of the student with the average grade
    toString() {
        return `${this.name} - Average: ${this.getAverage().toFixed(2)}`;
    }
}