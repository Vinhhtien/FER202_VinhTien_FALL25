// src/components/Menu.jsx
const items = [
  {
    title: "Margherita Pizza",
    priceOld: "$40.00",
    price: "$24.00",
    badge: "SALE",
    img: "https://i.pinimg.com/736x/83/d5/5b/83d55b5cc0a71b2acd525d53fa14303a.jpg",
  },
  {
    title: "Mushroom Pizza",
    price: "$25.00",
    badge: "", 
    img: "https://i.pinimg.com/736x/ed/71/24/ed7124aa0c4616269bd88bb6410a5dde.jpg",
  },
  {
    title: "Hawaiian Pizza",
    price: "$30.00",
    badge: "NEW",
    img: "https://i.pinimg.com/1200x/43/9b/b3/439bb3c30302c369784a5df05cd85d70.jpg",
  },
  {
    title: "Pesto Pizza",
    priceOld: "$60.00",
    price: "$30.00",
    badge: "SALE",
    img: "https://i.pinimg.com/1200x/4d/a7/3f/4da73f313deef52c2373795a970b4082.jpg",
  },
];

export default function Menu() {
  return (
    <section className="section-dark py-5">
      <div className="container">
        <h3 className="text-white mb-4">Our Menu</h3>

        <div className="row g-4">
          {items.map((p, i) => (
            <div className="col-12 col-sm-6 col-lg-3 d-flex" key={i}>
              <div className="card w-100 h-100 shadow-sm position-relative">
                {p.badge && (
                  <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2 rounded-1">
                    {p.badge}
                  </span>
                )}

                <img src={p.img} alt={p.title} className="card-img-top menu-img" referrerPolicy="no-referrer" />

                <div className="card-body d-flex flex-column">
                  <h6 className="card-title mb-2">{p.title}</h6>

                  <div className="mb-3">
                    {p.priceOld && (
                      <span className="text-muted text-decoration-line-through small me-2">
                        {p.priceOld}
                      </span>
                    )}
                    <span className="fw-semibold text-warning">{p.price}</span>
                  </div>

                  <button className="btn btn-dark w-100 mt-auto">Buy</button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
