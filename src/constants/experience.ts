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
  {
    header: 'Part-time Backend Engineer, Aucto Marketplace',
    date: 'Jul 2023 - Nov 2023',
    subtext: [
      'Revamped Golang testing by replacing stub databases with mock SQL tests, running 50+ cases to improve reliability and efficiency.',
      'Bolstered platform security by detecting and addressing SQL injection vulnerabilities.',
    ],
  },
  {
    header: 'Data Engineer Intern, PSA Singapore',
    date: 'May 2022 - Aug 2022',
    subtext: [
      'Authored code documentation in Splunk and Python for existing data transformation procedures at Tuas Port.',
      'Cleaned and analyzed datasets to identify port inefficiencies using pandas, and presented findings in monthly meetings with PowerBI.',
    ],
  },
];

export const PROJECTS: Experience[] = [
  {
    header: 'LastMinPrep - Collaborative Coding Platform',
    date: 'Next.js, RabbitMQ, Docker',
    subtext: [
      'Built a real-time collaborative coding site with multi-language execution in isolated Docker sandboxes.',
      'Used Next.js, RabbitMQ, and AWS ECS microservices for scalable, low-latency performance.',
      'Deprecated due to AWS resource costs.',
    ],
  },
  {
    header: 'Findtune for Spotify - Song Recommendation Web App',
    date: 'React, Express',
    subtext: [
      "Created a React app using Spotify's API to recommend songs by mood and tempo.",
      'Added advanced search, audio previews, and deployed on Vercel with serverless functions.',
      'https://findtune.vercel.app/',
    ],
  },
  {
    header: 'FPS Portfolio',
    date: 'React Three Fiber, Three.js',
    subtext: [
      'Built an interactive first-person 3D portfolio using React Three Fiber and Three.js.',
      'Implemented pointer lock controls, shooting mechanics, and dynamic scene interactions.',
      'You are using it right now!',
    ],
  },
];
