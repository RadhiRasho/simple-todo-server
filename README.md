# Simple Todo Server

This is a simple todo server that uses a REST API to manage todos.

It is written in:
1. Typescript
2. Hono as the server framework
3. SQLite as the database

## Running the server

To run the server, you need to have Node.js installed. Then you can run the following commands:

```bash
bun dev
```

This will start the server on port 3000.

## API

The server has the following API:

### GET /

This will return a list of all the todos.

### POST /create

This will create a new todo. The body of the request should be a JSON object with the following properties:

1. `taskName`: The name of the todo
2. `description`: `: A description of the todo

### POST /update

This will update a todo. The body of the request should be a JSON object with the following properties:

1. `id`: The id of the todo
2. `taskName`: The name of the todo
3. `description`: `: A description of the todo

### DELETE /delete/:id

This will delete a todo. The body of the request should be a JSON object with the following properties:

1. `id`: The id of the todo

The Delete method uses Hono's Route Validation using regex so that it will only ever accept integers as the id.
Otherwise the method will return a 404 Not Found error.

## Database

The server uses SQLite as the database. The database is created when you first run the application and is stored in the `db` folder
The intial database is created with a single table called `todos` with the following schema:

```sql
CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  taskName VARCHAR(255),
  description TEXT
);
```

You can see the database schema in the `db` folder within the `Todos.sql` file.
