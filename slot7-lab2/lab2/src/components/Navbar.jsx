
export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        {/* Brand bên trái */}
        <a className="navbar-brand fw-bold" href="#">Pizza House</a>

        {/* Nút bật/tắt menu khi màn hình nhỏ */}
        <button className="navbar-toggler" type="button"
                data-bs-toggle="collapse" data-bs-target="#navPizza"
                aria-controls="navPizza" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="navPizza" className="collapse navbar-collapse">
          {/* Menu nằm trái/giữa, không đẩy hết sang phải nữa */}
          <ul className="navbar-nav ms-3 mb-2 mb-lg-0">
            <li className="nav-item"><a className="nav-link active" href="#">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Menu</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
          </ul>

          {/* Ô Search nằm hẳn bên phải */}
          <form className="ms-auto" role="search" onSubmit={(e)=>e.preventDefault()}>
            <div className="input-group input-group-sm">
              <input className="form-control" type="search" placeholder="Search" />
              <button className="btn btn-danger" type="button" title="Search">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
}
