const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/arrivals/:station', async (req, res) => {
  const station = req.params.station;
  const apiKey = 'MW9S-E7SL-26DU-VV8V'; // Public BART API key

  try {
    const response = await axios.get('https://api.bart.gov/api/etd.aspx', {
      params: {
        cmd: 'etd',
        orig: station,
        key: apiKey,
        json: 'y',
      },
    });

    const data = response.data.root.station[0].etd;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'an error occurred while fetching data from the BART API.' });
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
