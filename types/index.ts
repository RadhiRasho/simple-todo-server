export type Todo = {
	taskId: number;
	taskName: string;
	description: string;
};

export type TodoCreate = Omit<Todo, "taskId">;
