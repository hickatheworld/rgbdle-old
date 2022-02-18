import mongoose from 'mongoose';
import Color from './ColorSchema';
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

export async function getTodaysColor() {
	const d = new Date();
	const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
	let color = await Color.findOne({day: date});
	color = {
		name: color.name,
		rgb: color.rgb,
		day: color.day,
		number: color.number
	};
	return color;
}
