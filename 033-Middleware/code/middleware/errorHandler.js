
const middleware = () => {
  return (err, req, res, next) => {
    res.status(500).send('Something broke!');
  };
}

module.exports = middleware;