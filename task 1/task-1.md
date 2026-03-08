# OOP Task: Library Management System

## Objective
Build a simple Library Management System to practice Object-Oriented Programming concepts including classes, objects, encapsulation, and basic methods.

**Note:** This task can be completed in any OOP language (Java, C#, PHP, C++, Python, etc.). Adapt the syntax and data structures to your chosen language.

## Task Description
Create a library system that can manage books and library members. The system should allow:
- Adding books to the library
- Registering library members
- Borrowing and returning books
- Checking book availability

## Requirements

### 1. Book Class
Create a `Book` class with the following:
- **Properties/Attributes:**
  - `title` (string): The book's title
  - `author` (string): The book's author
  - `isbn` (string): The book's ISBN number
  - `isAvailable` (boolean): Whether the book is available for borrowing

- **Methods:**
  - Constructor to initialize the book
  - `getInfo()`: Returns a formatted string with book details
  - `borrow()`: Marks the book as borrowed (not available)
  - `returnBook()`: Marks the book as returned (available)

### 2. Member Class
Create a `Member` class with the following:
- **Properties/Attributes:**
  - `name` (string): Member's name
  - `memberId` (string): Unique member ID
  - `borrowedBooks` (List/Array of Book objects): List of books currently borrowed

- **Methods:**
  - Constructor to initialize the member
  - `getInfo()`: Returns member information
  - `borrowBook(book)`: Adds a book to borrowedBooks list
  - `returnBook(book)`: Removes a book from borrowedBooks list

### 3. Library Class
Create a `Library` class with the following:
- **Properties/Attributes:**
  - `name` (string): Library name
  - `books` (List/Array of Book objects): List of all books in the library
  - `members` (List/Array of Member objects): List of all registered members

- **Methods:**
  - Constructor to initialize the library
  - `addBook(book)`: Adds a book to the library
  - `registerMember(member)`: Registers a new member
  - `lendBook(member, isbn)`: Allows a member to borrow a book by ISBN
  - `receiveBook(member, isbn)`: Processes a book return
  - `displayAvailableBooks()`: Shows all available books

## Example Usage (Pseudocode)

```
// Create a library
library = new Library("City Central Library")

// Create books
book1 = new Book("Design Patterns", "Gang of Four", "978-0201633610")
book2 = new Book("Clean Code", "Robert Martin", "978-0132350884")
book3 = new Book("The Pragmatic Programmer", "Andy Hunt", "978-0135957059")

// Add books to library
library.addBook(book1)
library.addBook(book2)
library.addBook(book3)

// Register members
member1 = new Member("Alice Johnson", "M001")
member2 = new Member("Bob Smith", "M002")

library.registerMember(member1)
library.registerMember(member2)

// Display available books
library.displayAvailableBooks()

// Member borrows a book
library.lendBook(member1, "978-0201633610")

// Display available books again
library.displayAvailableBooks()

// Member returns a book
library.receiveBook(member1, "978-0201633610")
```

## Expected Output Example

```
Available books in City Central Library:
- Design Patterns by Gang of Four (ISBN: 978-0201633610)
- Clean Code by Robert Martin (ISBN: 978-0132350884)
- The Pragmatic Programmer by Andy Hunt (ISBN: 978-0135957059)

Alice Johnson borrowed: Design Patterns

Available books in City Central Library:
- Clean Code by Robert Martin (ISBN: 978-0132350884)
- The Pragmatic Programmer by Andy Hunt (ISBN: 978-0135957059)

Alice Johnson returned: Design Patterns
```

## Bonus Challenges (Optional)
1. Add a limit to how many books a member can borrow at once (e.g., maximum 3 books)
2. Add a method to search for books by title or author
3. Keep track of borrowing history with dates
4. Add error handling for cases like:
   - Trying to borrow a book that's not available
   - Trying to return a book that wasn't borrowed
   - Trying to borrow with an invalid ISBN

## Learning Goals
- Understanding classes and objects
- Working with properties and methods
- Managing relationships between objects
- Implementing basic business logic
- Using lists/arrays to store and manage collections

## Getting Started
Create a file for your implementation (e.g., `LibrarySystem.java`, `library_system.php`, `LibrarySystem.cs`, etc.) and implement the three classes. Test your implementation with the example usage provided above.

Good luck! 🚀
