
const people = [
  { name: "tiến1", age: 19 },
  { name: "tiến2", age: 22 },
  { name: "tiến3", age: 15 },
  { name: "tiến4", age: 12 },
  { name: "tiến5", age: 17 }
];

// Lọc tuổi 13–19 rồi map sang chuỗi "Tên (Tuổi)"
const teens = people
<<<<<<< HEAD
  .filter(p => p.age >= 13 && p.age <= 19)   // lọc teen
  .map(p => `${p.name} (${p.age})`);        // đổi sang chuỗi thay vì in ra là 
                            //    có name với age thì bỏ chỉ còn tiến với số tuổi

// In ra từng dòng
=======
  .sort((a, b) => a.age - b.age)  // sắp xếp theo age tăng dần
  .filter(p => p.age >= 13 && p.age <= 19)   // lọc teen
  .map(p => `${p.name} (${p.age}) tuổi`);        // đổi sang chuỗi thay vì in ra là 
                            //    có name với age thì bỏ chỉ còn tiến với số tuổi
// In ra từng dòng

teens.length === 0 ? console.log ("Không có tuổi teen") :
 console.log ("Số ngườituổi teen là:"+ teens.length);

>>>>>>> cf7270f (add slot7)
teens.forEach(t => console.log(t));
