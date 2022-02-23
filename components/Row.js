import {useRef} from 'react';

export default function Row({entry, expected, status, submit, lock}) {
	let cellColors = Array(3).fill('#1e293b');
	let resultColor = 'transparent';
	if (status === 'passed') {
		cellColors = cellColors.map((_, i) => (entry[i] === expected[i]) ? '#49da1e' : (entry[i] < expected[i]) ? '#da1e8d' : '#e9900a');
		resultColor = `rgb(${entry[0]}, ${entry[1]}, ${entry[2]})`;
	}
	const refs = [useRef(), useRef(), useRef()];
	let onSubmit;
	if (status === 'current') {
		onSubmit = () => {
			const values = refs.map(r => parseInt(r.current.value));
			let err = false;
			for (const i in values) {
				const v = values[i];
				if (v < 0 || v > 255 || isNaN(v)) {
					refs[i].current.classList.add('border-red-500');
					err = true;
				}
				else
					refs[i].current.classList.remove('border-red-500');
			}
			if (!err)
				submit(...values);
		};
	}

	return (
		<div className='flex flex-row justify-center items-center my-3 '>
			{status === 'current' &&
				<>
					{
						refs.map((ref, i) =>
							<input key={i}
								ref={ref}
								type='number'
								min={0}
								max={255}
								pattern='\d*'
								className='appearance-none border-2 border-gray-700 rounded w-12 h-12 p-2 mx-2 outline-none focus:border-orange-500 text-center transition-colors duration-200'
								disabled={lock[i]}
								defaultValue={lock[i] ? expected[i] : ''}
								data-lpignore={true}
								data-form-type='other'
								autoComplete='off'
							/>
						)
					}
					<button
						className='cursor-pointer border-2 border-slate-800 rounded w-12 h-12 mx-2 outline-none focus:border-orange-500 text-center bg-slate-800 text-white'
						onClick={onSubmit}
					>
						Enter
					</button>
				</>
			}
			{status !== 'current' &&
				<>
					{
						Array(3).fill().map((_, i) =>
							<div
								key={i}
								className='w-12 h-12 rounded mx-2 flex flex-col justify-center items-center text-white'
								style={{backgroundColor: cellColors[i]}}
							>
								{status === 'passed' &&
									<>
										<div className='text-[10pt]'>{['R', 'G', 'B'][i]}</div>
										<div className='font-bold text-lg'>{entry[i]}</div>
									</>
								}
							</div>
						)
					}
					<div
						className='w-12 h-12 bg-transparent rounded mx-2'
						style={{backgroundColor: resultColor}}
						title={status === 'passed' ? `This is what rgb(${entry[0]}, ${entry[1]}, ${entry[2]}) looks like!` : ''}
					></div>
				</>
			}
		</div>
	);
};