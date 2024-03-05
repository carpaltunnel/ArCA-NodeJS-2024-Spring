
const middleware = () => {
  return (req, res, next) => {
    if (req.body && req.body.color) {
      console.log(`Found a color of ${req.body.color}`);

      if (req.body.color === 'orange') {
        res.status(400).send('We do not support orange widgets!');
        return;
      }

      // Modify request body
    }
    
    next();
  };
}

module.exports = middleware;