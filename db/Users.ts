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

		const HashedPassword = await Bun.password.hash(password, "bcrypt");
		const profilePic = `https://robohash.org/${username}/?set=set3`;

		query.run(email, profilePic, username, HashedPassword, firstName, lastName);
	} catch (error) {
		console.error(error);
	}
}

export async function comparePass() {
	try {
		const query = db.prepare<UserCreate, []>(
			"SELECT * FROM Users WHERE userId=11",
		);

		const data = query.get();

		const pass = "Discharge-P";

		const passed = await Bun.password.verify(pass, data?.password ?? "");

		console.log(passed);

		return passed;
	} catch (err) {
		console.error(err);
	}
}
