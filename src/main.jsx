import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Bone,
  Bot,
  Cat,
  Check,
  ChevronDown,
  Clock3,
  Dog,
  Heart,
  Leaf,
  Menu,
  Moon,
  PackageCheck,
  PawPrint,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Sun,
  Truck,
  X,
  Zap
} from 'lucide-react';
import './styles.css';

const logo = window.MR_FLUFFY_LOGO || '/mr-fluffy-logo.png';

const petPhotos = [
  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=85'
];

const products = [
  { id: 1, name: 'Sunday Roast Kibble', pet: 'Dogs', age: 'Adult', price: 24, old: 32, rating: 4.9, tag: 'Trending', image: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=900&q=85' },
  { id: 2, name: 'Cloud Nap Donut Bed', pet: 'Cats', age: 'All Ages', price: 39, old: 48, rating: 4.8, tag: 'Cozy pick', image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=900&q=85' },
  { id: 3, name: 'Minty Pup Dental Bones', pet: 'Dogs', age: 'Puppy', price: 14, old: 18, rating: 4.7, tag: 'Vet loved', image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'Whisker Joy Tuna Bites', pet: 'Cats', age: 'Senior', price: 12, old: 16, rating: 4.9, tag: 'Best seller', image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=900&q=85' },
  { id: 5, name: 'Bouncy Brunch Toy Set', pet: 'Dogs', age: 'All Ages', price: 19, old: 25, rating: 4.8, tag: 'Play more', image: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?auto=format&fit=crop&w=900&q=85' },
  { id: 6, name: 'Peach Silk Grooming Mist', pet: 'Cats', age: 'Adult', price: 17, old: 22, rating: 4.6, tag: 'Soft coat', image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=900&q=85' }
];

const categories = [
  ['Dog Food', Dog, 'Balanced bowls for wagging mornings', 'from $12'],
  ['Cat Food', Cat, 'Whisker-approved recipes and toppers', 'from $10'],
  ['Toys', Bone, 'Bounce, tug, chase, repeat', 'from $6'],
  ['Grooming', Sparkles, 'Spa-day softness at home', 'from $9'],
  ['Pet Beds', Moon, 'Cloudy corners for deep naps', 'from $29'],
  ['Accessories', PawPrint, 'Walk-ready style and comfort', 'from $8']
];

const tips = [
  ['Puppy routines', 'Build gentle habits with treats, play windows, and nap-friendly schedules.'],
  ['Cat hydration', 'Use wet toppers, fountains, and quiet bowl placements for better daily water intake.'],
  ['Coat care', 'Match brushes and shampoos to coat length, skin sensitivity, and seasonal shedding.']
];

function useCountdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  const target = useMemo(() => new Date(Date.now() + 1000 * 60 * 60 * 8 + 1000 * 60 * 24), []);
  const diff = Math.max(0, target - now);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return [h, m, s].map((n) => String(n).padStart(2, '0'));
}

function App() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [petFilter, setPetFilter] = useState('All');
  const [ageFilter, setAgeFilter] = useState('All Ages');
  const [wishlist, setWishlist] = useState([]);
  const [quickView, setQuickView] = useState(null);
  const [cart, setCart] = useState(0);
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [paws, setPaws] = useState([]);
  const [hours, minutes, seconds] = useCountdown();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let last = 0;
    const onMove = (event) => {
      setCursor({ x: event.clientX, y: event.clientY });
      const now = Date.now();
      if (now - last > 90) {
        last = now;
        const id = now;
        setPaws((items) => [...items.slice(-8), { id, x: event.clientX, y: event.clientY }]);
        setTimeout(() => setPaws((items) => items.filter((item) => item.id !== id)), 850);
      }
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const filteredProducts = products.filter((product) => {
    const petMatch = petFilter === 'All' || product.pet === petFilter;
    const ageMatch = ageFilter === 'All Ages' || product.age === ageFilter || product.age === 'All Ages';
    const searchMatch = product.name.toLowerCase().includes(query.toLowerCase()) || product.pet.toLowerCase().includes(query.toLowerCase());
    return petMatch && ageMatch && searchMatch;
  });

  const toggleWishlist = (id) => {
    setWishlist((items) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id]));
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-cocoa transition-colors duration-500 dark:bg-[#15110f] dark:text-[#fff6ea]">
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <div className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
        <motion.div className="cursor-orb" animate={{ x: cursor.x - 15, y: cursor.y - 15 }} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
        {paws.map((paw) => (
          <motion.div key={paw.id} className="absolute text-sm text-caramel" initial={{ x: paw.x, y: paw.y, opacity: 0.55, scale: 0.4, rotate: -20 }} animate={{ y: paw.y - 22, opacity: 0, scale: 1, rotate: 12 }} exit={{ opacity: 0 }}>
            <PawPrint size={16} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <Navbar dark={dark} setDark={setDark} cart={cart} query={query} setQuery={setQuery} menuOpen={menuOpen} setMenuOpen={setMenuOpen} wishlist={wishlist} />
      <FloatingCart cart={cart} />
      <Chatbot open={chatOpen} setOpen={setChatOpen} />

      <main>
        <section id="home" className="relative min-h-[94vh] overflow-hidden bg-paw-radial px-4 pt-28 dark:bg-none dark:bg-[#1f1713] sm:px-6 lg:px-8">
          <div className="soft-grid absolute inset-0 opacity-40" />
          <motion.div style={{ y: heroY }} className="absolute left-8 top-32 hidden rounded-full bg-white/70 p-4 shadow-card backdrop-blur md:block dark:bg-white/10">
            <Bone className="text-caramel" />
          </motion.div>
          <motion.div animate={{ y: [0, -18, 0], rotate: [0, 4, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute right-8 top-36 hidden rounded-[2rem] bg-mint/60 p-5 shadow-card backdrop-blur lg:block">
            <PawPrint className="text-paw" fill="currentColor" />
          </motion.div>
          <div className="mx-auto grid max-w-7xl items-center gap-10 pb-16 lg:grid-cols-[1fr_.92fr]">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative z-10">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-extrabold text-paw shadow-card backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-peach">
                <Sparkles size={17} />
                Soft launch: 25% off cozy essentials
              </div>
              <h1 className="max-w-4xl font-display text-[clamp(3.2rem,8vw,8rem)] font-bold leading-[0.86] tracking-normal">
                Everything Your <span className="text-caramel">Fluffy Friend</span> Loves
              </h1>
              <p className="mt-7 max-w-2xl text-lg font-semibold leading-8 text-[#76513a] dark:text-[#f1d9c5] sm:text-xl">
                Premium dog and cat food, cozy beds, joyful toys, gentle grooming, and everyday pet care picked for happier little rituals at home.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#shop" className="glow-button group">
                  Shop Now <ShoppingBag size={19} className="transition group-hover:rotate-[-8deg]" />
                </a>
                <a href="#categories" className="secondary-button group">
                  Explore Collection <ArrowRight size={19} className="transition group-hover:translate-x-1" />
                </a>
              </div>
              <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
                {['4.9 rating', '24h dispatch', 'Vet reviewed'].map((item) => (
                  <div key={item} className="rounded-[1.4rem] border border-white/70 bg-white/60 px-4 py-3 text-center text-sm font-extrabold shadow-card backdrop-blur dark:border-white/10 dark:bg-white/10">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="relative z-10 mx-auto w-full max-w-[620px]">
              <div className="hero-blob absolute inset-8" />
              <div className="relative overflow-hidden rounded-[3rem] border border-white/80 bg-white/45 p-3 shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
                <img src={logo} alt="MR Fluffy pet store logo with dog and cat" className="aspect-[1.55/1] w-full rounded-[2.3rem] object-cover" />
              </div>
              <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity }} className="floating-card left-[-.5rem] top-[18%]">
                <Dog className="text-caramel" /> Happy pup kit
              </motion.div>
              <motion.div animate={{ y: [0, 14, 0] }} transition={{ duration: 4.5, repeat: Infinity }} className="floating-card bottom-[10%] right-[-.5rem]">
                <Cat className="text-sky-600" /> Cat nap sale
              </motion.div>
            </motion.div>
          </div>
          <WaveDivider />
        </section>

        <OfferStrip hours={hours} minutes={minutes} seconds={seconds} />
        <TrustedBy />
        <Categories />
        <BestSellers
          products={filteredProducts}
          petFilter={petFilter}
          setPetFilter={setPetFilter}
          ageFilter={ageFilter}
          setAgeFilter={setAgeFilter}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          setQuickView={setQuickView}
          setCart={setCart}
        />
        <WhyChoose />
        <PetCareTips />
        <Testimonials />
        <Gallery />
        <Recommendations setQuickView={setQuickView} />
        <Newsletter />
      </main>

      <Footer />
      <QuickView product={quickView} onClose={() => setQuickView(null)} setCart={setCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />
    </div>
  );
}

function Loader() {
  return (
    <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-cream dark:bg-[#15110f]" exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <div className="text-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }} className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-peach/30 text-caramel shadow-glow">
          <PawPrint size={38} fill="currentColor" />
        </motion.div>
        <p className="mt-4 font-display text-2xl font-bold">Preparing fluffy joy...</p>
      </div>
    </motion.div>
  );
}

function Navbar({ dark, setDark, cart, query, setQuery, menuOpen, setMenuOpen, wishlist }) {
  const suggestions = ['dog food', 'cat treats', 'pet beds'].filter((item) => query && item.includes(query.toLowerCase()));
  const links = ['Home', 'Shop', 'Categories', 'About Us', 'Pet Care Tips', 'Contact'];
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border border-white/70 bg-white/72 px-4 py-3 shadow-card backdrop-blur-2xl dark:border-white/10 dark:bg-[#231a15]/78">
        <a href="#home" className="flex items-center gap-3">
          <img src={logo} alt="MR Fluffy" className="h-12 w-12 rounded-full object-cover ring-2 ring-white" />
          <span className="font-display text-2xl font-bold">MR Fluffy</span>
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase().replaceAll(' ', '-')}`} className="rounded-full px-3 py-2 text-sm font-extrabold text-paw/80 transition hover:bg-peach/20 hover:text-paw dark:text-cream">
              {link}
            </a>
          ))}
        </div>
        <div className="relative hidden min-w-[210px] md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-paw/50" size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search treats..." className="w-full rounded-full border border-biscuit/80 bg-cream/80 py-2 pl-10 pr-4 text-sm font-bold outline-none transition focus:ring-4 focus:ring-peach/30 dark:border-white/10 dark:bg-white/10" />
          {suggestions.length > 0 && (
            <div className="absolute top-12 w-full rounded-2xl bg-white p-2 shadow-card dark:bg-[#251b16]">
              {suggestions.map((item) => (
                <button key={item} className="block w-full rounded-xl px-3 py-2 text-left text-sm font-bold hover:bg-peach/20">{item}</button>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <IconButton label="Wishlist"><Heart size={19} />{wishlist.length > 0 && <span className="badge-dot">{wishlist.length}</span>}</IconButton>
          <IconButton label="Cart"><ShoppingBag size={19} />{cart > 0 && <span className="badge-dot">{cart}</span>}</IconButton>
          <button aria-label="Toggle dark mode" onClick={() => setDark(!dark)} className="icon-button">{dark ? <Sun size={19} /> : <Moon size={19} />}</button>
          <button aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)} className="icon-button lg:hidden"><Menu size={20} /></button>
        </div>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="mx-3 mt-3 rounded-[2rem] bg-white p-4 shadow-card dark:bg-[#221915] lg:hidden">
            {links.map((link) => <a key={link} onClick={() => setMenuOpen(false)} href={`#${link.toLowerCase().replaceAll(' ', '-')}`} className="block rounded-2xl px-4 py-3 font-extrabold hover:bg-peach/20">{link}</a>)}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function IconButton({ children, label }) {
  return <button aria-label={label} title={label} className="icon-button relative">{children}</button>;
}

function OfferStrip({ hours, minutes, seconds }) {
  return (
    <section id="shop" className="bg-[#2d2019] px-4 py-4 text-cream dark:bg-black">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row">
        <div className="flex items-center gap-3 font-extrabold"><Zap className="text-peach" fill="currentColor" /> Limited-time cuddle cart: save up to 25% on best sellers</div>
        <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-display text-xl font-bold"><Clock3 size={19} /> {hours}:{minutes}:{seconds}</div>
      </div>
    </section>
  );
}

function TrustedBy() {
  return (
    <section className="section py-12">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-sm font-extrabold uppercase tracking-[.24em] text-paw/60 dark:text-cream/60">Trusted by pet-loving homes and care partners</p>
        <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-5">
          {['Paw Pantry', 'Cozy Tails', 'Vet Circle', 'Happy Walks', 'Whisker Club'].map((brand) => (
            <div key={brand} className="rounded-[1.4rem] border border-biscuit/60 bg-white/60 px-4 py-5 text-center font-display text-xl font-bold shadow-card backdrop-blur dark:border-white/10 dark:bg-white/5">{brand}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section id="categories" className="section">
      <SectionHeader eyebrow="Curated for dogs and cats" title="Featured Categories" text="Everything is organized around real daily pet moments, from breakfast bowls to bedtime nests." />
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(([title, Icon, text, price], index) => (
          <Reveal key={title} delay={index * 0.04}>
            <motion.article whileHover={{ y: -8, rotate: index % 2 ? -1 : 1 }} className="category-card group">
              <div className="mb-8 flex items-start justify-between">
                <div className="grid h-16 w-16 place-items-center rounded-[1.4rem] bg-gradient-to-br from-peach/70 to-sky/50 text-paw shadow-glow"><Icon size={30} /></div>
                <span className="rounded-full bg-mint/50 px-3 py-1 text-sm font-extrabold text-paw">{price}</span>
              </div>
              <h3 className="font-display text-3xl font-bold">{title}</h3>
              <p className="mt-2 text-base font-semibold text-paw/70 dark:text-cream/70">{text}</p>
              <ArrowRight className="mt-5 transition group-hover:translate-x-2" />
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function BestSellers({ products, petFilter, setPetFilter, ageFilter, setAgeFilter, wishlist, toggleWishlist, setQuickView, setCart }) {
  return (
    <section id="best-sellers" className="section bg-white/45 dark:bg-white/[.03]">
      <SectionHeader eyebrow="Trending products" title="Best Sellers" text="High-repeat favorites with warm reviews, gentle ingredients, and little sparks of joy." />
      <div className="mx-auto mb-8 flex max-w-7xl flex-col justify-between gap-4 rounded-[1.6rem] border border-biscuit/60 bg-cream/70 p-3 shadow-card backdrop-blur dark:border-white/10 dark:bg-white/5 md:flex-row">
        <FilterGroup value={petFilter} setValue={setPetFilter} options={['All', 'Dogs', 'Cats']} />
        <FilterGroup value={ageFilter} setValue={setAgeFilter} options={['All Ages', 'Puppy', 'Adult', 'Senior']} />
      </div>
      <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} wishlist={wishlist} toggleWishlist={toggleWishlist} setQuickView={setQuickView} setCart={setCart} />
        ))}
      </div>
    </section>
  );
}

function FilterGroup({ value, setValue, options }) {
  return <div className="flex flex-wrap gap-2">{options.map((option) => <button key={option} onClick={() => setValue(option)} className={`rounded-full px-4 py-2 text-sm font-extrabold transition ${value === option ? 'bg-caramel text-white shadow-glow' : 'bg-white text-paw hover:bg-peach/20 dark:bg-white/10 dark:text-cream'}`}>{option}</button>)}</div>;
}

function ProductCard({ product, index, wishlist, toggleWishlist, setQuickView, setCart }) {
  return (
    <Reveal delay={index * 0.04}>
      <motion.article whileHover={{ y: -8 }} className="product-card group">
        <div className="relative overflow-hidden rounded-[1.8rem]">
          <img src={product.image} alt={product.name} className="aspect-[1.08/1] w-full object-cover transition duration-700 group-hover:scale-110" />
          <span className="absolute left-4 top-4 rounded-full bg-white/82 px-3 py-1 text-sm font-extrabold text-paw backdrop-blur">{product.tag}</span>
          <button aria-label="Toggle wishlist" onClick={() => toggleWishlist(product.id)} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/85 text-paw shadow-card backdrop-blur transition hover:scale-110">
            <Heart size={20} fill={wishlist.includes(product.id) ? '#ff8a68' : 'none'} />
          </button>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-1 text-caramel">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} fill="currentColor" />)}<span className="ml-2 text-sm font-extrabold text-paw/60 dark:text-cream/60">{product.rating}</span></div>
          <h3 className="mt-3 font-display text-2xl font-bold">{product.name}</h3>
          <p className="mt-1 text-sm font-extrabold text-paw/60 dark:text-cream/60">{product.pet} · {product.age}</p>
          <div className="mt-4 flex items-end justify-between gap-3">
            <div><span className="font-display text-3xl font-bold">${product.price}</span><span className="ml-2 font-bold text-paw/40 line-through">${product.old}</span></div>
            <button onClick={() => setQuickView(product)} className="rounded-full bg-sky/45 px-4 py-2 text-sm font-extrabold text-paw transition hover:bg-sky">Quick View</button>
          </div>
          <button onClick={() => setCart((count) => count + 1)} className="sticky-cart mt-4 w-full"><ShoppingBag size={18} /> Add to Cart</button>
        </div>
      </motion.article>
    </Reveal>
  );
}

function WhyChoose() {
  const items = [
    ['Premium Quality', BadgeCheck],
    ['Vet Approved', ShieldCheck],
    ['Fast Delivery', Truck],
    ['Safe Ingredients', Leaf],
    ['Happy Pets Guarantee', PackageCheck]
  ];
  return (
    <section id="about-us" className="section">
      <SectionHeader eyebrow="Why choose MR Fluffy" title="Care That Feels Personal" text="A friendly shopping experience with products selected for comfort, nutrition, safety, and everyday delight." />
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-5">
        {items.map(([title, Icon], index) => (
          <Reveal key={title} delay={index * 0.05}>
            <motion.div whileHover={{ y: -8 }} className="rounded-[2rem] border border-biscuit/60 bg-white/60 p-5 text-center shadow-card backdrop-blur dark:border-white/10 dark:bg-white/5">
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.2 }} className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-peach/35 text-caramel"><Icon /></motion.div>
              <h3 className="mt-4 font-display text-xl font-bold">{title}</h3>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PetCareTips() {
  return (
    <section id="pet-care-tips" className="section bg-[#fff1df] dark:bg-white/[.03]">
      <SectionHeader eyebrow="Tiny guides, big comfort" title="Pet Care Tips" text="Helpful notes written in the same voice as the store: practical, cheerful, and genuinely caring." />
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
        {tips.map(([title, text], index) => (
          <Reveal key={title} delay={index * 0.05}>
            <article className="tip-card">
              <div className="mb-10 h-48 overflow-hidden rounded-[1.6rem]"><img src={petPhotos[index]} alt={title} className="h-full w-full object-cover transition duration-700 hover:scale-110" /></div>
              <h3 className="font-display text-3xl font-bold">{title}</h3>
              <p className="mt-3 font-semibold leading-7 text-paw/70 dark:text-cream/70">{text}</p>
              <button className="mt-5 inline-flex items-center gap-2 font-extrabold text-caramel">Read tip <ArrowRight size={17} /></button>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section">
      <SectionHeader eyebrow="Customer reviews" title="Loved By Pet Parents" text="Warm words from homes that shop for comfort, taste, and trust." />
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
        {[
          ['Maya R.', 'My rescue dog is picky, but the Sunday Roast kibble disappeared in minutes. The packaging felt thoughtful without feeling overpriced.'],
          ['Leo P.', 'The cat bed is absurdly soft. My tabby claimed it before I removed the tag, which is the most honest review possible.'],
          ['Anika S.', 'Fast delivery, clean ingredients, and a site that makes shopping feel calm. MR Fluffy gets the little details right.']
        ].map(([name, quote], index) => (
          <Reveal key={name} delay={index * 0.05}>
            <div className="glass-card">
              <div className="mb-5 flex text-caramel">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} fill="currentColor" />)}</div>
              <p className="text-lg font-semibold leading-8">"{quote}"</p>
              <div className="mt-6 flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-full bg-peach/40 font-display text-xl font-bold">{name[0]}</div><strong>{name}</strong></div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="section bg-white/45 dark:bg-white/[.03]">
      <SectionHeader eyebrow="Instagram gallery" title="Fluffy Moments" text="A soft, joyful feed of dogs, cats, cozy homes, and little rituals worth sharing." />
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-4">
        {petPhotos.map((src, index) => (
          <Reveal key={src} delay={index * 0.04}>
            <div className={`gallery-tile ${index === 0 || index === 3 ? 'md:row-span-2' : ''}`}>
              <img src={src} alt="Cute dog or cat in a cozy lifestyle setting" className="h-full w-full object-cover transition duration-700 hover:scale-110" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Recommendations({ setQuickView }) {
  return (
    <section className="section">
      <div className="mx-auto grid max-w-7xl gap-6 rounded-[2.5rem] bg-[#2d2019] p-6 text-cream shadow-card md:grid-cols-[.8fr_1.2fr] md:p-10">
        <div>
          <div className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 font-extrabold"><Sparkles size={18} className="mr-2 text-peach" /> Personalized picks</div>
          <h2 className="font-display text-4xl font-bold sm:text-5xl">Built around your pet's little preferences.</h2>
          <p className="mt-4 text-lg font-semibold text-cream/75">Use filters, smart search, and quick view to find better fits for age, appetite, coat, and play style.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {products.slice(0, 2).map((product) => (
            <button key={product.id} onClick={() => setQuickView(product)} className="rounded-[2rem] bg-white/10 p-3 text-left transition hover:bg-white/15">
              <img src={product.image} alt={product.name} className="aspect-[1.35/1] rounded-[1.4rem] object-cover" />
              <h3 className="mt-3 font-display text-2xl font-bold">{product.name}</h3>
              <p className="font-bold text-peach">${product.price} · {product.pet}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section id="contact" className="section pb-8">
      <div className="mx-auto overflow-hidden rounded-[3rem] bg-gradient-to-br from-peach via-cream to-mint p-6 shadow-glow dark:from-[#4b2a20] dark:via-[#251812] dark:to-[#20372d] md:p-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_.75fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 font-extrabold text-paw"><PawPrint size={18} fill="currentColor" /> Join the MR Fluffy Family</div>
            <h2 className="font-display text-5xl font-bold sm:text-6xl">Good deals, gentle tips, happy tails.</h2>
            <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-paw/75 dark:text-cream/75">Get cozy product drops, limited-time offers, care reminders, and birthday treats for your dog or cat.</p>
            <form onSubmit={(event) => event.preventDefault()} className="mt-7 flex max-w-xl flex-col gap-3 rounded-full bg-white/70 p-2 shadow-card backdrop-blur sm:flex-row dark:bg-white/10">
              <input aria-label="Email address" placeholder="your@email.com" className="min-h-12 flex-1 rounded-full bg-transparent px-5 font-bold outline-none" />
              <button className="glow-button justify-center">Sign Up <Check size={18} /></button>
            </form>
          </div>
          <motion.div animate={{ y: [0, -14, 0], rotate: [0, 1.5, 0] }} transition={{ duration: 5, repeat: Infinity }} className="relative mx-auto max-w-sm rounded-[2.5rem] bg-white/45 p-4 shadow-card backdrop-blur dark:bg-white/10">
            <img src={logo} alt="MR Fluffy pet graphic" className="rounded-[2rem]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-4 pb-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.5rem] bg-[#2d2019] p-8 text-cream md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3"><img src={logo} alt="MR Fluffy" className="h-14 w-14 rounded-full object-cover" /><span className="font-display text-3xl font-bold">MR Fluffy</span></div>
          <p className="mt-4 max-w-sm font-semibold leading-7 text-cream/70">A warm pet lifestyle store for everyday food, comfort, play, and care.</p>
        </div>
        <FooterList title="Quick Links" items={['Home', 'Shop', 'Categories', 'Pet Care Tips']} />
        <FooterList title="Support" items={['Contact', 'Delivery', 'Returns', 'Vet Promise']} />
        <div>
          <h3 className="font-display text-2xl font-bold">Say hello</h3>
          <p className="mt-3 font-semibold text-cream/70">hello@mrfluffy.pet<br />+1 (555) 014-PAWS</p>
          <div className="mt-5 flex gap-2">{['IG', 'TT', 'YT'].map((social) => <button key={social} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 font-extrabold transition hover:bg-peach hover:text-paw">{social}</button>)}</div>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, items }) {
  return <div><h3 className="font-display text-2xl font-bold">{title}</h3><div className="mt-3 grid gap-2">{items.map((item) => <a key={item} href="#" className="font-semibold text-cream/70 transition hover:text-peach">{item}</a>)}</div></div>;
}

function SectionHeader({ eyebrow, title, text }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="font-extrabold uppercase tracking-[.22em] text-caramel">{eyebrow}</p>
      <h2 className="mt-3 font-display text-5xl font-bold leading-none sm:text-6xl">{title}</h2>
      <p className="mt-4 text-lg font-semibold leading-8 text-paw/70 dark:text-cream/70">{text}</p>
    </div>
  );
}

function Reveal({ children, delay = 0 }) {
  return <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.55, delay }}>{children}</motion.div>;
}

function FloatingCart({ cart }) {
  return <motion.button aria-label="Floating cart" whileTap={{ scale: 0.94 }} className="fixed bottom-5 right-5 z-40 grid h-16 w-16 place-items-center rounded-full bg-caramel text-white shadow-glow"><ShoppingBag />{cart > 0 && <span className="badge-dot">{cart}</span>}</motion.button>;
}

function Chatbot({ open, setOpen }) {
  return (
    <div className="fixed bottom-24 right-5 z-40">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.96 }} className="mb-3 w-[min(90vw,340px)] rounded-[2rem] border border-white/70 bg-white/85 p-4 shadow-card backdrop-blur dark:border-white/10 dark:bg-[#211814]/90">
            <div className="flex items-center justify-between"><strong className="font-display text-2xl">Fluffy Finder</strong><button aria-label="Close pet recommendation chat" onClick={() => setOpen(false)} className="icon-button"><X size={18} /></button></div>
            <div className="mt-4 rounded-2xl bg-peach/20 p-4 font-semibold leading-7">Tell me your pet's age, size, and favorite activity. I can suggest food, toys, grooming picks, or cozy beds.</div>
            <div className="mt-3 flex gap-2"><input placeholder="My cat is senior..." className="min-w-0 flex-1 rounded-full border border-biscuit/70 bg-cream px-4 py-2 font-bold outline-none dark:border-white/10 dark:bg-white/10" /><button className="icon-button bg-caramel text-white"><ArrowRight size={18} /></button></div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setOpen(!open)} className="glow-button rounded-full px-5"><Bot size={19} /> AI Pet Picks</button>
    </div>
  );
}

function QuickView({ product, onClose, setCart, wishlist, toggleWishlist }) {
  return (
    <AnimatePresence>
      {product && (
        <motion.div className="fixed inset-0 z-[80] grid place-items-center bg-black/45 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div initial={{ y: 30, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, scale: 0.96 }} className="grid max-h-[92vh] w-full max-w-4xl overflow-auto rounded-[2.5rem] bg-cream p-4 shadow-card dark:bg-[#1e1612] md:grid-cols-2">
            <img src={product.image} alt={product.name} className="h-full min-h-[320px] rounded-[2rem] object-cover" />
            <div className="p-5">
              <button aria-label="Close quick view" onClick={onClose} className="icon-button ml-auto"><X size={20} /></button>
              <span className="rounded-full bg-mint/60 px-3 py-1 text-sm font-extrabold text-paw">{product.tag}</span>
              <h2 className="mt-4 font-display text-5xl font-bold">{product.name}</h2>
              <p className="mt-3 text-lg font-semibold leading-8 text-paw/70 dark:text-cream/70">A high-repeat favorite selected for happy routines, safe ingredients, and delightful everyday use.</p>
              <div className="mt-5 flex items-center gap-2 text-caramel">{Array.from({ length: 5 }).map((_, i) => <Star key={i} fill="currentColor" />)} <strong className="text-paw dark:text-cream">{product.rating}</strong></div>
              <div className="mt-6 font-display text-4xl font-bold">${product.price}</div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button onClick={() => setCart((count) => count + 1)} className="glow-button justify-center"><ShoppingBag size={18} /> Add to Cart</button>
                <button onClick={() => toggleWishlist(product.id)} className="secondary-button justify-center"><Heart size={18} fill={wishlist.includes(product.id) ? '#ff8a68' : 'none'} /> Wishlist</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function WaveDivider() {
  return <svg className="absolute bottom-[-1px] left-0 w-full text-cream dark:text-[#15110f]" viewBox="0 0 1440 96" fill="none" preserveAspectRatio="none" aria-hidden="true"><path d="M0 44L60 49.3C120 55 240 65 360 58.7C480 52 600 28 720 20C840 12 960 20 1080 34.7C1200 49 1320 70 1380 80L1440 90V96H0V44Z" fill="currentColor" /></svg>;
}

createRoot(document.getElementById('root')).render(<App />);
