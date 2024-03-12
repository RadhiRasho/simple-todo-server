import { Database } from "bun:sqlite";

const db = new Database("db/test.db");

const dbExists = db.query("SELECT name FROM sqlite_master").all().length > 1;

async function Init() {
	const file = Bun.file("db/testdb.sql");

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

export { Init, db };
