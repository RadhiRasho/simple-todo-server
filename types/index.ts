export type Todo = {
	userId: number;
	taskId: number;
	taskName: string;
	description: string;
};

export type TodoCreate = Omit<Todo, "taskId">;

export type User = {
	userId: number;
	email: string;
	profile_picture: string;
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	gender: string;
	birthdate: Date;
	city: string;
	state: string;
	country: string;
};

export type UserCreate = Omit<User, "userId">;