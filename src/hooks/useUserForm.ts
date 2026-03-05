import { useState, ChangeEvent, FocusEvent } from 'react';
import type { UserFormState, FormErrors, Gender, CreateUpdateUserRequest } from '../types';

export const EMPTY_FORM: UserFormState = {
  name: '',
  surname: '',
  gender: '',
  birthdate: null,
  homeAddress: '',
  workAddress: '',
};

function validate(form: UserFormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim())    errors.name      = 'Name is mandatory';
  if (!form.surname.trim()) errors.surname   = 'Surname is mandatory';
  if (!form.gender)         errors.gender    = 'Gender is mandatory';
  if (!form.birthdate)      errors.birthdate = 'Birthdate is mandatory';
  else if (form.birthdate >= new Date()) errors.birthdate = 'Birthdate must be in the past';
  return errors;
}

export function useUserForm(initial: UserFormState = EMPTY_FORM) {
  const [form,    setForm]    = useState<UserFormState>(initial);
  const [errors,  setErrors]  = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof UserFormState, boolean>>>({});

  const revalidate = (key: keyof UserFormState, value: UserFormState[keyof UserFormState]) => {
    const errs = validate({ ...form, [key]: value });
    setErrors((prev) => ({ ...prev, [key]: errs[key as keyof FormErrors] }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (touched[name as keyof UserFormState]) revalidate(name as keyof UserFormState, value);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    revalidate(name as keyof UserFormState, form[name as keyof UserFormState]);
  };

  const handleDateChange = (date: Date | null) => {
    setForm((f) => ({ ...f, birthdate: date }));
    if (touched.birthdate) revalidate('birthdate', date);
  };

  const handleDateBlur = () => {
    setTouched((t) => ({ ...t, birthdate: true }));
    revalidate('birthdate', form.birthdate);
  };

  const touchAll = () =>
    setTouched({ name: true, surname: true, gender: true, birthdate: true });

  const isValid = (): boolean => {
    const errs = validate(form);
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const toPayload = (): CreateUpdateUserRequest => ({
    name:        form.name.trim(),
    surname:     form.surname.trim(),
    gender:      form.gender as Gender,
    birthdate:   form.birthdate!.toISOString().split('T')[0],
    homeAddress: form.homeAddress.trim() || null,
    workAddress: form.workAddress.trim() || null,
  });

  const reset = (next: UserFormState = EMPTY_FORM) => {
    setForm(next);
    setErrors({});
    setTouched({});
  };

  return {
    form, errors,
    handleChange, handleBlur,
    handleDateChange, handleDateBlur,
    touchAll, isValid, toPayload, reset,
  };
}
