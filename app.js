const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const provider = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/datas.json`)
);

app.get('/api/v1/provider', (req, res) => {

  res.status(200).json({
    status: 'success',
    result: provider.length,
    data: {
      provider,
    },
  });
});


app.get('/api/v1/provider:id', (req, res) => {

  console.log(req.params)

  res.status(200).json({
    status: 'success',
    // result: provider.length,
    // data: {
    //   provider: provider,
    // },
  });
});


app.post('/api/v1/provider', (req, res) => {
  //console.log(req.body);
  const newId = provider[provider.length - 1].id + 1;
  const newTour = Object.assign({
    id: newId
  }, req.body)

  provider.push(newTour)

  fs.writeFile(`${__dirname}/dev-data/data/datas.json`, JSON.stringify(provider), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  });
  // res.send('Done');


});
//console.log(req.body);


app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'naprovider' });
// });

// app.post('/', (req, res) => {
//   res.send('you can send your data to this url');
// });