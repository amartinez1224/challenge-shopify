const app = require('./app');

const port = process.env.PORT || 8080;
app.listen(port,'127.0.0.1', () => {
  console.log(`listening on port ${port}`);
});