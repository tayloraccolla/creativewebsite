import { useState, useEffect } from 'react';
import Navbar, { Brand } from './components/Navbar';
import Hero from './components/Hero';
import MarketMenu from './components/MarketMenu';
import { ambientPlayer } from './utils/audio';

const official = 'https://www.candlewoodmarket.com/';
const directions = 'https://www.google.com/maps/search/?api=1&query=Candlewood+Market+85+Mill+Plain+Road+Fairfield+CT';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const handleTogglePlay = () => setIsPlaying(ambientPlayer.toggle());
  useEffect(() => () => ambientPlayer.stop(), []);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <aside className="education-banner">This website was created for educational purposes only and does not represent or reflect the official website of the business.</aside>
    <div id="home"><Navbar /></div>
    <main id="main">
      <Hero isPlaying={isPlaying} onTogglePlay={handleTogglePlay} />
      <div className="welcome-strip"><span>FAMILY OWNED SINCE 2017</span><span aria-hidden="true">✳</span><span>ROOTED IN CONNECTICUT</span><span aria-hidden="true">✳</span><span>YOUR NEIGHBORHOOD PAUSE</span></div>
      <MarketMenu />
      <section className="story-section" id="story" aria-labelledby="story-title">
        <div className="story-photo"><img src={`${import.meta.env.BASE_URL}images/storefront.webp`} alt="The brick storefront of Candlewood Market in Fairfield" loading="lazy" /><span className="photo-caption">A familiar stop. A warm welcome.</span></div>
        <div className="story-copy"><p className="eyebrow">GOOD THINGS GROW LOCALLY</p><h2 id="story-title">More than a coffee stop.<br /><em>A little piece of Fairfield.</em></h2>
          <p>Family owned and operated since 2017, Candlewood Market brings its Connecticut coffee-roasting roots to the heart of Fairfield’s Sportsplex campus.</p>
          <p>Come for a cup, settle into a sunny seat, or discover something made close to home. With space to catch up, work and unwind, there’s room for your kind of day.</p>
          <a className="text-link" href="https://www.candlewoodmarket.com/local" target="_blank" rel="noreferrer">Meet the local makers on the official site <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      <section className="visit-section section-wrap" id="visit" aria-labelledby="visit-title">
        <div className="visit-heading"><p className="eyebrow">WE’LL SAVE YOU A SEAT</p><h2 id="visit-title">Make yourself<br /><em>at home.</em></h2><p>A coffee before work. A bite after practice.<br />A catch-up that turns into an afternoon.</p></div>
        <div className="visit-details"><div className="visit-row"><h3>Find the market</h3><address>85 Mill Plain Road, Unit O<br />Fairfield, CT 06824<br /><span>Inside the Sportsplex campus</span></address></div>
          <div className="visit-row"><h3>Come by</h3><dl className="hours"><div><dt>Monday – Thursday</dt><dd>6 am – 8 pm</dd></div><div><dt>Friday</dt><dd>6 am – 7 pm</dd></div><div><dt>Saturday – Sunday</dt><dd>7 am – 7 pm</dd></div></dl></div>
          <div className="visit-actions"><a className="button button-dark" href={directions} target="_blank" rel="noreferrer">Get directions <span aria-hidden="true">↗</span></a><a className="text-link" href="tel:+12032928559">203-292-8559</a></div>
          <p className="hours-note">Hours from the official website. Please confirm holiday hours with the market.</p>
        </div>
      </section>
    </main>
    <footer className="site-footer section-wrap"><div className="footer-top"><Brand /><span className="footer-tagline">Sip. Shop. Eat. Stay awhile.</span><a className="text-link" href="#home">Back to top ↑</a></div><div className="footer-bottom"><span>Independent student project · Educational use only</span><div><a href={official} target="_blank" rel="noreferrer">Official website ↗</a><a href="https://www.instagram.com/candlewoodmarket/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="#sources">Sources & photo credits</a></div></div>
      <details id="sources" className="source-details"><summary>Research & photo credits</summary><p>Business information and photography are from Candlewood Market’s <a href={official} target="_blank" rel="noreferrer">official website</a>, <a href={`${official}menu`} target="_blank" rel="noreferrer">menu</a>, <a href={`${official}local`} target="_blank" rel="noreferrer">local products</a> and <a href={`${official}visit-us`} target="_blank" rel="noreferrer">visit page</a>, cross-checked with the <a href="https://share.google/8jXOnfJsi4MWDMvlS" target="_blank" rel="noreferrer">Google business listing</a>. Reviewed October 28, 2026. Original photos belong to their respective owners and are used here for this educational project. The ambient sound is synthesized in the browser and is not a recording of the business. External menu, order and shop links open the business’s official website.</p></details>
    </footer>
  </>;
}
