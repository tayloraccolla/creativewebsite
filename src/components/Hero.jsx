import ScallopedPlayButton from './ScallopedPlayButton';

export default function Hero({ isPlaying, onTogglePlay }) {
  return <section className="hero-section" aria-labelledby="hero-title">
    <img className="hero-photo" src={`${import.meta.env.BASE_URL}images/market.webp`} alt="Sunlit tables, plants and local goods inside Candlewood Market" fetchPriority="high" />
    <div className="hero-shade" />
    <div className="hero-content">
      <p className="eyebrow">A little local. A lot to love.</p>
      <h1 id="hero-title">Your daily pause,<br /><em>made a little warmer.</em></h1>
      <p className="hero-description">Good coffee. Fresh bites. A place to stay awhile.<br />Meet your neighborhood market in Fairfield.</p>
      <div className="hero-actions">
        <a className="button button-cream" href="#menu">Find your favorite <span aria-hidden="true">↗</span></a>
        <a className="hero-visit" href="#visit">Come on in <span aria-hidden="true">↗</span></a>
      </div>
    </div>
    <div className="hero-bottom">
      <span className="hero-location">85 MILL PLAIN ROAD <span>FAIRFIELD, CONNECTICUT</span></span>
      <div className="sound-control">
        <span>{isPlaying ? 'A little café mood' : 'Settle into the mood'}<small>{isPlaying ? 'Sound on · tap to pause' : 'Original ambient sound · tap to play'}</small></span>
        <ScallopedPlayButton isPlaying={isPlaying} onClick={onTogglePlay} />
      </div>
    </div>
  </section>;
}
