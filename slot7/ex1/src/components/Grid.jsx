export default function Grid() {
  return (
    <div className="ex1-wrapper">
      <div className="container ex1-grid mx-auto">
        {/* Row 1 */}
        <div className="row g-2 mb-2">
          <div className="col-md-6"><div className="cell">First col</div></div>
          <div className="col-md-6"><div className="cell">Second col</div></div>
        </div>

        {/* Row 2 */}
        <div className="row g-2 mb-2">
          <div className="col-md-4"><div className="cell">col</div></div>
          <div className="col-md-4"><div className="cell">col</div></div>
          <div className="col-md-4"><div className="cell">col</div></div>
        </div>

        {/* Row 3 */}
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
