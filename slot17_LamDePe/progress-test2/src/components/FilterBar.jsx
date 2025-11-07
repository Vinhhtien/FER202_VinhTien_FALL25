import React, { useMemo } from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { usePaymentContext } from '../contexts/PaymentContext';

const FilterBar = () => {
  const { state, dispatch } = usePaymentContext();

  const { semesters, courses } = useMemo(() => {
    const semesters = [...new Set(state.payments.map(p => p.semester))];
    const courses = [...new Set(state.payments.map(p => p.courseName))];
    return { semesters, courses };
  }, [state.payments]);

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header as="h5">Bộ lọc, Tìm kiếm & Sắp xếp</Card.Header>
      <Card.Body>
        <Form>
          <Row className="g-3">
            <Col xs={12} lg={4}>
              <Form.Group>
                <Form.Label>Tìm kiếm (Semester/Course)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by semester or course name"
                  value={state.searchTerm}
                  onChange={(e)=>dispatch({ type:'SET_SEARCH', payload:e.target.value })}
                />
              </Form.Group>
            </Col>

            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Lọc theo Semester</Form.Label>
                <Form.Select
                  value={state.selectedSemester}
                  onChange={(e)=>dispatch({ type:'SET_SEMESTER', payload:e.target.value })}
                >
                  <option value="">All Semesters</option>
                  {semesters.map(s => <option key={s} value={s}>{s}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Lọc theo Course</Form.Label>
                <Form.Select
                  value={state.selectedCourse}
                  onChange={(e)=>dispatch({ type:'SET_COURSE', payload:e.target.value })}
                >
                  <option value="">All Courses</option>
                  {courses.map(c => <option key={c} value={c}>{c}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={4} lg={4}>
              <Form.Group>
                <Form.Label>Sắp xếp theo:</Form.Label>
                <Form.Select
                  value={state.sortBy}
                  onChange={(e)=>dispatch({ type:'SET_SORT', payload:e.target.value })}
                >
                  <option value="course_asc">Course name ascending</option>
                  <option value="course_desc">Course name descending</option>
                  <option value="date_asc">Date ascending</option>
                  <option value="date_desc">Date descending</option>
                  <option value="amount_asc">Amount ascending</option>
                  <option value="amount_desc">Amount descending</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FilterBar;
