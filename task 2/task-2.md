# OOP Task 2: Student Grade Management System

## Objective
Build a simple Student Grade Management System to practice basic OOP concepts including classes, objects, methods, and working with collections.

**Note:** This task can be completed in any OOP language (Java, C#, PHP, C++, Python, etc.). Adapt the syntax and data structures to your chosen language.

## Task Description
Create a system that manages students and their grades. The system should allow:
- Adding students to the system
- Recording grades for different subjects
- Calculating average grades
- Displaying student information and performance

## Requirements

### 1. Student Class
Create a `Student` class with the following:
- **Properties/Attributes:**
  - `studentId` (string): Unique student ID
  - `name` (string): Student's full name
  - `email` (string): Student's email
  - `grades` (Map/Dictionary/Associative Array): Subject names (keys) and grades (values)

- **Methods:**
  - Constructor to initialize the student
  - `addGrade(subject, grade)`: Add or update a grade for a subject
  - `getGrade(subject)`: Returns the grade for a specific subject
  - `calculateAverage()`: Returns the average of all grades
  - `getLetterGrade()`: Returns letter grade based on average (A, B, C, D, F)
  - `getStudentInfo()`: Returns formatted student information with all grades

### 2. GradeBook Class
Create a `GradeBook` class with the following:
- **Properties/Attributes:**
  - `className` (string): Name of the class
  - `students` (List/Array of Student objects): List of all students

- **Methods:**
  - Constructor to initialize the gradebook
  - `addStudent(student)`: Adds a student to the gradebook
  - `removeStudent(studentId)`: Removes a student by ID
  - `findStudent(studentId)`: Finds and returns a student
  - `getClassAverage()`: Returns the average grade of all students
  - `getTopStudents(count)`: Returns the top performing students
  - `displayAllStudents()`: Shows all students and their averages
  - `getStudentsByLetterGrade(letterGrade)`: Returns students with specific letter grade

## Example Usage (Pseudocode)

```
// Create a gradebook
gradeBook = new GradeBook("Computer Science 101")

// Create students
student1 = new Student("S001", "Alice Johnson", "alice@school.com")
student2 = new Student("S002", "Bob Smith", "bob@school.com")
student3 = new Student("S003", "Charlie Brown", "charlie@school.com")

// Add grades for students
student1.addGrade("Math", 95.0)
student1.addGrade("English", 88.0)
student1.addGrade("Science", 92.0)

student2.addGrade("Math", 78.0)
student2.addGrade("English", 85.0)
student2.addGrade("Science", 80.0)

student3.addGrade("Math", 90.0)
student3.addGrade("English", 92.0)
student3.addGrade("Science", 89.0)

// Add students to gradebook
gradeBook.addStudent(student1)
gradeBook.addStudent(student2)
gradeBook.addStudent(student3)

// Display all students
gradeBook.displayAllStudents()

// Get class average
print("Class Average: " + gradeBook.getClassAverage())

// Get top students
topStudents = gradeBook.getTopStudents(2)
print("Top 2 Students:")
for each student in topStudents:
    print(student.name + ": " + student.calculateAverage())

// Get student info
print(student1.getStudentInfo())
```

## Expected Output Example

```
=== Computer Science 101 - All Students ===
S001 - Alice Johnson: 91.67 (A)
S002 - Bob Smith: 81.00 (B)
S003 - Charlie Brown: 90.33 (A)

Class Average: 87.67

Top 2 Students:
Alice Johnson: 91.67
Charlie Brown: 90.33

=== Student Information ===
ID: S001
Name: Alice Johnson
Email: alice@school.com
Grades:
  Math: 95.00
  English: 88.00
  Science: 92.00
Average: 91.67 (A)
```

## Bonus Challenges (Optional)
1. Add validation for grades (must be between 0-100)
2. Add a method to drop the lowest grade before calculating average
3. Track attendance and factor it into final grade
4. Add weighted grades (different subjects have different weights)
5. Generate grade reports that can be saved to a file
6. Add support for extra credit
7. Implement grade trending (improvement over time)

## Learning Goals
- Creating classes with properties and methods
- Working with Map/Dictionary/Associative Array collections
- Performing calculations and data processing
- String formatting and output
- Working with collections of objects
- Basic sorting and filtering

## Getting Started
Create a file for your implementation (e.g., `GradeManagement.java`, `grade_management.php`, `GradeManagement.cs`, etc.) and implement the Student and GradeBook classes. Test your implementation with the example usage provided above.
