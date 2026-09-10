import type { Task, TaskStatus } from '../types/task'

type Props = {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (task: Task) => Promise<void>
}

const statusLabel: Record<TaskStatus, string> = {
  TODO: '未着手',
  IN_PROGRESS: '進行中',
  DONE: '完了',
}

export function TaskList({ tasks, onEdit, onDelete }: Props) {
  if (tasks.length === 0) {
    return (
      <section className="panel">
        <h2>タスク一覧</h2>
        <p className="empty-message">タスクはまだありません。</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>タスク一覧</h2>
        <span>{tasks.length}件</span>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <article className="task-card" key={task.id}>
            <div className="task-main">
              <div className="task-title-row">
                <h3>{task.title}</h3>
                <span className={`status status-${task.status.toLowerCase()}`}>
                  {statusLabel[task.status]}
                </span>
              </div>

              {task.description && (
                <p className="description">{task.description}</p>
              )}

              <p className="meta">
                期限: {task.dueDate ?? '未設定'}
              </p>
            </div>

            <div className="task-actions">
              <button
                type="button"
                className="secondary"
                onClick={() => onEdit(task)}
              >
                編集
              </button>
              <button
                type="button"
                className="danger"
                onClick={() => void onDelete(task)}
              >
                削除
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
