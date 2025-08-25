import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

class User {
  constructor(username, birthdate, age, email, password, valid = false) {
    this.username = username;
    this.birthdate = birthdate;
    this.age = age;
    this.email = email;
    this.password = password;
    this.valid = valid;
  }
}
const users = [
  new User("alice", "1999-05-20", 26, "alice@example.com", "alice123"),
  new User("bob", "2001-11-08", 23, "bob@example.com", "bob123"),
  new User("charlie", "1998-01-15", 27, "charlie@example.com", "charlie123")
];

app.post("/api/auth", (req, res) => {
  const { username, password } = req.body || {};
  const found = users.find(u => u.username === username && u.password === password);
  if (found) {
    const { username, birthdate, age, email } = found;
    return res.json({ valid: true, username, birthdate, age, email });
  }
  res.json({ valid: false });
});

app.listen(PORT, () => console.log(`Auth server running at http://localhost:${PORT}`));
