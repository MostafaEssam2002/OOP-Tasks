class MenuItem{
    private itemId:string="";
    private name:string;
    private description:string;
    private price:number;
    private category:string;
    private isAvailable:boolean=true;
    constructor(itemId:string,name:string,description:string,price:number,category:string){
        this.itemId=itemId;
        this.name=name;
        this.description=description;
        this.price=price;
        this.category=category;
    }
    get itemID():string{
        return this.itemId
    }
    get isavailable(){
        return this.isAvailable
    }
    get Category(){
        return this.category
    }
    get Price():number{
        return this.price
    }
    get Name():string{
        return this.name;
    }
    // getItemInfo(): Returns formatted item information
    getItemInfo():string {
        return `ID: ${this.itemId}
            Name: ${this.name}
            Description: ${this.description}
            Price: $${this.price}
            Category: ${this.category}
            Available: ${this.isAvailable ? "Yes" : "No"}`;
    }
}
class OrderItem {
    private menuItem:MenuItem;
    private quantity:number;
    private specialInstructions:string;
    constructor(menuItem:MenuItem,quantity:number,specialInstructions:string){
        this.menuItem=menuItem;
        this.quantity=quantity;
        this.specialInstructions=specialInstructions;
    }
    get MenuItem():MenuItem{
        return this.menuItem;
    }
    get getQuantity():number{
        return this.quantity;
    }


    // getSubtotal(): Returns quantity * item price
    getSubtotal(): number{
        return this.quantity*this.menuItem.Price;
    }
    // getOrderItemDetails(): Returns formatted order item information
    getOrderItemDetails(): string{
        return `Item: ${this.menuItem.Name}
            Quantity: ${this.quantity}
            Price: $${this.menuItem.Price}
            Subtotal: $${this.getSubtotal()}
            Special Instructions: ${this.specialInstructions || "None"}`;
    }
}
class Order{
    private restaurant: Restaurant;
    private orderId:string;
    private tableNumber:number;
    private orderItems:OrderItem[];
    private orderTime:Date;
    private status:string;
    constructor(orderId:string,tableNumber:number,orderItems:OrderItem[],orderTime:Date,status:string,restaurant: Restaurant){
        this.orderId=orderId;
        this.tableNumber=tableNumber;
        this.orderItems=orderItems;
        this.orderTime=orderTime;
        this.restaurant = restaurant
        this.status=status;
    }

