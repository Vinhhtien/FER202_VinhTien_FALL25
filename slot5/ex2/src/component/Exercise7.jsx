const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
];

function Exercise7() {
  // Spread để tạo object mới
  const company0New = { ...companies[0], start: companies[0].start + 1 };

  // Rest + reduce để gộp nhiều mảng
  const concatAll = (...arrays) => arrays.reduce((acc, arr) => acc.concat(arr), []);
  const concatResult = concatAll([1, 2], [3], [4, 5]);

  return (
    <div>
      <strong>Exercise 7</strong>
      <p>Original company[0]: {JSON.stringify(companies[0])}</p>
      <p>New company0: {JSON.stringify(company0New)}</p>
      <p>concatAll([1,2],[3],[4,5]) = {concatResult.join(", ")}</p>
    </div>
  );
}

export default Exercise7;
