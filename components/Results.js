import {MdClose, MdShare} from 'react-icons/md';
import {useRef, useState, useEffect} from 'react';

export default function Results({
	close,
	color,
	day,
	didGuess,
	guesses,
	isOpen,
	showToday,
	tries
}) {

	const calculateTimeLeft = () => {
		const now = new Date();
		const next = new Date();
		next.setDate(next.getDate() + 1);
		next.setHours(0);
		next.setMinutes(0);
		next.setSeconds(0);
		next.setMilliseconds(0);
		const diff = next - now;
		if (diff < 0)
			return 'Right now!';
		let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((diff % (1000 * 60)) / 1000);
		hours = hours < 10 ? '0' + hours : hours;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;
		return `${hours}:${minutes}:${seconds}`;
	};

	const shareTextRef = useRef();
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);
		return () => clearTimeout(timer);
	});
	const distribution = Array(11).fill(0);
	for (const i of tries) {
		if (i !== -1)
			distribution[i]++;
	}
	const share = () => {
		navigator.clipboard.writeText(shareString(guesses, color, day, didGuess));
		shareTextRef.current.innerText = 'Copied!';
		setTimeout(() => {
			shareTextRef.current.innerText = 'Share';
		}, 3000);
	};

	return (
		<div className={`window-container ${isOpen ? 'open' : ''}`}>
			<div className='window results'>
				<div className='window-close' onClick={close}>
					<MdClose size={24}></MdClose>
				</div>
				{
					showToday &&
					<div>
						<div
							className='w-48 h-48 rounded ml-[50%] translate-x-[-50%] my-5 flex flex-col justify-center items-center text-center text-white'
							style={{backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`}}
						>
							Today&apos;s color was <b>rgb({color[0]}, {color[1]}, {color[2]})</b>
						</div>
						<div className='text-center'>
							{didGuess ?
								<>You guessed it in <b>{tries[tries.length - 1]}</b> {tries[tries.length - 1] === 1 ? 'try' : 'tries'}!</>
								: <>You didn&apos;t find it today!</>
							}
						</div>
					</div>
				}
				<div>
					<div className='window-title'>Guess distribution</div>
					{
						tries.length ?
							distribution.slice(1).map((value, index) => (
								<div className='flex flex-row my-3' key={index}>
									<div className='bg-black text-white font-slab w-6 text-center'>{index + 1}</div>
									<div
										className={`h-full bg-green-500 text-center`}
										style={{
											width: `${value / tries.length * 100}%`,
											marginLeft: value === 0 ? '5px' : 0
										}}
									>
										{value}
									</div>
								</div>))
							:
							'No data'
					}
				</div>
				{
					showToday &&
					<div className='relative flex flex-col sm:flex-row items-center justify-center'>
						<div>
							<div className='text-2xl font-bold text-center'>
								Next RGBdle
							</div>
							<div className='text-3xl font-[Arial] text-center'>
								{timeLeft}
							</div>
						</div>
						<div className='relative w-[90%] h-[1px] sm:h-24 sm:w-[1px] bg-gray-500 my-2 sm:my-0 sm:mx-12'></div>
						<button className='bg-green-500 py-2 px-3 inline-flex flex-row items-center rounded text-white text-2xl' onClick={share}>
							<MdShare className='mr-2' size={24}></MdShare>
							<span ref={shareTextRef}>Share</span>
						</button>
					</div>
				}
			</div>
		</div >
	);
};


function shareString(guesses, color, day, didGuess) {
	let str = `RGBdle ${day} ${didGuess ? guesses.length : 'X'}/10`;
	for (const row of guesses) {
		str += '\n';
		for (const j in row) {
			const c = row[j];
			str += c === color[j] ? '🟩' : c < color[j] ? '🟪' : '🟧';
		}
	}
	return str;
}