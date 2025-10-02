export default function LogoRow() {
  return (
    <div className="container ex2-container my-4">
      <div className="d-flex justify-content-center align-items-center gap-5 flex-wrap logo-row">
        {/* HTML5 */}
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
          alt="HTML5"
        />
        {/* CSS3 */}
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
          alt="CSS3"
        />
        {/* Bootstrap */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg"
          alt="Bootstrap"
        />
      </div>
    </div>
  );
}
