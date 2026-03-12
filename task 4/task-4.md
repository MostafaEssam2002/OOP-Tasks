# OOP Task 4: Restaurant Order System

## Objective
Build a Restaurant Order System to practice OOP concepts including classes, collections, calculations, and modeling real-world scenarios.

**Note:** This task can be completed in any OOP language (Java, C#, PHP, C++, Python, etc.). Adapt the syntax and data structures to your chosen language.

## Task Description
Create a restaurant ordering system that manages menu items, customer orders, and billing. The system should allow:
- Managing menu items with prices
- Taking customer orders
- Calculating order totals with tax and tip
- Tracking order status
- Generating receipts

## Requirements

### 1. MenuItem Class
Create a `MenuItem` class with the following:
- **Properties/Attributes:**
  - `itemId` (string): Unique item ID
  - `name` (string): Item name
  - `description` (string): Item description
  - `price` (decimal/float): Item price
  - `category` (string): Category (e.g., "Appetizer", "Main Course", "Dessert", "Beverage")
  - `isAvailable` (boolean): Whether item is currently available

- **Methods:**
  - Constructor to initialize the menu item
  - `getItemInfo()`: Returns formatted item information

### 2. OrderItem Class
Create an `OrderItem` class with the following:
- **Properties/Attributes:**
  - `menuItem` (MenuItem): The menu item ordered
  - `quantity` (integer): Number of items ordered
  - `specialInstructions` (string): Any special requests

- **Methods:**
  - Constructor to initialize the order item
  - `getSubtotal()`: Returns quantity * item price
  - `getOrderItemDetails()`: Returns formatted order item information

### 3. Order Class
Create an `Order` class with the following:
- **Properties/Attributes:**
  - `orderId` (string): Unique order ID
  - `tableNumber` (integer): Table number
  - `orderItems` (List/Array of OrderItem objects): All items in the order
  - `orderTime` (Date/DateTime): Time order was placed
  - `status` (string): Order status ("Pending", "Preparing", "Ready", "Served", "Completed")

- **Methods:**
  - Constructor to initialize the order
  - `addItem(menuItem, quantity, instructions)`: Adds item to order
  - `removeItem(itemId)`: Removes item from order
  - `getSubtotal()`: Sum of all order items
  - `getTax()`: Calculate tax (e.g., 8% of subtotal)
  - `getTotal()`: Subtotal + tax
  - `calculateTip(percentage)`: Calculate tip based on percentage
  - `updateStatus(newStatus)`: Updates order status
  - `getOrderSummary()`: Returns formatted order details

### 4. Menu Class
Create a `Menu` class with the following:
- **Properties/Attributes:**
  - `restaurantName` (string): Name of the restaurant
  - `menuItems` (List/Array of MenuItem objects): All menu items

- **Methods:**
  - Constructor to initialize the menu
  - `addMenuItem(item)`: Adds item to menu
  - `removeMenuItem(itemId)`: Removes item from menu
  - `getItemsByCategory(category)`: Returns items in specific category
  - `searchItems(keyword)`: Search items by name
  - `displayMenu()`: Shows all available menu items organized by category

### 5. Restaurant Class
Create a `Restaurant` class with the following:
- **Properties/Attributes:**
  - `restaurantName` (string): Name of the restaurant
  - `menu` (Menu): The restaurant's menu
  - `orders` (List/Array of Order objects): All orders
  - `taxRate` (decimal/float): Tax rate (e.g., 0.08 for 8%)

- **Methods:**
  - Constructor to initialize the restaurant
  - `createOrder(tableNumber)`: Creates a new order
  - `getOrder(orderId)`: Finds and returns an order
  - `getOrdersByStatus(status)`: Returns filtered orders
  - `getActiveOrders()`: Returns all non-completed orders
  - `completeOrder(orderId)`: Marks order as completed
  - `getTotalRevenue()`: Sum of all completed orders
  - `getPopularItems(count)`: Returns most ordered items

## Example Usage

```
// Create restaurant
restaurant = new Restaurant("Tasty Bites", 0.08)

// Create menu items
burger = new MenuItem("M001", "Classic Burger",
    "Beef patty with lettuce, tomato, cheese", 12.99, "Main Course")
fries = new MenuItem("M002", "French Fries",
    "Crispy golden fries", 4.99, "Appetizer")
salad = new MenuItem("M003", "Caesar Salad",
    "Fresh romaine with caesar dressing", 8.99, "Appetizer")
soda = new MenuItem("M004", "Soft Drink",
    "Coca-Cola, Sprite, or Fanta", 2.99, "Beverage")
cake = new MenuItem("M005", "Chocolate Cake",
    "Rich chocolate layer cake", 6.99, "Dessert")

// Add items to menu
restaurant.menu.addMenuItem(burger)
restaurant.menu.addMenuItem(fries)
restaurant.menu.addMenuItem(salad)
restaurant.menu.addMenuItem(soda)
restaurant.menu.addMenuItem(cake)

// Display menu
restaurant.menu.displayMenu()

// Create order for table 5
order1 = restaurant.createOrder(5)
order1.addItem(burger, 2, "No onions")
order1.addItem(fries, 2, "Extra crispy")
order1.addItem(soda, 2, "No ice")

// Display order summary
print(order1.getOrderSummary())

// Calculate with tip
subtotal = order1.getSubtotal()
tax = order1.getTax()
tip = order1.calculateTip(0.15)  // 15% tip
total = order1.getTotal() + tip

print("\nSubtotal: $" + subtotal)
print("Tax (8%): $" + tax)
print("Tip (15%): $" + tip)
print("Total: $" + total)

// Update order status
order1.updateStatus("Preparing")
print("\nOrder status: " + order1.status)

order1.updateStatus("Ready")
print("Order status: " + order1.status)

// Complete order
restaurant.completeOrder(order1.orderId)
print("Order status: " + order1.status)

// Get revenue
print("\nTotal Revenue: $" + restaurant.getTotalRevenue())
```

## Expected Output Example

```
=== Tasty Bites Menu ===

Appetizer:
- French Fries: Crispy golden fries - $4.99
- Caesar Salad: Fresh romaine with caesar dressing - $8.99

Main Course:
- Classic Burger: Beef patty with lettuce, tomato, cheese - $12.99

Beverage:
- Soft Drink: Coca-Cola, Sprite, or Fanta - $2.99

Dessert:
- Chocolate Cake: Rich chocolate layer cake - $6.99

=== Order Summary ===
Order ID: ORD001
Table: 5
Time: 12/06/2025 2:30 PM
Status: Pending

Items:
- Classic Burger x2 - $25.98
  Special: No onions
- French Fries x2 - $9.98
  Special: Extra crispy
- Soft Drink x2 - $5.98
  Special: No ice

Subtotal: $41.94
Tax (8%): $3.36
Tip (15%): $6.29
Total: $51.59

Order status: Preparing
Order status: Ready
Order status: Completed

Total Revenue: $45.30
```

## Bonus Challenges (Optional)
1. Add combo meals with discounted prices
2. Implement different table sizes and reservation system
3. Add split bill functionality for multiple customers
4. Track ingredient inventory and update based on orders
5. Add daily specials with time-based availability
6. Implement loyalty points system
7. Add takeout vs dine-in options with different logic
8. Generate detailed sales reports by time period
9. Add kitchen display system to show pending orders

## Learning Goals
- Creating related classes that work together
- Working with collections and nested objects
- Performing financial calculations with decimal
- Managing state and status transitions
- Organizing data by categories
- Generating formatted output and reports

## Getting Started
Create a file in your chosen language and implement all the classes. Test your implementation with the example usage provided above.

Good luck!
