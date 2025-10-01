export default function Topbar() {
  return (
    <div className="ex5-topbar">
      {/* container-xxl rộng hơn container thường */}
      <div className="container-xxl py-3 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/vi/2/2d/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_FPT.svg"
            alt="FPT"
            style={{ height: 28 }}  // logo cũng to hơn nhẹ
          />
          <nav className="small">
            <a href="#" className="me-3 text-decoration-none text-dark">Trang chủ</a>
            <a href="#" className="me-3 text-decoration-none text-dark">Ngành học</a>
            <a href="#" className="me-3 text-decoration-none text-dark">Tuyển sinh</a>
            <a href="#" className="text-decoration-none text-dark">Sinh viên</a>
          </nav>
        </div>

        <div className="d-flex align-items-center gap-2">
          <span className="small">Search:</span>
          <input className="form-control form-control-sm" style={{ width: 220 }} />
        </div>
      </div>
    </div>
  );
}
