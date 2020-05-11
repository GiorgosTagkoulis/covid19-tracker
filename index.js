const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const path = require('path');
const { states } = require('./statesOfUS');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'client', 'build')));

const getTodayDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  mm = mm < 10 ? `0${mm}` : mm;
  dd = dd < 10 ? `0${dd}` : dd;
  return yyyy + mm + dd;
};

let cachedData = {
  date: null,
  resources: [],
};

const fetchData = (res) => {
  const requests = states.map((state) =>
    fetch(
      `https://covidtracking.com/api/v1/states/${state.short}/daily.json`,
    ),
  );

  Promise.all(requests)
    .then((responses) => Promise.all(responses.map((r) => r.json())))
    .then((responses) =>
      responses.map((r, index) => {
        return {
          stateName: states[index].name,
          hospitilized: r[0].hospitalizedCurrently,
          deaths: r[0].death - r[2].death,
        };
      }),
    )
    .then((response) => {
      cachedData = {
        date: getTodayDate(),
        resources: response,
      };
      return cachedData;
    })
    .then((response) => res.json(response))
    .catch((err) => {
      console.error(new Error(err.message));
      res.sendStatus(500);
    });
};

app.get('/data', (_req, res) =>
  getTodayDate() === cachedData.date
    ? res.json(cachedData)
    : fetchData(res),
);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const port = process.env.PORT || 8080;
const server = app.listen(port);

console.debug(`App is listening on port ${port}`);

module.exports = server;
