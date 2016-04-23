'use strict';
const http = require('http');
const moment = require('moment');

const port = process.env.PORT || 3000;

const timestamp = (url) => {
  if (!url || url.length <= 1) return { unix: null, natural: null };
  const naturalFormat = 'MMMM D, YYYY';

  const unixToNatural = (uts) => moment.utc(uts, 'X', true).format(naturalFormat);
  const naturalToUnix = (nts) => moment.utc(nts, naturalFormat, true).format('X');

  const rawDate = url.toString().replace(/%20/g, ' ');

  if (unixToNatural(rawDate).toLowerCase() === 'invalid date' &&
    naturalToUnix(rawDate).toString().toLowerCase() === 'invalid date') {
    return { unix: null, natural: null };
  }

  if (unixToNatural(rawDate).toLowerCase() !== 'invalid date') {
    const unix = Number(rawDate);
    const natural = unixToNatural(unix);
    return { unix, natural };
  }

  if (naturalToUnix(rawDate).toString().toLowerCase() !== 'invalid date') {
    const natural = rawDate.slice(0);
    const unix = Number(naturalToUnix(natural));
    return { unix, natural };
  }
};

const server = http.createServer((req, res) => {
  const result = timestamp(req.url.slice(1));
  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify(result));
});

const startServer = () => server.listen(port, (err) => {
  if (err) return console.error(err);
  console.log(`server listening on port ${port}`);
});

module.exports.timestamp = timestamp;

const args = process.argv.slice(0);
if (args.length > 2 && args[2] === 'start') startServer();
