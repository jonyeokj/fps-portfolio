export type Experience = {
  id: string;
  header: string;
  subtext: string[];
  date?: string;
  logo?: string;
};

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-tiktok',
    header: 'Software Engineer Intern, TikTok',
    subtext: [
      'Built and shipped features used by millions on PC and mobile, focusing on speed and reliability.',
      'Integrated APIs and improved data flow, keeping high-traffic platforms running smoothly.',
      'Broke down pages into reusable micro-frontend modules to make dev work faster and easier.',
    ],
    date: 'Feb 2024 - Oct 2024',
    logo: '/assets/tiktok.svg',
  },
  {
    id: 'exp-aucto',
    header: 'Part-time Backend Engineer, Aucto Marketplace',
    subtext: [
      'Revamped Golang testing by replacing stub databases with mock SQL tests, running 50+ cases to improve reliability and efficiency.',
      'Bolstered platform security by detecting and addressing SQL injection vulnerabilities.',
    ],
    date: 'Jul 2023 - Nov 2023',
    logo: '/assets/aucto.svg',
  },
  {
    id: 'exp-psa',
    header: 'Data Engineer Intern, PSA Singapore',
    subtext: [
      'Authored code documentation in Splunk and Python for existing data transformation procedures at Tuas Port.',
      'Cleaned and analyzed datasets to identify port inefficiencies using pandas, and presented findings in monthly meetings with PowerBI.',
    ],
    date: 'May 2022 - Aug 2022',
    logo: '/assets/psaWhite.svg'
  },
];

export const PROJECTS: Experience[] = [
  {
    id: 'proj-lastminprep',
    header: 'LastMinPrep - Collaborative Coding Platform',
    subtext: [
      'Built a real-time collaborative coding site with multi-language execution in isolated Docker sandboxes.',
      'Used Next.js, RabbitMQ, and AWS ECS microservices for scalable, low-latency performance.',
      'Deprecated due to AWS resource costs.',
    ],
    date: 'Next.js, RabbitMQ, Docker',
  },
  {
    id: 'proj-findtune',
    header: 'Findtune for Spotify - Song Recommendation Web App',
    subtext: [
      "Created a React app using Spotify's API to recommend songs by mood and tempo.",
      'Added advanced search, audio previews, and deployed on Vercel with serverless functions.',
      'https://findtune.vercel.app/',
    ],
    date: 'React, Express',
  },
  {
    id: 'proj-fps',
    header: 'FPS Portfolio',
    subtext: [
      'Built an interactive first-person 3D portfolio using React Three Fiber and Three.js.',
      'Implemented pointer lock controls, shooting mechanics, and dynamic scene interactions.',
      'You are using it right now!',
    ],
    date: 'React Three Fiber, Three.js',
  },
];
