import React, { FC } from 'react';
import { usersApi } from '../api/users';
import type { UserDetails } from '../types';
import { useUserForm } from '../hooks/useUserForm';
import UserForm from './UserForm';

interface Props {
  user: UserDetails;
  onClose: () => void;
  onUpdated: (user: UserDetails) => void;
  onError: (msg: string) => void;
  onSuccess: (msg: string) => void;
}

const toFormDate = (iso: string): Date => new Date(iso + 'T00:00:00');

const EditUserModal: FC<Props> = ({ user, onClose, onUpdated, onError, onSuccess }) => {
  const { form, errors, loading, handleChange, handleBlur, handleDateChange, handleDateBlur, touchAll, isValid, toPayload } =
    useUserForm({
      name:        user.name,
      surname:     user.surname,
      gender:      user.gender,
      birthdate:   toFormDate(user.birthdate),
      homeAddress: user.homeAddress ?? '',
      workAddress: user.workAddress ?? '',
    }) as any; // useUserForm returns loading-less version; we manage it here

  const [saving, setSaving] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    touchAll();
    if (!isValid()) return;

    setSaving(true);
    try {
      const payload = toPayload();
      await usersApi.update(user.id, payload);
      onSuccess(`User "${payload.name} ${payload.surname}" updated successfully`);
      onUpdated({ ...user, ...payload });
      onClose();
    } catch (err: unknown) {
      onError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>

        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Edit User</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <UserForm
            form={form}
            errors={errors}
            loading={saving}
            submitLabel="Save Changes"
            onSubmit={handleSubmit}
            onChange={handleChange}
            onBlur={handleBlur}
            onDateChange={handleDateChange}
            onDateBlur={handleDateBlur}
          />
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
