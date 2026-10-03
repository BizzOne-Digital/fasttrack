import Hero from './components/Hero';
import Ticker from './components/Ticker';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import CTA from './components/CTA';
import Contact from './components/Contact';
import { getContent } from '../lib/content';
import { homeTeamDefaults, homeHeroDefaults, homeAboutDefaults } from '../lib/pageDefaults';

export default async function HomePage() {
  const [{ items: team }, hero, about] = await Promise.all([
    getContent('home-team', homeTeamDefaults),
    getContent('home-hero', homeHeroDefaults),
    getContent('home-about', homeAboutDefaults),
  ]);

  return (
    <>
      <Hero {...hero} />
      <Ticker />
      <About {...about} />
      <WhyChooseUs />
      <Services />
      <Gallery />
      <Testimonials />
      <Team team={team} />
      <CTA />
      <Contact />
    </>
  );
}
