
export default function Booking() {
  return (
    <section className="booking-dark py-5">
      <div className="container">
              <div class="alert alert-primary" role="alert">
          A simple primary alert—check it out!
        </div>
        <h3 className="mb-4 text-center text-white">Book Your Table</h3>

        <form onSubmit={(e)=>e.preventDefault()}>
          <div className="row g-3">
            {/* Hàng 1: 3 ô ngang */}
            <div className="col-12 col-md-4">
              <input className="form-control form-control-sm" placeholder="Your Name *" />
            </div>
            <div className="col-12 col-md-4">
              <input className="form-control form-control-sm" type="email" placeholder="Your Email *" />
            </div>
            <div className="col-12 col-md-4">
              {/* <select className="form-select form-select-sm">
                <option defaultValue="">Select a Service</option>
                <option>Dine-in</option>
                <option>Take away</option>
                <option>Birthday</option>
                <option>Meeting</option>
              </select> */}
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown button
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </div>
            </div>

            {/* Hàng 2: textarea rộng */}
            <div className="col-12">
              <textarea className="form-control" rows="6" placeholder="Please write your comment"></textarea>
            </div>

            {/* Hàng 3: nút vàng căn trái */}
            <div className="col-12">
              <button className="btn btn-warning btn-sm px-4" type="submit">Send Message</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
