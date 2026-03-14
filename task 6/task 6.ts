enum RoomType{
    Single="Single",
    Double="Double",
    Suite="Suite",
    Deluxe="Deluxe",
    Presidential="Presidential",
}
enum RoomStatus{
    Available="Available",
    Occupied="Occupied",
    UnderMaintenance="UnderMaintenance",
    Reserved="Reserved",
}
enum ReservationStatus{
    Pending="Pending",
    Confirmed="Confirmed",
    CheckedIn="CheckedIn",
    CheckedOut="CheckedOut",
    Cancelled="Cancelled",
}
interface IChargeable{
    getPrice():number;
    getDescription():string;
}
class Room implements IChargeable{
    private roomNumber :string;
    private type :RoomType ;
    private status :RoomStatus =RoomStatus.Available;
    private floor :number;
    private pricePerNight :number;
    private maxOccupancy :number;
    private amenities : string[]=[];
    constructor(roomNumber:string,type:RoomType,floor:number,pricePerNight:number,maxOccupancy:number){
        this.roomNumber=roomNumber;
        this.type=type;
        this.floor=floor;
        this.pricePerNight=pricePerNight;
        this.maxOccupancy=maxOccupancy;
    }
    get MaxOccupancy():number{
        return this.maxOccupancy
    }
    get Floor():number{
        return this.floor;
    }
    
    get RoomNumber():string{
        return this.roomNumber
    }
    get Type():RoomType{
        return this.type
    }
    get Status():RoomStatus{
        return this.status
    }
    // getPrice(): Returns price per night
    getPrice():number{
        return this.pricePerNight
    }
    getDescription(): string {
    return `Room ${this.roomNumber} - ${this.type} room on floor ${this.floor}, 
        Price per night: $${this.pricePerNight}, 
        Max occupancy: ${this.maxOccupancy} guests, 
        Amenities: ${this.amenities.length ? this.amenities.join(", ") : "None"}`;
    }
    // Checks if room is available
    isAvailable(): boolean {
        return this.status === RoomStatus.Available;
    }
    // changeStatus(newStatus): Updates room status
    changeStatus(newStatus:RoomStatus):void {
        this.status = newStatus;
    }
}
class Guest {
    private guestId:string;
    private name:string;
    private email:string;
    private phone:string;
    private idNumber:string;
    private loyaltyPoints:number;
    constructor(guestId:string,name:string,email:string,phone:string,idNumber:string,loyaltyPoints:number){
        this.guestId=guestId
        this.name=name
        this.email=email
        this.phone=phone
        this.idNumber=idNumber
        this.loyaltyPoints=loyaltyPoints
    }
    get GuestId():string{
        return this.guestId
    }
    get LoyaltyPoints():number{
        return this.loyaltyPoints
    }
    get Name():string{
        return this.name ;
    }
    get Email():string{
        return this.email ;
    }
    get Phone():string{
        return this.phone ;
    }
    getGuestInfo():string {
        return `----Guest Info----
            Guest ID: ${this.guestId}
            Name: ${this.name}
            Email: ${this.email}
            Phone: ${this.phone}
            ID Number: ${this.idNumber}
            Loyalty Points: ${this.loyaltyPoints}`;
    }
    addLoyaltyPoints(points:number):number {
        this.loyaltyPoints+=points;
        return this.loyaltyPoints;
    }
    // getDiscountRate(): Returns discount based on loyalty
    getDiscountRate(): number {
        if (this.loyaltyPoints >= 1000) {
            return 0.15; // 15%
        } 
        else if (this.loyaltyPoints >= 500) {
            return 0.10; // 10%
        } 
        else if (this.loyaltyPoints >= 100) {
            return 0.05; // 5%
        } 
        else {
            return 0; // no discount
        }
    }
}
class Service implements IChargeable{
    private serviceId :string;
    private name :string;
    private price :number;
    private description :string;
    constructor(serviceId :string,name :string,price :number,description :string){
        this.serviceId=serviceId;
        this.name=name;
        this.price=price;
        this.description=description;
    }
    getPrice():number {
        return this.price;
    }
    getDescription():string {
        return this.description;
    }
    
}
class Reservation {
    private reservationId :string;
    private guest :Guest;
    private room :Room;
    private checkInDate :Date;
    private checkOutDate :Date;
    private status :ReservationStatus=ReservationStatus.Confirmed ;
    private services : Service[]=[];
    private totalGuests :number;
    constructor(guest:Guest,room:Room,checkInDate:Date,checkOutDate :Date,totalGuests:number){
        this.reservationId =`RES-${Date.now()}-${Math.floor(Math.random()*1000)}`
        this.guest=guest;
        this.room=room;
        this.checkInDate=checkInDate;
        this.checkOutDate=checkOutDate;
        this.totalGuests=totalGuests;
    }

