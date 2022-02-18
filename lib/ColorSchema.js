const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorSchema = new Schema({
	name: String,
	rgb: Array,
	day: String,
	number: Number
});
export default mongoose.models.Color || mongoose.model('Color', colorSchema);