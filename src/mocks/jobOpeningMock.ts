import { IJobOpeningDto } from '../app/dashboard/fact-check/models/dto/job-opening-dto.interface';

export const jobOpening: IJobOpeningDto[] = [
  {
    id: '1',
    name: {
      property: 'Name',
      value: 'Senior Full Stack Engineer at Zircuit',
    },
    description: {
      property: 'Description',
      value:
        'Zircuit is looking for a Full-Stack Engineer to develop and maintain DApps at the intersection of AI and blockchain, using technologies like JavaScript/TypeScript, React, NextJS, Node.js, Python, SQL, and AWS cloud services. The role offers remote work, a competitive salary, bonuses, flexible hours, and team retreats.',
    },
    content: {
      property: 'Content',
      value: [
        "Zircuit is looking for a Full-Stack Engineer. As a key player in our team, you'll be tasked with developing and maintaining DApps at the intersection of AI and blockchain.",
        'Your role is pivotal in blending front-end wizardry with robust back-end solutions, harnessing technologies like JavaScript/Typescript, React, NextJS, Node.js, Python, SQL, Postgres, MongoDB, alongside AWS main services. With a focus on scalability, high performance, and the exciting realm of blockchain and AI technologies, your work will directly contribute to our mission.',
        "You'll be part of an agile team, rapidly prototyping and developing innovative DApps in a dynamic environment with evolving requirements. You'll also play a key role in maintaining and improving existing systems.",
        '## Candidate Profile',
        '- Background in Computer Science or related field',
        '- 5+ years of full-stack development experience building high-performance, large-scale applications using technologies such as NextJS, React, and Python',
        '- Extensive knowledge of Javascript/Typescript',
        '- Blockchain and experience with wagmi.js, ether.js, and related libraries, including smart contracts interactions',
        '- Knowledge of SQL and Postgres, as well as non-relational databases (e.g., MongoDB)',
        '- Expertise in profiling and improving application performance',
        '- Strong testing skills',
        '- Comfortable with CI/CD pipelines, monitoring, and cloud platforms like AWS and Heroku',
        '- Detail-oriented mindset, willingness to learn, and quality-driven personality',
        '- Fluent English communication, both written and spoken',
        '- Partial overlap with the GST and EST time zones to ease team communication',
        '## Nice to Have',
        '- 1+ years experience in creating DeFi applications',
        '- Experience building LLM applications using AI/ML frameworks and libraries (e.g., TensorFlow, PyTorch).',
        '## Compensation & Perks',
        '- A competitive salary that matches your experience, plus performance bonuses and token grants',
        '- Work from anywhere, 100% remote, and flexible working hours',
        '- Generous paid time off, including maternity/paternity leave',
        '- Retirement/pension plan',
        '- Free gym membership, or any virtual alternative of your choice',
        '- Rent your own desk in a co-working space or work from anywhere at any time.',
        '- Join all-expenses-paid retreats in exotic/exclusive locations with the team',
      ],
    },
    avatar: {
      property: 'Avatar',
      value: 'http',
    },
    cover: {
      property: 'Cover',
      value: 'http',
    },
    roles: {
      property: 'Roles',
      //entity with type Role
      value: [
        {
          property: 'Role',
          value: {
            name: {
              property: 'Name',
              value: 'Full Stack Engineer',
            },
            description: {
              property: 'Description',
              value:
                'Senior Full Stack Engineer is an experienced and qualified web development professional who is proficient in both Frontend and BackEnd technologies. It plays a key role in the development, creation and maintenance of complex web applications.',
            },
          },
        },
      ],
    },
    skills: {
      property: 'Skills',
      value: [
        {
          property: 'Skill',
          value: {
            name: {
              property: 'Name',
              value: 'JavaScript',
            },
            description: {
              property: 'Description',
              value:
                'JavaScript is an interpreted programming language that is used to write frontend and backend parts of websites, as well as mobile applications.',
            },
          },
        },
        {
          property: 'Skill',
          value: {
            name: {
              property: 'Name',
              value: 'TypeScript',
            },
            description: {
              property: 'Description',
              value:
                'TypeScript is a programming language developed by Microsoft. It is based on JavaScript and is used for front-end development.',
            },
          },
        },
      ],
    },
    employmentTypes: {
      property: 'Employment Types',
      value: [
        {
          property: 'Employment Type',
          value: {
            name: {
              property: 'Name',
              value: 'Remote',
            },
            description: {
              property: 'Description',
              value:
                'Remote work is a form of work in which employees perform their duties outside of a traditional office, often from home or other locations.',
            },
          },
        },
        {
          property: 'Employment Type',
          value: {
            name: {
              property: 'Name',
              value: 'Full Time',
            },
            description: {
              property: 'Description',
              value: 'Full time is a full-time or permanent job.',
            },
          },
        },
      ],
    },
    project: {
      property: 'Project',
      value: {
        name: {
          property: 'Name',
          value: 'Zircuit',
        },
        description: {
          property: 'Description',
          value:
            'Zircuit is a fully EVM-compatible zero-knowledge rollup powering the limitless potential of web3.Backed by pioneering L2 research, the network’s unique hybrid architecture combines battle-tested infrastructure with zero-knowledge proofs to give developers the best of both worlds.',
        },
        avatar: {
          property: 'Avatar',
          value: 'http',
        },
        cover: {
          property: 'Cover',
          value: 'http',
        },
        website: {
          property: 'Web Site',
          value: 'http',
        },
        x: {
          property: 'X',
          value: 'http',
        },
      },
    },
    salaryMin: {
      property: 'Salary Min',
      value: 1000,
      currency: 'USD',
    },
    salaryMax: {
      property: 'Salary Max',
      value: 2000,
      currency: 'USD',
    },
    publishDate: {
      property: 'Publish Date',
      value: 'Feb 09, 2025',
    },
    location: {
      property: 'Location',
      value: {
        region: {
          property: 'Region',
          value: {
            name: {
              property: 'Name',
              value: 'Name',
            },
            description: {
              property: 'Description',
              value: 'Descript',
            },
          },
        },
        city: {
          property: 'City',
          value: {
            name: {
              property: 'Name',
              value: 'Name',
            },
            description: {
              property: 'Description',
              value: 'Descript',
            },
          },
        },
      },
    },
    relatedSpaces: {
      property: 'Related Spaces',
      value: [
        {
          property: 'Related Space',
          value: {
            name: {
              property: 'Name',
              value: 'Cripto',
            },
            description: {
              property: 'Description',
              value: 'Cripto Descript',
            },
          },
        },
      ],
    },
    webURL: {
      property: 'Web URL',
      value:
        'https://cryptojobslist.com/jobs/senior-full-stack-engineer-at-zircuit',
    },
  },
];

