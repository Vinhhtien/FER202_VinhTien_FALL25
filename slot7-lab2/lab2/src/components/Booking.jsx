
export default function Booking() {
  return (
    <section className="booking-dark py-5">
      <div className="container">
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
              <select className="form-select form-select-sm">
                <option defaultValue="">Select a Service</option>
                <option>Dine-in</option>
                <option>Take away</option>
                <option>Birthday</option>
                <option>Meeting</option>
              </select>
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
