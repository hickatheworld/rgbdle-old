import {MdClose, MdShare} from 'react-icons/md';
import {useRef} from 'react';

export default function Results({tries, scores, guesses, color, number, showToday, score, isOpen, close}) {
	const shareTextRef = useRef();
	const distribution = Array(11).fill(0);
	for (const i of tries) {
		distribution[i]++;
	}
	console.log(distribution);

	const share = () => {
		navigator.clipboard.writeText(shareString(guesses, color, number, score));
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
					<div className='today'>
						<div className='today-color' style={{backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`}}>
							Today&apos;s color was <b>rgb({color[0]}, {color[1]}, {color[2]})</b>
						</div>
						<div className='today-stats'>
							You scored <b>{scores[scores.length - 1]}</b> in <b>{tries[tries.length - 1]}</b> tries.
						</div>
					</div>
				}
				<div className='score-avg'>
					<div className='window-title'>Average score</div>
					<div className='scores-avg-value'>{scores.length ? Math.round(scores.reduce((a, b) => a + b) / scores.length) : 'No data'}</div>
				</div>
				<div className='guess-distrib'>
					<div className='window-title'>Guess distribution</div>
					{
						tries.length ?
							distribution.slice(1).map((value, index) => (
								<div className='guess-distrib-row' key={index}>
									<div className='guess-distrib-label'>{index + 1}</div>
									<div className={`guess-distrib-value-bar ${value === 0 ? 'zero' : ''}`} style={{width: `${value / tries.length * 100}%`}}>{value}</div>
								</div>))
							:
							'No data'
					}
				</div>
				{
					showToday &&
					<button className='results-share' onClick={share}>
						<MdShare></MdShare>
						<span ref={shareTextRef}>Share</span>
					</button>
				}
			</div>
		</div>
	);
}


function shareString(guesses, color, number, score) {
	let str = `RGBdle ${number} ${guesses.length}/10\n`;
	for (const row of guesses) {
		for (const j in row) {
			const c = row[j];
			str += c === color[j] ? '🟩' : c < color[j] ? '🟪' : '🟧';
		}
		str += '\n';
	}
	str += `Score: ${score}/2550`;
	return str;
}