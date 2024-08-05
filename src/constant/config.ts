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
    // {
    //   title: 'Blogs',
    //   href: '/blogs',
    // },
  ],
};
