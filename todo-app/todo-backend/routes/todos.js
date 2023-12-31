const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const redis = require("../redis");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: req.body.done,
  });
  const current_added_todos = await redis.getAsync("added_todos");
  console.log("current_added_todos: ", current_added_todos); //NaN
  if (!current_added_todos || isNaN(current_added_todos)) {
    await redis.setAsync("added_todos", 1);
  } else {
    await redis.setAsync("added_todos", parseInt(current_added_todos) + 1);
  }

  res.json(todo).status(201);
});
// router.post("/", async (req, res) => {
//   const todo = await Todo.create({
//     text: req.body.text,
//     done: false,
//   });
//   const current_added_todos = await redis.getAsync("added_todos");
//   if (!current_added_todos || isNaN(current_added_todos)) {
//     await redis.setAsync("added_todos", 1);
//   } else {
//     await redis.setAsync("added_todos", parseInt(current_added_todos) + 1);
//   }
//   res.json(todo).status(201);
// });

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  res.json(req.todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const body = req.body;
  const query = { _id: req.todo._id };
  const result = await Todo.findOneAndUpdate(
    query,
    {
      text: body.text,
      done: body.done,
    },
    { new: true }
  );
  res.json(result).status(200);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
