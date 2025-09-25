function Exercise4() {
  // mang tuoi
  const ages = [33, 12, 20, 16];
  const [first, , third = 0, ...restAges] = ages;

  return (
    <div>
      <strong>Exercise 4</strong>
      <p>Day la mang tuoi:</p>
      <p>{ages.join(", ")}</p>
      <p>Destructured:</p>
      <p>First: {first}</p>
      <p>Third: {third}</p>
      <p>Rest Ages: {restAges.join(", ")}</p>
    </div>
  );
}

export default Exercise4;
