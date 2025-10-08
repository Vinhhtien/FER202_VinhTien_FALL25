
import { useMemo, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function useFavourites() {
  const key = 'favourites';
  const get = () => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch (_) {
      return [];
    }
  };
  const set = (arr) => localStorage.setItem(key, JSON.stringify(arr));
  return { get, set };
}

function truncate(text, max = 120) {
  if (!text) return '';
  return text.length > max ? text.slice(0, max - 1) + '…' : text;
}

export default function MovieCard({ movie }) {
  const fav = useFavourites();
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isFavourite = useMemo(() => {
    const list = fav.get();
    return list.some((m) => m.id === movie.id);
  }, [movie.id]);

  const addToFav = () => {
    const list = fav.get();
    if (!list.some((m) => m.id === movie.id)) {
      list.push(movie);
      fav.set(list);
    }
    setShowToast(true);
  };

  return (
    <>
      <Card className="h-100 shadow-sm">
        <Card.Img
          variant="top"
          src={movie.poster}
          alt={`Poster of ${movie.title}`}
          style={{ height: 190, objectFit: 'cover' }}
        />
        <Card.Body>
          <div className="d-flex align-items-start justify-content-between">
            <Card.Title className="mb-1">{movie.title}</Card.Title>
            <div>
              <Badge bg="secondary" className="me-1">
                {movie.year}
              </Badge>
              <Badge bg="info" className="text-dark">
                {movie.genre}
              </Badge>
            </div>
          </div>
          <Card.Text className="text-secondary mb-2">
            {truncate(movie.description)}
          </Card.Text>
          <div className="small text-muted mb-3">
            {movie.country} • {movie.duration} phút
          </div>

          <div className="d-flex gap-2">
            <Button variant={isFavourite ? 'outline-success' : 'primary'} onClick={addToFav}>
              {isFavourite ? 'Favourited' : 'Add to Favourites'}
            </Button>
            <Button variant="outline-secondary" onClick={() => setShowModal(true)}>
              View Details
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Toast */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast bg="success" onClose={() => setShowToast(false)} show={showToast} delay={1500} autohide>
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Added to favourites!</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{movie.title} saved.</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={movie.poster}
            alt={`Poster of ${movie.title}`}
            className="img-fluid mb-3"
            style={{ maxHeight: 320, objectFit: 'cover' }}
          />
          <p className="mb-2">
            <Badge bg="secondary" className="me-1">{movie.year}</Badge>
            <Badge bg="info" className="text-dark me-1">{movie.genre}</Badge>
            <Badge bg="dark">{movie.country}</Badge>
          </p>
          <p>{movie.description}</p>
          <div className="small text-muted">Duration: {movie.duration} phút</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}