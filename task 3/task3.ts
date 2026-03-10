class Vehicle {
    private readonly vehicleId :string;
    private make :string;
    private model :string;
    private year :number;
    private dailyRate :number;
    private IsAvailable :boolean=true;
    constructor(vehicleId:string,make:string,model:string,year:number,dailyRate:number){
        this.vehicleId=vehicleId;
        this.make=make;
        this.model=model;
        this.year=year;
        this.dailyRate=dailyRate;
    }
    getVehicleId(){
        return this.vehicleId
    }
    getYear(){
        return this.year
    }
    getMake(){
        return this.make
    }
    getModel(){
        return this.model
    }
    isAvailable(){
        return this.IsAvailable;
    }
    getDailyRate():number{
        return this.dailyRate;
    }
    getVehicleInfo():string{
        return `Vehicle ID: ${this.vehicleId}, Make: ${this.make}, Model: ${this.model}, Year: ${this.year}, Daily Rate: $${this.dailyRate}`;
    }
    rent():void{
        if(this.IsAvailable===true){
            this.IsAvailable=false;
        }else{
            console.log(`Vehicle ${this.vehicleId} is not available for rent.`);
        }
    }
    // returnVehicle(): Marks vehicle as available
    returnVehicle():void{
        if(this.IsAvailable===false){
            this.IsAvailable=true;
        }else{
            console.log(`Vehicle ${this.vehicleId} is already available.`);
        }
    }
    // calculateRentalCost(days): Calculates total cost for rental period
    calculateRentalCost(days:number):number{
        return this.dailyRate*days;
    }
}
class Customer {
    private readonly customerId :string;
    private name :string;
    private phone :string;
    private email :string;
    private driversLicenseNumber :string;
    constructor(customerId:string,name:string,phone:string,email:string,driversLicenseNumber:string){
        this.customerId=customerId;
        this.name=name;
        this.phone=phone;
        this.email=email;
        this.driversLicenseNumber=driversLicenseNumber;
    }
    getName(){
        return this.name
    }
    getCustomerId(){
        return this.customerId
    }
    // getCustomerInfo(): Returns formatted customer information
    getCustomerInfo(): string{
        return `Customer ID: ${this.customerId}, Name: ${this.name}, Phone: ${this.phone}, Email: ${this.email}, Driver's License: ${this.driversLicenseNumber}`;
    }
}
class Rental {
    private rentalId :string;
    private customer :Customer;
    private vehicle :Vehicle;
    private startDate :Date;
    private endDate :Date;
    private isActive :boolean=true;
    constructor(rentalId:string,customer:Customer,vehicle:Vehicle,startDate:Date,endDate:Date){
        if(endDate <= startDate){
            throw new Error("Invalid rental period");
        }
        this.rentalId=rentalId;
        this.customer=customer;
        this.vehicle=vehicle;
        this.startDate=startDate;
        this.endDate=endDate;
    }
    getRentalID():string{
        return this.rentalId
    }
    getRentalDuration():number{
        return Math.ceil((this.endDate.getTime()-this.startDate.getTime())/(1000*3600*24));
    }
    getCustomer():Customer{
        return this.customer;
    }
    getIsActive(){
        return this.isActive;
    }
    // getTotalCost(): Calculates total rental cost
    getTotalCost(): number{
        return this.vehicle.calculateRentalCost(this.getRentalDuration());
    }
    // completeRental(): Marks rental as completed and returns vehicle
    completeRental():void{
        if(this.isActive===true){
            this.isActive=false;
            this.vehicle.returnVehicle();
        }else{
            console.log("Vehicle is not available ")
        }
    }
    // getRentalInfo(): Returns formatted rental information
    getRentalInfo():string{
        return `Rental ID: ${this.rentalId}, Customer: ${this.customer.getName()}, Vehicle: ${this.vehicle.getMake()} ${this.vehicle.getModel()}, Start Date: ${this.startDate.toDateString()}, End Date: ${this.endDate.toDateString()}, Total Cost: $${this.getTotalCost()}`;
    }
}
class RentalAgency{
    private agencyName :string;
    private vehicles : Vehicle[]=[];
    private customers :Customer[]=[];
    private rentals :Rental[]=[];
    constructor(agencyName:string){
        this.agencyName=agencyName;
    }
    // addVehicle(vehicle): Adds vehicle to fleet
    addVehicle(vehicle:Vehicle):void {
        this.vehicles.push(vehicle);
    }
    // registerCustomer(customer): Registers a new customer
    registerCustomer(customer:Customer):void{
        this.customers.push(customer);
    }
    // getAvailableVehicles(): Returns list of available vehicles
    getAvailableVehicles():Vehicle[]{
        return this.vehicles.filter((vehicle)=>vehicle.isAvailable());
    }
    // createRental(customer, vehicle, days): Creates new rental
    createRental(rentalId:string,customer:Customer, vehicle:Vehicle, startDate:Date,endDate:Date): Rental{
            if(!vehicle.isAvailable()){
                throw new Error("Vehicle is not available");
            }

        vehicle.rent(); 
        const rental = new Rental(rentalId,customer,vehicle,startDate,endDate);
        this.rentals.push(rental)
        return rental
    }
    // completeRental(rentalId): Completes a rental and calculates final cost
    completeRental(rentalId:string):number{
        const rental = this.rentals.find((rental)=>rental.getRentalID()===rentalId)
        if(!rental){
            throw new Error("Rental not found");
        }
        rental.completeRental()
        return rental.getTotalCost()
    }
    // getActiveRentals(): Returns all active rentals
    getActiveRentals():Rental[]{
        return this.rentals.filter((rental)=>rental.getIsActive()===true)
    }
    // getCustomerRentals(customerId): Returns customer's rental history
    getCustomerRentals(customerId:string):Rental[]{
        return this.rentals.filter((rental)=>rental.getCustomer().getCustomerId()===customerId)
    }
    // displayFleet(): Shows all vehicles and their status
    displayFleet():void{
        console.log(`=== ${this.agencyName} - Fleet Status ===`);
        this.vehicles.forEach(v=>{
            const status = v.isAvailable() ? "Available" : "Rented";
            console.log(`${v.getVehicleId()} - ${v.getYear()} ${v.getMake()} ${v.getModel()} - $${v.getDailyRate()}/day - ${status}`);
        });
    }
}
// Create rental agency
const agency = new RentalAgency("Prime Car Rentals");

