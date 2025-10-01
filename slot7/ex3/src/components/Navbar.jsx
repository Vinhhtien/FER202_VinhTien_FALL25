export default function Navbar() {
  return (
    <div className="container mb-3">
      <ul className="nav small">
        <li className="nav-item">
          <a className="nav-link active text-primary p-0 me-3" aria-current="page" href="#">Active</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-primary p-0 me-3" href="#">Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-primary p-0 me-3" href="#">Link</a>
        </li>
        <li className="nav-item">
          <span className="nav-link disabled text-secondary p-0">Disabled</span>
        </li>
      </ul>
    </div>
  );
}
