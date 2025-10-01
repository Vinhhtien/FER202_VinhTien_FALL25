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

function Exercise6() {
  const sorted = [...companies].sort((a, b) => a.end - b.end);
  const top3 = sorted.slice(0, 3);
<<<<<<< HEAD
=======
  const financeComp = companies.filter(c => c.category === "Finance");
>>>>>>> cf7270f (add slot7)

  return (
    <div>
      <strong>Exercise 6</strong>
      <p>3 công ty có năm kết thúc sớm nhất:</p>
      <ul>
        {top3.map((c) => (
          <li key={c.name}>
            {c.name} - {c.end}
          </li>
        ))}
      </ul>
<<<<<<< HEAD
=======
      <p>Danh sách công ty có danh mục là Finance:</p>
      <ul>
        {financeComp.map((c,index) => (
          <li key={index}>
            {c.name} - {c.category}
          </li>
        ))}
      </ul>
>>>>>>> cf7270f (add slot7)
    </div>
  );
}

export default Exercise6;
