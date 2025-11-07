// src/pages/UserManagementPage.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';
import UserDetailsModal from '../components/UserDetailsModal';
import ConfirmBanModal from '../components/ConfirmBanModal';
import * as api from '../services/api';

const sorters = {
  username_asc:  (a,b)=> (a.username||'').localeCompare(b.username||''),
  username_desc: (a,b)=> (b.username||'').localeCompare(a.username||''),
  fullName_asc:  (a,b)=> (a.fullName||'').localeCompare(b.fullName||''),
  fullName_desc: (a,b)=> (b.fullName||'').localeCompare(a.fullName||''),
  role_asc:      (a,b)=> (a.role||'').localeCompare(b.role||''),
  role_desc:     (a,b)=> (b.role||'').localeCompare(a.role||''),
  status_asc:    (a,b)=> (a.status||'').localeCompare(b.status||''),
  status_desc:   (a,b)=> (b.status||'').localeCompare(a.status||''),
};

export const UserManagementPage = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers]     = useState([]);

  // filter model
  const [filter, setFilter]   = useState({
    kw: '', role: '', status: '', sortBy: 'username_asc'
  });

  // modals
  const [detailUser, setDetailUser]   = useState(null);

  // confirm ban/unban modal
  const [confirmUser, setConfirmUser] = useState(null);   // user object
  const [confirmMode, setConfirmMode] = useState('ban');  // 'ban' | 'unban'
  const [confirmLoading, setConfirmLoading] = useState(false);

  // fetch users
  useEffect(() => {
    (async () => {
      try {
        const data = await api.getUsers();
        setUsers(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('getUsers failed', e);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const roles = useMemo(
    () => [...new Set(users.map(u => u.role).filter(Boolean))],
    [users]
  );
  const statuses = useMemo(
    () => [...new Set(users.map(u => u.status).filter(Boolean))],
    [users]
  );

  const view = useMemo(() => {
    let list = [...users];
    const k = filter.kw.trim().toLowerCase();
    if (k) {
      list = list.filter(u =>
        (u.username||'').toLowerCase().includes(k) ||
        (u.fullName||'').toLowerCase().includes(k)
      );
    }
    if (filter.role)   list = list.filter(u => String(u.role).toLowerCase() === filter.role.toLowerCase());
    if (filter.status) list = list.filter(u => String(u.status).toLowerCase() === filter.status.toLowerCase());

    const sorter = sorters[filter.sortBy] || sorters.username_asc;
    list.sort(sorter);
    return list;
  }, [users, filter]);

  // mở modal xác nhận từ bảng (UserTable sẽ gọi onBan(user, mode))
  const openConfirm = (user, mode) => {
    setConfirmUser(user);
    setConfirmMode(mode || 'ban');
  };

  // xử lý xác nhận ban/unban
  const handleConfirm = async () => {
    if (!confirmUser) return;
    try {
      setConfirmLoading(true);
      const newStatus = confirmMode === 'ban' ? 'blocked' : 'active';
      const updated = await api.patchUser(confirmUser.id, { status: newStatus });
      setUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)));
    } catch (e) {
      console.error('patchUser failed', e);
    } finally {
      setConfirmLoading(false);
      setConfirmUser(null);
    }
  };

  return (
    <>
      <NavigationHeader />
      <Container>
        <Card className="shadow-sm">
          <Card.Header as="h5">User Management</Card.Header>
          <Card.Body>
            <UserFilter
              value={filter}
              onChange={setFilter}
              roles={roles}
              statuses={statuses}
            />

            <UserTable
              users={view}
              loading={loading}
              onView={setDetailUser}
              onBan={openConfirm} // nhận (user, mode) từ bảng
            />
          </Card.Body>
        </Card>
      </Container>

      {/* Modal xem chi tiết */}
      <UserDetailsModal
        show={!!detailUser}
        user={detailUser}
        onHide={() => setDetailUser(null)}
      />

      {/* Modal xác nhận Ban/Unban */}
      <ConfirmBanModal
        show={!!confirmUser}
        user={confirmUser}
        mode={confirmMode}
        loading={confirmLoading}
        onCancel={() => setConfirmUser(null)}
        onConfirm={handleConfirm}
      />
    </>
  );
};
