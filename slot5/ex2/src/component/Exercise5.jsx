function Exercise5() {
  const people = [
    { name: "Ann", age: 19 },
    { name: "Bob", age: 12 },
    { name: "Chris", age: 15 },
    { name: "Diana", age: 21 },
    { name: "Eve", age: 13 }
  ];

  const teens = people
    .filter((p) => p.age >= 13 && p.age <= 19)
    .map((p) => `${p.name} (${p.age})`);

  return (
    <div>
      <strong>Exercise 5</strong>
      <p>Danh sách teen (13–19):</p>
      <ul>
        {teens.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

export default Exercise5;
