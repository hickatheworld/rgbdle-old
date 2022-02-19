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
		let save = localStorage.getItem('guesses');
		try {
			save = JSON.parse(save);
			if (save)
				setSave(save);
			else throw null;
		} catch (_) {
			setSave({
				day: new Date(),
				guesses: [],
				score: 0,
				ended: false
			});
		}
		if (save && !sameDates(new Date(), new Date(save.day))) {
			const newGuesses = {
				day: new Date(),
				guesses: [],
				score: 0,
				ended: false
			};
			setSave(newGuesses);
			localStorage.setItem('guesses', '');
		}
	}, []);

	const endGame = (score, triesCount) => {
		setSave({...save, ended: true, score, day: new Date()});
		localStorage.setItem('guesses', JSON.stringify({...save, ended: true, score}));

		const scores = JSON.parse(localStorage.getItem('scores') ?? '[]');
		localStorage.setItem('scores', JSON.stringify([...scores, score]));

		const tries = JSON.parse(localStorage.getItem('tries') ?? '[]');
		localStorage.setItem('tries', JSON.stringify([...tries, triesCount]));

		setShowResults(true);
	};

	if (save.loading) {
		return (
			<div>loading...</div>
		);
	}

	const stats = {
		tries: JSON.parse(localStorage.getItem('tries') ?? '[]'),
		scores: JSON.parse(localStorage.getItem('scores') ?? '[]')
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
			<style>{`#ribon a{background:#a00;color:#fff;text-decoration:none;font-family:arial,sans-serif;text-align:center;font-weight:bold;padding:5px 20px;font-size:1rem;line-height:2rem;position:relative;transition:0.5s;}@media screen and (min-width:800px){#ribon{position:absolute;display:block;top:0;left:0;width:400px;overflow:hidden;height:200px;z-index:9999;}#ribon a{width:200px;position:absolute;top:30px;left:-50px;transform:rotate(-45deg);-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);-moz-transform:rotate(-45deg);-o-transform:rotate(-45deg);box-shadow:4px 4px 10px rgba(0,0,0,0.8);}}`}</style>
			<span id='ribon'><a href='#'>Currently indev</a></span>
			<div className='app-header'>
				<div className='app-name'>RGBdle</div>
				<div className='app-header-actions'>
					<div className='results-opener' onClick={() => setShowResults(true)}>
						<IoMdPodium size={24}></IoMdPodium>
					</div>
					<div className='guide-opener' onClick={() => setShowGuide(true)}>
						<BsQuestionCircle size={24}></BsQuestionCircle>
					</div>
				</div>
			</div>
			<Guide isOpen={showGuide} close={() => setShowGuide(false)} />
			<Game color={color.rgb} colorLabel={color.name} save={save} endGame={endGame} />
			<Results
				isOpen={showResults}
				close={() => setShowResults(false)}
				guesses={save && save.guesses}
				scores={stats.scores}
				score={save.score}
				tries={stats.tries}
				number={color.number}
				showToday={save.ended}
				color={color.rgb}
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

function sameDates(d1, d2) {
	return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}