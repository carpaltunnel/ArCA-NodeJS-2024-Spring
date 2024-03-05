'use strict';

module.exports = (router) => {
  router.get('/', getWidgets);
  router.get('/:id', getWidget);
  router.post('/', createWidget);
  router.put('/:id', updateWidget);
  router.delete('/:id', deleteWidget);
};

const getWidgets = (req, res) => {
  console.log('getWidgets()');

  const widgets = [
    {
      name: 'widget1',
      color: 'blue',
      size: 10,
    }, {
      name: 'widget2',
      color: 'red',
      size: 5,
    }, {
      name: 'widget3',
      color: 'green',
      size: 25,
    }
  ];

  res.send(widgets).json();
};

const getWidget = (req, res) => {
};

const createWidget = (req, res) => {
  res.sendStatus(200);
};

const updateWidget = (req, res) => {
};

const deleteWidget = (req, res) => {
};