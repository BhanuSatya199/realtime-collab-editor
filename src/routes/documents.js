const express = require("express");
const router = express.Router();
const pool = require("../db");
const { v4: uuidv4 } = require("uuid");

// Create Document
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  const id = uuidv4();
  const version = 0;

  await pool.query(
    "INSERT INTO documents (id,title,content,version) VALUES ($1,$2,$3,$4)",
    [id, title, content, version]
  );

  res.status(201).json({ id, title, content, version });
});

// List Documents
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT id,title FROM documents");
  res.json(result.rows);
});

// Get Document
router.get("/:id", async (req, res) => {
  const result = await pool.query("SELECT * FROM documents WHERE id=$1", [
    req.params.id,
  ]);

  if (result.rows.length === 0)
    return res.status(404).json({ message: "Not found" });

  res.json(result.rows[0]);
});

// Delete Document
router.delete("/:id", async (req, res) => {
  await pool.query("DELETE FROM documents WHERE id=$1", [req.params.id]);
  res.status(204).send();
});

module.exports = router;