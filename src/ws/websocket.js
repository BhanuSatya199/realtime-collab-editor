const WebSocket = require("ws");
const pool = require("../db");
const { transform } = require("../ot/transform");

const sessions = {}; // in-memory state

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server, path: "/ws" });

  wss.on("connection", (ws) => {
    ws.on("message", async (message) => {
      const data = JSON.parse(message);

      if (data.type === "JOIN") {
        const { documentId, userId, username } = data;

        if (!sessions[documentId]) {
          const result = await pool.query(
            "SELECT * FROM documents WHERE id=$1",
            [documentId]
          );
          sessions[documentId] = {
            content: result.rows[0].content,
            version: result.rows[0].version,
            users: {},
            history: [],
          };
        }

        sessions[documentId].users[userId] = { ws, username };

        ws.send(
          JSON.stringify({
            type: "INIT",
            content: sessions[documentId].content,
            version: sessions[documentId].version,
            users: Object.keys(sessions[documentId].users).map((u) => ({
              userId: u,
              username: sessions[documentId].users[u].username,
            })),
          })
        );
      }

      if (data.type === "OPERATION") {
        const session = sessions[data.documentId];
        let op = data.operation;

        // Transform if versions mismatch
        session.history.forEach((h) => {
          op = transform(op, h);
        });

        if (op.type === "insert") {
          session.content =
            session.content.slice(0, op.position) +
            op.text +
            session.content.slice(op.position);
        } else {
          session.content =
            session.content.slice(0, op.position) +
            session.content.slice(op.position + op.length);
        }

        session.version++;
        session.history.push(op);

        await pool.query(
          "UPDATE documents SET content=$1, version=$2 WHERE id=$3",
          [session.content, session.version, data.documentId]
        );

        Object.keys(session.users).forEach((u) => {
          if (u !== data.userId) {
            session.users[u].ws.send(
              JSON.stringify({
                type: "OPERATION",
                userId: data.userId,
                username: session.users[data.userId].username,
                operation: op,
                serverVersion: session.version,
              })
            );
          }
        });
      }
    });
  });
}

module.exports = setupWebSocket;