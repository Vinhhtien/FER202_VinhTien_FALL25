import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import HomeCarousel from '../components/HomeCarousel';
import MovieCard from '../components/MovieCard';
import { movies } from '../data/movies';
import Filter from '../components/Filter';
import AppNavBar from '../components/AppNavBar';

export default function HomePage() {
  return (
    <div>
      <AppNavBar />
      
      <Container className="py-3">
        <HomeCarousel />
        
        <div className="mt-4">
          <h4 style={{color:'red'}}>Featured Movies Collections</h4>
          <p style={{ color: '#4da6ff' }}>
            Thông tin về các bộ sưu tập phim nổi bật ở đây.
          </p>
        </div>

        <Filter/>

        <Row className="g-3 mt-1">
          {movies.map((m) => (
            <Col key={m.id} xs={12} md={6} lg={4}>
              <MovieCard movie={m} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}