    get OrderID():string{
        return this.orderId;
    }
    get OrderItems():OrderItem[]{
        return this.orderItems
    }
    set Status(status:string){
        this.status = status
    }
    get Status():string{
        return this.status;
    }
    // addItem(menuItem, quantity, instructions): Adds item to order
    addItem(menuItem:MenuItem, quantity:number, instructions:string):void{
            if(!menuItem.isavailable){
            console.log("Item not available");
            return;
        }
        const orderItem = new OrderItem(menuItem,quantity,instructions);
        this.orderItems.push(orderItem);
    }
    // removeItem(itemId): Removes item from order
    removeItem(itemId:string):void{
        // menuItem
        const index = this.orderItems.findIndex((item)=>item.MenuItem.itemID===itemId);
        if(index===-1){
            console.log("Item not in the order");
            return;
        }
        this.orderItems.splice(index,1);
    }
    // getSubtotal(): Sum of all order items
    getSubtotal():number {
        let total:number = 0;
        for(let item of this.orderItems){
            total+=item.getQuantity*item.MenuItem.Price
        }
        return total;
    }
    // getTax(): Calculate tax (e.g., 8% of subtotal)
    getTax():number{
        return this.getSubtotal()*this.restaurant.getTaxRate
    }
    // getTotal(): Subtotal + tax
    getTotal():number{
        return this.getSubtotal()+this.getTax()
    }
    // calculateTip(percentage): Calculate tip based on percentage
    calculateTip(percentage:number):number{
        return this.getTotal()*(percentage/100)
    }
    // updateStatus(newStatus): Updates order status
    updateStatus(newStatus:string):void{
        this.status = newStatus;
    }
    getOrderSummary():string {
        let itemsDetails = "";
        for (let item of this.orderItems) {
            itemsDetails += item.getOrderItemDetails() + "\n\n";
        }
        return `Order ID: ${this.orderId}
            Table Number: ${this.tableNumber}
            Order Time: ${this.orderTime.toLocaleString()}
            Status: ${this.status}
            Items:
            ${itemsDetails}
            Subtotal: $${this.getSubtotal().toFixed(2)}
            Tax (${this.restaurant.getTaxRate * 100}%): $${this.getTax().toFixed(2)}
            Total: $${this.getTotal().toFixed(2)}
            `;
    }
}
class Menu {
    private restaurantName :string;
    private menuItems :MenuItem[]=[];
    constructor(restaurantName:string){
        this.restaurantName = restaurantName;
    }
    // addMenuItem(item): Adds item to menu
    addMenuItem(item:MenuItem):void {
        this.menuItems.push(item)
    }
    // removeMenuItem(itemId): Removes item from menu
    removeMenuItem(itemId:string):void{
        const index:number = this.menuItems.findIndex((item)=>item.itemID===itemId)
        if(index===-1){
            console.log("Item not found ")
            return;
        }
        this.menuItems.splice(index,1)
    }
    // getItemsByCategory(category): Returns items in specific category
    getItemsByCategory(category:string):MenuItem[]{
        return this.menuItems.filter(item=>item.Category===category)
    }
    // searchItems(keyword): Search items by name
    searchItems(keyword:string):MenuItem[]{
        return this.menuItems.filter(item =>item.Name.toLowerCase().includes(keyword.toLowerCase()) || item.getItemInfo().toLowerCase().includes(keyword.toLowerCase()))
    }
    // displayMenu(): Shows all available menu items organized by category
    displayMenu(): string {
        const categories = new Set(
            this.menuItems.map(item => item.Category)
        );
        let menuText = `=== ${this.restaurantName} Menu ===\n\n`;
        for (let category of categories) {
            menuText += `--- ${category} ---\n`;
            const items = this.menuItems.filter(item => item.Category === category && item.isavailable);
            for (let item of items) {
                menuText += item.getItemInfo() + "\n\n";
            }
        }
        return menuText;
    }
}
class Restaurant {
    private restaurantName:string;
    private menu:Menu;
    private orders:Order[]=[];
    private taxRate:number;
    constructor(restaurantName:string,taxRate:number){
        this.restaurantName = restaurantName;
        this.taxRate = taxRate;
        this.menu = new Menu(this.restaurantName);
    }
    // createOrder(tableNumber): Creates a new order
    //  constructor(orderItems:OrderItem[],orderTime:Date,status:string){
    get getTaxRate(){
        return this.taxRate
    }
    get Menu(): Menu {
        return this.menu;
    }
    createOrder(tableNumber:number):Order{
        const orderId = "ORD-" + (this.orders.length + 1);
        const order = new Order(orderId,tableNumber,[],new Date(),"Pending",this);
        this.orders.push(order);
        return order;
    }
    getOrder(orderId:string): Order{
        const order = this.orders.find(order=>order.OrderID===orderId)
        if(!order){
            throw new Error("Order not found")
        }
        return order;
    }
    // getOrdersByStatus(status): Returns filtered orders
    getOrdersByStatus(status:string):Order[]{
        return this.orders.filter(order=>order.Status===status)
    }
    // getActiveOrders(): Returns all non-completed orders
    getActiveOrders():Order[]{
        return this.orders.filter(order=>order.Status!== "Completed")
    }
    // completeOrder(orderId): Marks order as completed
    completeOrder(orderId:string):void{
        const order = this.orders.find(order=>order.OrderID===orderId)
        if(!order){
            console.log("order not found ")
            return;
        }
        order.Status="Completed";
    }
    // getTotalRevenue(): Sum of all completed orders
    getTotalRevenue():number {
        const completedOrders:Order[] = this.getOrdersByStatus("Completed");
        let total:number = 0 ;
        for(let order of completedOrders){
            total+=order.getTotal();
        }
        return total;
    }
    // getPopularItems(count): Returns most ordered items
    getPopularItems(count:number): MenuItem[] {
        const itemMap = new Map<MenuItem, number>();
        // جمع الكميات لكل MenuItem
        for (let order of this.orders) {
            for (let orderItem of order.OrderItems) {
                const item = orderItem.MenuItem;
                const qty = orderItem.getQuantity;
                if (itemMap.has(item)) {
                    itemMap.set(item, itemMap.get(item)! + qty);
                } else {
                    itemMap.set(item, qty);
                }
            }
        }
        // تحويل Map إلى array وترتيب حسب الكمية
        const sortedItems = Array.from(itemMap.entries())
            .sort((a, b) => b[1] - a[1]) // b[1]-a[1] لترتيب تنازلي
            .map(entry => entry[0]); // نرجع فقط MenuItem
        return sortedItems.slice(0, count);
    }
}

// Create restaurant
const restaurant = new Restaurant("Tasty Bites", 0.08);

// Create menu items
const burger = new MenuItem(
    "M001",
    "Classic Burger",
    "Beef patty with lettuce, tomato, cheese",
    12.99,
    "Main Course"
);

const fries = new MenuItem(
    "M002",
    "French Fries",
    "Crispy golden fries",
    4.99,
    "Appetizer"
);

const salad = new MenuItem(
    "M003",
    "Caesar Salad",
    "Fresh romaine with caesar dressing",
    8.99,
    "Appetizer"
);

const soda = new MenuItem(
    "M004",
    "Soft Drink",
    "Coca-Cola, Sprite, or Fanta",
    2.99,
    "Beverage"
);

const cake = new MenuItem(
    "M005",
    "Chocolate Cake",
    "Rich chocolate layer cake",
    6.99,
    "Dessert"
);

// Add items to menu
restaurant.Menu.addMenuItem(burger);
restaurant.Menu.addMenuItem(fries);
restaurant.Menu.addMenuItem(salad);
restaurant.Menu.addMenuItem(soda);
restaurant.Menu.addMenuItem(cake);

// Display menu
console.log(restaurant.Menu.displayMenu());

// Create order for table 5
const order1 = restaurant.createOrder(5);

order1.addItem(burger, 2, "No onions");
order1.addItem(fries, 2, "Extra crispy");
order1.addItem(soda, 2, "No ice");

// Display order summary
console.log(order1.getOrderSummary());

// Calculate with tip
const subtotal = order1.getSubtotal();
const tax = order1.getTax();
const tip = order1.calculateTip(15); // 15%
const total = order1.getTotal() + tip;

console.log("\nSubtotal: $" + subtotal.toFixed(2));
console.log("Tax (8%): $" + tax.toFixed(2));
console.log("Tip (15%): $" + tip.toFixed(2));
console.log("Total: $" + total.toFixed(2));

// Update order status
order1.updateStatus("Preparing");
console.log("\nOrder status: " + order1.Status);

order1.updateStatus("Ready");
console.log("Order status: " + order1.Status);

// Complete order
restaurant.completeOrder(order1.OrderID);
console.log("Order status: " + order1.Status);

// Get revenue
console.log("\nTotal Revenue: $" + restaurant.getTotalRevenue().toFixed(2));