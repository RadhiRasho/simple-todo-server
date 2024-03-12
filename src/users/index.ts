import { getUsers } from "@/db/methods";
import { Hono } from "hono";

const app = new Hono();

app.get("/all", async (c) => c.json(getUsers()));

export default app;