    get Guest():Guest{
        return this.guest;
    }
    get Status ():ReservationStatus{
        return this.status
    }
    get Room():Room{
        return this.room
    }
    get resId():string{
        return this.reservationId
    }
    get CheckInDate():Date{
        return this.checkInDate
    }
    get CheckOutDate():Date{
        return this.checkOutDate
    }
    // getNumberOfNights(): Calculates nights stayed
    getNumberOfNights(): number {
        const diff = this.checkOutDate.getTime() - this.checkInDate.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }
    // getRoomCost(): Calculates total room charges
    getRoomCost():number {
        return this.getNumberOfNights()*this.room.getPrice()
    }
    // getServicesCost(): Calculates total services charges
    getServicesCost():number {
        return this.services.reduce((total,service)=>total+service.getPrice(),0)
    }
    // getTotal(): Returns total cost with all charges
    getTotal():number {
        const subtotal = this.getRoomCost() + this.getServicesCost();
        const discount = subtotal * this.guest.getDiscountRate();
        return subtotal - discount;
    }
    // addService(service): Adds a service to reservation
    addService(service: Service): void {
        this.services.push(service);
    }
    // checkIn(): Updates status to checked in
    checkIn():void {
        this.status= ReservationStatus.CheckedIn
    }
    // checkOut(): Updates status and returns final bill
    checkOut():number {
        this.status= ReservationStatus.CheckedOut
        return this.getTotal()
    }
    // cancel(): Cancels the reservation
    cancel():void {
        this.status=ReservationStatus.Cancelled
    }
    getReservationDetails():string{
        return `=== Reservation Details ===
            Reservation ID: ${this.reservationId}
            Guest: ${this.guest.Name}
            Email: ${this.guest.Email}, Phone: ${this.guest.Phone}
            Room: ${this.room.RoomNumber} (${this.room.Type}) - Floor ${this.room.Floor}
            Check-in: ${this.checkInDate.toDateString()}
            Check-out: ${this.checkOutDate.toDateString()}
            Nights: ${this.getNumberOfNights()}
            Number of Guests: ${this.totalGuests}
            Status: ${this.status}
            `
    }
}
class Hotel {
    hotelName :string;
    address :string;
    rooms :Room []=[];
    reservations : Reservation[]=[] ;
    guests :Guest []=[];
    availableServices :Service []=[];
    constructor(hotelName:string,address :string){
        this.address =address
        this.hotelName =hotelName
    }
    //  Adds room to hotel
    addRoom(room:Room):void{
        this.rooms.push(room)
    }
    // Registers a new guest
    registerGuest(guest:Guest):void{
        this.guests.push(guest);
    }
    // Adds available service
    addService(service:Service):void{
        this.availableServices.push(service);
    }
    // Returns available rooms for dates
    getAvailableRooms(checkIn: Date, checkOut: Date): Room[] {

        const reservedRooms = this.reservations
            .filter(res =>
                res.Status !== ReservationStatus.Cancelled &&
                checkIn.getTime() < res.CheckOutDate.getTime() &&
                checkOut.getTime() > res.CheckInDate.getTime()
            )
            .map(res => res.Room);

        return this.rooms.filter(room => !reservedRooms.includes(room));
    }
    //  Filtered availability
    getAvailableRoomsByType(type:RoomType, checkIn:Date, checkOut:Date):Room[]{
        const availableRooms = this.getAvailableRooms(checkIn,checkOut);
        return availableRooms.filter(room => room.Type === type);
    }
    // Creates reservation
    createReservation(guest: Guest,room: Room,checkIn: Date,checkOut: Date,totalGuests: number): Reservation{
        const availableRooms = this.getAvailableRooms(checkIn, checkOut);
        if (!availableRooms.includes(room)) {
            throw new Error(`Room ${room.RoomNumber} is not available for the selected dates.`);
        }
        if (totalGuests > room.MaxOccupancy) {
            throw new Error(`Room ${room.RoomNumber} cannot accommodate ${totalGuests } guests.`);
        }
        const reservation = new Reservation(guest,room,checkIn,checkOut,totalGuests )
        this.reservations.push(reservation)
        room.changeStatus(RoomStatus.Reserved);
        return reservation
    }
    findReservationId(reservationId:string):number{
        const reservationIndex = this.reservations.findIndex(res=>res.resId===reservationId)
        if(reservationIndex===-1){
            throw new Error (`reservation not found `)
        }
        return reservationIndex
    }
    // Cancels a reservation
    cancelReservation(reservationId:string):void{
        const reservationIndex:number = this.findReservationId(reservationId)
        this.reservations[reservationIndex].cancel()
        this.reservations[reservationIndex].Room.changeStatus(RoomStatus.Available)
    }
    //  Processes check-in
    checkInGuest(reservationId:string){
        const reservationIndex:number = this.findReservationId(reservationId)
        this.reservations[reservationIndex].checkIn()
        this.reservations[reservationIndex].Room.changeStatus(RoomStatus.Occupied)
    }
    //  Processes check-out and payment
    checkOutGuest(reservationId:string):number{
        const index = this.findReservationId(reservationId)
        const reservation = this.reservations[index]
        const bill = reservation.checkOut()
        reservation.Room.changeStatus(RoomStatus.Available)
        return bill
    }
    // getReservationsByGuest(guestId) Returns guest's reservations
    getReservationsByGuest(guestId:string):Reservation[]{
        const reservation = this.reservations.filter(res=>res.Guest.GuestId===guestId)
        if(reservation.length===0){
            throw new Error("Reservation not found ")
        }
        return reservation
    }
    // Returns percentage of occupied rooms
    getCurrentOccupancy():number{
        const occupiedRooms = this.rooms.filter(room=>room.Status===RoomStatus.Occupied).length
        return (occupiedRooms / this.rooms.length) * 100;
    }
    // Calculates revenue for period
    getRevenue(startDate:Date, endDate:Date){
        const reservations = this.reservations.filter(res=>res.CheckInDate.getTime() < endDate.getTime()&&res.CheckOutDate.getTime() > startDate.getTime()&&res.Status !== ReservationStatus.Cancelled);
        let total:number = 0;
        for(let res of reservations){
            total+=res.getTotal()
        }
        return total
    }
    getProjected30DayRevenue(): number {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 30);

