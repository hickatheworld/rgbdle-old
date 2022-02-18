import {useRef} from 'react';
import {MdOutlineArrowForward} from 'react-icons/md';

export default function RgbdleRow({entry, expected, status, submit}) {
	let redCellColor,
		greenCellColor,
		blueCellColor;
	if (status === 'passed') {
		redCellColor = (entry[0] === expected[0]) ? '#49da1e' : (entry[0] < expected[0]) ? '#da1e8c' : '#e9900a';
		greenCellColor = (entry[1] === expected[1]) ? '#49da1e' : (entry[1] < expected[1]) ? '#da1e8c' : '#e9900a';
		blueCellColor = (entry[2] === expected[2]) ? '#49da1e' : (entry[2] < expected[2]) ? '#da1e8c' : '#e9900a';
	}
	const redRef = useRef(),
		greenRef = useRef(),
		blueRef = useRef();
	let onSubmit;
	if (status === 'current') {
		onSubmit = () => {
			const red = parseInt(redRef.current.value) ?? -1;
			const green = parseInt(greenRef.current.value) ?? -1;
			const blue = parseInt(blueRef.current.value) ?? -1;
			if (red < 0 || red > 255)
				redRef.current.classList.add('error');
			else
				redRef.current.classList.remove('error');
			if (green < 0 || green > 255)
				greenRef.current.classList.add('error');
			else
				greenRef.current.classList.remove('error');
			if (blue < 0 || blue > 255)
				blueRef.current.classList.add('error');
			else
				blueRef.current.classList.remove('error');
			if (red >= 0 && red <= 255 && green >= 0 && green <= 255 && blue >= 0 && blue <= 255)
				submit(red, green, blue);
		};
	}

	return (
		<div className='rgbdle-row'>
			{status === 'current' &&
				<>
					<div className='rgbdle-input-cell'>
						<input type='number' pattern='\d*' min={0} max={255} ref={redRef} />
					</div>
					<div className='rgbdle-input-cell'>
						<input type='number' pattern='\d*' min={0} max={255} ref={greenRef} />
					</div>
					<div className='rgbdle-input-cell'>
						<input type='number' pattern='\d*' min={0} max={255} ref={blueRef} />
					</div>
					<div className='rgbdle-row-arrow hidden'>
						<MdOutlineArrowForward size={24}></MdOutlineArrowForward>
					</div>
					<button className='rgbdle-submit' onClick={onSubmit}>
						Enter
					</button>
				</>
			}
			{status === 'next' &&
				<>
					<div className='rgbdle-row-cell' style={{backgroundColor: '#333333'}}></div>
					<div className='rgbdle-row-cell' style={{backgroundColor: '#333333'}}></div>
					<div className='rgbdle-row-cell' style={{backgroundColor: '#333333'}}></div>
					<div className='rgbdle-row-arrow'>
						<MdOutlineArrowForward size={24}></MdOutlineArrowForward>
					</div>
					<div className='rgbdle-row-cell' style={{backgroundColor: '#333333'}}></div>
				</>
			}
			{status === 'passed' &&
				<>
					<div className='rgbdle-row-cell' style={{backgroundColor: redCellColor}}>
						<div className='rgbdle-row-cell-label'>R</div>
						<div className='rgbdle-row-cell-value'>{entry[0]}</div>
					</div>
					<div className='rgbdle-row-cell' style={{backgroundColor: greenCellColor}}>
						<div className='rgbdle-row-cell-label'>G</div>
						<div className='rgbdle-row-cell-value'>{entry[1]}</div>
					</div>
					<div className='rgbdle-row-cell' style={{backgroundColor: blueCellColor}}>
						<div className='rgbdle-row-cell-label'>B</div>
						<div className='rgbdle-row-cell-value'>{entry[2]}</div>
					</div>
					<div className='rgbdle-row-arrow'>
						<MdOutlineArrowForward size={24}></MdOutlineArrowForward>
					</div>
					<div className='rgbdle-row-cell' style={{backgroundColor: `rgb(${entry[0]}, ${entry[1]}, ${entry[2]})`}}></div>
				</>
			}
		</div>
	);
};