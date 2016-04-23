const http = require('http');
const moment = require('moment');

const port = process.env.PORT || 3000;

const timestamp = (url) => {
  if (!url || url.length <= 1) return { unix: null, natural: null };
  const naturalFormat = 'MMMM D, YYYY';

  const unixToNatural = (uts) => moment.unix(uts).format(naturalFormat);
  const naturalToUnix = (nts) => 'Invalid Date';

  if (unixToNatural(url).toLowerCase() === 'invalid date' &&
    naturalToUnix(url).toLowerCase() === 'invalid date') {
    return { unix: null, natural: null };
  }
};

const server = http.createServer((req, res) => {
  const result = timestamp(req.url);
  res.end(JSON.stringify(result));
});

const startServer = () => server.listen(port, (err) => {
  if (err) return console.error(err);
  console.log(`server listening on port ${port}`);
});

module.exports.timestamp = timestamp;
