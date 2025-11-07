// src/components/ConfirmBanModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmBanModal = ({ show, user, mode, loading, onCancel, onConfirm }) => {
  const isUnban = mode === 'unban';

  return (
    <Modal
      show={show}
      onHide={onCancel}
      centered
      backdrop={loading ? 'static' : true}  // ✅ chặn đóng khi loading
      keyboard={!loading}                   // ✅ chặn ESC khi loading
    >
      <Modal.Header closeButton={!loading}>
        <Modal.Title>{isUnban ? 'Unban account' : 'Ban account'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {user ? (
          <>
            Bạn có chắc muốn <strong>{isUnban ? 'unban' : 'ban'}</strong> tài khoản{' '}
            <strong>{user?.username}</strong>?
            <br />
            Hành động này sẽ đặt <code>status = "{isUnban ? 'active' : 'blocked'}"</code>.
          </>
        ) : (
          'Không có user.'
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel} disabled={loading}>Hủy</Button>
        <Button
          variant={isUnban ? 'success' : 'danger'}
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? 'Đang xử lý…' : 'Xác nhận'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmBanModal;
