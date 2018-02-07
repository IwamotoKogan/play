const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  // and remove cacheing so we get the most recent comments


  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.post('/straight', (req, res) => {
  let {
    counter,
  } = req.body;

  const { arr } = req.body;

  console.log(arr);
  let winner = 1;

  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr[i].length - 1; j += 1) {
      if (arr[i][j] - arr[i][j + 1] === 1) {
        counter += 1;
      } else {
        counter = 1;
      }
    }

    if (winner <= counter) {
      winner = counter;
    }

    counter = 1;
  }

  res.json(winner);
});

app.post('/slope', (req, res) => {
  const {
    height, width, hits, arr,
  } = req.body;

  let counter = 0;
  let winner = 0;
  console.log("arr: ",arr)
  function calculateSlope(calcArr) {
    for (let j = 0; j < Math.max(height, width); j += 1) {
      for (let k = 0; k < height; k += 1) {
        for (let i = 0; i < height; i += 1) {
          if (calcArr[i].indexOf((i - k) + j) > -1) {
            counter += 1;
            if (counter === hits) {
              return counter;
            }
          } else {
            counter = 0;
          }
        }
      }

      if (winner <= counter) {
        winner = counter;
      }

      counter = 0;
    }
    return winner;
  }

  res.json(Math.max(calculateSlope(arr), calculateSlope(arr.reverse())));
});

app.get('/', (req, res) => {
  req.locals.data = 1;
  res.json(req.locals.data);
});

app.listen(3001);
