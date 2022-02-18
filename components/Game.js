import {useEffect, useState} from 'react';
import RGBdleRow from './RGBdleRow';

export default function Game({color, colorLabel, endGame, save}) {
	const [guesses, setGuesses] = useState(save.guesses ?? []);
	const submit = (red, green, blue) => {
		guesses = [...guesses, [red, green, blue]];
		setGuesses(guesses);
		save.guesses = guesses;
		localStorage.setItem('guesses', JSON.stringify(save));
	};

	useEffect(() => {
		if (!save.ended && guesses.length > 0 && (guesses.length === 10 || isCorrect(guesses[guesses.length - 1], color))) {
			let score = 0;
			for (const g of guesses) {
				score += 1 / 3 * (255 - Math.abs(g[0] - color[0]) + 255 - Math.abs(g[1] - color[1]) + 255 - Math.abs(g[2] - color[2]));
			}
			score *= 10 / (guesses.length);
			score = Math.ceil(score);
			endGame(score, guesses.length);
		}
	}, [guesses]);
	return (
		<div className='game'>
			<div dangerouslySetInnerHTML={{__html: '<!-- Are you gonna cheat lmao? -->'}}></div>
			<div className='game-color' style={{backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`}}>
				<div className='game-color-label'>Today&apos;s color is: <b>{colorLabel}</b></div>
			</div>
			<div className='game-guesses'>
				{Array(10).fill('').map((_, index) =>
					<RGBdleRow
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