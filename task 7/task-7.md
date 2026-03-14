# OOP Task 7: Bank Account System

## Objective
Build a simple Bank Account System to practice Object-Oriented Programming concepts including inheritance, encapsulation, polymorphism, and data validation.

**Note:** This task can be completed in any OOP language (Java, C#, PHP, C++, Python, etc.). Adapt the syntax and data structures to your chosen language.

## Task Description
Create a banking system that manages different types of accounts (Savings and Checking). The system should allow:
- Creating different account types
- Depositing and withdrawing money
- Applying interest to savings accounts
- Handling overdraft protection for checking accounts
- Viewing account details and transaction history

## Requirements

### 1. BankAccount Class (Base Class)
Create an abstract `BankAccount` class with the following:
- **Properties/Attributes:**
  - `accountNumber` (string): Unique account number
  - `accountHolder` (string): Name of the account holder
  - `balance` (decimal/float): Current account balance (protected)
  - `transactions` (List/Array of strings): Transaction history

- **Methods:**
  - Constructor to initialize account
  - `deposit(amount)`: Adds money to the account
  - `virtual withdraw(amount)`: Removes money from the account (returns boolean for success/failure)
  - `getBalance()`: Returns current balance
  - `getAccountInfo()`: Returns formatted account information
  - `addTransaction(transaction)`: Adds a transaction to history
  - `displayTransactionHistory()`: Shows all transactions

### 2. SavingsAccount Class (Inherits from BankAccount)
Create a `SavingsAccount` class with the following:
- **Additional Properties/Attributes:**
  - `interestRate` (decimal/float): Annual interest rate (e.g., 0.02 for 2%)
  - `minimumBalance` (decimal/float): Minimum balance required (e.g., 100)

- **Methods:**
  - Constructor to initialize savings account
  - `override withdraw(amount)`: Prevents withdrawal if balance goes below minimum
  - `applyInterest()`: Adds interest to the account balance
  - `getAccountType()`: Returns "Savings Account"

### 3. CheckingAccount Class (Inherits from BankAccount)
Create a `CheckingAccount` class with the following:
- **Additional Properties/Attributes:**
  - `overdraftLimit` (decimal/float): Maximum overdraft allowed (e.g., 500)
  - `transactionFee` (decimal/float): Fee per transaction (e.g., 0.50)

- **Methods:**
  - Constructor to initialize checking account
  - `override withdraw(amount)`: Allows overdraft up to the limit
  - `chargeTransactionFee()`: Deducts transaction fee from balance
  - `getAccountType()`: Returns "Checking Account"

### 4. Bank Class
Create a `Bank` class with the following:
- **Properties/Attributes:**
  - `bankName` (string): Name of the bank
  - `accounts` (List/Array of BankAccount objects): List of all accounts

- **Methods:**
  - Constructor to initialize the bank
  - `createSavingsAccount(holder, initialDeposit)`: Creates and adds a savings account
  - `createCheckingAccount(holder, initialDeposit)`: Creates and adds a checking account
  - `findAccount(accountNumber)`: Finds and returns an account
  - `displayAllAccounts()`: Shows all accounts summary
  - `getTotalBankBalance()`: Returns sum of all account balances

## Example Usage

```
// Create a bank
bank = new Bank("First National Bank")

// Create accounts
savings = bank.createSavingsAccount("Alice Johnson", 1000.00)
checking = bank.createCheckingAccount("Bob Smith", 500.00)

// Display all accounts
bank.displayAllAccounts()

// Deposit money
savings.deposit(500.00)
print("Alice's balance: $" + savings.getBalance())

// Withdraw money
success = savings.withdraw(200.00)
if success
    print("Withdrawal successful!")

// Try to withdraw below minimum balance
success = savings.withdraw(1500.00)
if not success
    print("Withdrawal failed: Would exceed minimum balance requirement")

// Apply interest to savings account
savings.applyInterest()
print("After interest: $" + savings.getBalance())

// Checking account with overdraft
checking.withdraw(800.00)  // Uses overdraft
print("Bob's balance: $" + checking.getBalance())

// Display transaction history
savings.displayTransactionHistory()

// Display total bank balance
print("Total bank balance: $" + bank.getTotalBankBalance())
```

## Expected Output Example

```
=== All Accounts in First National Bank ===
Account: 1001 - Alice Johnson (Savings Account)
Balance: $1000.00

Account: 1002 - Bob Smith (Checking Account)
Balance: $500.00

Alice's balance: $1500.00
Withdrawal successful!
Withdrawal failed: Would exceed minimum balance requirement
After interest: $1326.00
Bob's balance: -$300.00

=== Transaction History for Account 1001 ===
[2025-12-06] Account opened with $1000.00
[2025-12-06] Deposit: +$500.00
[2025-12-06] Withdrawal: -$200.00
[2025-12-06] Interest applied: +$26.00

Total bank balance: $1026.00
```

## Bonus Challenges (Optional)
1. Add a `BusinessAccount` class with higher transaction limits
2. Implement a transfer method to move money between accounts
3. Add monthly maintenance fees for checking accounts
4. Implement account closure functionality
5. Add data validation (negative amounts, null checks, etc.)
6. Create a loan system with a `LoanAccount` class
7. Add date/time stamps to transactions using `DateTime`
8. Implement account statements that can be exported

## Learning Goals
- Understanding inheritance and base classes
- Working with abstract classes or virtual methods
- Implementing polymorphism (method overriding)
- Encapsulation with protected members
- Data validation and error handling
- Managing collections of objects
- Decimal arithmetic for financial calculations

## Getting Started
Create a file in your chosen language and implement all the classes. Start with the base `BankAccount` class, then create the derived classes, and finally the `Bank` class to manage everything.

Good luck!
