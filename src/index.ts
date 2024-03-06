import { createTodo, deleteTodo, getTodos } from "@/db/methods";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
	return c.json(getTodos());
});

app.post("/create", async (c) => {
	const { taskName, description } = await c.req.json();

	createTodo({ taskName, description });

	return c.json({ message: "Todo created successfully" });
});

app.delete("/delete/:id{[0-9]+}", (c) => {
	const id = +c.req.param("id");

	deleteTodo(id);

	return c.json({ message: "Todo deleted successfully" });
});

export default app;
