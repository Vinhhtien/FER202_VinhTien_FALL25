const double = (x) => x * 2;
console.log(double(5));
    
// cách viết khác 
const double2 = function(x) {
  return x * 2;
};

console.log(double2(3));

// cách viết khác nữa
const utils = {
  double3: function(x) {
    return x * 2;
  }
};

console.log(utils.double3(5));