import { html } from "hono/html";
import type { User } from "@/types/User";

export function DisplayUser(user: User) {
	return html`
		<div>
			<h1>${user.username}</h1>
			<p>${user.password}</p>
			<p>${user.email}</p>
			<p>${user.firstName} ${user.lastName}</p>
			<img src="${user.profile_picture}" alt="Profile Picture" />
		</div>
	`;
}
