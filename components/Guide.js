import RGBdleRow from './RGBdleRow';
import {MdClose} from 'react-icons/md';

export default function Guide({isOpen, close}) {
	return (
		<div className={`window-container ${isOpen ? 'open' : ''}`}>
			<div className='window guide'>
				<div className='window-close' onClick={close}>
					<MdClose size={24}></MdClose>
				</div>
				<div className='guide-title'>Guess the RGBDLE in ten tries.</div>
				<div className='guide-line'>
					Each guess must be three valid integers between 0 and 255.
				</div>
				<div className='guide-line'>
					The first guess is the <b style={{color: 'red'}}>RED</b> value,
					the second guess is the <b style={{color: 'green'}}>GREEN</b> value,
					and the third guess is the <b style={{color: 'blue'}}>BLUE</b> value.
				</div>
				<div className='guide-separator'></div>
				<div className='guide-title'>Example</div>
				<RGBdleRow entry={[25, 120, 11]} expected={[25, 12, 145]} status='passed' />
				<div className='guide-line'>
					The value of the <b>red</b> level is <b>correct</b>.
				</div>
				<div className='guide-line'>
					The value of the <b>green</b> level is <b>less than 120</b>.
				</div>
				<div className='guide-line'>
					The value of the <b>green</b> level is <b>more than 111</b>.
				</div>
				<div className='guide-separator'></div>
				<div className='guide-line'>A new RGBDLE will be available each day!</div>
			</div>
		</div>
	);
}