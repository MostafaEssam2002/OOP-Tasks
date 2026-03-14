abstract class BankAccount {
    private accountNumber :string;
    private accountHolder :string;
    protected balance :number;
    private transactions :string[]=[];
    logTransaction(message:string){
        const date = new Date().toISOString().split('T')[0]
        this.addTransaction(`[${date}] ${message}`)
    }
    constructor(accountHolder :string,balance:number){
        this.balance=balance;
        this.accountHolder=accountHolder;
        this.accountNumber= `${Math.floor(Math.random() * 1000000000)}`;
    }
    get AccountNumber():string{
        return this.accountNumber;
    }
    deposit(amount:number):void {
        this.logTransaction(`Deposit: +$${amount.toFixed(2)}`)
        this.balance+=amount
    }
    withdraw(amount:number):boolean{
        if(amount>this.balance){
            this.logTransaction(`Failed Withdrawal Attempt: -$${amount.toFixed(2)}`)
            return false
        }else{
            this.balance-=amount
            this.logTransaction(`Withdrawal: -$${amount.toFixed(2)}`)
            return true
        }
    }
    getBalance():number {return this.balance}
    getAccountInfo():string{
        return `Account Number: ${this.accountNumber}
            Account Holder: ${this.accountHolder}
            Balance: $${this.balance.toFixed(2)}`
    }
    private addTransaction(transaction:string):void {
        this.transactions.push(transaction);
    }
    displayTransactionHistory():void {
        for(let trans of this.transactions){
            console.log(trans)
        }
    }
}
class SavingsAccount extends BankAccount{ 
    private interestRate !:number;
    private minimumBalance !:number;
    constructor(accountHolder :string,balance:number){
        super(accountHolder ,balance);
    }
    set InterestRate(val:number){
        this.interestRate = val;
    }
    set MinimumBalance(val:number){
        this.minimumBalance = val;
    }
    // Prevents withdrawal if balance goes below minimum
    withdraw(amount:number):boolean{
        if(amount > this.balance || this.balance - amount < this.minimumBalance){
            this.logTransaction(`Failed Withdrawal Attempt: -$${amount.toFixed(2)} (Below minimum balance)`)
            return false
        }else{
            this.logTransaction(`Withdrawal: -$${amount.toFixed(2)}`)
            this.balance-=amount
            return true
        }
    }
    // Adds interest to the account balance
    applyInterest():void{
        const interest =(this.interestRate*this.balance)
        this.balance+=interest
        this.logTransaction(`Interest applied: +$${interest.toFixed(2)}`)
    }
    // Returns "Savings Account"
    getAccountType():string{
        return "Savings Account"
    }
}
class CheckingAccount extends BankAccount {
    private overdraftLimit !:number;
    private transactionFee !:number;
    constructor(accountHolder :string,balance:number){
        super(accountHolder ,balance);
        // this.overdraftLimit=overdraftLimit
        // this.transactionFee=transactionFee
    }
    set OverdraftLimit(val:number){
        this.overdraftLimit = val;
    }
    set TransactionFee (val:number){
        this.transactionFee = val;
    }
    // Allows overdraft up to the limit
    withdraw(amount:number): boolean {
        const totalAmount = amount + this.transactionFee
        if (this.balance - totalAmount < -this.overdraftLimit) {
            this.logTransaction(`Failed Withdrawal Attempt: -$${totalAmount.toFixed(2)} (Overdraft limit exceeded)`)
            console.log("Withdrawal denied: overdraft limit exceeded")
            return false
        }
        this.logTransaction(`Withdrawal: -$${totalAmount.toFixed(2)} (including transaction fee)`)
        this.balance -= totalAmount
        return true
    }
    //Deducts transaction fee from balance
    chargeTransactionFee():void{
        this.balance-=this.transactionFee
    }
    // Returns "Checking Account"
    getAccountType():string{
        return "Checking Account"
    }
}
class Bank{
    bankName :string;
    accounts : BankAccount[]=[] 
    constructor(bankName :string){
        this.bankName = bankName;
    }
    // Creates and adds a savings account
    // (accountHolder :string,balance:number,interestRate :number,minimumBalance :number)
    createSavingsAccount(holder:string, initialDeposit:number):SavingsAccount{
        const interestRate = 0.05
        const minimumBalance = 100
        const account = new SavingsAccount(holder,initialDeposit)
        this.accounts.push(account)
        account.logTransaction(`Account opened with $${initialDeposit.toFixed(2)}`)
        return account
    }
    // Creates and adds a checking account
    createCheckingAccount(holder:string, initialDeposit:number): CheckingAccount{
        const overdraftLimit =100
        const transactionFee =20
        const account = new CheckingAccount(holder,initialDeposit);
        this.accounts.push(account)
        account.logTransaction(`Account opened with $${initialDeposit.toFixed(2)}`)
        return account
    }
    // Finds and returns an account
    findAccount(accountNumber:string):BankAccount{
        const index:number= this.accounts.findIndex(acc=>acc.AccountNumber===accountNumber)
        if(index===-1){
            throw new Error("Account not found ")
        }
        return this.accounts[index];
    }
    // displayAllAccounts(): Shows all accounts summary
    displayAllAccounts():void{
        console.log(`=== All Accounts in ${this.bankName} ===`)
        for(let acc of this.accounts){
            console.log(acc.getAccountInfo()+"\n")
        }
    }
    // Returns sum of all account balances
    getTotalBankBalance():number{
        let total = 0 ;
        for(let acc of this.accounts){
            total+=acc.getBalance()
        }
        return total;
    }
}

// Create a bank
const bank = new Bank("First National Bank")

// Create accounts
const savings = bank.createSavingsAccount("Alice Johnson", 1000.00)
const checking = bank.createCheckingAccount("Bob Smith", 500.00)

// Display all accounts
bank.displayAllAccounts()

// Deposit money
savings.deposit(500.00)
console.log("Alice's balance: $" + savings.getBalance())

// Withdraw money
let success = savings.withdraw(200.00)

if (success) {
    console.log("Withdrawal successful!")
}

// Try to withdraw below minimum balance
success = savings.withdraw(1500.00)

if (!success) {
    console.log("Withdrawal failed: Would exceed minimum balance requirement")
}

// Apply interest to savings account
savings.applyInterest()
console.log("After interest: $" + savings.getBalance())

// Checking account with overdraft
checking.withdraw(800.00)  // Uses overdraft
console.log("Bob's balance: $" + checking.getBalance())

// Display transaction history
savings.displayTransactionHistory()

// Display total bank balance
console.log("Total bank balance: $" + bank.getTotalBankBalance())