import { Layout } from "@/components";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { timing } from "hono/timing";
import TodoRouter from "./todos";
import UserRouter from "./users";

const app = new Hono();

app.use("*", timing({ enabled: (c) => c.req.method === "GET" }));
app.use("*", logger());
app.use("*", prettyJSON());

app.notFound((c) => c.html(Layout()));

app.onError((error, c) => {
	if (error instanceof Error) {
		return c.json({ message: error.message, cause: error.cause });
	}
	return c.json({ error });
});

app.route("/users", UserRouter);

app.route("/todos", TodoRouter);



export default { port: 3001, fetch: app.fetch };
