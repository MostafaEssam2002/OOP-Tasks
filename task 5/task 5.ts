abstract class Animal {
    protected animalId :string="";
    protected name :string="";
    protected species :string="";
    protected age :number=0;
    protected healthStatus :string="";
    protected dailyFoodCost :number=0;
    constructor(animalId:string, name:string, species:string, age:number, healthStatus:string, dailyFoodCost:number){
        this.animalId=animalId;
        this.name=name;
        this.species=species
        this.age=age
        this.healthStatus=healthStatus
        this.dailyFoodCost=dailyFoodCost
    }
    abstract makeSound():string ;
    abstract getHabitat():string ;
    get HealthStatus():string{
        return this.healthStatus
    }
    get Age():number{
        return this.age
    }
    get AnimalId():string{
        return this.animalId
    }
    get Name():string{
        return this.name
    }
    get Species():string{
        return this.species
    }
    getAnimalInfo(): string{
        return `ID: ${this.animalId}
            Name: ${this.name}
            Species: ${this.species}
            Age: ${this.age}
            Health Status: ${this.healthStatus}
            Daily Food Cost: ${this.dailyFoodCost}`;
    }
    calculateWeeklyCost():number{
        return this.dailyFoodCost*7
    }
}
class Lion extends Animal{
    private maneColor:string=""
    private prideSize:number = 0
    constructor(animalId:string, name:string, species:string, age:number, healthStatus:string, dailyFoodCost:number, maneColor:string, prideSize:number){
        super(animalId,name,species,age,healthStatus,dailyFoodCost);
        this.maneColor = maneColor;
        this.prideSize=prideSize
    }
    makeSound():string{ return "Roar!"}
    getHabitat():string{ return "Savanna"}
} 
class Elephant extends Animal{
    private tuskLength:number;  
    private weight:number;
    constructor(animalId:string, name:string, species:string, age:number, healthStatus:string, dailyFoodCost:number, tuskLength:number, weight:number){
        super(animalId,name,species,age,healthStatus,dailyFoodCost);
        this.tuskLength = tuskLength;
        this.weight=weight
    }
    makeSound():string{ return "Trumpet!"}
    getHabitat():string{ return "Grassland"}

}
class Monkey extends Animal{
    private tailLength:number
    private favoriteFood:string
    constructor(animalId:string, name:string, species:string, age:number, healthStatus:string, dailyFoodCost:number, tailLength:number, favoriteFood:string){
        super(animalId,name,species,age,healthStatus,dailyFoodCost);
        this.favoriteFood = favoriteFood;
        this.tailLength=tailLength
    }
    makeSound():string{ return "Ooh ooh ah ah!"}
    getHabitat():string{ return "Rainforest"}
}
class Parrot extends Animal{
    private canTalk:boolean ;
    private vocabulary :string[]=[]
    constructor(animalId:string, name:string, species:string, age:number, healthStatus:string, dailyFoodCost:number, canTalk:boolean){
        super(animalId,name,species,age,healthStatus,dailyFoodCost);
        this.canTalk = canTalk;
    }
    makeSound():string{ return"Squawk!"}
    getHabitat():string{ return "Rainforest"}
    addVocabulary(voc:string):void{
        this.vocabulary.push(voc)
    }
    speak():string{
        const randomIndex = Math.floor(Math.random() * this.vocabulary.length);
        return this.vocabulary[randomIndex]
    }
}
class Eagle extends Animal{
    private wingspan:number; 
    private diveSpeed:number;
    constructor(animalId:string, name:string, species:string, age:number, healthStatus:string, dailyFoodCost:number, diveSpeed:number, wingspan:number){
        super(animalId,name,species,age,healthStatus,dailyFoodCost);
        this.wingspan = wingspan;
        this.diveSpeed=diveSpeed
    }
    makeSound():string{ return "Screech!"}
    getHabitat():string{ return "Mountains"}
} 
class Snake extends Animal{
    private isVenomous:boolean
    private length:number
    constructor(animalId:string, name:string, species:string, age:number, healthStatus:string, dailyFoodCost:number, isVenomous:boolean, length:number){
        super(animalId,name,species,age,healthStatus,dailyFoodCost);
        this.length = length;
        this.isVenomous=isVenomous
    }
    makeSound():string{ return "Hiss!"}
    getHabitat():string{ return "Desert"}
}
class Crocodile extends Animal{
    private jawStrength:number;
    private weight:number;
    constructor(animalId:string, name:string, species:string, age:number, healthStatus:string, dailyFoodCost:number, weight:number, jawStrength:number){
        super(animalId,name,species,age,healthStatus,dailyFoodCost);
        this.jawStrength = jawStrength;
        this.weight=weight
    }
    makeSound():string{ return "Growl!"}
    getHabitat():string{ return "Swamp"}
}
class Zookeeper {
    private employeeId:string;
    private name:string;
    private specialization:string
    private assignedAnimals:Animal[]=[]
    constructor(employeeId:string,name:string,specialization:string){
        this.employeeId=employeeId
        this.name=name
        this.specialization=specialization
    }
    get keeperName():string{
        return this.name
    }
    assignAnimal(animal:Animal):void{
        this.assignedAnimals.push(animal)
    }
    feedAnimal(animal:Animal):void{
        console.log(`${this.name} fed ${animal.Name} (${animal.Species})`)
        // return `${this.name} fed ${animal.Name} (${animal.Species})`
    }
    // "John Smith checked health of Dumbo (African Elephant) - Status: Healthy"
    checkHealth(animal:Animal):void{
        console.log(`${this.name} checked health of ${animal.Name} (${animal.Species}) - Status: ${animal.HealthStatus}`)
        // return `${this.name} checked health of ${animal.Name} (${animal.Species}) - Status: ${animal.HealthStatus}`;
    }
    // Returns number of assigned animals
    getWorkload():number{
        return this.assignedAnimals.length
    }
}
class Zoo {
    private zooName:string;
    private animals:Animal[]=[];
    private zookeepers:Zookeeper[]=[];
    constructor(zooName:string){
        this.zooName = zooName;
    }
    get Animals():Animal[]{
        return this.animals
    }
    addAnimal(animal:Animal):Animal[]{
        this.animals.push(animal)
        return this.animals;
    }
    // removeAnimal(animalId): Removes animal
    removeAnimal(animalId:string):void{ 
        const index = this.animals.findIndex(animal=>animal.AnimalId===animalId)
        if(index===-1){
            console.log("Animal not found")
            return
        }
        this.animals.splice(index,1)
    }
    addZooKeeper(keeper:Zookeeper):void{
        this.zookeepers.push(keeper);
    }
    // assignAnimalToKeeper(animal, keeper): Assigns care responsibility
    assignAnimalToKeeper(animal:Animal, keeper:Zookeeper):void{
        keeper.assignAnimal(animal)
    }
    // getAnimalsByHabitat(habitat): Returns animals by habitat type
    getAnimalsByHabitat(habitat:string):Animal[]{
        return this.animals.filter(animal=>animal.getHabitat()===habitat)
    }
    // getAnimalsBySpecies(species): Returns animals by species
    getAnimalsBySpecies(species:string):Animal[]{
        return this.animals.filter(animal=>animal.Species===species)
    }
    // calculateTotalWeeklyCost(): Calculates total maintenance cost
    calculateTotalWeeklyCost():number{
        let total:number = 0;
        for(let animal of this.animals){
            total+=animal.calculateWeeklyCost();
        }
        return total
    }
    // displayAllAnimals(): Shows all animals with their sounds
    displayAllAnimals():void {
        console.log("--- Animals in the zoo with their sound ----\n")
        for(let animal of this.animals){
            console.log(`${animal.Name} says: ${animal.makeSound()} \n`)
        }
    }
    // getZooStatistics(): Returns summary statistics
    getZooStatistics():void {
        let total_habitats:string[] = [];
        let animalAges:number[] = [];
        for(let animal of this.animals){
            total_habitats.push(animal.getHabitat())
            animalAges.push(animal.Age)
        }
        const unique_habitats = [... new Set(total_habitats)]
        console.log(`=== ${this.zooName} World Statistics ===`)
        console.log(`
            Total Animals: ${this.animals.length}
            Total Zookeepers: ${this.zookeepers.length}
            Habitats Represented: ${unique_habitats.length}
            Total Weekly Maintenance: ${this.calculateTotalWeeklyCost()}
            Average Animal Age: ${animalAges.reduce((acc, num) => acc + num, 0)/animalAges.length} years
            `)
    }
}

