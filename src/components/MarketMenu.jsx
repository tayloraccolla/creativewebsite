import { useState } from 'react';
const items = {
  Sip: [
    { title: 'Coffee & espresso', text: 'From your morning coffee to lattes, cappuccinos and cold brew.', image: 'coffee', alt: 'Milk being poured into a Candlewood Market coffee', tag: 'THE DAILY RITUAL' },
    { title: 'Fresh organic juices', text: 'A fresh, colorful stop at the juice bar.', image: 'juice', alt: 'Fresh fruit and vegetables at the market juice bar', tag: 'SOMETHING FRESH' },
    { title: 'Smoothies & blended', text: 'Smoothies, smoothie bowls and frozen favorites.', image: 'smoothie', alt: 'Pink blended drink in a Candlewood Market cup', tag: 'SIP SOMETHING HAPPY' },
  ],
  Eat: [
    { title: 'Breakfast & bagels', text: 'Egg sandwiches, bagels and a reason to take your morning slowly.', image: 'breakfast', alt: 'An egg and cheese bagel sandwich from the market', tag: 'GOOD MORNING' },
    { title: 'Pastries', text: 'A little something to go with your favorite cup.', image: 'pastries', alt: 'An assortment of fresh muffins at Candlewood Market', tag: 'A SWEET LITTLE PAUSE' },
    { title: 'Ice cream', text: 'Connecticut-made ice cream for a sweet finish to your visit.', image: 'icecream', alt: 'Ice cream being enjoyed at the market', tag: 'ONE MORE SCOOP' },
  ],
  Shop: [
    { title: 'Coffee for home', text: 'Bring the coffee ritual back to your own kitchen.', image: 'beans', alt: 'Candlewood coffee beans', tag: 'TAKE THE GOOD HOME' },
    { title: 'Pantry discoveries', text: 'Browse honey, infused oils, balsamics, jams and sauces.', image: 'pantry', alt: 'Bottled pantry goods displayed at Candlewood Market', tag: 'FOR YOUR SHELVES' },
    { title: 'Love local', text: 'Discover Connecticut-made dairy, cheese, honey and more.', image: 'market', alt: 'Local goods and seating inside Candlewood Market', tag: 'CLOSE TO HOME' },
  ],
};
export default function MarketMenu() {
  const [category, setCategory] = useState('Sip');
  return <section className="menu-section section-wrap" id="menu" aria-labelledby="menu-title">
    <div className="section-heading">
      <div><p className="eyebrow">SIP. SHOP. EAT. REPEAT.</p><h2 id="menu-title">What are you in the mood for?</h2></div>
      <p>Something for your cup.<br />Something for your day.</p>
    </div>
    <div className="menu-toolbar">
      <div className="category-buttons" role="group" aria-label="Browse market categories">
        {Object.keys(items).map(name => <button key={name} aria-pressed={category === name} className={category === name ? 'selected' : ''} onClick={() => setCategory(name)}>{name}<span aria-hidden="true">↗</span></button>)}
      </div>
      <a className="text-link" href={category === 'Shop' ? 'https://www.candlewoodmarket.com/shop' : 'https://www.candlewoodmarket.com/menu'} target="_blank" rel="noreferrer">{category === 'Shop' ? 'Shop the official site' : 'See the official menu'} <span aria-hidden="true">↗</span></a>
    </div>
    <div className="menu-grid" aria-live="polite" aria-atomic="true">
      {items[category].map(item => <article className="menu-card" key={item.title}>
        <div className="card-image"><img src={`${import.meta.env.BASE_URL}images/${item.image}.webp`} alt={item.alt} loading="lazy" /></div>
        <p className="eyebrow">{item.tag}</p><h3>{item.title}</h3><p>{item.text}</p>
      </article>)}
    </div>
    <p className="menu-note">A taste of what you’ll find. Visit the official site for the current menu, prices and availability.</p>
  </section>;
}
