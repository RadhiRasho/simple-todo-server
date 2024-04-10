export type User = {
	userId: number;
	email: string;
	profile_picture: string;
	username: string;
	password: string;
	firstName: string;
	lastName: string;
};

export type UserCreate = Omit<User, "userId">;