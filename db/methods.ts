import type { Todo, TodoCreate } from "@/types";
import { db } from ".";

export function getTodos(): Todo[] {
	return db
		.query("SELECT * FROM Todos")
		.all()
		.map((row) => row as Todo);
}

export function createTodo({ taskName, description }: TodoCreate) {
	db.exec("INSERT INTO Todos (taskName, description) VALUES (?, ?)", [taskName, description]);
}

export function deleteTodo(taskId: number) {
	db.exec("DELETE FROM Todos WHERE taskId = ?", [taskId]);
}

export function updateTodo({ taskId, taskName, description }: Todo) {
	db.exec("UPDATE TODO SET taskName = ?, description = ? WHERE taskId = ?", [taskName, description, taskId]);
}
