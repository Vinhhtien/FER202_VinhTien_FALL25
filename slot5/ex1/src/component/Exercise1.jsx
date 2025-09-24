function Exercise1() {
    // tinh ham double
    const double = (x) => x * 2;
    //ham kiem tra so chhan 
    const isEven = (x) => x % 2 === 0;

  return (
    <div>
        <div> <strong>Exercise 1</strong></div>
      
        <p>Kết quả hàm double(7): {double(7)}</p>
        <p>Kết quả hàm isEven(10): {isEven(10) ? "true" : "false"}</p>  
        <p>Kết quả hàm isEven(7): {isEven(7) ? "true" : "false"}</p>  
        <br/>
    </div>
  );
}
export default Exercise1;
