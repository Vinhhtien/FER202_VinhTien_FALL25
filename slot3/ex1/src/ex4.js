<<<<<<< HEAD
const ages = [33, 12, 20, 16];
=======
const ages = [33, 12, 20, 16,15, 10];
>>>>>>> cf7270f (add slot7)

// Destructuring:
// - first = phần tử đầu tiên
// - , để bỏ qua phần tử thứ 2
// - third = phần tử thứ 3 (nếu không có thì mặc định 0)
// - ...restAges = phần còn lại
const [first, , third = 0, ...restAges] = ages;

<<<<<<< HEAD
console.log("First:", first);       // 33
console.log("Third:", third);       // 20
console.log("Rest Ages:", restAges); // [16]

=======
const evenAges = restAges.filter (n => n % 2 === 0);
evenAges.forEach (n => console.log (n));

console.log("First:", first);       // 33
console.log("Third:", third);       // 20
console.log("Rest Ages:", restAges); // [16]
console.log ("Even rest ages:", restAges.filter (n => n % 2 === 0)); 
>>>>>>> cf7270f (add slot7)
// nếu ages là 33 với 12 thì in log ra sẽ là 33 0 và rỗng 



