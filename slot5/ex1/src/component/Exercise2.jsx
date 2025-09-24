function Exercise2() { 
  
    //1. Tạo 1 mảng số nguyên , in ra danh sách list
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
    //2. tính tổng mảng
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    
    //3. tính trung bình mảng
    const average = sum / numbers.length;
  
    //4. Khai mảng chuỗi names, in ra danh sách các tên theo thứ tự tăng dần
    const names = ["An", "Bình", "Cường", "Dũng", "Huy"];
    names.sort();
    
    //5. Khai báo 1 mảng people chứa 10 đối tượng students
    // Mỗi đối tượng có thuộc tính id, name, age,grade 

    const students = [
      { id: 1, name: "An", age: 20, grade: 8.5 },
      { id: 2, name: "Bình", age: 21, grade: 7.0 },
        { id: 3, name: "Cường", age: 22, grade: 9.0 },
        { id: 4, name: "Dũng", age: 23, grade: 6.5 },
        { id: 5, name: "Huy", age: 24, grade: 8.0 },
        { id: 6, name: "Khoa", age: 25, grade: 7.5 },
        { id: 7, name: "Long", age: 26, grade: 9.5 },
        { id: 8, name: "Minh", age: 27, grade: 6.0 },
        { id: 9, name: "Nam", age: 28, grade: 8.8 },
        { id: 10, name: "Phúc", age: 29, grade: 7.8 },
    ];
    //In ra danh sách students có grade >= 7.5, sắp xếp theo grade giảm dần
    const filteredStudents = students
      .filter((student) => student.grade >= 7.5)
      .sort((a, b) => b.grade - a.grade);
    
  return ( 
    <div>
      <strong>Exercise 2</strong>

      <ul>
        {numbers.map((number, i) => (
          <li key={i}>Phần tử thứ {i} : {number}</li>
        ))}
      </ul>

        <p>Tổng mảng: {sum}</p>
        <p>Trung bình mảng: {average.toFixed(2)}</p>
      
        <p>Danh sách tên theo thứ tự tăng dần:</p>
        <ul>
          {names.map((name, i) => (
            <li key={i}>{name}</li>
          ))}
        </ul>
          
        <p>Hiển thị danh sách filteredStudents dưới dạng bảng</p>
        <table border="1">
          <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Grade</th>
            </tr>
            </thead>
            <tbody>
                {filteredStudents.map((student) => (
                    <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                    <td>{student.grade}</td>
                    </tr>
                ))}
                
                <tr>
                <td colSpan="3"><strong>Trung bình điểm</strong></td>
                <td>
                    <strong>{
                    (filteredStudents.reduce((acc, curr) => acc + curr.grade, 0) / filteredStudents.length).toFixed(2)
                    }</strong>
                </td>
                </tr>
          </tbody>
        
        </table>
         
      
        <br/>
    </div>
    
  );
}
export default Exercise2;
