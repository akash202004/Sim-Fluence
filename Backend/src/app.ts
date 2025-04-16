import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/api/v1/user', )

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
