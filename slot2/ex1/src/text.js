// function -1
const result = (a,b) => a + b;
 console.log(result(1,2));
 console.log();
    
// function -2 
let greet = (name, timeOfDay) => {
    console.log(`Good ${timeOfDay}, ${name}!`);
};
 greet('Alice', 'morning');
greet('Bob', 'evening');
console.log();
// function -3
let square = num => { return num * num; };
console.log(square(4));
console.log(square(8));
console.log();  
// function -4
let sayHello = () => console.log("Hello, Tiến!");
sayHello();
console.log();
// function -5
let person = {
    name : "Tiến",
    age : 30,
    greet : () => {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }   
}
person.greet();