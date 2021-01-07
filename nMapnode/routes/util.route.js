const express = require('express');
const utilRoute = express.Router();


// Defined get data(index or listing) route
utilRoute.route('/').get(function (req, res) {
  
});

module.exports = utilRoute;