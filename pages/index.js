import Guide from '../components/Guide';
import Game from '../components/Game';
import Results from '../components/Results';
import {useEffect, useState} from 'react';
import {BsQuestionCircle} from 'react-icons/bs';
import {IoMdPodium} from 'react-icons/io';
import {getTodaysColor} from '../lib/db';
import Head from 'next/head';

export default function Home({color}) {
	const [showGuide, setShowGuide] = useState(false);
	const [save, setSave] = useState({loading: true});
	const [showResults, setShowResults] = useState(false);
	useEffect(() => {
		let save = localStorage.getItem('RGB__save');
		try {
			save = JSON.parse(save);
			if (save)
				setSave(save);
			else throw null;
		} catch (_) {
			setSave({
				day: color.day,
				guesses: [],
				ended: false,
				didGuess: false
			});
		}
		if (save && save.day !== color.day) {
			const newGuesses = {
				day: color.day,
				guesses: [],
				ended: false,
				didGuess: false
			};
			setSave(newGuesses);
			localStorage.setItem('RGB__save', '');
		}
	}, []);

	const endGame = (triesCount, didGuess) => {
		setSave({...save, ended: true, didGuess});
		localStorage.setItem('RGB__save', JSON.stringify({...save, ended: true, didGuess}));

		const tries = JSON.parse(localStorage.getItem('tries') ?? '[]');
		localStorage.setItem('RGB__tries', JSON.stringify([...tries, didGuess ? triesCount : -1]));

		setShowResults(true);
	};

	if (save.loading) {
		return (
			<div>loading...</div>
		);
	}

	const stats = {
		tries: JSON.parse(localStorage.getItem('RGB__tries') ?? '[]'),
		scores: JSON.parse(localStorage.getItem('RGB__scores') ?? '[]')
	};

	return (
		<>
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
				<script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `
			window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
					}}
				/>

			</Head>
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
			<Game color={color.rgb} colorLabel={color.name} save={save} endGame={endGame} setSave={setSave} />
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
		</>
	);
}

export async function getServerSideProps() {
	const color = await getTodaysColor();
	return {
		props: {color}
	};
}