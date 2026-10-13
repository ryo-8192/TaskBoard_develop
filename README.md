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
