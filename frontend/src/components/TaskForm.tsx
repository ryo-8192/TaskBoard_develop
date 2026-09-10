import { FormEvent, useEffect, useState } from 'react'
import type { Task, TaskRequest, TaskStatus } from '../types/task'

type Props = {
  editingTask: Task | null
  submitting: boolean
  onSubmit: (request: TaskRequest) => Promise<void>
  onCancelEdit: () => void
}

const emptyForm: TaskRequest = {
  title: '',
  description: '',
  status: 'TODO',
  dueDate: null,
}

export function TaskForm({
  editingTask,
  submitting,
  onSubmit,
  onCancelEdit,
}: Props) {
  const [form, setForm] = useState<TaskRequest>(emptyForm)

  useEffect(() => {
    if (!editingTask) {
      setForm(emptyForm)
      return
    }

    setForm({
      title: editingTask.title,
      description: editingTask.description ?? '',
      status: editingTask.status,
      dueDate: editingTask.dueDate,
    })
  }, [editingTask])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!form.title.trim()) {
      alert('タイトルを入力してください')
      return
    }

    await onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    })

    if (!editingTask) {
      setForm(emptyForm)
    }
  }

  function updateField<K extends keyof TaskRequest>(
    key: K,
    value: TaskRequest[K],
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))
  }

  return (
    <section className="panel">
      <h2>{editingTask ? 'タスク編集' : 'タスク登録'}</h2>

      <form className="task-form" onSubmit={handleSubmit}>
        <label>
          タイトル
          <input
            value={form.title}
            maxLength={100}
            onChange={(event) => updateField('title', event.target.value)}
            placeholder="例: Reactの勉強"
          />
        </label>

        <label>
          説明
          <textarea
            value={form.description}
            maxLength={1000}
            rows={4}
            onChange={(event) =>
              updateField('description', event.target.value)
            }
            placeholder="タスクの説明"
          />
        </label>

        <label>
          ステータス
          <select
            value={form.status}
            onChange={(event) =>
              updateField('status', event.target.value as TaskStatus)
            }
          >
            <option value="TODO">未着手</option>
            <option value="IN_PROGRESS">進行中</option>
            <option value="DONE">完了</option>
          </select>
        </label>

        <label>
          期限
          <input
            type="date"
            value={form.dueDate ?? ''}
            onChange={(event) =>
              updateField('dueDate', event.target.value || null)
            }
          />
        </label>

        <div className="form-actions">
          <button type="submit" disabled={submitting}>
            {submitting
              ? '保存中...'
              : editingTask
                ? '更新する'
                : '登録する'}
          </button>

          {editingTask && (
            <button
              type="button"
              className="secondary"
              onClick={onCancelEdit}
            >
              キャンセル
            </button>
          )}
        </div>
      </form>
    </section>
  )
}
