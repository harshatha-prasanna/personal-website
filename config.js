const config = {
  name: "Harshatha Prasanna",
  tagline: "Data Science Student @ UC San Diego.<br />More interested in why than in what.",
  email: "hprasanna@ucsd.edu",

  links: {
    github: "https://github.com/harshatha-prasanna",
    linkedin: "https://linkedin.com/in/harshatha-prasanna",
  },

  projects: [

    {
      title: "Diabetes Risk Analysis",
      description: "Built and optimized an XGBoost classifier on CDC NHANES data from 12,000+ participants, achieving 96% cross-validated accuracy with a 26% increase in recall over baseline.",
      tech: ["XGBoost", "Scikit-learn", "Python", "K-Fold CV"],
      github: "https://github.com/harshatha-prasanna/DS3-Project",
      poster: "/thumbnails/ds3_thumbnail.png",
      thumbnail: "/thumbnails/ds3_thumbnail.png",
    },

    {
      title: "Recipe Virality Analysis",
      description: "Can we predict whether a recipe will go viral before it happens? Built a Random Forest classifier on 83,000+ Food.com recipes, achieving 0.81 F1-score on the viral class by identifying early engagement as the key signal.",
      tech: ["Python", "Scikit-learn", "Pandas", "Random Forest", "Permutation Testing"],
      live: "https://harshatha-prasanna.github.io/recipe-virality-analysis/",
      thumbnail: "/thumbnails/recipe_viral_thumbnail.png",
    },

    {
      title: "Friends TV Reboot Planner",
      description: "Analyzed 236 episodes of Friends using inferential statistics — bootstrapping, hypothesis testing, and linear regression — to identify top-performing directors, examine gender representation in dialogue, and model viewership trends to inform a data-driven reboot pitch.",
      tech: ["Python", "babypandas", "NumPy", "Matplotlib", "Scikit-learn"],
      github: "https://github.com/harshatha-prasanna/friends-reboot-analysis",
      thumbnail: "/thumbnails/friends_thumbnail.png",
    },

    {
      title: "Song Recommendation Engine",
      description: "Built a music recommendation system using TF-IDF for lyric similarity and audio feature matching to recommend songs based on a given input track.",
      tech: ["Python", "TF-IDF", "Scikit-learn", "Spotipy", "Jupyter Notebook"],
      github: "https://github.com/harshatha-prasanna/Song-Recommendation-Engine",
      thumbnail: "/thumbnails/song_rec_thumbnail.png",
    },

    {
      title: "Gender Income Inequality in the ACS Dataset",
      description: "Analyzed 1.6M+ records from the 2018 American Community Survey to investigate a persistent 29% gender wage gap that held across every variable tested.",
      tech: ["Python", "Pandas", "Fairlearn", "Seaborn", "EDA"],
      github: "https://github.com/harshatha-prasanna/gender_data_bias",
      thumbnail: "/thumbnails/gender_bias_thumbnail.png",
    },



  ],

  certs: [
    {
      title: "Developing Explainable AI (XAI)",
      issuer: "Duke University",
      date: "Apr 2026",
      url: "https://coursera.org/share/df67eb774b0ae4672698ca42fc6d440d",
      logo: "https://www.google.com/s2/favicons?domain=duke.edu&sz=128",
    },
    {
      title: "Google Prompting Essentials Specialization",
      issuer: "Google",
      date: "Feb 2026",
      url: "https://coursera.org/share/5be063f2fcede26fc5a1b11c31362676",
      logo: "https://www.google.com/s2/favicons?domain=google.com&sz=128",
    },
    {
      title: "Introduction to Deep Learning and Neural Networks with Keras",
      issuer: "IBM",
      date: "Jan 2026",
      url: "https://coursera.org/share/aa9b41b02da8b7bee200711e1a4f3a9a",
      logo: "https://www.google.com/s2/favicons?domain=ibm.com&sz=128",
    },
    {
      title: "Machine Learning with Python",
      issuer: "IBM",
      date: "Nov 2025",
      url: "https://coursera.org/share/95d9c106cd848620d09afaca0e5a9476",
      logo: "https://www.google.com/s2/favicons?domain=ibm.com&sz=128",
    },
    {
      title: "SQL for Data Science",
      issuer: "UC Davis",
      date: "Sep 2025",
      url: "https://coursera.org/share/5ef18dcdff1078fd1132f1e7b3dd43f9",
      logo: "https://www.google.com/s2/favicons?domain=ucdavis.edu&sz=128",
    },
  ],

skills: [
    { axis: "Python", value: 9 },
    { axis: "Machine Learning", value: 7 },
    { axis: "Data Wrangling", value: 8 },
    { axis: "Statistics", value: 7 },
    { axis: "SQL", value: 7 },
    { axis: "Data Visualization", value: 8 },
  ],

  resume: "/resume.pdf",

  philosophy: {
    quote: "Data is not ground truth. It is a lens shaped by who collected it, how it was cleaned, and what we chose to ask.",
  },

about: {
    paragraph: "I am a second-year Data Science and Cognitive Science student at UCSD. My main focus is on using data and AI to drive business growth, building automated workflows, accelerating GTM decisions, and making data infrastructure actually useful for the people using it. On the side, I have a genuine interest in ML observability and explainable AI. That interest started with a 1.6M-record income dataset that could show a 29% wage gap but could not explain why it existed. That gap between visibility and actionability still fascinates me.",
    personalFacts: [
      "Fluent in English and Tamil. I went to Tamil school growing up and chose it as my second language in high school.",
      "I have been playing the flute since 2017 and picked up the Carnatic flute in 2022.",
      "Almost always listening to R&B, hip hop, or Tamil music. The widget in the corner knows.",
      "I journal and hike. Both are how I decompress.",
      "I wear a necklace with my name in Tamil. There is a story behind it. If you ever meet me in person, ask me about it.",
    ],
  },

  contact: {
    formspreeId: "mwvyvgja",
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