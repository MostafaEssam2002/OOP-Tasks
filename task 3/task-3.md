# OOP Task 3: Vehicle Rental System

## Objective
Build a Vehicle Rental System to practice OOP concepts including classes, encapsulation, working with dates, and basic business logic.

**Note:** This task can be completed in any OOP language (Java, C#, PHP, C++, Python, etc.). Adapt the syntax and data structures to your chosen language.

## Task Description
Create a rental system that manages different types of vehicles and their rentals. The system should allow:
- Managing vehicle inventory
- Recording customer information
- Creating and managing rentals
- Calculating rental costs
- Tracking vehicle availability

## Requirements

### 1. Vehicle Class
Create a `Vehicle` class with the following:
- **Properties/Attributes:**
  - `vehicleId` (string): Unique vehicle ID
  - `make` (string): Vehicle manufacturer
  - `model` (string): Vehicle model
  - `year` (integer): Manufacturing year
  - `dailyRate` (decimal/float): Daily rental rate
  - `isAvailable` (boolean): Current availability status

- **Methods:**
  - Constructor to initialize the vehicle
  - `getVehicleInfo()`: Returns formatted vehicle information
  - `rent()`: Marks vehicle as unavailable
  - `returnVehicle()`: Marks vehicle as available
  - `calculateRentalCost(days)`: Calculates total cost for rental period

### 2. Customer Class
Create a `Customer` class with the following:
- **Properties/Attributes:**
  - `customerId` (string): Unique customer ID
  - `name` (string): Customer's full name
  - `phone` (string): Contact phone number
  - `email` (string): Email address
  - `driversLicenseNumber` (string): Driver's license number

- **Methods:**
  - Constructor to initialize the customer
  - `getCustomerInfo()`: Returns formatted customer information

### 3. Rental Class
Create a `Rental` class with the following:
- **Properties/Attributes:**
  - `rentalId` (string): Unique rental ID
  - `customer` (Customer): The customer renting
  - `vehicle` (Vehicle): The vehicle being rented
  - `startDate` (Date/DateTime): Rental start date
  - `endDate` (Date/DateTime): Rental end date
  - `isActive` (boolean): Whether rental is currently active

- **Methods:**
  - Constructor to initialize the rental
  - `getRentalDuration()`: Returns number of rental days
  - `getTotalCost()`: Calculates total rental cost
  - `completeRental()`: Marks rental as completed and returns vehicle
  - `getRentalInfo()`: Returns formatted rental information

### 4. RentalAgency Class
Create a `RentalAgency` class with the following:
- **Properties/Attributes:**
  - `agencyName` (string): Name of the rental agency
  - `vehicles` (List/Array of Vehicle objects): All vehicles in the fleet
  - `customers` (List/Array of Customer objects): All registered customers
  - `rentals` (List/Array of Rental objects): All rental records

- **Methods:**
  - Constructor to initialize the agency
  - `addVehicle(vehicle)`: Adds vehicle to fleet
  - `registerCustomer(customer)`: Registers a new customer
  - `getAvailableVehicles()`: Returns list of available vehicles
  - `createRental(customer, vehicle, days)`: Creates new rental
  - `completeRental(rentalId)`: Completes a rental and calculates final cost
  - `getActiveRentals()`: Returns all active rentals
  - `getCustomerRentals(customerId)`: Returns customer's rental history
  - `displayFleet()`: Shows all vehicles and their status

## Example Usage (Pseudocode)

```
// Create rental agency
agency = new RentalAgency("Prime Car Rentals")

// Add vehicles to fleet
car1 = new Vehicle("V001", "Toyota", "Camry", 2022, 45.00)
car2 = new Vehicle("V002", "Honda", "Accord", 2023, 50.00)
car3 = new Vehicle("V003", "Tesla", "Model 3", 2023, 85.00)

agency.addVehicle(car1)
agency.addVehicle(car2)
agency.addVehicle(car3)

// Register customers
customer1 = new Customer("C001", "Alice Johnson", "555-0123",
                        "alice@email.com", "DL123456")
customer2 = new Customer("C002", "Bob Smith", "555-0456",
                        "bob@email.com", "DL789012")

agency.registerCustomer(customer1)
agency.registerCustomer(customer2)

// Display available vehicles
agency.displayFleet()

// Create rentals
rental1 = agency.createRental(customer1, car1, 5)
print("Rental created: " + rental1.rentalId)
print("Total Cost: $" + rental1.getTotalCost())

rental2 = agency.createRental(customer2, car3, 3)
print("Rental created: " + rental2.rentalId)
print("Total Cost: $" + rental2.getTotalCost())

// Display available vehicles after rentals
print("After rentals:")
agency.displayFleet()

// Complete a rental
agency.completeRental(rental1.rentalId)
print("Rental " + rental1.rentalId + " completed!")

// Display customer rental history
customerRentals = agency.getCustomerRentals("C001")
print("Alice's rental history: " + customerRentals.length + " rental(s)")
```

## Expected Output Example

```
=== Prime Car Rentals - Fleet Status ===
V001 - 2022 Toyota Camry - $45.00/day - Available
V002 - 2023 Honda Accord - $50.00/day - Available
V003 - 2023 Tesla Model 3 - $85.00/day - Available

Rental created: R001
Customer: Alice Johnson
Vehicle: 2022 Toyota Camry
Duration: 5 days
Total Cost: $225.00

Rental created: R002
Customer: Bob Smith
Vehicle: 2023 Tesla Model 3
Duration: 3 days
Total Cost: $255.00

After rentals:
V001 - 2022 Toyota Camry - $45.00/day - Rented
V002 - 2023 Honda Accord - $50.00/day - Available
V003 - 2023 Tesla Model 3 - $85.00/day - Rented

Rental R001 completed!
Vehicle 2022 Toyota Camry is now available.

Alice's rental history: 1 rental(s)
```

## Bonus Challenges (Optional)
1. Add different vehicle types (SUV, Truck, Luxury) with different rates
2. Implement late return fees
3. Add insurance options with additional costs
4. Track mileage and add mileage-based fees
5. Implement discounts for long-term rentals
6. Add vehicle maintenance tracking
7. Generate rental receipts
8. Add fuel policy (full-to-full, pre-paid, etc.)

## Learning Goals
- Creating interconnected classes
- Working with Date/DateTime for date calculations
- Implementing business logic and rules
- Managing object states and availability
- Working with multiple collections
- Basic CRUD operations (Create, Read, Update, Delete)

## Getting Started
Create a file for your implementation (e.g., `VehicleRentalSystem.java`, `vehicle_rental.php`, `VehicleRentalSystem.cs`, etc.) and implement all four classes. Test your implementation with the example usage provided above.
