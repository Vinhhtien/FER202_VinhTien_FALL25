function Exercise4() {
  // mang tuoi
  const ages = [33, 12, 20, 16];
  const [first, , third = 0, ...restAges] = ages;

  return (
    <div>
      <strong>Exercise 4</strong>
      <p>Day la mang tuoi:</p>
      <p>{ages.join(", ")}</p>
<<<<<<< HEAD
=======
      <p>Day la mang restAges:</p>
      <p>{restAges.join(", ")}</p>
      
>>>>>>> cf7270f (add slot7)
      <p>Destructured:</p>
      <p>First: {first}</p>
      <p>Third: {third}</p>
      <p>Rest Ages: {restAges.join(", ")}</p>
    </div>
  );
}

export default Exercise4;
