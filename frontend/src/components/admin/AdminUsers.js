import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../utils/api';
import { FiTrash2, FiUser, FiX, FiAlertTriangle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, name }
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { adminAPI.getUsers().then(r => { setUsers(r.data); setLoading(false); }).catch(() => setLoading(false)); }, []);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminAPI.deleteUser(deleteTarget.id);
      setUsers(prev => prev.filter(u => u._id !== deleteTarget.id));
      toast.success('User deleted');
      setDeleteTarget(null);
    } catch (err) {
      toast.error('Failed');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div className="loading-center"><div className="spinner" /></div>;

  return (
    <div className="admin-users page-enter">
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>User</th><th>Email</th><th>Watchlist</th><th>Joined</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>
                  <div className="user-cell">
                    <div className="admin-avatar small">{user.name?.charAt(0)}</div>
                    <strong>{user.name}</strong>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.watchlist?.length || 0} movies</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => setDeleteTarget({ id: user._id, name: user.name })} className="btn btn-sm" style={{color:'var(--accent)'}}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteTarget && (
        <div className="modal-overlay" onClick={() => !deleting && setDeleteTarget(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setDeleteTarget(null)} disabled={deleting}>
              <FiX />
            </button>
            <div className="modal-icon-warning">
              <FiAlertTriangle size={28} />
            </div>
            <h3>Delete user?</h3>
            <p>
              Are you sure you want to delete <strong>{deleteTarget.name}</strong>? This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setDeleteTarget(null)} disabled={deleting}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={confirmDelete} disabled={deleting}>
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;