// Create zoo
const zoo = new Zoo("Safari World");

// Create animals
const lion = new Lion("A001", "Simba", "African Lion", 5, "Healthy", 50.00, "Golden", 3);
const elephant = new Elephant("A002", "Dumbo", "African Elephant", 15, "Healthy", 80.00, 2.5, 5000);
const parrot = new Parrot("A003", "Polly", "Macaw", 8, "Healthy", 10.00, true);

parrot.addVocabulary("Hello");
parrot.addVocabulary("Goodbye");
parrot.addVocabulary("Pretty bird");

const snake = new Snake("A004", "Kaa", "Python", 10, "Healthy", 15.00, true, 4.5);
const eagle = new Eagle("A005", "Freedom", "Bald Eagle", 6, "Healthy", 20.00, 2.3, 320);

// Add animals to zoo
zoo.addAnimal(lion);
zoo.addAnimal(elephant);
zoo.addAnimal(parrot);
zoo.addAnimal(snake);
zoo.addAnimal(eagle);

// Create zookeepers
const keeper1 = new Zookeeper("K001", "John Smith", "Mammals");
const keeper2 = new Zookeeper("K002", "Jane Doe", "Birds and Reptiles");

zoo.addZooKeeper(keeper1);
zoo.addZooKeeper(keeper2);

// Assign animals to keepers
zoo.assignAnimalToKeeper(lion, keeper1);
zoo.assignAnimalToKeeper(elephant, keeper1);
zoo.assignAnimalToKeeper(parrot, keeper2);
zoo.assignAnimalToKeeper(snake, keeper2);
zoo.assignAnimalToKeeper(eagle, keeper2);

// Display all animals
zoo.displayAllAnimals();

// Demonstrate polymorphism
console.log("\n=== Animal Sounds ===");

for (const animal of zoo.Animals) {
  console.log(`${animal.Name} says: ${animal.makeSound()}`);
}

// Get animals by habitat
console.log("\n=== Savanna Animals ===");

const savannaAnimals = zoo.getAnimalsByHabitat("Savanna");

for (const animal of savannaAnimals) {
  console.log(`- ${animal.Name} (${animal.Species})`);
}

// Calculate costs
const weeklyCost = zoo.calculateTotalWeeklyCost();
console.log(`\nTotal Weekly Cost: $${weeklyCost}`);

// Zookeeper work
console.log("\n=== Zookeeper Activities ===");

keeper1.feedAnimal(lion);
keeper1.checkHealth(elephant);

console.log(`${keeper1.keeperName}'s workload: ${keeper1.getWorkload()} animals`);

// Zoo statistics
zoo.getZooStatistics();