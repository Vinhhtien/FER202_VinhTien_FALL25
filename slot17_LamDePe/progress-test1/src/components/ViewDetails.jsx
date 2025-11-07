// import React from 'react';
// import { Modal, Button, ListGroup } from 'react-bootstrap';

// const ViewDetails = ({ payment, show, handleClose }) => {
//     if (!payment) return null;

//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat('vi-VN', {
//             style: 'currency',
//             currency: 'VND'
//         }).format(amount);
//     };

//     const formatDate = (date) => {
//         return new Date(date).toLocaleDateString('vi-VN', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     };

//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Payment Details</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <ListGroup variant="flush">
//                     <ListGroup.Item>
//                         <strong>Semester:</strong> {payment.semester}
//                     </ListGroup.Item>
//                     <ListGroup.Item>
//                         <strong>Course Name:</strong> {payment.courseName}
//                     </ListGroup.Item>
//                     <ListGroup.Item>
//                         <strong>Amount:</strong> {formatCurrency(payment.amount)}
//                     </ListGroup.Item>
//                     <ListGroup.Item>
//                         <strong>Payment Date:</strong> {formatDate(payment.date)}
//                     </ListGroup.Item>
//                     <ListGroup.Item>
//                         <strong>Payment ID:</strong> {payment.id}
//                     </ListGroup.Item>
//                 </ListGroup>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={handleClose}>
//                     Close
//                 </Button>
//                 <Button 
//                     variant="primary" 
//                     onClick={() => window.print()}
//                 >
//                     Print
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// export default ViewDetails;