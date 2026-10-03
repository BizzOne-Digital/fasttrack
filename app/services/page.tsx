import { getContent } from '../../lib/content';
import { servicesDefaults } from '../../lib/pageDefaults';
import ServicesPageClient from './ServicesPageClient';

export default async function ServicesPage() {
  const { items } = await getContent('services', servicesDefaults);
  return <ServicesPageClient services={items} />;
}
