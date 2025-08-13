export type Experience = {
  header: string;
  date?: string;
  subtext: string[];
};

export const EXPERIENCES: Experience[] = [
  {
    header: 'Software Engineer Intern, TikTok',
    date: 'Feb 2024 - Oct 2024',
    subtext: [
      'Built and shipped features used by millions on PC and mobile, focusing on speed and reliability.',
      'Integrated APIs and improved data flow, keeping high-traffic platforms running smoothly.',
      'Broke down pages into reusable micro-frontend modules to make dev work faster and easier.',
    ],
  },
];
