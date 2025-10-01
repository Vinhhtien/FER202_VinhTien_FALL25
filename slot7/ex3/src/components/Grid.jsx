export default function Grid() {
  return (
    <div className="ex3-grid-wrapper">
      <div className="container ex3-grid">
        <div className="row g-2 mb-2">
          <div className="col-md-6"><div className="cell">First col</div></div>
          <div className="col-md-6"><div className="cell">Second col</div></div>
        </div>

        <div className="row g-2 mb-2">
          <div className="col-md-5"><div className="cell">col</div></div>
          <div className="col-md-2"><div className="cell">col</div></div>
          <div className="col-md-5"><div className="cell">col</div></div>
        </div>

        <div className="row g-2">
          <div className="col-md-3"><div className="cell">col</div></div>
          <div className="col-md-3"><div className="cell">col</div></div>
          <div className="col-md-3"><div className="cell">col</div></div>
          <div className="col-md-3"><div className="cell">col</div></div>
        </div>
      </div>
    </div>
  );
}
