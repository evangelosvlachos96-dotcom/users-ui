import React, { FC } from 'react';
import DatePicker from 'react-datepicker';
import FormField from './FormField';
import Spinner from './Spinner';
import type { UserFormState, FormErrors } from '../types';

interface Props {
  form: UserFormState;
  errors: FormErrors;
  loading: boolean;
  submitLabel: string;
  onSubmit: (e: React.FormEvent) => void;
  onReset?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onDateChange: (date: Date | null) => void;
  onDateBlur: () => void;
}

const UserForm: FC<Props> = ({
  form, errors, loading, submitLabel,
  onSubmit, onReset, onChange, onBlur, onDateChange, onDateBlur,
}) => (
  <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FormField label="Name" required error={errors.name}>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="e.g. John"
          className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all
            focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500
            ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}`}
        />
      </FormField>

      <FormField label="Surname" required error={errors.surname}>
        <input
          name="surname"
          value={form.surname}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="e.g. Doe"
          className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all
            focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500
            ${errors.surname ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}`}
        />
      </FormField>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FormField label="Gender" required error={errors.gender}>
        <select
          name="gender"
          value={form.gender}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all cursor-pointer
            focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500
            ${errors.gender ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}
            ${!form.gender ? 'text-gray-400' : 'text-gray-900'}`}
        >
          <option value="">Select gender…</option>
          <option value="M">♂ Male</option>
          <option value="F">♀ Female</option>
        </select>
      </FormField>

      <FormField label="Birthdate" required error={errors.birthdate}>
        <DatePicker
          selected={form.birthdate}
          onChange={onDateChange}
          onBlur={onDateBlur}
          dateFormat="dd/MM/yyyy"
          placeholderText="DD/MM/YYYY"
          maxDate={new Date()}
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          className={errors.birthdate ? 'dp-error' : ''}
        />
      </FormField>
    </div>

    <FormField label="Home Address">
      <textarea
        name="homeAddress"
        value={form.homeAddress}
        onChange={onChange}
        placeholder="Street, City, Country…"
        rows={3}
        className="w-full px-3 py-2 text-sm border border-gray-300 bg-white rounded-lg outline-none
          transition-all resize-y focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
      />
    </FormField>

    <FormField label="Work Address">
      <textarea
        name="workAddress"
        value={form.workAddress}
        onChange={onChange}
        placeholder="Company, Street, City…"
        rows={3}
        className="w-full px-3 py-2 text-sm border border-gray-300 bg-white rounded-lg outline-none
          transition-all resize-y focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
      />
    </FormField>

    <div className="flex items-center justify-end gap-3 pt-2">
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Reset
        </button>
      )}
      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-indigo-600
          rounded-lg hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        {loading && <Spinner className="h-4 w-4 text-white" />}
        {loading ? 'Saving…' : submitLabel}
      </button>
    </div>
  </form>
);

export default UserForm;
