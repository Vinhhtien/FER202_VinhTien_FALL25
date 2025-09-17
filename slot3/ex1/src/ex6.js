const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
  { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
  { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
  { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
  { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
  { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
  { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
  { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
];

// 1. Tạo bản sao để không làm thay đổi mảng gốc
const sorted = [...companies].sort((a, b) => a.end - b.end);

// 2. Lấy 3 công ty đầu tiên sau khi sắp xếp
const top3 = sorted.slice(0, 3); // từ 0,1,2 không lấy 3 vì end-1

// 3. In ra theo định dạng "Company - EndYear"
top3.forEach(c => console.log(`${c.name} - ${c.end}`));

// cách viết khác 
// Viết ngắn gọn 1 dòng
console.log("-----------------------------");
[...companies]
  .sort((a, b) => a.end - b.end)   // sắp xếp theo end
  .slice(0, 3)                     // lấy 3 công ty đầu
  .forEach(c => console.log(`${c.name} - ${c.end}`));
