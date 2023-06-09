export default async (req, res) => {
  if (!req.query.todo) {
    return res.status(400).send("todo parameter required.");
  }
  const todo = encodeURI(req.query.todo);

  const token = "REPLACE_YOUR_TOKEN";
  const url = `https://REPLACE_YOUR_ENDPOINT/lrem/todo/1/${todo}?_token=${token}`;

  return fetch(url)
    .then((r) => r.json())
    .then((data) => {
      const result = JSON.stringify(data.result);
      return res.status(200).json(result);
    });
};
