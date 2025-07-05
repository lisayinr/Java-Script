export class Student {
    constructor(name) {
        this.name = name;
        this.grades = [];
    }

    addGrade(grade) {
        this.grades.push(grade);
    }

    getAverage() {
        if (this.grades.length === 0) return 0;
        let sum = this.grades.reduce((a, b) => a + b, 0);
        return sum / this.grades.length;
    }

    toString() {
        return `${this.name} - Average: ${this.getAverage().toFixed(2)}`;
    }
}