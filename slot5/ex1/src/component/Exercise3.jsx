function Exercise3() {
  // Khai báo dữ liệu person 
  const person1 = {
    name: "Costas",
    address: {
      street: "Lalaland 12",
      // ko có city
    },
  };

  // thêm ví dụ đầy đủ 
  const person2 = {
    name: "Alice",
    address: {
      street: "42 Wonderland Ave",
      city: "Wonder City",
    },
  };

  // Destructuring lồng nhau + giá trị mặc định cho city
  const {
    address: { street: street1, city: city1 = "Da Lat City" },
  } = person1;

  const {
    address: { street: street2, city: city2 = "Unknown City" },
  } = person2;

  return (
    <div>
      <strong>Exercise 3</strong>

      <h4>Ví dụ 1 (person1)</h4>
      <ul>
        <li><b>street:</b> {street1}</li>
        <li><b>city:</b> {city1}</li>
      </ul>

      <h4>Ví dụ 2 (person2)</h4>
      <ul>
        <li><b>street:</b> {street2}</li>
        <li><b>city:</b> {city2}</li>
      </ul>
    </div>
  );
}

export default Exercise3;
