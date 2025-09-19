export type Project = {
  title: string;
  description: string;
  tech: string[];
  link?: string;
};

export type UserProfile = {
  name: string;
  role: string;
  tagline: string;
  email?: string;
  website?: string;
  location?: string;
  avatarColor?: string;
  accentPrimary?: string;
  accentSecondary?: string;
  projects: Project[];
};

export const defaultProfile: UserProfile = {
  name: 'Alex Parker',
  role: 'Full-Stack Developer',
  tagline: 'Building delightful web experiences',
  email: 'alex@example.com',
  website: 'alex.dev',
  location: 'Remote',
  avatarColor: '#2563EB',
  accentPrimary: '#2563EB',
  accentSecondary: '#F59E0B',
  projects: [
    {
      title: 'Portfolio Generator',
      description: 'A toolkit to build animated portfolio videos using Remotion.',
      tech: ['React', 'Remotion', 'TypeScript'],
      link: 'https://github.com',
    },
    {
      title: 'E-commerce Dashboard',
      description: 'Modern admin dashboard with real-time analytics and charts.',
      tech: ['Next.js', 'Tailwind', 'Supabase'],
    },
  ],
};
