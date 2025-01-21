import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';
const email = import.meta.env.PUBLIC_EMAIL; // A
const currentYear = new Date().getFullYear();

export const headerData = {
  links: [
    {
      text: 'Homes',
      links: [
        {
          text: 'SaaS',
          href: getPermalink('/homes/saas'),
        },
        {
          text: 'Startup',
          href: getPermalink('/homes/startup'),
        },
        {
          text: 'Mobile App',
          href: getPermalink('/homes/mobile-app'),
        },
        {
          text: 'Personal',
          href: getPermalink('/homes/personal'),
        },
      ],
    },
    {
      text: 'Pages',
      links: [
        {
          text: 'Features (Anchor Link)',
          href: getPermalink('/#features'),
        },
        {
          text: 'Services',
          href: getPermalink('/services'),
        },
        {
          text: 'Pricing',
          href: getPermalink('/pricing'),
        },
        {
          text: 'About us',
          href: getPermalink('/about'),
        },
        {
          text: 'Contact',
          href: getPermalink('/contact'),
        },
        {
          text: 'Terms',
          href: getPermalink('/terms'),
        },
        {
          text: 'Privacy policy',
          href: getPermalink('/privacy'),
        },
      ],
    },
    {
      text: 'Landing',
      links: [
        {
          text: 'Lead Generation',
          href: getPermalink('/landing/lead-generation'),
        },
        {
          text: 'Long-form Sales',
          href: getPermalink('/landing/sales'),
        },
        {
          text: 'Click-Through',
          href: getPermalink('/landing/click-through'),
        },
        {
          text: 'Product Details (or Services)',
          href: getPermalink('/landing/product'),
        },
        {
          text: 'Coming Soon or Pre-Launch',
          href: getPermalink('/landing/pre-launch'),
        },
        {
          text: 'Subscription',
          href: getPermalink('/landing/subscription'),
        },
      ],
    },
    {
      text: 'Blog',
      links: [
        {
          text: 'Blog List',
          href: getBlogPermalink(),
        },
        {
          text: 'Article',
          href: getPermalink('get-started-website-with-astro-tailwind-css', 'post'),
        },
        {
          text: 'Article (with MDX)',
          href: getPermalink('markdown-elements-demo-post', 'post'),
        },
        {
          text: 'Category Page',
          href: getPermalink('tutorials', 'category'),
        },
        {
          text: 'Tag Page',
          href: getPermalink('astro', 'tag'),
        },
      ],
    },
    {
      text: 'Widgets',
      href: '#',
    },
  ],
  actions: [{ text: 'Download', href: 'https://github.com/onwidget/astrowind', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: 'Quick Links',
      links: [
        { text: 'Home', href: '/' },
        { text: 'Portfolio', href: '/blog' },
        { text: 'About', href: '/about' },
        { text: 'Resume', href: '/resume' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
    { text: 'Impressum', href: getPermalink('/impressum') },
  ],
  socialLinks: [
    {
      ariaLabel: 'E-Mail',
      icon: 'tabler:mail',
      href: `mailto:${email}`,
      target: '_blank',
    },
    {
      ariaLabel: 'Linkedin',
      icon: 'tabler:brand-linkedin',
      href: 'https://linkedin.com/in/lylehmann',
      target: '_blank',
    },
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/lylehmann' },
    {
      ariaLabel: 'RSS',
      icon: 'tabler:rss',
      href: getAsset('/rss.xml'),
    },
  ],
  footNote: `&copy; 2024-${currentYear} Lukas Yair Lehmann. All rights reserved.`,
};

export const navigation = {
  secondaryLinks: [
    {
      text: 'Terms',
      href: getPermalink('/terms'),
    },
    {
      text: 'Privacy policy',
      href: getPermalink('/privacy'),
    },
  ],
  socialLinks: [
    {
      ariaLabel: 'Linkedin',
      icon: 'tabler:brand-linkedin',
      href: 'https://linkedin.com/in/lylehmann',
      target: '_blank',
    },
    {
      ariaLabel: 'RSS',
      icon: 'tabler:rss',
      href: getAsset('/rss.xml'),
    },
    {
      ariaLabel: 'Github',
      icon: 'tabler:brand-github',
      href: 'https://github.com/lylehmann',
    },
  ],
  footNote: `
    &copy; ${currentYear} Lukas Yair Lehmann. Template made by <a class="text-blue-600 underline dark:text-muted" href="https://onwidget.com/"> onWidget</a> · All rights reserved.
  `,
};

export interface Props {
  links: { text: string; href: string }[];
  secondaryLinks: { text: string; href: string }[];
  socialLinks: (
    | { ariaLabel: string; icon: string; href: string; target: string }
    | { ariaLabel: string; icon: string; href: string; target?: undefined }
  )[];
  footNote: string;
}
