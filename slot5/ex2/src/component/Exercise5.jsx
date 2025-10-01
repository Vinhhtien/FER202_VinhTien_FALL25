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
<<<<<<< HEAD
    .map((p) => `${p.name} (${p.age})`);
=======
    .sort((a, b) => b.age - a.age)
    .map((p) => `${p.name} (${p.age})`);
      
  const adults = people
    .filter((p) => p.age >= 20);
  
  const isSecondTeen = (person) => person.age >= 13 && person.age <= 19;
  const maxAgePerson = people.reduce((max, p) => (p.age > max.age ? p : max), people[0]);
  const maxAge = Math.max(...people.map(p => p.age));

  const sortPersonsByAge = [...people].sort((a, b) => a.age - b.age);// tăng dần
  const sortPersonsByAgeDesc = [...people].sort((a, b) => b.age - a.age);// giảm dần
>>>>>>> cf7270f (add slot7)

  return (
    <div>
      <strong>Exercise 5</strong>
      <p>Danh sách teen (13–19):</p>
      <ul>
        {teens.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
<<<<<<< HEAD
=======
      <h2>Số Người tuổi teens là :{teens.length} </h2>

      <p>Người thứ 2 trong danh sách có phải là tuổi teen không :{isSecondTeen ? "Yes" : "No"} </p>
      <p>Người có tuổi cao nhất là {maxAgePerson.name} {maxAgePerson.age}</p>
      <p>Tuổi cao nhất : {maxAge} </p>
      <p>Tuôi thấp nhất : {`${sortPersonsByAgeDesc[0].name} và ${sortPersonsByAgeDesc[0].age} `}</p>
      
>>>>>>> cf7270f (add slot7)
    </div>
  );
}

export default Exercise5;
