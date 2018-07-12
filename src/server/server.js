const express = require('express');
const os = require('os');
const stocks = require('../lib/alpha');
const app = express();

app.use(express.static('dist'));

app.get('/api/getUserName', (req, res) => {
  console.log(`Client made a proxy request to /api`);
  res.send({ username: os.userInfo().username });
});

app.get('/api/getportfolio', async (req, res) => {
  const results = await stocks.getInitPortfolio();
  res.send({ portfolio: results });
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
