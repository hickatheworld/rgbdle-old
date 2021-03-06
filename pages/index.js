import Head from 'next/head';
import Script from 'next/script';
import {useEffect, useState} from 'react';
import {BsQuestionCircle} from 'react-icons/bs';
import {IoMdPodium} from 'react-icons/io';
import {MdClose} from 'react-icons/md';
import Game from '../components/Game';
import Guide from '../components/Guide';
import Results from '../components/Results';

export default function Home() {
	const [showWarn, setShowWarn] = useState(process.env.NEXT_PUBLIC_WARN && process.env.NEXT_PUBLIC_WARN.length > 0);
	const [color, setColor] = useState(undefined);
	const [showGuide, setShowGuide] = useState(false);
	const [save, setSave] = useState({loading: true});
	const [stats, setStats] = useState({});
	const [showResults, setShowResults] = useState(false);
	useEffect(() => {
		(async () => {
			let res;
			if (!color) {
				res = await (await fetch('/api/color')).json();
				setColor(res);
			}
			let save = localStorage.getItem('RGB__save');
			setStats({
				tries: JSON.parse(localStorage.getItem('RGB__tries') ?? '[]'),
				scores: JSON.parse(localStorage.getItem('RGB__scores') ?? '[]')
			});
			try {
				save = JSON.parse(save);
				if (save)
					setSave(save);
				else throw null;
			} catch (_) {
				setSave({
					day: res ? res.day : color.day,
					guesses: [],
					ended: false,
					didGuess: false
				});
			}
			if (save && res && save.day !== res.day) {
				const newGuesses = {
					day: res ? res.day : color.day,
					guesses: [],
					ended: false,
					didGuess: false
				};
				localStorage.setItem('RGB__save', '');
			}
		})();
	}, [color]);

	const endGame = (triesCount, didGuess) => {
		setSave({...save, ended: true, didGuess});
		localStorage.setItem('RGB__save', JSON.stringify({...save, ended: true, didGuess}));

		const tries = JSON.parse(localStorage.getItem('tries') ?? '[]');
		localStorage.setItem('RGB__tries', JSON.stringify([...tries, didGuess ? triesCount : -1]));

		setShowResults(true);
	};
	return (
		<div>
			<Head>
				<title>RGBdle</title>
				<meta name='title' content='RGBdle' />
				<meta name='description' content={'RGBdle: Demonstrate your skills in design by guessing the RGB code of each day\'s color!'} />
				<meta property='og:type' content='website' />
				<meta property='og:url' content='https://rgbdle.hicka.world' />
				<meta property='og:title' content='RGBdle' />
				<meta property='og:description' content={'RGBdle: Demonstrate your skills in design by guessing the RGB code of each day\'s color!'} />
				<meta property='og:image' content='https://rgbdle.hicka.world/banner.png' />
				<meta property='twitter:card' content='summary_large_image' />
				<meta property='twitter:url' content='https://rgbdle.hicka.world' />
				<meta property='twitter:title' content='RGBdle' />
				<meta property='twitter:description' content={'RGBdle: Demonstrate your skills in design by guessing the RGB code of each day\'s color!'} />
				<meta property='twitter:image' content='https://rgbdle.hicka.world/banner.png' />
			</Head>
			{
				!color || save.loading ?
					<div className='flex justify-center items-center h-screen w-screen'>
						<div className='w-12 h-12 rounded-full border-4 border-black border-t-transparent animate-spin'>
						</div>
					</div>
					:
					<div className='relative overflow-auto h-screen pb-20'>
						{
							showWarn &&
							<div
								className='
								fixed bottom-0 left-0 w-full min-h-[75px] bg-amber-400 text-white font-work 
								flex items-center px-10
								text-sm md:text-lg font-bold
								shadow-2xl shadow-black
								'
							>
								<div
									className='absolute right-3 cursor-pointer'
									onClick={() => setShowWarn(false)}
								>
									<MdClose size={24}></MdClose>
								</div>
								<div>
									{process.env.NEXT_PUBLIC_WARN}
								</div>
							</div>
						}
						<div className='relative w-full border-b-[1px] border-gray-300 py-3 text-center font-slab text-4xl font-bold'>
							<div>RGBdle</div>
							<div className='absolute right-0 flex flex-row h-full top-0 items-center'>
								<div className='mx-2 cursor-pointer' onClick={() => setShowResults(true)}>
									<IoMdPodium size={24}></IoMdPodium>
								</div>
								<div className='mx-2 cursor-pointer' onClick={() => setShowGuide(true)}>
									<BsQuestionCircle size={24}></BsQuestionCircle>
								</div>
							</div>
						</div>
						<Guide isOpen={showGuide} close={() => setShowGuide(false)} />
						<Game
							color={color.rgb}
							colorLabel={color.name}
							save={save}
							endGame={endGame}
							setSave={setSave}
						/>
						<Results
							close={() => setShowResults(false)}
							color={color.rgb}
							day={color.day}
							didGuess={save.didGuess}
							guesses={save && save.guesses}
							isOpen={showResults}
							scores={stats.scores}
							showToday={save.ended}
							tries={stats.tries}
						/>
					</div>
			}
		</div>
	);
};