        const reservations = this.reservations.filter(
            res =>
                res.CheckInDate.getTime() < endDate.getTime() &&
                res.CheckOutDate.getTime() > startDate.getTime()&&
                res.Status !== ReservationStatus.Cancelled
        );

        let total = 0;

        for (let res of reservations) {
            total += res.getTotal();
        }

        return total;
    }
    // Shows overview of hotel status
    displayHotelStatus():string{
        const res:Reservation[] = this.reservations.filter(res => res.Status !== ReservationStatus.Cancelled &&res.Status !== ReservationStatus.CheckedOut)
        let total:number=0;
        for(let reservation of res){
            total += reservation.getTotal();
        }
        let totalPoints = this.guests.reduce((total, current) => {
        return total + current.LoyaltyPoints;
        }, 0);
        const maintenance = this.rooms.filter(r => r.Status === RoomStatus.UnderMaintenance).length
        const available = this.rooms.filter(room => room.Status === RoomStatus.Available).length;
        const occupied = this.rooms.filter(room => room.Status === RoomStatus.Occupied).length;
        // let totalPoints = this.guests.reduce((current,total)=>{return total+=current.LoyaltyPoints},0)
        return `=== Grand Plaza Hotel Status ===
            Total Rooms: ${this.rooms.length}
            Available: ${available} (${((available / this.rooms.length) * 100).toFixed(2)}%)
            Occupied: ${occupied} (${((occupied / this.rooms.length) * 100).toFixed(2)}%)
            Under Maintenance: ${maintenance}
            Current Occupancy: ${this.getCurrentOccupancy()}%
            Active Reservations: ${res.length}
            Guest checked out. Final bill: $${total}
            Loyalty points earned: ${totalPoints}
            Projected 30-day revenue: $${this.getProjected30DayRevenue()}`
    }
}
// Helper functions
function findRoomByType(rooms: Room[], type: RoomType): Room {
    const room = rooms.find(r => r.Type === type);
    if (!room) throw new Error(`No room of type ${type} available.`);
    return room;
}
function findServiceByName(services: Service[], name: string): Service {
    const service = services.find(s => s.getDescription().includes(name) || s['name'] === name);
    if (!service) throw new Error(`Service ${name} not found.`);
    return service;
}

