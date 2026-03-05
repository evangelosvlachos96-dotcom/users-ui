import { FC, useState } from "react";
import { usersApi } from "../api/users";
import { UserListItem } from "../types";
import Spinner from "./Spinner";

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

export default UserRow