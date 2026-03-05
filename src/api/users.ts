import axios, { AxiosError } from 'axios';
import type {
  CreateUpdateUserRequest,
  CreateUserResponse,
  DeleteUserResponse,
  UpdateUserResponse,
  UserListItem,
  UserDetails,
  PagedResponse,
} from '../types';

const http = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.response.use(
  (res) => res,
  (err: AxiosError<{ message?: string; error?: string }>) => {
    const message =
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message ||
      'Unexpected error';
    return Promise.reject(new Error(message));
  }
);

export interface ListUsersParams {
  gender?: 'M' | 'F' | '';
  search?: string;
  page?: number;
  size?: number;
}

export const usersApi = {
  // GET /api/users
  list: (params: ListUsersParams = {}): Promise<PagedResponse<UserListItem>> =>
    http.get<PagedResponse<UserListItem>>('/users', { params }).then((r) => r.data),

  // GET /api/users/:id
  getById: (id: number): Promise<UserDetails> =>
    http.get<UserDetails>(`/users/${id}`).then((r) => r.data),

  // POST /api/users
  create: (data: CreateUpdateUserRequest): Promise<CreateUserResponse> =>
    http.post<CreateUserResponse>('/users', data).then((r) => r.data),

  // PUT /api/users/:id
  update: (id: number, data: CreateUpdateUserRequest): Promise<UpdateUserResponse> =>
    http.put<UpdateUserResponse>(`/users/${id}`, data).then((r) => r.data),

  // DELETE /api/users/:id
  delete: (id: number): Promise<DeleteUserResponse> =>
    http.delete<DeleteUserResponse>(`/users/${id}`).then((r) => r.data),
};
