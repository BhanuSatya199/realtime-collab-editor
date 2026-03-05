function transform(op1, op2) {
  if (op1.type === "insert" && op2.type === "insert") {
    if (op1.position <= op2.position) return op1;
    return { ...op1, position: op1.position + op2.text.length };
  }

  if (op1.type === "delete" && op2.type === "delete") {
    if (op1.position >= op2.position + op2.length) return op1;
    return { ...op1, position: Math.max(op2.position, op1.position - op2.length) };
  }

  if (op1.type === "insert" && op2.type === "delete") {
    if (op1.position <= op2.position) return op1;
    return { ...op1, position: op1.position - op2.length };
  }

  if (op1.type === "delete" && op2.type === "insert") {
    if (op1.position >= op2.position)
      return { ...op1, position: op1.position + op2.text.length };
    return op1;
  }

  return op1;
}

module.exports = { transform };