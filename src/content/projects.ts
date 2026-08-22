import type { CareerLens } from "../config/site";

export type ProjectArea =
  | "Full-stack"
  | "Backend"
  | "Machine Learning"
  | "NLP"
  | "Optimization"
  | "Game";

export type ProjectCategory =
  | "Full-stack"
  | "Game / Full-stack"
  | "Machine Learning"
  | "Machine Learning / Optimization"
  | "NLP";

export type Project = {
  id: string;
  name: string;
  description: string;
  role: string;
  category: ProjectCategory;
  areas: ProjectArea[];
  technologies: string[];
  highlights: string[];
  problem: string;
  solution: string;
  architecture: string[];
  decisions: string[];
  challenges: string[];
  result: string;
  repository?: string;
  secondaryRepository?: string;
  demo?: string;
  verification: string;
  lensWeight: Record<CareerLens, number>;
  visual: "auction" | "cards" | "rag" | "forecast" | "optimizer" | "nlp";
};

export const projectFilters: ("All" | ProjectArea)[] = [
  "All",
  "NLP",
  "Machine Learning",
  "Full-stack",
  "Game",
  "Optimization",
  "Backend",
];

export const projects: Project[] = [
  {
    id: "reddit",
    name: "Reddit Comments Analysis Model",
    description:
      "NLP pipeline for collecting, annotating, and modeling Reddit comment value with reproducible train, validation, and test splits.",
    role: "I contributed to the collection, labeling, adjudication, and baseline-modeling pipeline.",
    category: "NLP",
    areas: ["NLP", "Machine Learning"],
    technologies: ["Python", "PRAW", "Pandas", "scikit-learn", "Excel"],
    highlights: [
      "Collected up to 2,000 recent r/technology comments and retained 1,676 unique comments.",
      "Split annotation work into eight dataset files with duplicate handling for agreement checks.",
      "Compared random baseline, logistic regression, and random forest classifiers.",
    ],
    problem:
      "Training a comment-value classifier needs a repeatable collection process, annotation guidelines, adjudicated labels, and baselines before stronger NLP models are useful.",
    solution:
      "The model repository stores annotation outputs, train/validation/test splits, and baseline model reports so the classifier can be reviewed from raw labels through measured output.",
    architecture: [
      "PRAW collection",
      "Excel annotation splits",
      "Adjudicated labels",
      "Train/validation/test data",
      "Baseline classifiers",
    ],
    decisions: [
      "Split the dataset into multiple annotation files to distribute review work.",
      "Use duplicated comments across files to support agreement analysis.",
      "Start with simple baselines before moving to more complex NLP modeling.",
    ],
    challenges: [
      "Keeping annotation work consistent across contributors.",
      "Classifying nuanced comment value with small labeled data.",
    ],
    result:
      "Public output reports 0.3717 logistic-regression test accuracy and 0.4052 random-forest test accuracy on 269 test examples.",
    repository: "https://github.com/Figo-Li/reddit-comments-analysis-model",
    verification:
      "Verified from public model repository README, training data, and baseline results file.",
    lensWeight: { software: 3, data: 10 },
    visual: "nlp",
  },
  {
    id: "gin-rummy",
    name: "Gin Rummy Twist",
    description:
      "Dozenal Gin Rummy web game with a Next.js frontend, Flask API, room creation, match state, and custom card logic.",
    role: "I worked across room flow, card state, frontend interaction, and backend match endpoints.",
    category: "Game / Full-stack",
    areas: ["Game", "Full-stack", "Backend"],
    technologies: [
      "Next.js",
      "TypeScript",
      "Redux",
      "Flask",
      "Python",
      "Tailwind CSS",
      "Jest",
    ],
    highlights: [
      "Implemented a 64-card dozenal deck and score conversion logic.",
      "Built create/join room flows with polling for second-player and game-start status.",
      "Added frontend tests for scoring, knocking, and laying-off game logic.",
    ],
    problem:
      "The project adapts familiar two-player Gin Rummy into a dozenal version with online room flow and responsive game interactions.",
    solution:
      "The public source pairs a Next.js client with a Flask server that creates matches, tracks in-memory rooms, deals cards, records moves, and exposes endpoints for pass, knock, draw, and next-round state.",
    architecture: [
      "Next.js routes",
      "Redux game store",
      "Flask API",
      "Match state",
      "Dozenal card logic",
    ],
    decisions: [
      "Represent the custom deck explicitly so game logic and card assets share the same source model.",
      "Use room IDs to connect host and guest sessions through backend polling endpoints.",
      "Keep scoring utilities in frontend logic with focused tests for the custom rules.",
    ],
    challenges: [
      "Coordinating two players through asynchronous room and move state.",
      "Adapting standard Gin Rummy scoring into a base-twelve card system.",
    ],
    result:
      "Public source verifies a custom game frontend, Flask match API, card assets, and unit tests. The linked deployment currently returns HTTP 500 and is not shown as a live demo.",
    repository: "https://github.com/Figo-Li/gin-rummy-twist",
    verification:
      "Verified from public repository README, source tree, Flask app, match model, frontend pages, package manifest, and local HTTP check of the listed homepage.",
    lensWeight: { software: 9, data: 3 },
    visual: "cards",
  },
  {
    id: "unemployment",
    name: "Unemployment Rate Prediction Model",
    description:
      "Machine learning system for short-term Canadian unemployment forecasting from multi-source economic indicators.",
    role: "I contributed to preprocessing, model training, evaluation, and saved artifacts in this collaborative data/ML project.",
    category: "Machine Learning",
    areas: ["Machine Learning"],
    technologies: [
      "Python",
      "TensorFlow",
      "Keras",
      "scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
    ],
    highlights: [
      "Integrated Statistics Canada unemployment, CPI, GDP, wage, population, and participation-rate data.",
      "Compared a bidirectional LSTM model against a linear regression baseline.",
      "Used a 12-month sliding window and 2-month-ahead forecast horizon.",
    ],
    problem:
      "Economic forecasting requires aligning multiple time-series indicators before models can make useful short-term unemployment predictions.",
    solution:
      "The repository includes raw and filtered datasets, preprocessing scripts, training and testing entry points, saved model artifacts, and plots for model evaluation.",
    architecture: [
      "Raw economic CSVs",
      "Preprocessing scripts",
      "Feature scaling",
      "LSTM and baseline models",
      "Evaluation plots",
    ],
    decisions: [
      "Use cyclical month encoding to represent seasonality.",
      "Use robust and standard scaling to prepare economic indicators for model training.",
      "Keep a linear regression baseline for interpretability alongside the LSTM.",
    ],
    challenges: [
      "Synchronizing datasets with different source structures and monthly coverage.",
      "Avoiding overfitting in a relatively small economic time series.",
    ],
    result:
      "Public docs describe Canada-wide data from 2003-2024, 2-month forecasting, saved LSTM/linear models, and evaluation plots.",
    repository: "https://github.com/Figo-Li/unemployment-rate-predict-model",
    verification:
      "Verified from public repository README, project description, requirements, datasets, and model artifacts.",
    lensWeight: { software: 4, data: 9 },
    visual: "forecast",
  },
  {
    id: "startup-optimizer",
    name: "Startup Time Optimizer Model",
    description:
      "Machine learning and optimization project for analyzing startup duration signals and turning model output into practical improvement priorities.",
    role: "I frame the modeling workflow around feature preparation, evaluation, and optimization-oriented reporting.",
    category: "Machine Learning / Optimization",
    areas: ["Machine Learning", "Optimization"],
    technologies: [
      "Python",
      "Pandas",
      "scikit-learn",
      "Feature Engineering",
      "Model Evaluation",
    ],
    highlights: [
      "Frames startup delay as a measurable prediction and prioritization problem.",
      "Keeps feature preparation, training, and evaluation steps explicit for reproducibility.",
      "Connects model output to optimization recommendations instead of only reporting scores.",
    ],
    problem:
      "Slow startup paths can hide across many small delays, so the useful model needs both prediction and diagnosis.",
    solution:
      "The project presents startup-time signals as features, trains prediction baselines, and organizes results around the variables most likely to reduce startup duration.",
    architecture: [
      "Timing data",
      "Feature preparation",
      "ML model",
      "Evaluation",
      "Optimization report",
    ],
    decisions: [
      "Keep the optimizer model tied to interpretable startup-time signals.",
      "Report recommendations as ranked improvement priorities.",
      "Use the repository link as the source of truth for implementation details.",
    ],
    challenges: [
      "Separating noisy timing variance from signals that can guide real optimization work.",
      "Keeping model output actionable for engineering decisions.",
    ],
    result:
      "The project is presented as an optimization-focused ML case study with a dedicated source link for review.",
    repository: "https://github.com/Figo-Li/startup-time-optimizer-model",
    verification:
      "Linked to the requested GitHub repository slug; public metadata was not visible during this edit.",
    lensWeight: { software: 5, data: 8 },
    visual: "optimizer",
  },
  {
    id: "hammerly",
    name: "Hammerly",
    description:
      "Auction platform with a Vite/React frontend and Express/SQLite backend for listings, bids, watchlists, and JWT auth.",
    role: "I built across UI pages, API routes, authentication, and persistence.",
    category: "Full-stack",
    areas: ["Full-stack", "Backend"],
    technologies: [
      "React",
      "Vite",
      "TypeScript",
      "Express.js",
      "SQLite",
      "JWT",
      "Swagger",
    ],
    highlights: [
      "Implemented auction browsing, search, bidding, watchlist, create, end, and delete flows.",
      "Built Express API routes with JWT-protected operations and SQLite persistence.",
      "Added Swagger documentation for the backend API surface.",
    ],
    problem:
      "Bidding workflows need clear item discovery, authenticated user actions, and server-side rules for auction state.",
    solution:
      "The repository separates a React/Vite client from an Express TypeScript API. The client calls an auction API module, while backend routes validate bids, watchlist changes, and seller-owned auction mutations.",
    architecture: [
      "React/Vite UI",
      "Auction API module",
      "Express routes",
      "SQLite database",
      "Swagger docs",
    ],
    decisions: [
      "Keep frontend and backend packages separate to make each runtime easier to develop and validate.",
      "Use JWT bearer tokens for protected bid, watchlist, and seller operations.",
      "Use SQLite for a lightweight local persistence layer in Version 1 of the project.",
    ],
    challenges: [
      "Maintaining auction state rules across bid placement, ownership checks, and ended auctions.",
      "Keeping list, detail, related-item, and watchlist views aligned with the same API model.",
    ],
    result:
      "Public source verifies a working full-stack foundation with TypeScript UI code, Express routes, SQLite helpers, auth, and API documentation.",
    repository: "https://github.com/Figo-Li/Hammerly",
    verification:
      "Verified from public repository README, package manifests, Express routes, and frontend API/page source.",
    lensWeight: { software: 10, data: 4 },
    visual: "auction",
  },
];
