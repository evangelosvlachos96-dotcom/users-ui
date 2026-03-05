export type Gender = 'M' | 'F';

// ── Request ──────────────────────────────────────────────────────────────────
export interface CreateUpdateUserRequest {
  name: string;
  surname: string;
  gender: Gender;
  birthdate: string;       // "YYYY-MM-DD"  (Java LocalDate)
  homeAddress?: string | null;
  workAddress?: string | null;
}

// ── Responses ────────────────────────────────────────────────────────────────
export interface CreateUserResponse {
  id: number;
  message: string;
}

export interface DeleteUserResponse {
  message: string;
}

export interface UpdateUserResponse {
  message: string;
}

export interface UserListItem {
  id: number;
  name: string;
  surname: string;
}

export interface UserDetails {
  id: number;
  name: string;
  surname: string;
  gender: Gender;
  birthdate: string;       // "YYYY-MM-DD"
  homeAddress?: string | null;
  workAddress?: string | null;
}

// NOTE: backend returns page starting at 1 (service does result.getNumber() + 1)
export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// ── UI ───────────────────────────────────────────────────────────────────────
export interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'error';
}

export interface FormErrors {
  name?: string;
  surname?: string;
  gender?: string;
  birthdate?: string;
}

export interface UserFormState {
  name: string;
  surname: string;
  gender: Gender | '';
  birthdate: Date | null;
  homeAddress: string;
  workAddress: string;
}
