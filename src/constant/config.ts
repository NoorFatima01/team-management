export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'TeamManager',
  description: 'A system to manage your team and projects effectively.',
  MainNav: [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Events',
      href: '/all-events',
    },
    {
      title: 'Projects',
      href: '/projects',
    },
    {
      title: 'Teams',
      href: '/teams',
    },
    {
      title: 'Inbox',
      href: '/inbox',
    },
  ],
};
