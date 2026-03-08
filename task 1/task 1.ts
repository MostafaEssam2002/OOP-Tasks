class Book {
    private title :string = "";
    private author :string = "";
    readonly isbn :string = "";
    private isAvailable :boolean=true;
    // Constructor to initialize the book
    constructor(title: string, author: string, isbn: string,) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
    getIsAvailable():boolean{
        return this.isAvailable
    }
    getIsbn(): string {
        return this.isbn;
    }
    // getInfo(): Returns a formatted string with book details
    getInfo():string{
        return `Book title is ${this.title} and author name is ${this.author} and Book ISBN Number is ${this.isbn} and Book is Available ${this.isAvailable?"yes":"no"}`;
    }
    // borrow(): Marks the book as borrowed (not available)
    borrow():void{
        if(this.isAvailable){
            this.isAvailable = false ;
        }else{
            console.log("Sorry, this book is currently not available for borrowing.");
        }
    }
    // returnBook(): Marks the book as returned (available)
    returnBook():void {
        if(this.isAvailable===false){
            this.isAvailable = true;
        }else{
            console.log("This book is already available in the library.");
        }
    }
}
class Member {
    private name :string;
    readonly memberId :string;
    private borrowedBooks :Book[] = [];
    // Constructor to initialize the member
    constructor(name:string,memberId:string){
        this.name = name ;
        this.memberId = memberId;
    }
    // getInfo(): Returns member information
    getInfo():string{
        return `Member name is ${this.name} and ID is :${this.memberId} and borrows ${this.borrowedBooks.length} books`
    }
    // borrowBook(book): Adds a book to borrowedBooks list
    borrowBook(book: Book): void {
        book.borrow();
        if (!this.borrowedBooks.includes(book)) {
            this.borrowedBooks.push(book);
        }
    }
    // returnBook(book): Removes a book from borrowedBooks list
    returnBook(book:Book):void{
        book.returnBook();
        this.borrowedBooks = this.borrowedBooks.filter(ele=>ele!==book)
    }
}
class Library {
    private name :string="";
    private books :Book []=[];
    private members :Member[]=[];
    // Constructor to initialize the library
    constructor(name: string, books: Book[] = [], members: Member[] = []){
        this.name=name;
        this.books=books;
        this.members=members;
    }
    private findBookByIsbn(isbn: string): Book | null {
        return this.books.find(book => book.getIsbn() === isbn) || null;
    }
    // addBook(book): Adds a book to the library
    addBook(book:Book):void{
        this.books.push(book);
    }
    // registerMember(member): Registers a new member
    registerMember(member:Member):void{
        this.members.push(member);
    }
    // lendBook(member, isbn): Allows a member to borrow a book by ISBN
    lendBook(member: Member, isbn: string): void {
        const book = this.findBookByIsbn(isbn);
        if (!book) {
            console.log("Book not found");
        } else {
            member.borrowBook(book);
        }
    }
    // receiveBook(member, isbn): Processes a book return
    receiveBook(member:Member, isbn:string):void{
        const book = this.findBookByIsbn(isbn);
        if (!book) {
            console.log("Book not found ");
            return;
        }else{
            member.returnBook(book)
        }
    }
    // displayAvailableBooks(): Shows all available books
    displayAvailableBooks():Book[]{
        return this.books.filter(book => book.getIsAvailable());
    }
}
// === إنشاء المكتبة ===
const library: Library = new Library("City Central Library");

// === إنشاء الكتب ===
const book1: Book = new Book("Design Patterns", "Gang of Four", "978-0201633610");
const book2: Book = new Book("Clean Code", "Robert Martin", "978-0132350884");
const book3: Book = new Book("The Pragmatic Programmer", "Andy Hunt", "978-0135957059");

// === إضافة الكتب للمكتبة ===
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

// === تسجيل الأعضاء ===
const member1: Member = new Member("Alice Johnson", "M001");
const member2: Member = new Member("Bob Smith", "M002");

library.registerMember(member1);
library.registerMember(member2);

// === عرض كل الكتب المتاحة قبل أي استعارة ===
console.log("Available books before borrowing:");
library.displayAvailableBooks().forEach(book => console.log(book.getInfo()));

// === عضو يستعير كتاب ===
library.lendBook(member1, "978-0201633610"); // Alice تستعير "Design Patterns"

// === عرض الكتب المتاحة بعد الاستعارة ===
console.log("\nAvailable books after Alice borrowed 'Design Patterns':");
library.displayAvailableBooks().forEach(book => console.log(book.getInfo()));

// === نفس العضو يرجع الكتاب ===
library.receiveBook(member1, "978-0201633610");

// === عرض الكتب المتاحة بعد الإرجاع ===
console.log("\nAvailable books after Alice returned 'Design Patterns':");
library.displayAvailableBooks().forEach(book => console.log(book.getInfo()));

// === عرض معلومات الأعضاء ===
console.log("\nMember info:");
console.log(member1.getInfo());
console.log(member2.getInfo());