import { useState } from 'react';

export function Brand() {
  return <a className="brand" href="#home" aria-label="Candlewood Market home">
    <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 34V13M20 23C5 24 5 10 5 10s15-1 15 13Zm0-7C20 3 34 3 34 3s1 13-14 13Z" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M11 36h18" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
    <span>Candlewood<span className="brand-small">MARKET · FAIRFIELD, CT</span></span>
  </a>;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="header-inner">
      <Brand />
      <button className="mobile-menu" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>{open ? 'Close −' : 'Menu +'}</button>
      <nav id="site-nav" className={open ? 'navigation open' : 'navigation'} aria-label="Main navigation">
        <a href="#menu" onClick={() => setOpen(false)}>Sip, shop & eat</a>
        <a href="#story" onClick={() => setOpen(false)}>Our story</a>
        <a href="#visit" onClick={() => setOpen(false)}>Visit us</a>
        <a className="button button-dark nav-order" href="https://www.candlewoodmarket.com/online-ordering" target="_blank" rel="noreferrer">Order on official site <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
  </header>;
}
