import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { timing } from "hono/timing";
import TodoRouter from "./todos";
import UserRouter from "./users";

const app = new Hono();

app.use("*", timing({ enabled: (c) => c.req.method === "GET" }));
app.use("*", logger());
app.use("*", prettyJSON());
app.use(
	"/static/*",
	serveStatic({
		root: "./",
		onNotFound: (path, c) => {
			console.log(`${path} is not found, you access ${c.req.path}`);
		},
	}),
);

app.onError((error, c) => {
	if (error instanceof Error) {
		return c.json({ message: error.message, cause: error.cause });
	}
	return c.json({ error });
});

app.notFound(async (c) => {
	const file = Bun.file("static/something.html");

	const data = await file.text();

	return c.render(data);
});

app.route("/users", UserRouter);

app.route("/todos", TodoRouter);

export default { port: 3001, fetch: app.fetch };
