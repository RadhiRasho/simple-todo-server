import { Database } from "bun:sqlite";

const db = new Database("db/test.db");

const dbExists = db.query("SELECT name FROM sqlite_master WHERE type='table' AND name='Todos'").all().length > 0;

async function Init() {
	const file = Bun.file("db/Todos.sql");

	const fileExists = await file.exists();

	if (!dbExists && fileExists) {
		const data = await file.text();
		const lines = data.split("\n");

		for (const line of lines) {
			if (line.trim() === "") continue;
			db.exec(line);
		}
	}
}

if (!dbExists) Init();

export { db, dbExists, Init };
export * from "./methods";
