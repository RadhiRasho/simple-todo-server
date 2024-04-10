import { createUser, getUsers } from "@/db/Users";
import { Hono } from "hono";
import { IsValid } from "./validation";
import type { UserCreate } from "@/types/User";
import { DisplayUser } from "@/components";

const app = new Hono();

app.get("/all", async (c) => c.json(getUsers()));

app.post("/create", async (c) => {
	const body = await c.req.json<UserCreate>();

	const valid = IsValid(body);

	if (valid) {
		createUser(body);

		return c.json({ message: "User Created" });
	}

	throw new Error("Invalid User");
});

app.get("/:id", async (c) => {
	const id = c.req.param("id");

	const user = getUsers().find((u) => u.userId === Number(id));

	if (user) {
		return c.html(DisplayUser(user));
	}

	throw new Error("User Not Found");
});

export default app;