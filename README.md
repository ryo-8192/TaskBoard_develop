# TaskBoard

React + TypeScript / Spring Boot / PostgreSQL で作った、保守開発練習用のシンプルなタスク管理アプリです。

完成済みの小さなアプリを起点に、仕様調査、改修、障害対応、テスト、リファクタリングを練習することを目的にしています。

## 技術スタック

### Frontend
- React 19.3
- TypeScript 7
- Vite 8
- Fetch API
- CSS

### Backend
- Java 21
- Spring Boot 4.1.1
- Spring Web MVC
- Spring Data JPA
- Bean Validation
- PostgreSQL
- Maven
- JUnit

### Infrastructure
- PostgreSQL 17
- Docker Compose

## ディレクトリ構成

```text
taskboard/
├─ backend/
│  ├─ pom.xml
│  └─ src/
│     ├─ main/java/com/example/taskboard/
│     │  ├─ config/
│     │  ├─ controller/
│     │  ├─ dto/
│     │  ├─ entity/
│     │  ├─ exception/
│     │  ├─ repository/
│     │  └─ service/
│     └─ test/
├─ frontend/
│  ├─ package.json
│  └─ src/
│     ├─ api/
│     ├─ components/
│     ├─ types/
│     └─ App.tsx
├─ docs/
│  └─ maintenance-tickets.md
├─ docker-compose.yml
└─ README.md
```

## 必要なもの

- Java 21
- Maven 3.9+
- Node.js 22+
- Docker Desktop または Docker Engine + Docker Compose

## 起動方法

### 1. PostgreSQLを起動

プロジェクトルートで:

```bash
docker compose up -d
```

DB接続情報:

| 項目 | 値 |
|---|---|
| Host | localhost |
| Port | 5432 |
| Database | taskboard |
| User | taskboard |
| Password | taskboard |

### 2. Backendを起動

```bash
cd backend
mvn spring-boot:run
```

Backend:

```text
http://localhost:8080
```

API:

```text
http://localhost:8080/api/tasks
```

### 3. Frontendを起動

別ターミナルで:

```bash
cd frontend
npm install
npm run dev
```

ブラウザ:

```text
http://localhost:5173
```

## API一覧

| Method | Endpoint | 内容 |
|---|---|---|
| GET | `/api/tasks` | 一覧取得 |
| GET | `/api/tasks/{id}` | 1件取得 |
| POST | `/api/tasks` | 新規登録 |
| PUT | `/api/tasks/{id}` | 更新 |
| DELETE | `/api/tasks/{id}` | 削除 |

### POST /api/tasks

```json
{
  "title": "Spring Bootを勉強する",
  "description": "Controller / Service / Repositoryを理解する",
  "status": "TODO",
  "dueDate": "2026-09-30"
}
```

### PUT /api/tasks/{id}

```json
{
  "title": "Spring Bootを勉強する",
  "description": "CRUDを一通り実装する",
  "status": "IN_PROGRESS",
  "dueDate": "2026-09-30"
}
```

`status` は以下の3種類です。

```text
TODO
IN_PROGRESS
DONE
```

## 学習用として意図的にシンプルにしている点

この初期版では、以下はまだ実装していません。

- ログイン / 認証
- ページング
- 検索
- ソート
- 優先度
- 楽観ロック
- APIバージョニング
- React Router
- 状態管理ライブラリ
- React側の自動テスト
- CI/CD
- Flyway / Liquibase

これらを後続の「保守改修チケット」として追加していく想定です。

## 最初に読む順番

Backend:

```text
TaskController
    ↓
TaskService
    ↓
TaskRepository
    ↓
Task(Entity)
```

Frontend:

```text
App.tsx
    ↓
taskApi.ts
    ↓
TaskList / TaskForm
    ↓
Spring Boot REST API
```

最初から全部理解する必要はありません。

まずアプリを起動し、

1. タスクを登録
2. 更新
3. 完了状態に変更
4. 削除

まで触ってからコードを追うのがおすすめです。

## 保守開発練習

`docs/maintenance-tickets.md` に改修チケットを入れています。

最初は **Ticket #001** だけ見て、自分で影響箇所を調べて実装してみてください。
