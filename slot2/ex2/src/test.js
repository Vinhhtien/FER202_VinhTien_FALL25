// Excercise 1 : tạo 1 mảng số nguyên...
 console.log("Excercise 1 : tạo 1 mảng số nguyên...");
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // for : giống java nè vì in nhiều dòng nên em tạo 1 line để in hàng ngang
    let line = "";
    for( let i=0;i<numbers.length;i++){
        line += numbers[i] + " ";
    }
    console.log(line);
    // forEach 
    let line2 = "";
    numbers.forEach(num => line2 += num + " ");
    console.log(line2);
    // map : bình phương các phần tử trong mảng
    let squaredNumbers = numbers.map(num => num);
    console.log(squaredNumbers);

console.log();
// Excercise 2 : Lộc ra các phần tử chẵn 
console.log("Excercise 2 : Lộc ra các phần tử chẵn ");
let evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers);

console.log();
// Excercise 3 : 
console.log("Excercise 3");

let people = [
    { id: 1, name: "Tiến", age: 18 },
    { id: 2, name: "Tiến1", age: 25 },
    { id: 3, name: "Tiến2", age: 30 },
    { id: 4, name: "Tiến3", age: 19 }
];

people.forEach(person => {
    console.log(`ID: ${person.id}, Name: ${person.name}, Age: ${person.age}`);
});

console.log("Những người trên 20 tuổi:");
let nguoiGia = people.filter(person => person.age > 20);
console.log(nguoiGia);