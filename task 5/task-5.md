# OOP Task 5: Zoo Management System

## Objective
Build a Zoo Management System to practice inheritance, polymorphism, abstract classes, and working with class hierarchies.

**Note:** This task can be completed in any OOP language (Java, C#, PHP, C++, Python, etc.). Adapt the syntax and data structures to your chosen language. Some languages may use interfaces or traits instead of abstract classes.

## Task Description
Create a zoo system that manages different types of animals. The system should demonstrate:
- Abstract base classes
- Inheritance hierarchies
- Polymorphic behavior
- Method overriding
- Managing collections of different object types

## Requirements

### 1. Animal Class (Abstract Base Class)
Create an abstract `Animal` class with the following:
- **Properties/Attributes:**
  - `animalId` (string): Unique animal ID
  - `name` (string): Animal's name
  - `species` (string): Animal species
  - `age` (integer): Age in years
  - `healthStatus` (string): Health condition
  - `dailyFoodCost` (decimal/float): Daily feeding cost

- **Abstract Methods:**
  - `abstract makeSound()`: Returns the sound the animal makes
  - `abstract getHabitat()`: Returns preferred habitat type

- **Virtual Methods:**
  - `virtual getAnimalInfo()`: Returns formatted animal information
  - `virtual calculateWeeklyCost()`: Calculates weekly maintenance cost

### 2. Mammal Classes (Inherit from Animal)

#### Lion Class
- Additional properties: `maneColor`, `prideSize`
- Override `makeSound()`: Returns "Roar!"
- Override `getHabitat()`: Returns "Savanna"

#### Elephant Class
- Additional properties: `tuskLength`, `weight`
- Override `makeSound()`: Returns "Trumpet!"
- Override `getHabitat()`: Returns "Grassland"

#### Monkey Class
- Additional properties: `tailLength`, `favoriteFood`
- Override `makeSound()`: Returns "Ooh ooh ah ah!"
- Override `getHabitat()`: Returns "Rainforest"

### 3. Bird Classes (Inherit from Animal)

#### Parrot Class
- Additional properties: `canTalk`, `vocabulary` (List/Array of strings)
- Override `makeSound()`: Returns "Squawk!"
- Add method: `speak()`: Returns a random word from vocabulary

#### Eagle Class
- Additional properties: `wingspan`, `diveSpeed`
- Override `makeSound()`: Returns "Screech!"
- Override `getHabitat()`: Returns "Mountains"

### 4. Reptile Classes (Inherit from Animal)

#### Snake Class
- Additional properties: `isVenomous`, `length`
- Override `makeSound()`: Returns "Hiss!"
- Override `getHabitat()`: Returns "Desert"

#### Crocodile Class
- Additional properties: `jawStrength`, `weight`
- Override `makeSound()`: Returns "Growl!"
- Override `getHabitat()`: Returns "Swamp"

### 5. Zookeeper Class
Create a `Zookeeper` class:
- **Properties/Attributes:**
  - `employeeId` (string)
  - `name` (string)
  - `specialization` (string): Type of animals they handle
  - `assignedAnimals` (List/Array of Animal objects)

- **Methods:**
  - `feedAnimal(animal)`: Feeds an animal
  - `checkHealth(animal)`: Checks animal health
  - `getWorkload()`: Returns number of assigned animals

### 6. Zoo Class
Create a `Zoo` class:
- **Properties/Attributes:**
  - `zooName` (string)
  - `animals` (List/Array of Animal objects)
  - `zookeepers` (List/Array of Zookeeper objects)

- **Methods:**
  - `addAnimal(animal)`: Adds animal to zoo
  - `removeAnimal(animalId)`: Removes animal
  - `assignAnimalToKeeper(animal, keeper)`: Assigns care responsibility
  - `getAnimalsByHabitat(habitat)`: Returns animals by habitat type
  - `getAnimalsBySpecies(species)`: Returns animals by species
  - `calculateTotalWeeklyCost()`: Calculates total maintenance cost
  - `displayAllAnimals()`: Shows all animals with their sounds
  - `getZooStatistics()`: Returns summary statistics

## Example Usage

```
// Create zoo
zoo = new Zoo("Safari World")

// Create animals
lion = new Lion("A001", "Simba", "African Lion", 5, "Healthy", 50.00, "Golden", 3)
elephant = new Elephant("A002", "Dumbo", "African Elephant", 15, "Healthy", 80.00, 2.5, 5000)
parrot = new Parrot("A003", "Polly", "Macaw", 8, "Healthy", 10.00, true)
parrot.vocabulary.add("Hello")
parrot.vocabulary.add("Goodbye")
parrot.vocabulary.add("Pretty bird")
snake = new Snake("A004", "Kaa", "Python", 10, "Healthy", 15.00, true, 4.5)
eagle = new Eagle("A005", "Freedom", "Bald Eagle", 6, "Healthy", 20.00, 2.3, 320)

// Add animals to zoo
zoo.addAnimal(lion)
zoo.addAnimal(elephant)
zoo.addAnimal(parrot)
zoo.addAnimal(snake)
zoo.addAnimal(eagle)

// Create zookeepers
keeper1 = new Zookeeper("K001", "John Smith", "Mammals")
keeper2 = new Zookeeper("K002", "Jane Doe", "Birds and Reptiles")

zoo.zookeepers.add(keeper1)
zoo.zookeepers.add(keeper2)

// Assign animals to keepers
zoo.assignAnimalToKeeper(lion, keeper1)
zoo.assignAnimalToKeeper(elephant, keeper1)
zoo.assignAnimalToKeeper(parrot, keeper2)
zoo.assignAnimalToKeeper(snake, keeper2)
zoo.assignAnimalToKeeper(eagle, keeper2)

// Display all animals
zoo.displayAllAnimals()

// Demonstrate polymorphism
print("\n=== Animal Sounds ===")
for each animal in zoo.animals
    print(animal.name + " says: " + animal.makeSound())

// Get animals by habitat
print("\n=== Savanna Animals ===")
savannaAnimals = zoo.getAnimalsByHabitat("Savanna")
for each animal in savannaAnimals
    print("- " + animal.name + " (" + animal.species + ")")

// Calculate costs
weeklyCost = zoo.calculateTotalWeeklyCost()
print("\nTotal Weekly Cost: $" + weeklyCost)

// Zookeeper work
print("\n=== Zookeeper Activities ===")
keeper1.feedAnimal(lion)
keeper1.checkHealth(elephant)
print(keeper1.name + "'s workload: " + keeper1.getWorkload() + " animals")

// Zoo statistics
zoo.getZooStatistics()
```

## Expected Output Example

```
=== Safari World - All Animals ===
A001 - Simba (African Lion) - Age: 5 - Habitat: Savanna
A002 - Dumbo (African Elephant) - Age: 15 - Habitat: Grassland
A003 - Polly (Macaw) - Age: 8 - Habitat: Rainforest
A004 - Kaa (Python) - Age: 10 - Habitat: Desert
A005 - Freedom (Bald Eagle) - Age: 6 - Habitat: Mountains

=== Animal Sounds ===
Simba says: Roar!
Dumbo says: Trumpet!
Polly says: Squawk!
Kaa says: Hiss!
Freedom says: Screech!

=== Savanna Animals ===
- Simba (African Lion)

Total Weekly Cost: $1225.00

=== Zookeeper Activities ===
John Smith fed Simba (African Lion)
John Smith checked health of Dumbo (African Elephant) - Status: Healthy
John Smith's workload: 2 animals

=== Safari World Statistics ===
Total Animals: 5
Total Zookeepers: 2
Habitats Represented: 5
Total Weekly Maintenance: $1225.00
Average Animal Age: 8.8 years
```

## Bonus Challenges (Optional)
1. Add aquatic animals with swimming behavior
2. Implement breeding programs for endangered species
3. Add visitor management with ticket pricing
4. Create feeding schedules with time-based logic
5. Add medical records and veterinarian class
6. Implement exhibit classes with capacity limits
7. Add seasonal behaviors (hibernation, migration)
8. Create educational programs and tours

## Learning Goals
- Understanding abstract classes and why they're useful
- Implementing inheritance hierarchies
- Polymorphism through method overriding
- Working with collections of base class types
- Type-specific behavior through virtual/abstract methods
- Designing class structures that model real-world relationships

## Getting Started
Create a file in your chosen language. Start with the abstract Animal class, then implement the specific animal classes, and finally the Zoo and Zookeeper classes.

Good luck!
