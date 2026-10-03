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
import { homeTeamDefaults } from '../lib/pageDefaults';

export default async function HomePage() {
  const { items: team } = await getContent('home-team', homeTeamDefaults);

  return (
    <>
      <Hero />
      <Ticker />
      <About />
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
