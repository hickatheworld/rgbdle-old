import mongoose from 'mongoose';
// // import Color from './ColorSchema';
// mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

export async function getTodaysColor() {
	// const d = new Date();
	// const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
	// let color = await Color.findOne({day: date});
	color = {
		name: 'Flesh',
		rgb:[255, 203, 164],
		day: new Date(),
		number: 1
		
	};
	return color;
}
