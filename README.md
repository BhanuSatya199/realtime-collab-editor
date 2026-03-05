🚀 Real-Time Collaborative Editor

A real-time collaborative text editor backend built with Node.js, WebSockets, PostgreSQL, and Docker.

Multiple users can join the same document and edit simultaneously using Operational Transformation (OT) to resolve conflicts.

This project demonstrates real-world backend architecture used in tools like Google Docs, Notion, and Figma.

📌 Features

📝 Create and manage documents using REST APIs

⚡ Real-time editing with WebSockets

👥 Multiple users editing the same document simultaneously

🔄 Operational Transformation (OT) for conflict resolution

🗄 PostgreSQL document storage

🐳 Fully Dockerized application

❤️ Health check endpoint

🧪 CLI testing using wscat

🏗 Architecture
            Client A
               │
               │ WebSocket
               ▼
        ┌──────────────┐
        │   Node.js    │
        │   Express    │
        │ WebSocket WS │
        └──────┬───────┘
               │
               │
               ▼
        Operational
        Transformation
            Engine
               │
               ▼
        ┌─────────────┐
        │ PostgreSQL  │
        │ Documents   │
        │ Versions    │
        └─────────────┘
🧰 Tech Stack
Backend

Node.js

Express.js

WebSockets (ws)

Database

PostgreSQL

DevOps

Docker

Docker Compose

Utilities

UUID

dotenv

wscat (WebSocket testing)

📂 Project Structure
realtime-collab-editor
│
├── src
│   ├── server.js
│   │
│   ├── routes
│   │     └── documents.js
│   │
│   ├── websocket
│   │     └── wsServer.js
│   │
│   └── ot
│         └── transform.js
│
├── docker-compose.yml
├── Dockerfile
├── package.json
├── test-websocket.sh
└── README.md
⚙️ Setup & Installation
1️⃣ Clone Repository
git clone https://github.com/BhanuSatya199/realtime-collab-editor.git
cd realtime-collab-editor
2️⃣ Run with Docker
docker compose up --build

Server runs on

http://localhost:8080
📡 API Endpoints
Create Document
POST /api/documents

Example request:

curl -X POST http://localhost:8080/api/documents \
-H "Content-Type: application/json" \
-d '{"title":"Test","content":"abc"}'

Example response

{
"id":"uuid",
"title":"Test",
"content":"abc",
"version":0
}
Get Document
GET /api/documents/:id

Example

curl http://localhost:8080/api/documents/<document_id>
🔌 WebSocket API

WebSocket Endpoint

ws://localhost:8080/ws
Join Document
{
"type":"JOIN",
"documentId":"DOC_ID",
"userId":"user1",
"username":"Alice"
}

Server response

{
"type":"INIT",
"content":"abc",
"version":0
}
🧪 Testing WebSocket

Install CLI

npm install -g wscat

Connect

npx wscat -c ws://localhost:8080/ws

Send message

{
"type":"JOIN",
"documentId":"DOC_ID",
"userId":"user1",
"username":"Alice"
}
🐳 Docker Services

Docker Compose starts:

collab_app  → Node.js API
collab_db   → PostgreSQL

Check running containers

docker ps
❤️ Health Check
GET /health

Example

curl http://localhost:8080/health

Response

OK
🧠 Key Concepts Demonstrated

Real-time systems

WebSocket communication

Operational Transformation

REST API design

Docker containerization

Database integration

📈 Future Improvements

React collaborative editor UI

Cursor presence tracking

Authentication system

Document version history

Deployment on AWS / Render

👨‍💻 Author

Gunipe BhanuSatya
Full Stack Developer | Computer Science Engineering Student

Interested in building scalable backend systems, real-time applications, and distributed architectures.

GitHub
https://github.com/BhanuSatya199