import Row from './Row';
import {MdClose} from 'react-icons/md';

export default function Guide({isOpen, close}) {
	return (
		<div className={`window-container ${isOpen ? 'open' : ''}`}>
			<div className='window text-center'>
				<div className='window-close' onClick={close}>
					<MdClose size={24}></MdClose>
				</div>
				<div className='window-title'>Guess the RGBDLE in ten tries.</div>
				<div>
					In computers, colors are represented by three numbers between 0 and 255, respectively for red, green and blue. Try to guess these values for 
					the given color!
				</div>
				<div>
					The first guess is the <b className='text-red-600'>RED</b> value,
					the second guess is the <b className='text-green-600'>GREEN</b> value,
					and the third guess is the <b className='text-blue-600'>BLUE</b> value.
				</div>
				<div className='w-[8/10] h-[1px] bg-black mx-[10%] my-5'></div>
				<div className='window-title'>Example</div>
				<Row entry={[25, 120, 11]} expected={[25, 12, 145]} lock={[true, false, false]} status='passed' />
				<div>
					The value of the <b>red</b> level is <b>correct</b>.
				</div>
				<div>
					The value of the <b>green</b> level is <b>less than 120</b>.
				</div>
				<div>
					The value of the <b>blue</b> level is <b>more than 11</b>.
				</div>
				<div>
					And these three values make <b>dark green</b>.
				</div>
				<div>
					<b>In short</b>,
					<br />
					<span className='text-[#49da1e]'>Green</span> stands for <b>correct</b>,
					<br />
					<span className='text-[#e9900a]'>Orange</span> stands for <b>lower</b>,
					<br />
					<span className='text-[#da1e8c]'>Pink</span> stands for <b>higher</b>.
				</div>
				<div className='w-[8/10] h-[1px] bg-black mx-[10%] my-5'></div>
				<div>A new RGBDLE will be available each day!</div>
			</div>
		</div>
	);
}