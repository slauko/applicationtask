const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const datasetSchema = new Schema({
	material: String,
	chargenr: String,
	amount: Number,
	time: String,
});
datasetSchema.plugin(AutoIncrement, {inc_field: 'index'});
const Dataset = mongoose.model('Dataset', datasetSchema);
module.exports = Dataset;