export const j2: IJobOpeningDto[] = [
  {
    id: '1',
    name: {
      property: 'Name',
      value: 'Senior Blockchain Developer',
    },
    description: {
      property: 'Description',
      value:
        'Looking for an experienced blockchain developer to join our DeFi project',
    },
    content: {
      property: 'Content',
      value: [
        'Join our innovative DeFi project',
        '## Requirements',
        '- 5+ years in blockchain development',
        '- Experience with Solidity and smart contracts',
      ],
    },
    roles: {
      property: 'Roles',
      value: [
        {
          property: 'Role',
          value: {
            name: {
              property: 'Name',
              value: 'Blockchain Developer',
            },
            description: {
              property: 'Description',
              value: 'Smart contract development and optimization',
            },
          },
        },
        {
          property: 'Role',
          value: {
            name: {
              property: 'Name',
              value: 'Team Lead',
            },
            description: {
              property: 'Description',
              value: 'Technical leadership and architecture decisions',
            },
          },
        },
      ],
    },
    skills: {
      property: 'Skills',
      value: [
        {
          property: 'Skill',
          value: {
            name: {
              property: 'Name',
              value: 'Solidity',
            },
            description: {
              property: 'Description',
              value: 'Smart contract development',
            },
          },
        },
        {
          property: 'Skill',
          value: {
            name: {
              property: 'Name',
              value: 'Ethereum',
            },
            description: {
              property: 'Description',
              value: 'Blockchain platform expertise',
            },
          },
        },
      ],
    },
    employmentTypes: {
      property: 'Employment Types',
      value: [
        {
          property: 'Employment Type',
          value: {
            name: {
              property: 'Name',
              value: 'Full-time',
            },
            description: {
              property: 'Description',
              value: '40 hours per week',
            },
          },
        },
        {
          property: 'Employment Type',
          value: {
            name: {
              property: 'Name',
              value: 'Remote',
            },
            description: {
              property: 'Description',
              value: 'Work from anywhere',
            },
          },
        },
      ],
    },
    project: {
      property: 'Project',
      value: {
        avatar: {
          property: 'Avatar',
          value:
            'https://trip.pref.kanagawa.jp/img/spots/photos/hero/bdaf10283fba793e0d5ab16d98941faa-1920x1080.jpg',
        },
        cover: {
          property: 'Cover',
          value:
            'https://trip.pref.kanagawa.jp/img/spots/photos/hero/bdaf10283fba793e0d5ab16d98941faa-1920x1080.jpg',
        },
        name: {
          property: 'Name',
          value: 'DeFi Protocol',
        },
        description: {
          property: 'Description',
          value: 'Next-generation decentralized finance protocol',
        },
        website: {
          property: 'Web Site',
          value: 'https://defi-protocol.example.com',
        },
        x: {
          property: 'X',
          value: 'https://x.com/defiprotocol',
        },
      },
    },
    salaryMin: {
      property: 'Salary Min',
      value: 120000,
      currency: 'USD',
    },
    salaryMax: {
      property: 'Salary Max',
      value: 180000,
      currency: 'USD',
    },
    publishDate: {
      property: 'Publish Date',
      value: 'Mar 15, 2024',
    },
    webURL: {
      property: 'Web URL',
      value: 'https://careers.defi-protocol.example.com/blockchain-developer',
    },
  },
  {
    id: '2',
    name: {
      property: 'Name',
      value: 'Frontend Web3 Developer',
    },
    description: {
      property: 'Description',
      value: 'Seeking a frontend developer with Web3 experience',
    },
    content: {
      property: 'Content',
      value: [
        'Build next-gen Web3 interfaces',
        '## What we offer',
        '- Competitive salary',
        '- Flexible working hours',
      ],
    },
    roles: {
      property: 'Roles',
      value: [
        {
          property: 'Role',
          value: {
            name: {
              property: 'Name',
              value: 'Frontend Developer',
            },
            description: {
              property: 'Description',
              value: 'Web3 interface development',
            },
          },
        },
      ],
    },
    skills: {
      property: 'Skills',
      value: [
        {
          property: 'Skill',
          value: {
            name: {
              property: 'Name',
              value: 'React',
            },
            description: {
              property: 'Description',
              value: 'Frontend framework',
            },
          },
        },
        {
          property: 'Skill',
          value: {
            name: {
              property: 'Name',
              value: 'Web3.js',
            },
            description: {
              property: 'Description',
              value: 'Blockchain interaction',
            },
          },
        },
      ],
    },
    employmentTypes: {
      property: 'Employment Types',
      value: [
        {
          property: 'Employment Type',
          value: {
            name: {
              property: 'Name',
              value: 'Contract',
            },
            description: {
              property: 'Description',
              value: '6-month contract',
            },
          },
        },
      ],
    },
    project: {
      property: 'Project',
      value: {
        avatar: {
          property: 'Avatar',
          value:
            'https://trip.pref.kanagawa.jp/img/spots/photos/hero/bdaf10283fba793e0d5ab16d98941faa-1920x1080.jpg',
        },
        cover: {
          property: 'Cover',
          value:
            'https://trip.pref.kanagawa.jp/img/spots/photos/hero/bdaf10283fba793e0d5ab16d98941faa-1920x1080.jpg',
        },
        name: {
          property: 'Name',
          value: 'NFT Marketplace',
        },
        description: {
          property: 'Description',
          value: 'Digital art NFT platform',
        },
        website: {
          property: 'Web Site',
          value: 'https://nft-market.example.com',
        },
        x: {
          property: 'X',
          value: 'https://x.com/nftmarket',
        },
      },
    },
    salaryMin: {
      property: 'Salary Min',
      value: 80000,
      currency: 'USD',
    },
    salaryMax: {
      property: 'Salary Max',
      value: 120000,
      currency: 'USD',
    },
    publishDate: {
      property: 'Publish Date',
      value: 'Apr 1, 2024',
    },
    webURL: {
      property: 'Web URL',
      value: 'https://careers.nft-market.example.com/frontend-developer',
    },
  },
  {
    id: '3',
    name: {
      property: 'Name',
      value: 'Blockchain Security Engineer',
    },
    description: {
      property: 'Description',
      value: 'Ensure security of blockchain applications',
    },
    content: {
      property: 'Content',
      value: [
        'Join our security team',
        '## Requirements',
        '- Smart contract auditing',
        '- Security best practices',
      ],
    },
    roles: {
      property: 'Roles',
      value: [
        {
          property: 'Role',
          value: {
            name: {
              property: 'Name',
              value: 'Security Engineer',
            },
            description: {
              property: 'Description',
              value: 'Smart contract security',
            },
          },
        },
      ],
    },
    skills: {
      property: 'Skills',
      value: [
        {
          property: 'Skill',
          value: {
            name: {
              property: 'Name',
              value: 'Smart Contract Security',
            },
            description: {
              property: 'Description',
              value: 'Security auditing',
            },
          },
        },
        {
          property: 'Skill',
          value: {
            name: {
              property: 'Name',
              value: 'Penetration Testing',
            },
            description: {
              property: 'Description',
              value: 'Security testing',
            },
          },
        },
      ],
    },
    employmentTypes: {
      property: 'Employment Types',
      value: [
        {
          property: 'Employment Type',
          value: {
            name: {
              property: 'Name',
              value: 'Full-time',
            },
            description: {
              property: 'Description',
              value: 'On-site position',
            },
          },
        },
      ],
    },
    project: {
      property: 'Project',
      value: {
        avatar: {
          property: 'Avatar',
          value:
            'https://pbs.twimg.com/profile_images/1683501992314798080/xl1POYLw_400x400.jpg',
        },
        cover: {
          property: 'Cover',
          value:
            'https://pbs.twimg.com/profile_banners/2244994945/1690213128/1500x500',
        },
        name: {
          property: 'Name',
          value: 'SecurityChain',
        },
        description: {
          property: 'Description',
          value: 'Blockchain security solutions',
        },
        website: {
          property: 'Web Site',
          value: 'https://security-chain.example.com',
        },
        x: {
          property: 'X',
          value: 'https://x.com/securitychain',
        },
      },
    },
    salaryMin: {
      property: 'Salary Min',
      value: 130000,
      currency: 'USD',
    },
    salaryMax: {
      property: 'Salary Max',
      value: 200000,
      currency: 'USD',
    },
    publishDate: {
      property: 'Publish Date',
      value: 'Jun 1, 2024',
    },
    webURL: {
      property: 'Web URL',
      value: 'https://careers.security-chain.example.com/security-engineer',
    },
  },
  {
    id: '4',
    name: {
      property: 'Name',
      value: 'Web3 Product Manager',
    },
    description: {
      property: 'Description',
      value: 'Lead product strategy and development for our Web3 platform',
    },
    content: {
      property: 'Content',
      value: [
        'Shape the future of decentralized applications',
        '## Key Responsibilities',
        '- Define product strategy and roadmap',
        '- Lead cross-functional teams',
        '- Drive user research and market analysis',
        '- Coordinate with blockchain developers',
      ],
    },
    roles: {
      property: 'Roles',
      value: [
        {
          property: 'Role',
          value: {
            name: {
              property: 'Name',
              value: 'Product Manager',
            },
            description: {
              property: 'Description',
              value: 'Strategic product leadership',
            },
          },
        },
        {
          property: 'Role',
          value: {
            name: {
              property: 'Name',
              value: 'Product Strategy',
            },
            description: {
              property: 'Description',
              value: 'Web3 product development',
            },
          },
        },
      ],
    },
    skills: {
      property: 'Skills',
      value: [
        {
          property: 'Skill',
          value: {
            name: {
              property: 'Name',
              value: 'Product Management',
            },
            description: {
              property: 'Description',
              value: 'Agile methodologies and product lifecycle',
            },
          },
        },
        {
          property: 'Skill',
          value: {
            name: {
              property: 'Name',
              value: 'Web3',
            },
            description: {
              property: 'Description',
              value: 'Blockchain ecosystem knowledge',
            },
          },
        },
        {
          property: 'Skill',
          value: {
            name: {
              property: 'Name',
              value: 'Data Analytics',
            },
            description: {
              property: 'Description',
              value: 'Product metrics and analytics',
            },
          },
        },
      ],
    },
    employmentTypes: {
      property: 'Employment Types',
      value: [
        {
          property: 'Employment Type',
          value: {
            name: {
              property: 'Name',
              value: 'Full-time',
            },
            description: {
              property: 'Description',
              value: 'Remote with occasional travel',
            },
          },
        },
      ],
    },
    project: {
      property: 'Project',
      value: {
        avatar: {
          property: 'Avatar',
          value:
            'https://trip.pref.kanagawa.jp/img/spots/photos/hero/bdaf10283fba793e0d5ab16d98941faa-1920x1080.jpg',
        },
        cover: {
          property: 'Cover',
          value:
            'https://trip.pref.kanagawa.jp/img/spots/photos/hero/bdaf10283fba793e0d5ab16d98941faa-1920x1080.jpg',
        },
        name: {
          property: 'Name',
          value: 'Web3 Platform X',
        },
        description: {
          property: 'Description',
          value: 'Next-generation decentralized platform',
        },
        website: {
          property: 'Web Site',
          value: 'https://web3platform.example.com',
        },
        x: {
          property: 'X',
          value: 'https://x.com/web3platform',
        },
      },
    },
    salaryMin: {
      property: 'Salary Min',
      value: 140000,
      currency: 'USD',
    },
    salaryMax: {
      property: 'Salary Max',
      value: 200000,
      currency: 'USD',
    },
    publishDate: {
      property: 'Publish Date',
      value: 'Mar 20, 2024',
    },
    webURL: {
      property: 'Web URL',
      value: 'https://careers.web3platform.example.com/product-manager',
    },
  },
  {
    id: '5',
    name: {
      property: 'Name',
      value: 'Smart Contract Auditor',
    },
    description: {
      property: 'Description',
      value: 'Conduct comprehensive security audits of smart contracts',
    },
    content: {
      property: 'Content',
      value: [
        'Ensure the security of blockchain applications',
        '## Responsibilities',
        '- Smart contract code review',
        '- Security vulnerability assessment',
        '- Best practices implementation',
        '- Audit report creation',
      ],
    },
    roles: {
      property: 'Roles',
      value: [
        {
          property: 'Role',
          value: {
            name: {
              property: 'Name',
              value: 'Security Auditor',
            },
            description: {
              property: 'Description',
              value: 'Smart contract security analysis',
            },
          },
        },
      ],
    },
    skills: {
      property: 'Skills',
      value: [
        {
          property: 'Skill',
          value: {
            name: {
              property: 'Name',
              value: 'Solidity',
            },
            description: {
              property: 'Description',
              value: 'Expert-level smart contract development',
            },
          },
        },
        {
          property: 'Skill',
          value: {
            name: {
              property: 'Name',
              value: 'Security Analysis',
            },
            description: {
              property: 'Description',
              value: 'Vulnerability assessment',
            },
          },
        },
      ],
    },
    employmentTypes: {
      property: 'Employment Types',
      value: [
        {
          property: 'Employment Type',
          value: {
            name: {
              property: 'Name',
              value: 'Contract',
            },
            description: {
              property: 'Description',
              value: 'Project-based work',
            },
          },
        },
      ],
    },
    project: {
      property: 'Project',
      value: {
        avatar: {
          property: 'Avatar',
          value:
            'https://trip.pref.kanagawa.jp/img/spots/photos/hero/bdaf10283fba793e0d5ab16d98941faa-1920x1080.jpg',
        },
        cover: {
          property: 'Cover',
          value:
            'https://trip.pref.kanagawa.jp/img/spots/photos/hero/bdaf10283fba793e0d5ab16d98941faa-1920x1080.jpg',
        },
        name: {
          property: 'Name',
          value: 'SecureChain Audits',
        },
        description: {
          property: 'Description',
          value: 'Leading blockchain security firm',
        },
        website: {
          property: 'Web Site',
          value: 'https://securechain.example.com',
        },
        x: {
          property: 'X',
          value: 'https://x.com/securechain',
        },
      },
    },
    salaryMin: {
      property: 'Salary Min',
      value: 160000,
      currency: 'USD',
    },
    salaryMax: {
      property: 'Salary Max',
      value: 250000,
      currency: 'USD',
    },
    publishDate: {
      property: 'Publish Date',
      value: 'May 1, 2024',
    },
    webURL: {
      property: 'Web URL',
      value: 'https://careers.securechain.example.com/auditor',
    },
  },
  {
    id: '6',
    name: {
      property: 'Name',
      value: 'Layer 2 Protocol Engineer',
    },
    description: {
      property: 'Description',
      value:
        'Design and implement Layer 2 scaling solutions for blockchain networks',
    },
    content: {
      property: 'Content',
      value: [
        'Build the future of blockchain scalability',
        '## Core Responsibilities',
        '- Develop ZK-rollup solutions',
        '- Optimize Layer 2 protocols',
        '- Implement cross-layer communication',
        '- Research scalability solutions',
      ],
    },
    roles: {
      property: 'Roles',
      value: [
        {
          property: 'Role',
          value: {
            name: {
              property: 'Name',
              value: 'Protocol Engineer',
            },
            description: {
              property: 'Description',
              value: 'Layer 2 development and optimization',
            },
          },
        },
      ],
    },
    skills: {
      property: 'Skills',
      value: [
        {
          property: 'Skill',
          value: {
            name: {
              property: 'Name',
              value: 'Zero Knowledge Proofs',
            },
            description: {
              property: 'Description',
              value: 'ZK-rollup implementation',
            },
          },
        },
        {
          property: 'Skill',
          value: {
            name: {
              property: 'Name',
              value: 'Rust',
            },
            description: {
              property: 'Description',
              value: 'Systems programming',
            },
          },
        },
        {
          property: 'Skill',
          value: {
            name: {
              property: 'Name',
              value: 'Distributed Systems',
            },
            description: {
              property: 'Description',
              value: 'Scalable architecture design',
            },
          },
        },
      ],
    },
    employmentTypes: {
      property: 'Employment Types',
      value: [
        {
          property: 'Employment Type',
          value: {
            name: {
              property: 'Name',
              value: 'Full-time',
            },
            description: {
              property: 'Description',
              value: 'Remote with occasional travel',
            },
          },
        },
      ],
    },
    project: {
      property: 'Project',
      value: {
        avatar: {
          property: 'Avatar',
          value:
            'https://trip.pref.kanagawa.jp/img/spots/photos/hero/bdaf10283fba793e0d5ab16d98941faa-1920x1080.jpg',
        },
        cover: {
          property: 'Cover',
          value:
            'https://trip.pref.kanagawa.jp/img/spots/photos/hero/bdaf10283fba793e0d5ab16d98941faa-1920x1080.jpg',
        },
        name: {
          property: 'Name',
          value: 'ScaleChain',
        },
        description: {
          property: 'Description',
          value: 'Leading Layer 2 scaling solution',
        },
        website: {
          property: 'Web Site',
          value: 'https://scalechain.example.com',
        },
        x: {
          property: 'X',
          value: 'https://x.com/scalechain',
        },
      },
    },
    salaryMin: {
      property: 'Salary Min',
      value: 180000,
      currency: 'USD',
    },
    salaryMax: {
      property: 'Salary Max',
      value: 280000,
      currency: 'USD',
    },
    publishDate: {
      property: 'Publish Date',
      value: 'Apr 10, 2024',
    },
    webURL: {
      property: 'Web URL',
      value: 'https://careers.scalechain.example.com/l2-engineer',
    },
  },
];
