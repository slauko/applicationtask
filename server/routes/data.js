const express = require('express');
const router = express.Router();
const Dataset = require('../models/dataset');

//get all datasets
router.get('/', (req, res) => {
	Dataset.find()
		.then((datasets) => res.json(datasets))
		.catch((err) => res.status(404).json({message: 'No datasets found'}));
});
//get one dataset
router.get('/:id', (req, res) => {
	Dataset.findById(req.params.id)
		.then((dataset) => res.json(dataset))
		.catch((err) => res.status(404).json({message: 'No dataset found'}));
});
//add new dataset
router.post('/', (req, res) => {
	const newData = {...req.body, time: Date.now()};
	Dataset.create(newData)
		.then((dataset) => res.json(dataset))
		.catch((err) => res.status(400).json({message: 'Error creating new dataset'}));
});
//update dataset
router.put('/:id', (req, res) => {
	const newData = {...req.body, time: Date.now()};
	Dataset.findByIdAndUpdate(req.params.id, newData)
		.then(() => res.json({message: 'Dataset updated'}))
		.catch((err) => res.status(400).json({message: 'Error updating dataset'}));
});
module.exports = router;
