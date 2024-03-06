import { Layout } from "@/components";
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from "@/db";
import type { Todo, TodoCreate } from "@/types";
import { Hono } from "hono";

const app = new Hono();

app.notFound((c) => c.html(Layout()));

app.onError((error, c) => {
	if (error instanceof Error) {
		return c.json({ message: error.message });
	}
	return c.json({ error });
});

app.get("/", (c) => {
	const data = getTodos();
	return c.json(data);
});

app.get("/:id{[0-9]+}", (c) => {
	const id = +c.req.param("id");

	const todo = getTodo(id);

	return c.json({ ...todo });
});

app.post("/create", async (c) => {
	const { taskName, description } = await c.req.json<TodoCreate>();

	createTodo({ taskName, description });

	return c.json({ message: "Todo created successfully" });
});

app.delete("/delete/:id{[0-9]+}", (c) => {
	const id = +c.req.param("id");

	deleteTodo(id);

	return c.json({ message: "Todo deleted successfully" });
});

app.put("/update", async (c) => {
	const todo = await c.req.json<Todo>();

	updateTodo(todo);

	return c.text(`Todo (Id: ${todo.taskId}) updated successfully`);
});

export default { port: 3001, fetch: app.fetch };
