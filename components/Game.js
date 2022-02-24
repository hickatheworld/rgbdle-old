import {useEffect, useState} from 'react';
import Row from './Row';

export default function Game({color, colorLabel, endGame, save, setSave}) {
	const [guesses, setGuesses] = useState(save.guesses ?? []);
	const submit = (red, green, blue) => {
		guesses = [...guesses, [red, green, blue]];
		setGuesses(guesses);
		save.guesses = guesses;
		setSave(save);
		localStorage.setItem('RGB__save', JSON.stringify(save));
	};

	useEffect(() => {
		if (!save.ended && guesses.length > 0 && (guesses.length === 10 || isCorrect(guesses[guesses.length - 1], color))) {
			endGame(guesses.length, isCorrect(guesses[guesses.length - 1], color));
		}
	}, [guesses]);
	return (
		<div className='game'>
			<div id={'hey do not cheat it\'s no fun.'}
				className='w-48 h-48 rounded ml-[50%] translate-x-[-50%] my-5 flex flex-col justify-center items-center text-center text-white'
				style={{backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`}}
			>
				Today&apos;s color is: <span className='font-slab text-2xl'>{colorLabel}</span>
			</div>
			<div>
				{Array(10).fill('').map((_, index) =>
					<Row
						status={guesses[index] ? 'passed' : index === guesses.length && !save.ended ? 'current' : 'next'}
						entry={guesses[index]}
						expected={color}
						submit={submit}
						key={index}
					/>
				)}
			</div>
		</div>
	);
}

function isCorrect(guess, expected) {
	return guess[0] === expected[0] && guess[1] === expected[1] && guess[2] === expected[2];
}