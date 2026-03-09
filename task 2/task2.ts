class Student {
    private studentId :string;
    private name :string;
    private email :string;
    // Subject names (keys) and grades (values)
    private grades :Map<string, number> = new Map();
    // Constructor to initialize the student
    constructor(studentId:string,name:string,email:string){
        this.studentId = studentId;
        this.name = name;
        this.email = email;
    }
    getName(){
        return this.name
    }
    getStudentID():string {
        return this.studentId;
    }
    //`addGrade(subject, grade)`: Add or update a grade for a subject
    addGrade(subject:string, grade:number):void{
        this.grades.set(subject, grade);
    }
    // getGrade(subject): Returns the grade for a specific subject
    getGrade(subject:string):number{
        return this.grades.get(subject) ?? 0; // Return 0 if the subject is not found
    }
    // calculateAverage(): Returns the average of all grades
    calculateAverage():number{
        let total:number=0;
        for(let grade of this.grades.values()){
            total+=grade
        }
        if(this.grades.size === 0){
            return 0; // Avoid division by zero
        }
        return total/this.grades.size;
    }
    // getLetterGrade(): Returns letter grade based on average (A, B, C, D, F)
    getLetterGrade():string{
        const average:number = this.calculateAverage()
        if(average >=90 ){
            return 'A'
        } 
        if(average>=80){
            return "B"
        } 
        if(average>=70){
            return "C"
        } 
        if(average>60){
            return "D"
        }
        return "F";
    }
    // getStudentInfo(): Returns formatted student information with all grades
    getStudentInfo(): string {
        const gradesText = Array.from(this.grades.entries())
            .map(([subject, grade]) => `  ${subject}: ${grade.toFixed(2)}`)
            .join("\n");
        return `=== Student Information ===
            ID: ${this.studentId}
            Name: ${this.name}
            Email: ${this.email}
            Grades:
            ${gradesText}
            Average: ${this.calculateAverage().toFixed(2)} (${this.getLetterGrade()})`;
        }
    }

class GradeBook {
    className :string;
    students :Student []=[];
    // Constructor to initialize the gradebook
    constructor (className:string ){
        this.className = className
    }
    // addStudent(student): Adds a student to the gradebook
    addStudent(student:Student):void{
        this.students.push(student)
    }
    // removeStudent(studentId): Removes a student by ID
    removeStudent(studentId:string):void{
        this.students = this.students.filter((ele:Student)=>ele.getStudentID()!==studentId)
    }
    // findStudent(studentId): Finds and returns a student
    findStudent(studentId:string): Student|null{
        const student = this.students.find((ele:Student)=>ele.getStudentID()===studentId)
        return student||null;
    }
    // getClassAverage(): Returns the average grade of all students
    getClassAverage():number{
        let total:number = 0;
        for(let student of this.students){
            total+=student.calculateAverage()
        }
        if(this.students.length===0){
            return 0
        }
        return total/this.students.length;
    }
    // getTopStudents(count): Returns the top performing students
    getTopStudents(count:number):Student[]{
        return [...this.students].sort((a:Student,b:Student)=>{
            return b.calculateAverage()-a.calculateAverage()
        }).slice(0,count)
    }
    // displayAllStudents(): Shows all students and their averages
    displayAllStudents(): void {
        console.log(`=== ${this.className} - All Students ===`);
        for (const student of this.students) {
            console.log(`${student.getStudentID()} - ${student.getName()}: ${student.calculateAverage().toFixed(2)} (${student.getLetterGrade()})`);
        }
    }
    // getStudentsByLetterGrade(letterGrade): Returns students with specific letter grade
    getStudentsByLetterGrade(letterGrade:string):Student[]{
        return this.students.filter((ele)=>ele.getLetterGrade()===letterGrade)
    }
}
// Create a gradebook
const gradeBook = new GradeBook("Computer Science 101");

// Create students
const student1 = new Student("S001", "Alice Johnson", "alice@school.com");
const student2 = new Student("S002", "Bob Smith", "bob@school.com");
const student3 = new Student("S003", "Charlie Brown", "charlie@school.com");
student1.getStudentInfo(); 
// Add grades for students
student1.addGrade("Math", 95.0);
student1.addGrade("English", 88.0);
student1.addGrade("Science", 92.0);

student2.addGrade("Math", 78.0);
student2.addGrade("English", 85.0);
student2.addGrade("Science", 80.0);

student3.addGrade("Math", 90.0);
student3.addGrade("English", 92.0);
student3.addGrade("Science", 89.0);

// Add students to gradebook
gradeBook.addStudent(student1);
gradeBook.addStudent(student2);
gradeBook.addStudent(student3);

// Display all students
gradeBook.displayAllStudents();

// Get class average
console.log("Class Average: " + gradeBook.getClassAverage());

// Get top students
const topStudents = gradeBook.getTopStudents(2);

console.log("Top 2 Students:");
topStudents.forEach((student) => {
    console.log(student.getName() + ": " + student.calculateAverage());
});