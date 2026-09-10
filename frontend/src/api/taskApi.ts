import type { Task, TaskRequest } from '../types/task'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api'

type ApiError = {
  message?: string
  errors?: Record<string, string>
}

async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    let detail: ApiError | undefined

    try {
      detail = await response.json()
    } catch {
      // JSONではないエラーの場合はHTTPステータスを使う
    }

    const validationMessage = detail?.errors
      ? Object.values(detail.errors).join(' / ')
      : undefined

    throw new Error(
      validationMessage ??
        detail?.message ??
        `APIエラー: ${response.status}`,
    )
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export const taskApi = {
  findAll(): Promise<Task[]> {
    return request<Task[]>('/tasks')
  },

  findById(id: number): Promise<Task> {
    return request<Task>(`/tasks/${id}`)
  },

  create(task: TaskRequest): Promise<Task> {
    return request<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    })
  },

  update(id: number, task: TaskRequest): Promise<Task> {
    return request<Task>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(task),
    })
  },

  delete(id: number): Promise<void> {
    return request<void>(`/tasks/${id}`, {
      method: 'DELETE',
    })
  },
}
