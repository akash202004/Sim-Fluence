import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute";
import simulationRoutes from "./routes/simulationRoute";
import agentReaction from "./routes/agentReactionRoute"
import summary from "./routes/summaryRoute"
import postSuggestion from "./routes/postSuggestionRoute"

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/simulation", simulationRoutes);
app.use("/api/v1/agentReaction", agentReaction)
app.use("/api/v1/summary", summary)
app.use("/api/v1/postSuggestion", postSuggestion)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
