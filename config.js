const config = {
  name: "Harshatha Prasanna",
  tagline: "Data Science Student @ UC San Diego.<br />Curious about how models explain themselves.",
  email: "hprasanna@ucsd.edu",

  links: {
    github: "https://github.com/harshatha-prasanna",
    linkedin: "https://linkedin.com/in/harshatha-prasanna",
  },

  projects: [
    {
      title: "Gender Income Inequality in the ACS Dataset",
      description: "Analyzed 1.6M+ records from the 2018 American Community Survey to investigate a persistent 29% gender wage gap that held across every variable tested.",
      tech: ["Python", "Pandas", "Fairlearn", "Seaborn", "EDA"],
      github: "https://github.com/harshatha-prasanna",
      thumbnail: null,
    },
    {
      title: "Diabetes Risk Analysis",
      description: "Built and optimized an XGBoost classifier on CDC NHANES data from 12,000+ participants, achieving 96% cross-validated accuracy with a 26% increase in recall over baseline.",
      tech: ["XGBoost", "Scikit-learn", "Python", "K-Fold CV"],
      github: "https://github.com/harshatha-prasanna",
      thumbnail: null,
    },
  ],

  certs: [
    { title: "Developing Explainable AI (XAI)", issuer: "Duke University", date: "Apr 2026", url: "#" },
    { title: "Google Prompting Essentials Specialization", issuer: "Google", date: "Feb 2026", url: "#" },
    { title: "Introduction to Deep Learning and Neural Networks with Keras", issuer: "IBM", date: "2026", url: "#" },
    { title: "Machine Learning with Python", issuer: "IBM", date: "2025", url: "#" },
    { title: "SQL for Data Science", issuer: "UC Davis", date: "2025", url: "#" },
  ],

  skills: [
    { axis: "Machine Learning", value: 7 },
    { axis: "Data Wrangling", value: 9 },
    { axis: "Explainability / XAI", value: 5 },
    { axis: "Statistics", value: 8 },
    { axis: "Python", value: 9 },
    { axis: "Communication", value: 8 },
  ],

  resume: "/resume.pdf",

  philosophy: {
    quote: "Data is not ground truth. It is a lens shaped by who collected it, how it was cleaned, and what we chose to ask.",
  },

  about: {
    paragraph: "I am a second-year Data Science and Cognitive Science student at UCSD. My work sits at the intersection of two things: building AI systems that are transparent and explainable, and using data to drive real business outcomes. I got into explainability through a 1.6M-record income dataset where the data showed a 29% wage gap but could not explain why. That gap between visibility and actionability is what pulled me toward ML observability and XAI. On the other side, I am genuinely excited by how data and automation can power growth, from building smarter GTM workflows to making revenue decisions faster and more reproducible.",
    personalFacts: [
      "Fluent in English and Tamil. I went to Tamil school growing up and chose it as my second language in high school.",
      "I have been playing the flute since 2019 and picked up the Carnatic flute in 2022.",
      "Almost always listening to R&B, hip hop, or Tamil music. The widget in the corner knows.",
      "I journal and hike. Both help me think more clearly than staring at a screen.",
      "I wear a necklace with my name in Tamil. There is a story behind it. If you ever meet me in person, ask me about it.",
    ],
  },

  contact: {
    formspreeId: "YOUR_FORMSPREE_ID",
  },

  nowPlaying: {
    refreshInterval: 30000,
  },

  location: {
    city: "San Diego",
    lat: "32.7157",
    lon: "-117.1611",
  },
};

export default config;