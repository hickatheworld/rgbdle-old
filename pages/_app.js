import '../styles/globals.css';
import {init, track, parameters, trackPages} from 'insights-js';

function MyApp({Component, pageProps}) {
	init('GXRDZKYqTAYdrDpB');
	trackPages();
	return <Component {...pageProps} />;
}

export default MyApp;