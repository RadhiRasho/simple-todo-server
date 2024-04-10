import type { UserCreate } from "@/types/User";

export function IsValid(user: UserCreate): boolean {
	const requiredFields: Array<keyof UserCreate> = [
		"email",
		"password",
		"username",
		"firstName",
		"lastName",
	];

	return requiredFields.every((field) => user[field]);
}