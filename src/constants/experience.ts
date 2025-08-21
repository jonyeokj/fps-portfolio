export type Experience = {
  id: string;
  header: string;
  subtext: string[];
  date?: string;
  logo?: string;
  threshold?: number;
};

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-psa',
    header: 'Data Engineer Intern, PSA Singapore',
    subtext: [
      'Cleaned data pipelines in Splunk and Python, documenting them extensively.',
      'Analyzed datasets to spot inefficiencies and shared results with PowerBI.',
      'Learned the value of data manipulation and clear presentation in making findings useful.',
    ],
    date: 'May 2022 - Aug 2022',
    logo: '/assets/psaWhite.svg',
    threshold: 10,
  },
  {
    id: 'exp-tiktok',
    header: 'Software Engineer Intern, TikTok',
    subtext: [
      'Built and shipped features used by millions on PC and mobile.',
      'Worked closely with stakeholders to refine requirements and deliver said features.',
      'Discovered how wide frontend can be, from UIs and performance to modular design and developer tooling.',
    ],
    date: 'Feb 2024 - Oct 2024',
    logo: '/assets/tiktok.svg',
    threshold: 50,
  },
  {
    id: 'exp-aucto',
    header: 'Part-time Backend Engineer, Aucto Marketplace',
    subtext: [
      'Set up SQL mocks in Go to test backend services without relying on a real database.',
      "Fixed SQL injection issues and strengthened the platform's security.",
      'Learned how data actually flows through the backend, from requests to services to the database.',
    ],
    date: 'Jul 2023 - Nov 2023',
    logo: '/assets/aucto.svg',
    threshold: 30,
  },
];

export const PROJECTS: Experience[] = [
  {
    id: 'proj-lastminprep',
    header: 'LastMinPrep',
    subtext: [
      'Built a real-time collaborative coding site with multi-language execution in isolated Docker sandboxes.',
      'Built with a microservices architecture to support questions, matchmaking, and collaboration.',
      'Eventually deprecated the project due to AWS resource costs.',
    ],
    date: 'Next.js, RabbitMQ, Docker',
    threshold: 40,
  },
  {
    id: 'proj-findtune',
    header: 'Findtune for Spotify',
    subtext: [
      "Created a React app using Spotify's API to recommend songs based on user selected songs.",
      'Implemented search and music playback directly through the API, then deployed the app on Vercel with serverless functions.',
      'Live at: https://findtune.vercel.app/',
    ],
    date: 'React, Express',
    logo: '/assets/spotify.svg',
    threshold: 20,
  },
  {
    id: 'proj-fps',
    header: 'FPS Portfolio',
    subtext: [
      'Built an interactive first-person 3D portfolio, because I love games.',
      'Used custom hooks, global state stores, and interactive scene design to bring everything together.',
      'You are using it right now!',
    ],
    date: 'React Three Fiber, Three.js',
  },
];

export const ABOUT_ME: Experience = {
  id: 'about-me',
  header: 'About Me',
  subtext: [
    "Hello, I'm Jonathan Yeo, an NUS Computer Science undergraduate graduating in Dec 2025.",
    'I enjoy building things and working with software, and hope to keep growing as a developer.',
    'This portfolio is inspired by my love for FPS games, namely Valorant and Marvel Rivals!',
  ],
};
