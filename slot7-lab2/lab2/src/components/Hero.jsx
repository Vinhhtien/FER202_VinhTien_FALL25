export default function Hero() {
  // Mảng chứa URL của các ảnh slide
  const slides = [
    "https://i.pinimg.com/1200x/4d/a7/3f/4da73f313deef52c2373795a970b4082.jpg",
    "https://i.pinimg.com/1200x/43/9b/b3/439bb3c30302c369784a5df05cd85d70.jpg",
    "https://i.pinimg.com/736x/ed/71/24/ed7124aa0c4616269bd88bb6410a5dde.jpg",
  ];

  return (
    <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
      {/* Indicators */}
      <div className="carousel-indicators">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to={idx}
            className={idx === 0 ? "active" : ""}
            aria-current={idx === 0 ? "true" : undefined}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Slides */}
      <div className="carousel-inner">
        {slides.map((src, idx) => (
          <div
            className={`carousel-item ${idx === 0 ? "active" : ""}`}
            key={idx}
            data-bs-interval="4500"
          >
            <img
              src={src}
              alt={`slide-${idx + 1}`}
              className="d-block w-100 hero-img"
              loading={idx === 0 ? "eager" : "lazy"}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1604382354936-07c5b90d35c3?q=80&w=1600&auto=format&fit=crop";
              }}
            />
            <div className="carousel-caption hero-caption d-none d-md-block">
              <h2 className="fw-semibold text-shadow mb-2">Neapolitan Pizza</h2>
              <p className="text-shadow small">
                If you are looking for traditional Italian pizza, the Neapolitan is the best option!
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
