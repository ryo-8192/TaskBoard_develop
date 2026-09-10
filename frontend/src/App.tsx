import { useCallback, useEffect, useState } from 'react'
import { taskApi } from './api/taskApi'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import type { Task, TaskRequest } from './types/task'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadTasks = useCallback(async () => {
    try {
      setError(null)
      const data = await taskApi.findAll()
      setTasks(data)
    } catch (caught) {
      setError(toErrorMessage(caught))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadTasks()
  }, [loadTasks])

  async function handleSubmit(request: TaskRequest) {
    try {
      setSubmitting(true)
      setError(null)

      if (editingTask) {
        await taskApi.update(editingTask.id, request)
        setEditingTask(null)
      } else {
        await taskApi.create(request)
      }

      await loadTasks()
    } catch (caught) {
      setError(toErrorMessage(caught))
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(task: Task) {
    if (!window.confirm(`「${task.title}」を削除しますか？`)) {
      return
    }

    try {
      setError(null)
      await taskApi.delete(task.id)

      if (editingTask?.id === task.id) {
        setEditingTask(null)
      }

      await loadTasks()
    } catch (caught) {
      setError(toErrorMessage(caught))
    }
  }

  return (
    <main className="container">
      <header className="app-header">
        <div>
          <p className="eyebrow">React + Spring Boot Learning Project</p>
          <h1>TaskBoard</h1>
          <p className="subtitle">
            シンプルなタスク管理アプリを保守開発しながら学びます。
          </p>
        </div>
      </header>

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      <div className="layout">
        <TaskForm
          editingTask={editingTask}
          submitting={submitting}
          onSubmit={handleSubmit}
          onCancelEdit={() => setEditingTask(null)}
        />

        {loading ? (
          <section className="panel">
            <p>読み込み中...</p>
          </section>
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={setEditingTask}
            onDelete={handleDelete}
          />
        )}
      </div>
    </main>
  )
}

function toErrorMessage(caught: unknown): string {
  if (caught instanceof Error) {
    return caught.message
  }

  return '予期しないエラーが発生しました'
}
