export default function Footer() {
  return (
    <footer className="ex5-footer py-5 mt-5">
      <div className="container">
        <div className="row gy-3 align-items-start">
          <div className="col-md-6">
            <h6 className="mb-2">Our Address</h6>
            <ul className="list-unstyled mb-0 small">
              <li>Khu đô thị FPT Đà Nẵng</li>
              <li>+84023111111</li>
              <li>+852 8765 4321</li>
              <li><a href="mailto:fptu@fpt.edu.vn">fptu@fpt.edu.vn</a></li>
            </ul>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="social">
              <a href="#" aria-label="Google+">G+</a>
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="LinkedIn">in</a>
              <a href="#" aria-label="YouTube">Y</a>
              <a href="#" aria-label="Twitter">tw</a>
              <a href="#" aria-label="Email">✉</a>
            </div>
          </div>
        </div>

        <div className="sep text-center small mt-3">
          &copy; Copyright 2023
        </div>
      </div>
    </footer>
  );
}
