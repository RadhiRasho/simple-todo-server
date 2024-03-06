import { html } from "hono/html";

export function Layout() {
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
