import { getContent } from '../../lib/content';
import { teamDefaults } from '../../lib/pageDefaults';
import TeamPageClient from './TeamPageClient';

export default async function TeamPage() {
  const { founders } = await getContent('team', teamDefaults);
  return <TeamPageClient founders={founders} />;
}
