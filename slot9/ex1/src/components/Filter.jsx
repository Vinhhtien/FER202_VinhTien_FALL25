// src/components/Filter.jsx
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Filter({
  keyword, onKeyword,
  yearRange, onYearRange,
  sortBy, onSortBy,
}) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Row className="g-3">
          {/* Search */}
          <Col md={6}>
            <Form.Group controlId="fKeyword">
              <Form.Label>Search</Form.Label>
              <Form.Control
                placeholder="Search by title or description…"
                value={keyword}
                onChange={(e) => onKeyword?.(e.target.value)}
              />
            </Form.Group>
          </Col>

          {/* Filter by year */}
          <Col md={3}>
            <Form.Group controlId="fYear">
              <Form.Label>Filter (Year)</Form.Label>
              <Form.Select
                value={yearRange}
                onChange={(e) => onYearRange?.(e.target.value)}
              >
                <option value="all">All</option>
                <option value="lte2000">≤ 2000</option>
                <option value="2001-2015">2001 – 2015</option>
                <option value="gt2015">&gt; 2015</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Sorting */}
          <Col md={3}>
            <Form.Group controlId="fSort">
              <Form.Label>Sorting</Form.Label>
              <Form.Select
                value={sortBy}
                onChange={(e) => onSortBy?.(e.target.value)}
              >
                <option value="year-desc">Year ↓</option>
                <option value="year-asc">Year ↑</option>
                <option value="title-asc">Title A → Z</option>
                <option value="title-desc">Title Z → A</option>
                <option value="duration-asc">Duration ↑</option>
                <option value="duration-desc">Duration ↓</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
