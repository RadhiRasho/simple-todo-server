import type { Todo, TodoCreate } from "@/types";
import { db } from ".";

export function getTodo(taskId: number): Todo {
	const statment = db.prepare<Todo, number>(
		"SELECT * FROM Todos WHERE taskId = ?",
	);

	const data = statment.get(taskId);

	if (!data)
		throw new Error("Ran into an error", {
			cause: "No Data Found",
		});

	return data;
}

export function getTodos(limit?: number, offset?: number): Todo[] {
	if (limit) {
		return pagination(limit, offset);
	}

	return db.prepare<Todo, []>("SELECT * FROM Todos ORDER BY taskId DESC").all();
}

export function createTodo({ taskName, description }: TodoCreate): void {
	const statement = db.prepare(
		"INSERT INTO Todos (taskName, description) VALUES (?, ?)",
	);

	statement.run(taskName, description);
}

export function deleteTodo(taskId: number): void {
	const statement = db.prepare("DELETE FROM Todos WHERE taskId = ?");

	statement.run(taskId);
}

export function updateTodo({ taskId, taskName, description }: Todo): void {
	const statement = db.prepare(
		"UPDATE Todos SET taskName = ?, description = ? WHERE taskId = ?",
	);

	statement.run(taskName, description, taskId);
}

export function pagination(limit: number, offset?: number): Todo[] {
	const statement = db.prepare<Todo, [number, number]>(
		"SELECT * FROM Todos ORDER BY taskId DESC LIMIT ? OFFSET ?",
	);

	return statement.all(limit, offset || 0);
}
