
const person = {
  name: "Tien",
  address: {
    street: "Da Nang street"
    // bây giờ city kh có
  }
};

// Dùng destructuring để lấy street và city
const { address: { street, city = "da lat" } } = person;

console.log(street); // lấy street từ object
console.log(city);   // lấy city được bổ sung 
