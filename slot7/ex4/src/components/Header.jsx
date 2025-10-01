export default function Header() {
  return (
    <header className="ex4-header py-4">
      <div className="container text-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9Dc6gFseyTjYgEsNNzhLisO-U83s6whc1-w&s"
          alt="FPT University"
          className="img-fluid ex4-logo mb-3"
          style={{ maxHeight: "180px" }}
        />
        <nav className="text-white">
          <a href="#" className="text-white me-3 text-decoration-none">Home</a>
          <a href="#" className="text-white me-3 text-decoration-none">About</a>
          <a href="#" className="text-white text-decoration-none">Contact</a>
        </nav>
      </div>
    </header>
  );
}
