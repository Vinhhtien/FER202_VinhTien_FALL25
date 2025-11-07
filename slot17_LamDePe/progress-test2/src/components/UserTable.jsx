import React from 'react';
import { Table, Badge, Button } from 'react-bootstrap';

const statusVariant = (s = '') => {
  switch (s.toLowerCase()) {
    case 'active':  return 'success';
    case 'locked':  return 'warning';
    case 'blocked': return 'danger';
    default:        return 'secondary';
  }
};

const UserTable = ({ users, loading, onView, onBan }) => {
  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th style={{ width: 56 }}>ID</th>
          <th style={{ width: 64 }}>avatar</th>
          <th>username</th>
          <th>fullName</th>
          <th style={{ width: 120 }}>Role</th>
          <th style={{ width: 120 }}>Status</th>
          <th style={{ width: 220 }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {!loading && users.map((u) => {
          const isBlocked = String(u.status).toLowerCase() === 'blocked';
          const actionLabel = isBlocked ? 'Unban' : 'Ban Account';
          const actionVariant = isBlocked ? 'success' : 'danger';
          const actionMode = isBlocked ? 'unban' : 'ban';

          return (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>
                {u.avatar && (
                  <img
                    src={u.avatar}
                    alt=""
                    style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
                  />
                )}
              </td>
              <td>{u.username}</td>
              <td>{u.fullName}</td>
              <td><Badge bg="info">{u.role}</Badge></td>
              <td><Badge bg={statusVariant(u.status)}>{u.status}</Badge></td>
              <td>
                <div className="d-flex gap-2">
                  <Button size="sm" variant="secondary" onClick={() => onView(u)}>
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    variant={actionVariant}
                    onClick={() => onBan(u, actionMode)}
                  >
                    {actionLabel}
                  </Button>
                </div>
              </td>
            </tr>
          );
        })}

        {!loading && users.length === 0 && (
          <tr>
            <td colSpan={7} className="text-center text-muted">No users</td>
          </tr>
        )}

        {loading && (
          <tr>
            <td colSpan={7} className="text-center text-muted">Loading…</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default UserTable;
