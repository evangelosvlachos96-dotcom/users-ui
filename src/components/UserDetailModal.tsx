import React, { FC, useEffect, useState } from 'react';
import { usersApi } from '../api/users';
import type { UserDetails } from '../types';
import PageLoader from './PageLoader';
import ErrorState from './ErrorState';
import GenderBadge from './GenderBadge';
import Spinner from './Spinner';

interface Props {
  userId: number;
  onClose: () => void;
  onDeleted: (id: number) => void;
  onEditClick: (user: UserDetails) => void;
}

const formatDate = (d?: string | null): string => {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

const calcAge = (d?: string | null): string => {
  if (!d) return '';
  const today = new Date();
  const birth = new Date(d);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return `${age} years old`;
};

const UserDetailModal: FC<Props> = ({ userId, onClose, onDeleted, onEditClick }) => {
  const [user,    setUser]    = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true); setError(null);
    usersApi.getById(userId)
      .then((d) => { if (alive) { setUser(d); setLoading(false); } })
      .catch((e: Error) => { if (alive) { setError(e.message); setLoading(false); } });
    return () => { alive = false; };
  }, [userId]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await usersApi.delete(userId);
      onDeleted(userId);
      onClose();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Delete failed');
      setDeleting(false);
      setConfirmDel(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">User Details</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {loading && <PageLoader text="Loading details…" />}
          {error   && <ErrorState message={error} />}

          {!loading && !error && user && (
            <>
              {/* Avatar + name */}
              <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
                  {user.name[0]}{user.surname[0]}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{user.name} {user.surname}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <GenderBadge gender={user.gender} />
                    <span className="text-xs text-gray-400">{calcAge(user.birthdate)}</span>
                  </div>
                </div>
              </div>

              {/* Detail rows */}
              <div className="divide-y divide-gray-50">
                <div className="flex items-start gap-3 py-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Birthdate</p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">{formatDate(user.birthdate)}</p>
                  </div>
                </div>

                {user.homeAddress && (
                  <div className="flex items-start gap-3 py-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Home Address</p>
                      <p className="text-sm font-medium text-gray-800 mt-0.5 whitespace-pre-wrap">{user.homeAddress}</p>
                    </div>
                  </div>
                )}

                {user.workAddress && (
                  <div className="flex items-start gap-3 py-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <rect x="2" y="7" width="20" height="14" rx="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Work Address</p>
                      <p className="text-sm font-medium text-gray-800 mt-0.5 whitespace-pre-wrap">{user.workAddress}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-gray-100">
                <button onClick={onClose}
                  className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  Close
                </button>
                <button
                  onClick={() => { onClose(); onEditClick(user); }}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit
                </button>
                {confirmDel ? (
                  <div className="flex items-center gap-2 bg-red-50 rounded-lg px-3 py-1.5">
                    <span className="text-xs font-semibold text-red-700">Sure?</span>
                    <button onClick={handleDelete} disabled={deleting}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-60 transition-colors">
                      {deleting && <Spinner className="h-3 w-3 text-white" />}
                      Yes
                    </button>
                    <button onClick={() => setConfirmDel(false)}
                      className="px-2 py-1 text-xs font-semibold text-gray-500 hover:text-gray-700 transition-colors">
                      No
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmDel(true)}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                    </svg>
                    Delete
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
