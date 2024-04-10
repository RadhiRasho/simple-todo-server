export type Todo = {
	userId: number;
	taskId: number;
	taskName: string;
	description: string;
};

export type TodoCreate = Omit<Todo, "taskId">;
