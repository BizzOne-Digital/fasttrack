// Describes, for each editable page, which top-level arrays/fields exist
// and how the generic admin editor should render them.

export type FieldType = 'text' | 'textarea' | 'image' | 'list';

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
}

export interface ArrayFieldDef {
  key: string; // top-level key in content.data, e.g. "founders"
  label: string;
  itemLabel: (item: any, index: number) => string;
  fields: FieldDef[];
  newItem: Record<string, unknown>;
}

export interface PageConfig {
  slug: string;
  title: string;
  folder: 'products' | 'gallery' | 'pages' | 'misc';
  arrays?: ArrayFieldDef[];
  fields?: FieldDef[]; // flat top-level fields (not inside an array)
}

export const pageConfigs: PageConfig[] = [
  {
    slug: 'home-hero',
    title: 'Homepage Hero Section',
    folder: 'pages',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow Text', type: 'text' },
      { key: 'titleLine1', label: 'Headline Line 1', type: 'text' },
      { key: 'titleLine2', label: 'Headline Line 2 (red)', type: 'text' },
      { key: 'titleLine3', label: 'Headline Line 3', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { key: 'bgImg', label: 'Background Photo', type: 'image' },
      { key: 'profileImg', label: 'Featured Profile Photo', type: 'image' },
      { key: 'profileName', label: 'Featured Profile Name', type: 'text' },
      { key: 'profileRole', label: 'Featured Profile Role', type: 'text' },
    ],
  },
  {
    slug: 'home-about',
    title: 'Homepage About Section',
    folder: 'pages',
    fields: [
      { key: 'label', label: 'Section Label', type: 'text' },
      { key: 'titleLine1', label: 'Headline Line 1', type: 'text' },
      { key: 'titleLine2', label: 'Headline Line 2 (red)', type: 'text' },
      { key: 'para1', label: 'Paragraph 1', type: 'textarea' },
      { key: 'para2', label: 'Paragraph 2', type: 'textarea' },
      { key: 'img', label: 'Photo', type: 'image' },
      { key: 'badgeNumber', label: 'Floating Badge Number', type: 'text' },
      { key: 'badgeLabel', label: 'Floating Badge Label', type: 'text' },
    ],
  },
  {
    slug: 'team',
    title: 'Team Page (/team)',
    folder: 'pages',
    arrays: [
      {
        key: 'founders',
        label: 'Founders',
        itemLabel: (item) => item.name || 'Founder',
        fields: [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
          { key: 'tag', label: 'Tag (corner label)', type: 'text' },
          { key: 'bio', label: 'Bio', type: 'textarea' },
          { key: 'quote', label: 'Quote', type: 'textarea' },
          { key: 'img', label: 'Photo', type: 'image' },
          { key: 'badge', label: 'Badge (optional)', type: 'image' },
        ],
        newItem: { name: '', role: '', tag: '', bio: '', quote: '', img: '', stats: [] },
      },
    ],
  },
  {
    slug: 'home-team',
    title: 'Homepage Team Section',
    folder: 'pages',
    arrays: [
      {
        key: 'items',
        label: 'Team Members',
        itemLabel: (item) => item.name || 'Member',
        fields: [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
          { key: 'bio', label: 'Bio', type: 'textarea' },
          { key: 'img', label: 'Photo', type: 'image' },
        ],
        newItem: { name: '', role: '', bio: '', img: '' },
      },
    ],
  },
  {
    slug: 'services',
    title: 'Services Page (/services)',
    folder: 'products',
    arrays: [
      {
        key: 'items',
        label: 'Services',
        itemLabel: (item) => item.title || 'Service',
        fields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'tagline', label: 'Tagline', type: 'text' },
          { key: 'desc', label: 'Description', type: 'textarea' },
          { key: 'features', label: 'Features (one per line)', type: 'list' },
          { key: 'img', label: 'Photo', type: 'image' },
          { key: 'logo', label: 'Logo (optional)', type: 'image' },
        ],
        newItem: { title: '', tagline: '', desc: '', features: [], img: '' },
      },
    ],
  },
  {
    slug: 'gallery',
    title: 'Gallery Page (/gallery)',
    folder: 'gallery',
    arrays: [
      {
        key: 'items',
        label: 'Gallery Photos',
        itemLabel: (item) => item.label || 'Photo',
        fields: [
          { key: 'label', label: 'Label', type: 'text' },
          { key: 'cat', label: 'Category (Equipment / Training / Facility / Athletes)', type: 'text' },
          { key: 'src', label: 'Photo', type: 'image' },
        ],
        newItem: { src: '', label: '', cat: 'Equipment' },
      },
    ],
  },
  {
    slug: 'claude-groulx',
    title: "Claude Groulx Bio Page",
    folder: 'pages',
    fields: [
      { key: 'heroImg', label: 'Hero Background Photo', type: 'image' },
      { key: 'introImg', label: 'Intro Photo', type: 'image' },
      { key: 'intro1', label: 'Intro Paragraph 1', type: 'textarea' },
      { key: 'intro2', label: 'Intro Paragraph 2', type: 'textarea' },
      { key: 'email', label: 'Contact Email', type: 'text' },
      { key: 'phone', label: 'Contact Phone', type: 'text' },
    ],
  },
  {
    slug: 'contact',
    title: 'Contact Info (site-wide)',
    folder: 'misc',
    fields: [
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'phone', label: 'Phone', type: 'text' },
      { key: 'hours', label: 'Hours', type: 'text' },
    ],
  },
];
