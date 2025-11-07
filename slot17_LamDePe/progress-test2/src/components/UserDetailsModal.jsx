import React from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';

const UserDetailsModal = ({ show, user, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton><Modal.Title>User details</Modal.Title></Modal.Header>
      <Modal.Body>
        {user && (
          <div className="d-flex gap-3">
            {user.avatar && (
              <img src={user.avatar} alt="" style={{width:64,height:64,borderRadius:'50%',objectFit:'cover'}}/>
            )}
            <div>
              <div><strong>ID:</strong> {user.id}</div>
              <div><strong>Username:</strong> {user.username}</div>
              <div><strong>Full name:</strong> {user.fullName}</div>
              <div><strong>Role:</strong> <Badge bg="info">{user.role}</Badge></div>
              <div><strong>Status:</strong> {user.status}</div>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetailsModal;
