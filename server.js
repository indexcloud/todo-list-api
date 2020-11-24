var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var todoList = [
	{
		id: 1,
		todo: "Implement a REST API",
	},
];

// GET /api/todos
app.get("/api/todos", (req, res) => {
	res.send(todoList);
});

// GET /api/todos/:id
app.get("/api/todos/:id", (req, res) => {
	const id = req.params.id;
	const todo = todoList.find(todo => todo.id === Number(id));
	res.send(todo);
});

// POST /api/todos
app.post("/api/todos", (req, res) => {
	todoList.push({
		id: req.body.id,
		todo: req.body.todo,
	});
	res.send(todoList);
});

// PUT /api/todos/:id
app.put("/api/todos/:id", (req, res) => {
	const id = req.params.id;
	let todoIndex = todoList.findIndex(td => td.id === Number(id));
	todoList[todoIndex] = {...todoList[todoIndex], ...req.body};
	res.send(todoList[todoIndex]);
});

// DELETE /api/todos/:id
app.delete("/api/todos/:id", (req, res) => {
	const id = req.params.id;
	let todoIndex = todoList.findIndex(td => td.id === Number(id));
	todoList.splice(todoIndex, 1);
	res.send(todoList);
});

app.listen(3000, function () {
	console.log("Todo List API is now listening on port 3000...");
});