// Add vehicles to fleet
const car1 = new Vehicle("V001", "Toyota", "Camry", 2022, 45.00);
const car2 = new Vehicle("V002", "Honda", "Accord", 2023, 50.00);
const car3 = new Vehicle("V003", "Tesla", "Model 3", 2023, 85.00);

agency.addVehicle(car1);
agency.addVehicle(car2);
agency.addVehicle(car3);

// Register customers
const customer1 = new Customer(
  "C001",
  "Alice Johnson",
  "555-0123",
  "alice@email.com",
  "DL123456"
);

const customer2 = new Customer(
  "C002",
  "Bob Smith",
  "555-0456",
  "bob@email.com",
  "DL789012"
);

agency.registerCustomer(customer1);
agency.registerCustomer(customer2);

// Display available vehicles
agency.displayFleet();

// Create rentals
const start1 = new Date();
const end1 = new Date();
end1.setDate(start1.getDate() + 5);

const rental1 = agency.createRental("R001", customer1, car1, start1, end1);

console.log("Rental created: " + rental1.getRentalID());
console.log("Total Cost: $" + rental1.getTotalCost());

// Second rental
const start2 = new Date();
const end2 = new Date();
end2.setDate(start2.getDate() + 3);

const rental2 = agency.createRental("R002", customer2, car3, start2, end2);

console.log("Rental created: " + rental2.getRentalID());
console.log("Total Cost: $" + rental2.getTotalCost());

// Display vehicles after rentals
console.log("After rentals:");
agency.displayFleet();

// Complete a rental
agency.completeRental(rental1.getRentalID());
console.log("Rental " + rental1.getRentalID() + " completed!");

// Display customer rental history
const customerRentals = agency.getCustomerRentals("C001");
console.log(
  "Alice's rental history: " + customerRentals.length + " rental(s)"
);