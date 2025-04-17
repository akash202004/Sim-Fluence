import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import simulationRoutes from "./routes/simulationRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/simulation", simulationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