// Create hotel
const hotel = new Hotel("Grand Plaza Hotel", "123 Main Street, City");
// Add rooms
hotel.addRoom(new Room("101", RoomType.Single, 1, 89.99, 1));
hotel.addRoom(new Room("201", RoomType.Double, 2, 129.99, 2));
hotel.addRoom(new Room("301", RoomType.Suite, 3, 249.99, 4));
hotel.addRoom(new Room("401", RoomType.Deluxe, 4, 349.99, 3));
// Add services
hotel.addService(new Service("S001", "Room Service", 25.00, "24-hour room service"));
hotel.addService(new Service("S002", "Spa Treatment", 100.00, "90-minute massage"));
hotel.addService(new Service("S003", "Airport Shuttle", 50.00, "Round trip airport transfer"));
hotel.addService(new Service("S004", "Breakfast Buffet", 20.00, "Continental breakfast"));
// Register guests
const guest1 = new Guest("G001", "Alice Johnson", "alice@email.com", "555-0123", "ID123456", 250);
const guest2 = new Guest("G002", "Bob Smith", "bob@email.com", "555-0456", "ID789012", 100);
hotel.registerGuest(guest1);
hotel.registerGuest(guest2);

// Check available rooms
const today = new Date();
const checkIn = new Date(today);
checkIn.setDate(today.getDate() + 7);

const checkOut = new Date(checkIn);
checkOut.setDate(checkIn.getDate() + 3);

const availableRooms = hotel.getAvailableRooms(checkIn, checkOut);
console.log(`Available rooms for ${checkIn.toDateString()} to ${checkOut.toDateString()}:`);
availableRooms.forEach(room => {
    console.log(`- Room ${room.RoomNumber} (${room.Type}) - $${room.getPrice()}/night`);
});

// Create reservation
const selectedRoom = findRoomByType(availableRooms, RoomType.Suite);
const reservation = hotel.createReservation(guest1, selectedRoom, checkIn, checkOut, 2);

console.log(`\nReservation created: ${reservation.resId}`);

// Add services to reservation
reservation.addService(findServiceByName(hotel.availableServices, "Breakfast Buffet"));
reservation.addService(findServiceByName(hotel.availableServices, "Airport Shuttle"));

// Display reservation details
console.log(reservation.getReservationDetails());

// Calculate total
console.log("\nReservation Summary:");
console.log(`Room Cost (${reservation.getNumberOfNights()} nights): $${reservation.getRoomCost()}`);
console.log(`Services Cost: $${reservation.getServicesCost()}`);
console.log(`Guest Discount: ${guest1.getDiscountRate() * 100}%`);
console.log(`Total: $${reservation.getTotal()}`);

// Check in
hotel.checkInGuest(reservation.resId);
console.log(`\nGuest checked in. Room ${selectedRoom.RoomNumber} status: ${selectedRoom.Status}`);

// Hotel status
console.log("\nHotel Status Overview:");
console.log(hotel.displayHotelStatus());

// Check out
hotel.checkOutGuest(reservation.resId);
console.log(`\nGuest checked out. Final bill: $${reservation.getTotal()}`);

// Calculate revenue
const revenue = hotel.getRevenue(today, new Date(today.setDate(today.getDate() + 30)));
console.log(`\nProjected 30-day revenue: $${revenue}`);