import { getContent } from '../../lib/content';
import { galleryDefaults } from '../../lib/pageDefaults';
import GalleryPageClient from './GalleryPageClient';

export default async function GalleryPage() {
  const { items } = await getContent('gallery', galleryDefaults);
  return <GalleryPageClient items={items} />;
}
