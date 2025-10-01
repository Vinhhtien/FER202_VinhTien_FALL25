<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
=======
import React from "react";

function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#f5f5f5", minHeight: "100vh" }}>
      <header style={{ background: "#1976d2", color: "#fff", padding: "20px 0", textAlign: "center" }}>
        <h1>Đặt Xe Máy Online</h1>
        <p>Thuê xe máy nhanh chóng, tiện lợi và an toàn</p>
      </header>

      <main style={{ maxWidth: "900px", margin: "30px auto", background: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <section>
          <h2>Danh sách xe máy nổi bật</h2>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 250px", border: "1px solid #eee", borderRadius: "8px", padding: "16px", background: "#fafafa" }}>
              <img src="https://img.freepik.com/free-photo/red-motorbike-road_1150-11117.jpg?w=400" alt="Honda Air Blade" style={{ width: "100%", borderRadius: "6px" }} />
              <h3>Honda Air Blade</h3>
              <p>Giá: 120.000đ/ngày</p>
            </div>
            <div style={{ flex: "1 1 250px", border: "1px solid #eee", borderRadius: "8px", padding: "16px", background: "#fafafa" }}>
              <img src="https://img.freepik.com/free-photo/blue-motorbike-road_1150-11116.jpg?w=400" alt="Yamaha Sirius" style={{ width: "100%", borderRadius: "6px" }} />
              <h3>Yamaha Sirius</h3>
              <p>Giá: 100.000đ/ngày</p>
            </div>
            <div style={{ flex: "1 1 250px", border: "1px solid #eee", borderRadius: "8px", padding: "16px", background: "#fafafa" }}>
              <img src="https://img.freepik.com/free-photo/black-motorbike-road_1150-11115.jpg?w=400" alt="Vision 2023" style={{ width: "100%", borderRadius: "6px" }} />
              <h3>Vision 2023</h3>
              <p>Giá: 150.000đ/ngày</p>
            </div>
          </div>
        </section>

        <section style={{ marginTop: "40px" }}>
          <h2>Đặt xe ngay</h2>
          <form style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "400px" }}>
            <input type="text" placeholder="Họ và tên" required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
            <input type="tel" placeholder="Số điện thoại" required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
            <select required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}>
              <option value="">Chọn loại xe</option>
              <option value="airblade">Honda Air Blade</option>
              <option value="sirius">Yamaha Sirius</option>
              <option value="vision">Vision 2023</option>
            </select>
            <input type="date" required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
            <button type="submit" style={{ padding: "12px", background: "#1976d2", color: "#fff", border: "none", borderRadius: "5px", fontWeight: "bold" }}>
              Đặt xe
            </button>
          </form>
        </section>
      </main>

      <footer style={{ textAlign: "center", padding: "18px 0", background: "#1976d2", color: "#fff", marginTop: "40px" }}>
        © 2025 Đặt Xe Máy Online. All rights reserved.
      </footer>
>>>>>>> cf7270f (add slot7)
    </div>
  );
}

export default App;
