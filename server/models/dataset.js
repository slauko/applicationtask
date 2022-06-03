const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const datasetSchema = new Schema({
	material: String,
	changenr: Number,
	amount: Number,
	time: String,
});
const Dataset = mongoose.model('Dataset', datasetSchema);
datasetSchema.plugin(AutoIncrement, {inc_field: 'id'});
module.exports = Dataset;
