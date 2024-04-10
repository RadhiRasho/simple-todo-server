import type { User, UserCreate } from "@/types/User";
import { db } from ".";

export function getUser(userId: number) {
	const statement = db.prepare<User, number>(
		"SELECT * FROM Users WHERE userId = ?",
	);

	return statement.get(userId);
}

export function getUsers(): User[] {
	const statement = db.prepare<User, []>("SELECT * FROM Users");

	return statement.all();
}

export async function createUser({
	email,
	password,
	username,
	firstName,
	lastName,
}: UserCreate) {
	try {
		const query = db.prepare<UserCreate, string[]>(
			`INSERT INTO Users (email, profile_picture, username, password, firstName, lastName)
			VALUES (?, ?, ?, ?, ?, ?)`,
		);

		const HashedPassword = await Bun.password.hash(password);
		const profilePic = `https://robohash.org/${username}/?set=set3`;

		query.run(email, profilePic, username, HashedPassword, firstName, lastName);
	} catch (error) {
		console.error(error);
	}
}
