const express = require('express');
const route = express.Router();

const services = require('../services/render');
const adminController = require('../controller/adminController');
const purchaseController = require('../controller/purchaseController');
const salesController = require('../controller/salesController');
const moldController = require('../controller/moldController');

route.get('/add-purchase');
route.get('/update-purchase')

// API
//Purchases (Raw material, Buying form)
route.post('/api/purchase', purchaseController.createPurchase);
route.get('/api/purchase', purchaseController.findPurchase);
route.put('/api/purchase/:id', purchaseController.updatePurchase);
route.delete('/api/purchase/:id', purchaseController.deletePurchase);

//Sales (Wholeseller, Sales form)
route.post('/api/sale', salesController.createSale);
route.get('/api/sale', salesController.findSale);
route.put('/api/sale/:id', salesController.updateSale);
route.delete('/api/sale/:id', salesController.deleteSale);

//Molding (phase after purchasing raw material, Mold form)
route.post('/api/mold', moldController.createMold);
route.get('/api/mold', moldController.findMold);
route.put('/api/mold/:id', moldController.updateMold);
route.delete('/api/mold/:id', moldController.deleteMold);

module.exports = route;