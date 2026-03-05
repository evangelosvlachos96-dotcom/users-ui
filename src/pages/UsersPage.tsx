import React, { FC, useState, useEffect, useCallback } from 'react';
import { usersApi } from '../api/users';
import type { UserListItem, UserDetails, PagedResponse } from '../types';
import { useToast } from '../hooks/useToast';
import Toast from '../components/Toast';
import PageLoader from '../components/PageLoader';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';
import UserDetailModal from '../components/UserDetailModal';
import EditUserModal from '../components/EditUserModal';
import Spinner from '../components/Spinner';

const PAGE_SIZE = 10;

const UsersPage: FC = () => {
  const { toast, success, error: showError } = useToast();

  const [data,         setData]         = useState<PagedResponse<UserListItem> | null>(null);
  const [loading,      setLoading]      = useState(true);
  const [fetchError,   setFetchError]   = useState<string | null>(null);
  const [page,         setPage]         = useState(0);
  const [search,       setSearch]       = useState('');
  const [debouncedQ,   setDebouncedQ]   = useState('');
  const [genderFilter, setGenderFilter] = useState<'M' | 'F' | ''>('');

  const [viewId,   setViewId]   = useState<number | null>(null);
  const [editUser, setEditUser] = useState<UserDetails | null>(null);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => { setDebouncedQ(search); setPage(0); }, 350);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => { setPage(0); }, [genderFilter]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await usersApi.list({
        page,
        size: PAGE_SIZE,
        ...(debouncedQ   && { search: debouncedQ }),
        ...(genderFilter && { gender: genderFilter }),
      });
      setData(res);
    } catch (e: unknown) {
      setFetchError(e instanceof Error ? e.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedQ, genderFilter]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleDeleted = (id: number) => {
    success('User deleted successfully');
    setData((prev) => prev
      ? { ...prev, content: prev.content.filter((u) => u.id !== id), totalElements: prev.totalElements - 1 }
      : prev);
  };

  const handleUpdated = (updated: UserDetails) => {
    setData((prev) => prev
      ? { ...prev, content: prev.content.map((u) => u.id === updated.id ? { id: updated.id, name: updated.name, surname: updated.surname } : u) }
      : prev);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Toast toast={toast} />

      {viewId !== null && (
        <UserDetailModal
          userId={viewId}
          onClose={() => setViewId(null)}
          onDeleted={handleDeleted}
          onEditClick={(user) => { setViewId(null); setEditUser(user); }}
        />
      )}

      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onUpdated={handleUpdated}
          onSuccess={success}
          onError={showError}
        />
      )}

      {/* Page header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">All Users</h1>
          </div>
          {data && (
            <p className="text-sm text-gray-400 font-medium ml-13">
              {data.totalElements} user{data.totalElements !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name…"
              className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg outline-none w-48
                focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-all bg-white"
            />
          </div>

          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value as 'M' | 'F' | '')}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none cursor-pointer bg-white
              focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-all"
          >
            <option value="">All genders</option>
            <option value="M">♂ Male</option>
            <option value="F">♀ Female</option>
          </select>

          <button
            onClick={fetchUsers}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-white bg-gray-800
              rounded-lg hover:bg-gray-900 disabled:opacity-50 transition-colors"
          >
            {loading ? <Spinner className="h-4 w-4 text-white" /> : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
              </svg>
            )}
            Refresh
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

        {loading && <PageLoader text="Loading users…" />}
        {!loading && fetchError && <ErrorState message={fetchError} onRetry={fetchUsers} />}
        {!loading && !fetchError && !data?.content.length && (
          <EmptyState
            title={search || genderFilter ? 'No results found' : 'No users yet'}
            subtitle={search || genderFilter ? 'Try a different search or filter.' : 'Register the first user to get started.'}
          />
        )}

        {!loading && !fetchError && !!data?.content.length && (
          <>
            {/* Table header */}
            <div className="grid grid-cols-[1fr_1fr_auto] px-6 py-3 bg-gray-50 border-b border-gray-100">
              {['Name', 'Surname', 'Actions'].map((h) => (
                <span key={h} className="text-xs font-bold text-gray-400 uppercase tracking-widest">{h}</span>
              ))}
            </div>

            {/* Rows */}
            {data.content.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                onView={() => setViewId(user.id)}
                onDeleted={handleDeleted}
                onError={showError}
              />
            ))}

            <Pagination
              page={page}
              totalPages={data.totalPages}
              hasNext={data.hasNext}
              hasPrevious={data.hasPrevious}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

// ── UserRow ───────────────────────────────────────────────────────────────────

interface RowProps {
  user: UserListItem;
  onView: () => void;
  onDeleted: (id: number) => void;
  onError: (msg: string) => void;
}

const UserRow: FC<RowProps> = ({ user, onView, onDeleted, onError }) => {
  const [deleting, setDeleting] = useState(false);
  const [confirm,  setConfirm]  = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleting(true);
    try {
      await usersApi.delete(user.id);
      onDeleted(user.id);
    } catch (err: unknown) {
      onError(err instanceof Error ? err.message : 'Delete failed');
      setDeleting(false);
      setConfirm(false);
    }
  };

  return (
    <div
      onClick={onView}
      className="grid grid-cols-[1fr_1fr_auto] px-6 py-3.5 border-b border-gray-50
        hover:bg-indigo-50 cursor-pointer transition-colors items-center group last:border-0"
    >
      <span className="text-sm font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">
        {user.name}
      </span>
      <span className="text-sm text-gray-600">{user.surname}</span>

      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onView}
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-indigo-700
            bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
          </svg>
          View
        </button>

        {confirm ? (
          <div className="flex items-center gap-1.5 bg-red-50 rounded-lg px-2 py-1" onClick={(e) => e.stopPropagation()}>
            <span className="text-xs font-semibold text-red-700">Sure?</span>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-0.5 px-2 py-0.5 text-xs font-bold text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-60 transition-colors"
            >
              {deleting && <Spinner className="h-3 w-3 text-white" />}
              Yes
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setConfirm(false); }}
              className="text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors px-1"
            >
              No
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => { e.stopPropagation(); setConfirm(true); }}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-red-600
              bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
            </svg>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
