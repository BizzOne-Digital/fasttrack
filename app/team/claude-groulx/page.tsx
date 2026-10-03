import { getContent } from '../../../lib/content';
import { claudeGroulxDefaults } from '../../../lib/pageDefaults';
import ClaudeGroulxClient from './ClaudeGroulxClient';

export default async function ClaudeGroulxPage() {
  const data = await getContent('claude-groulx', claudeGroulxDefaults);
  return <ClaudeGroulxClient {...data} />;
}
