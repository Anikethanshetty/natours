const express = require('express');
const tourController = require('./../controllers/tourController');
const routers = express.Router();
routers.param('id',tourController.checkID)

routers
    .route('/')
    .get(tourController.gettingInfo)
    .post(tourController.checkBody,tourController.addingNewInfo);

routers 
    .route('/:id')
    .get(tourController.gettingInfoId)
    .patch(tourController.updatingInfo)
    .delete(tourController.deltingInfo);

module.exports = routers;