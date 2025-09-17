
const people = [
  { name: "tiến1", age: 19 },
  { name: "tiến2", age: 22 },
  { name: "tiến3", age: 15 },
  { name: "tiến4", age: 12 },
  { name: "tiến5", age: 17 }
];

// Lọc tuổi 13–19 rồi map sang chuỗi "Tên (Tuổi)"
const teens = people
  .filter(p => p.age >= 13 && p.age <= 19)   // lọc teen
  .map(p => `${p.name} (${p.age})`);        // đổi sang chuỗi thay vì in ra là 
                            //    có name với age thì bỏ chỉ còn tiến với số tuổi

// In ra từng dòng
teens.forEach(t => console.log(t));
