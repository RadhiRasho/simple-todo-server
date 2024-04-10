import type { User } from "@/types/User";
import { html } from "hono/html";

export function NotFound() {
	return html`
		<html lang="en">
			<body>
				<a href="." title="Return Home" style="display: flex; justify-content: center;">
					<video autoplay loop width="90%" muted>
 	  					<source src="https://5a152729.flyingcdn.com/wp-content/uploads/2021/02/flamingos-404-error-page-waza.mp4">
 	  				</video>
				</a>
			</body>
		</html>`;
}

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