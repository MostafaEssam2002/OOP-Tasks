# OOP Task 6: Hotel Reservation System

## Objective
Build a Hotel Reservation System to practice interfaces, enums, composition, and complex business logic with date handling.

**Note:** This task can be completed in any OOP language (Java, C#, PHP, C++, Python, etc.). Adapt the syntax and data structures to your chosen language. Enums may be implemented differently depending on your language (constants, classes, etc.).

## Task Description
Create a hotel management system that handles rooms, reservations, guests, and services. The system should demonstrate:
- Interface implementation
- Enum usage
- Complex date calculations
- Composition (has-a relationships)
- Business rule validation

## Requirements

### 1. Enums

```
enum RoomType
    Single
    Double
    Suite
    Deluxe
    Presidential

enum RoomStatus
    Available
    Occupied
    UnderMaintenance
    Reserved

enum ReservationStatus
    Pending
    Confirmed
    CheckedIn
    CheckedOut
    Cancelled
```

### 2. IChargeable Interface
Create an interface for items that can be charged:
```
interface IChargeable
    getPrice()
    getDescription()
```

### 3. Room Class (implements IChargeable)
Create a `Room` class:
- **Properties/Attributes:**
  - `roomNumber` (string)
  - `type` (RoomType enum)
  - `status` (RoomStatus enum)
  - `floor` (integer)
  - `pricePerNight` (decimal/float)
  - `maxOccupancy` (integer)
  - `amenities` (List/Array of strings)

- **Methods:**
  - Constructor
  - `getPrice()`: Returns price per night
  - `getDescription()`: Returns room details
  - `isAvailable()`: Checks if room is available
  - `changeStatus(newStatus)`: Updates room status

### 4. Guest Class
Create a `Guest` class:
- **Properties/Attributes:**
  - `guestId` (string)
  - `name` (string)
  - `email` (string)
  - `phone` (string)
  - `idNumber` (string)
  - `loyaltyPoints` (integer)

- **Methods:**
  - Constructor
  - `getGuestInfo()`: Returns formatted information
  - `addLoyaltyPoints(points)`: Adds loyalty points
  - `getDiscountRate()`: Returns discount based on loyalty

### 5. Service Class (implements IChargeable)
Create a `Service` class for hotel services:
- **Properties/Attributes:**
  - `serviceId` (string)
  - `name` (string)
  - `price` (decimal/float)
  - `description` (string)

- **Methods:**
  - Constructor
  - `getPrice()`: Returns service price
  - `getDescription()`: Returns service details

### 6. Reservation Class
Create a `Reservation` class:
- **Properties/Attributes:**
  - `reservationId` (string)
  - `guest` (Guest)
  - `room` (Room)
  - `checkInDate` (Date/DateTime)
  - `checkOutDate` (Date/DateTime)
  - `status` (ReservationStatus enum)
  - `services` (List/Array of Service objects): Additional services ordered
  - `totalGuests` (integer)

- **Methods:**
  - Constructor
  - `getNumberOfNights()`: Calculates nights stayed
  - `getRoomCost()`: Calculates total room charges
  - `getServicesCost()`: Calculates total services charges
  - `getTotal()`: Returns total cost with all charges
  - `addService(service)`: Adds a service to reservation
  - `checkIn()`: Updates status to checked in
  - `checkOut()`: Updates status and returns final bill
  - `cancel()`: Cancels the reservation
  - `getReservationDetails()`: Returns formatted reservation info

### 7. Hotel Class
Create a `Hotel` class:
- **Properties/Attributes:**
  - `hotelName` (string)
  - `address` (string)
  - `rooms` (List/Array of Room objects)
  - `reservations` (List/Array of Reservation objects)
  - `guests` (List/Array of Guest objects)
  - `availableServices` (List/Array of Service objects)

- **Methods:**
  - Constructor
  - `addRoom(room)`: Adds room to hotel
  - `registerGuest(guest)`: Registers a new guest
  - `addService(service)`: Adds available service
  - `getAvailableRooms(checkIn, checkOut)`: Returns available rooms for dates
  - `getAvailableRoomsByType(type, checkIn, checkOut)`: Filtered availability
  - `createReservation(guest, room, checkIn, checkOut, guests)`: Creates reservation
  - `cancelReservation(reservationId)`: Cancels a reservation
  - `checkInGuest(reservationId)`: Processes check-in
  - `checkOutGuest(reservationId)`: Processes check-out and payment
  - `getReservationsByGuest(guestId)`: Returns guest's reservations
  - `getCurrentOccupancy()`: Returns percentage of occupied rooms
  - `getRevenue(startDate, endDate)`: Calculates revenue for period
  - `displayHotelStatus()`: Shows overview of hotel status

## Example Usage

```
// Create hotel
hotel = new Hotel("Grand Plaza Hotel", "123 Main Street, City")

// Add rooms
hotel.addRoom(new Room("101", RoomType.Single, 1, 89.99, 1))
hotel.addRoom(new Room("201", RoomType.Double, 2, 129.99, 2))
hotel.addRoom(new Room("301", RoomType.Suite, 3, 249.99, 4))
hotel.addRoom(new Room("401", RoomType.Deluxe, 4, 349.99, 3))

// Add services
hotel.addService(new Service("S001", "Room Service", 25.00, "24-hour room service"))
hotel.addService(new Service("S002", "Spa Treatment", 100.00, "90-minute massage"))
hotel.addService(new Service("S003", "Airport Shuttle", 50.00, "Round trip airport transfer"))
hotel.addService(new Service("S004", "Breakfast Buffet", 20.00, "Continental breakfast"))

// Register guests
guest1 = new Guest("G001", "Alice Johnson", "alice@email.com",
                   "555-0123", "ID123456", 250)
guest2 = new Guest("G002", "Bob Smith", "bob@email.com",
                   "555-0456", "ID789012", 100)

hotel.registerGuest(guest1)
hotel.registerGuest(guest2)

// Check available rooms
checkIn = today + 7 days
checkOut = checkIn + 3 days

availableRooms = hotel.getAvailableRooms(checkIn, checkOut)
print("Available rooms for " + checkIn + " to " + checkOut + ":")
for each room in availableRooms
    print("- Room " + room.roomNumber + " (" + room.type + ") - $" + room.pricePerNight + "/night")

// Create reservation
selectedRoom = findRoomByType(availableRooms, RoomType.Suite)
reservation = hotel.createReservation(guest1, selectedRoom, checkIn, checkOut, 2)

print("\nReservation created: " + reservation.reservationId)

// Add services to reservation
reservation.addService(findServiceByName(hotel.availableServices, "Breakfast Buffet"))
reservation.addService(findServiceByName(hotel.availableServices, "Airport Shuttle"))

// Display reservation details
print(reservation.getReservationDetails())

// Calculate total
print("\nReservation Summary:")
print("Room Cost (" + reservation.getNumberOfNights() + " nights): $" + reservation.getRoomCost())
print("Services Cost: $" + reservation.getServicesCost())
print("Guest Discount: " + (guest1.getDiscountRate() * 100) + "%")
print("Total: $" + reservation.getTotal())

// Check in
hotel.checkInGuest(reservation.reservationId)
print("\nGuest checked in. Room " + selectedRoom.roomNumber + " status: " + selectedRoom.status)

// Hotel status
hotel.displayHotelStatus()

// Check out
hotel.checkOutGuest(reservation.reservationId)
print("\nGuest checked out. Final bill: $" + reservation.getTotal())

// Calculate revenue
revenue = hotel.getRevenue(today, today + 30 days)
print("\nProjected 30-day revenue: $" + revenue)
```

## Expected Output Example

```
Available rooms for 12/13/2025 to 12/16/2025:
- Room 101 (Single) - $89.99/night
- Room 201 (Double) - $129.99/night
- Room 301 (Suite) - $249.99/night
- Room 401 (Deluxe) - $349.99/night

Reservation created: RES-20251206-001

=== Reservation Details ===
Reservation ID: RES-20251206-001
Guest: Alice Johnson (G001)
Email: alice@email.com, Phone: 555-0123
Room: 301 (Suite) - Floor 3
Check-in: 12/13/2025
Check-out: 12/16/2025
Nights: 3
Number of Guests: 2
Status: Confirmed

Services:
- Breakfast Buffet: $20.00
- Airport Shuttle: $50.00

Reservation Summary:
Room Cost (3 nights): $749.97
Services Cost: $70.00
Guest Discount: 5%
Total: $778.97

Guest checked in. Room 301 status: Occupied

=== Grand Plaza Hotel Status ===
Total Rooms: 4
Available: 3 (75%)
Occupied: 1 (25%)
Under Maintenance: 0
Current Occupancy: 25%
Active Reservations: 1

Guest checked out. Final bill: $778.97
Loyalty points earned: 77

Projected 30-day revenue: $15,789.50
```

## Bonus Challenges (Optional)
1. Implement early check-in/late check-out with fees
2. Add room upgrade functionality
3. Create group reservations with discounts
4. Implement seasonal pricing
5. Add housekeeping schedule and tracking
6. Create package deals (room + services)
7. Add payment methods and installment plans
8. Implement cancellation policies with refund rules
9. Add special event bookings (conferences, weddings)
10. Create reports for management (occupancy trends, revenue analysis)

## Learning Goals
- Implementing and using interfaces
- Working with enums for type safety
- Complex date calculations and validation
- Composition relationships between classes
- Business logic implementation
- State management across objects
- Working with collections of interface types

## Getting Started
Create a file in your chosen language. Start with the interfaces and enums, then implement the classes that use them.

Good luck!
