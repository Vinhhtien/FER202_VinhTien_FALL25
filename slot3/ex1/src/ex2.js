// Tính tổng các số hợp lệ
function sum(...nums) {
  return nums
    .filter(n => typeof n === "number" && !isNaN(n)) // bỏ string, NaN
    .reduce((total, n) => total + n, 0);
}

// Tính trung bình 2 chữ số thập phân
function avg(...nums) {
  const validNums = nums.filter(n => typeof n === "number" && !isNaN(n));
  if (validNums.length === 0) return 0; // nếu rỗng trả 0

  const total = validNums.reduce((t, n) => t + n, 0);
  return (total / validNums.length).toFixed(2); // giữ 2 số thập phân
}

// In kết quả
console.log("sum(1,2,3) =", sum(1, 2, 3));          // 6
console.log("sum(1,'x',4) =", sum(1, 'x', 4));      // 5
console.log("avg(1,2,3,4) =", avg(1, 2, 3, 4));     // 2.50
console.log("avg() =", avg());                      // 0
