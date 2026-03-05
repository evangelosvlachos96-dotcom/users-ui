import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { usersApi } from '../api/users';
import { useUserForm, EMPTY_FORM } from '../hooks/useUserForm';
import { useToast } from '../hooks/useToast';
import UserForm from '../components/UserForm';
import Toast from '../components/Toast';

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const { toast, success, error: showError } = useToast();
  const [saving, setSaving] = React.useState(false);

  const {
    form, errors,
    handleChange, handleBlur, handleDateChange, handleDateBlur,
    touchAll, isValid, toPayload, reset,
  } = useUserForm(EMPTY_FORM);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    touchAll();
    if (!isValid()) return;

    setSaving(true);
    try {
      const payload = toPayload();
      const res = await usersApi.create(payload);
      success(`User "${payload.name} ${payload.surname}" registered! (ID: ${res.id})`);
      setTimeout(() => navigate('/users'), 1400);
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to register user');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <Toast toast={toast} />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Register New User</h1>
        </div>
        <p className="text-sm text-gray-400 ml-13">
          Fields marked with <span className="text-indigo-500 font-semibold">*</span> are required.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <UserForm
          form={form}
          errors={errors}
          loading={saving}
          submitLabel="Register User"
          onSubmit={handleSubmit}
          onReset={() => reset()}
          onChange={handleChange}
          onBlur={handleBlur}
          onDateChange={handleDateChange}
          onDateBlur={handleDateBlur}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
