
const companies = [
  { name: "FPT", start: 1999 },
  { name: "Google", start: 2004 },
];

// Dùng spread để clone object và thay đổi start mà không ảnh hưởng đến gốc
const company0New = { ...companies[1], start: companies[1].start + 1 };

// Hàm concatAll sử dụng rest để nhận nhiều mảng
function concatAll(...arrays) {
  return [].concat(...arrays); // hoặc arrays.flat()
}
//cách viết khác gọn hơn 
//const concatAll = (...arrays) => [].concat(...arrays);

// In kết quả
console.log("companies[0]:", companies[0]);       // vẫn giữ nguyên
console.log("company0New:", company0New);         // start đã tăng 1 với vị trí tùy thuộc 
console.log("concatAll:", concatAll([1, 3], [2], [4, 5]));





