import type { PersonalInterest } from "@/lib/assessment-options";

export type LearningGoal =
  | "Internship"
  | "Freelancing"
  | "Job"
  | "Startup"
  | "Clarity";

export type InterestArea = PersonalInterest;

export type ExperienceLevel = "Beginner" | "Intermediate" | "Advanced";
export type WorkStyle = "Solo" | "Team" | "Balanced";
export type MathComfort = "Low" | "Medium" | "High";
export type ThinkingStyle = "Creative" | "Systems" | "Balanced";
export type TimelineUrgency = "Immediate" | "1-3 Months" | "3-6 Months" | "Flexible";

export type AssessmentInput = {
  name: string;
  field: string;
  goal: LearningGoal;
  interest: InterestArea;
  level: ExperienceLevel;
  hoursPerWeek: number;
  workStyle: WorkStyle;
  mathComfort: MathComfort;
  thinkingStyle: ThinkingStyle;
  timelineUrgency: TimelineUrgency;
};

export type PathKey =
  | "frontend"
  | "backend"
  | "fullstack"
  | "data"
  | "cybersecurity"
  | "mobile"
  | "uiux";

type FactorKey =
  | "interest"
  | "goal"
  | "field"
  | "level"
  | "hoursPerWeek"
  | "calibration"
  | "feedbackSignal";

type PathProfile = {
  key: PathKey;
  title: string;
  description: string;
  fitSignals: string[];
};

export type ScoreBreakdownItem = {
  factor:
    | "Interest"
    | "Goal"
    | "Field of Study"
    | "Experience Level"
    | "Weekly Time"
    | "Calibration"
    | "Community Feedback";
  impact: number;
  points: number;
  description: string;
};

export type RankedPath = {
  title: string;
  score: number;
  confidence: number;
  reason: string;
  scoreBreakdown: ScoreBreakdownItem[];
  roadmap: {
    days30: string[];
    days60: string[];
    days90: string[];
    thisWeek: string[];
  };
};

export type RecommendationResult = {
  top: RankedPath;
  alternatives: RankedPath[];
};

export type RecommendationOptions = {
  adaptivePathBias?: Partial<Record<PathKey, number>>;
};

const PATHS: PathProfile[] = [
  {
    key: "frontend",
    title: "Frontend Development",
    description: "Build responsive web interfaces and user experiences.",
    fitSignals: ["Creativity", "Visual problem solving", "Rapid iteration"],
  },
  {
    key: "backend",
    title: "Backend Engineering",
    description: "Design APIs, services, and scalable backend systems.",
    fitSignals: ["Logic", "Architecture", "Performance and reliability"],
  },
  {
    key: "fullstack",
    title: "Full-Stack Development",
    description: "Ship end-to-end products from UI to APIs and deployment.",
    fitSignals: ["Product thinking", "Breadth", "Execution speed"],
  },
  {
    key: "data",
    title: "Data Analytics / Data Science",
    description: "Extract insights, build dashboards, and model data.",
    fitSignals: ["Curiosity", "Statistics", "Decision support"],
  },
  {
    key: "cybersecurity",
    title: "Cybersecurity",
    description: "Protect systems, detect threats, and secure applications.",
    fitSignals: ["Risk mindset", "Attention to detail", "Defense thinking"],
  },
  {
    key: "mobile",
    title: "Mobile Development",
    description: "Build high-quality Android and iOS app experiences.",
    fitSignals: ["Product UX", "Platform depth", "Performance tuning"],
  },
  {
    key: "uiux",
    title: "UI/UX Design",
    description: "Design intuitive digital products grounded in user research.",
    fitSignals: ["Empathy", "Design systems", "Interaction craft"],
  },
];

type PathWeights = Partial<Record<PathKey, number>>;

const STUDY_FIELD_PATH_WEIGHTS: Record<string, PathWeights> = {
  "Computer Science": { backend: 16, fullstack: 12, data: 8, frontend: 6 },
  "Software Engineering": { fullstack: 18, backend: 12, frontend: 10, mobile: 6 },
  "Information Technology": { backend: 10, cybersecurity: 10, fullstack: 8, data: 6 },
  "Information Systems": { fullstack: 10, data: 10, backend: 8, uiux: 6 },
  "Computer Engineering": { backend: 14, cybersecurity: 10, fullstack: 8, mobile: 8 },
  "Electrical Engineering": { backend: 8, mobile: 8, data: 6, cybersecurity: 4 },
  "Electronics and Telecommunications Engineering": { cybersecurity: 12, backend: 10, mobile: 8, data: 4 },
  "Civil Engineering": { data: 8, backend: 6, fullstack: 4 },
  "Mechanical Engineering": { data: 8, backend: 6, mobile: 4 },
  Architecture: { uiux: 14, frontend: 10, mobile: 4, fullstack: 4 },
  Mathematics: { data: 18, backend: 10, cybersecurity: 8 },
  Statistics: { data: 22, backend: 8, cybersecurity: 6 },
  Physics: { data: 12, backend: 10, cybersecurity: 8 },
  Biology: { data: 10, uiux: 4, fullstack: 4 },
  Chemistry: { data: 10, backend: 4, fullstack: 4 },
  Agriculture: { data: 8, mobile: 6, fullstack: 4 },
  "Veterinary Medicine": { data: 8, mobile: 6, fullstack: 4 },
  "Medicine and Surgery": { data: 10, uiux: 6, mobile: 6 },
  Nursing: { uiux: 8, mobile: 8, data: 6 },
  Pharmacy: { data: 10, uiux: 6, mobile: 6 },
  "Public Health": { data: 12, uiux: 6, mobile: 6, fullstack: 4 },
  "Business Administration": { fullstack: 12, data: 10, uiux: 8, mobile: 6 },
  Accounting: { data: 14, backend: 8, fullstack: 4 },
  Finance: { data: 16, backend: 8, cybersecurity: 6 },
  Economics: { data: 16, backend: 8, fullstack: 4 },
  Marketing: { uiux: 12, frontend: 8, data: 8, fullstack: 6 },
  "Supply Chain and Logistics": { data: 12, fullstack: 8, backend: 6, mobile: 4 },
  Law: { cybersecurity: 12, data: 8, uiux: 4, backend: 4 },
  Education: { uiux: 10, frontend: 8, fullstack: 6, mobile: 6 },
  Psychology: { uiux: 12, data: 8, frontend: 6 },
  "Journalism and Communication": { uiux: 12, frontend: 8, fullstack: 6, data: 4 },
  "Hospitality and Tourism": { uiux: 10, mobile: 8, frontend: 6, data: 4 },
  "Environmental Science": { data: 10, fullstack: 6, mobile: 4 },
  "Geography and Urban Planning": { data: 10, uiux: 8, fullstack: 6 },
  "Development Studies": { uiux: 8, data: 8, fullstack: 6, mobile: 4 },
  "Other / Not Listed": { fullstack: 6, frontend: 6, backend: 6, data: 6, uiux: 6, mobile: 6, cybersecurity: 6 },
};

function normalize(text: string) {
  return text.trim().toLowerCase();
}

function baseScores(): Record<PathKey, number> {
  return {
    frontend: 10,
    backend: 10,
    fullstack: 10,
    data: 10,
    cybersecurity: 10,
    mobile: 10,
    uiux: 10,
  };
}

function createContributions(): Record<PathKey, Record<FactorKey, number>> {
  return {
    frontend: {
      interest: 0,
      goal: 0,
      field: 0,
      level: 0,
      hoursPerWeek: 0,
      calibration: 0,
      feedbackSignal: 0,
    },
    backend: {
      interest: 0,
      goal: 0,
      field: 0,
      level: 0,
      hoursPerWeek: 0,
      calibration: 0,
      feedbackSignal: 0,
    },
    fullstack: {
      interest: 0,
      goal: 0,
      field: 0,
      level: 0,
      hoursPerWeek: 0,
      calibration: 0,
      feedbackSignal: 0,
    },
    data: {
      interest: 0,
      goal: 0,
      field: 0,
      level: 0,
      hoursPerWeek: 0,
      calibration: 0,
      feedbackSignal: 0,
    },
    cybersecurity: {
      interest: 0,
      goal: 0,
      field: 0,
      level: 0,
      hoursPerWeek: 0,
      calibration: 0,
      feedbackSignal: 0,
    },
    mobile: {
      interest: 0,
      goal: 0,
      field: 0,
      level: 0,
      hoursPerWeek: 0,
      calibration: 0,
      feedbackSignal: 0,
    },
    uiux: {
      interest: 0,
      goal: 0,
      field: 0,
      level: 0,
      hoursPerWeek: 0,
      calibration: 0,
      feedbackSignal: 0,
    },
  };
}

function addScore(
  scores: Record<PathKey, number>,
  contributions: Record<PathKey, Record<FactorKey, number>>,
  path: PathKey,
  factor: FactorKey,
  points: number,
) {
  scores[path] += points;
  contributions[path][factor] += points;
}

function applyPathWeights(
  scores: Record<PathKey, number>,
  contributions: Record<PathKey, Record<FactorKey, number>>,
  factor: FactorKey,
  weights: PathWeights,
) {
  (Object.keys(weights) as PathKey[]).forEach((path) => {
    const points = weights[path];
    if (typeof points === "number" && points !== 0) {
      addScore(scores, contributions, path, factor, points);
    }
  });
}

function applyInterest(
  scores: Record<PathKey, number>,
  contributions: Record<PathKey, Record<FactorKey, number>>,
  interest: InterestArea,
) {
  const interestWeights: Record<InterestArea, PathWeights> = {
    "Building digital products": { fullstack: 22, frontend: 16, mobile: 12, backend: 8 },
    "Solving complex logic problems": { backend: 22, cybersecurity: 14, data: 12, fullstack: 8 },
    "Analyzing data and patterns": { data: 26, backend: 10, cybersecurity: 8 },
    "Protecting people and systems": { cybersecurity: 26, backend: 12, data: 6 },
    "Creating visual and user experiences": { uiux: 26, frontend: 16, mobile: 8 },
    "Understanding people and communication": { uiux: 18, frontend: 10, fullstack: 8, mobile: 6 },
    "Running projects and business ideas": { fullstack: 18, mobile: 10, frontend: 10, uiux: 8 },
    "Exploring how technology works": { backend: 16, cybersecurity: 12, data: 10, fullstack: 10 },
  };

  applyPathWeights(scores, contributions, "interest", interestWeights[interest]);
}

function applyGoal(
  scores: Record<PathKey, number>,
  contributions: Record<PathKey, Record<FactorKey, number>>,
  goal: LearningGoal,
) {
  if (goal === "Internship") {
    addScore(scores, contributions, "frontend", "goal", 10);
    addScore(scores, contributions, "backend", "goal", 10);
    addScore(scores, contributions, "data", "goal", 8);
    addScore(scores, contributions, "mobile", "goal", 8);
  } else if (goal === "Freelancing") {
    addScore(scores, contributions, "frontend", "goal", 20);
    addScore(scores, contributions, "fullstack", "goal", 15);
    addScore(scores, contributions, "uiux", "goal", 12);
  } else if (goal === "Job") {
    addScore(scores, contributions, "backend", "goal", 18);
    addScore(scores, contributions, "data", "goal", 15);
    addScore(scores, contributions, "cybersecurity", "goal", 12);
  } else if (goal === "Startup") {
    addScore(scores, contributions, "fullstack", "goal", 22);
    addScore(scores, contributions, "mobile", "goal", 15);
    addScore(scores, contributions, "backend", "goal", 8);
  } else if (goal === "Clarity") {
    addScore(scores, contributions, "frontend", "goal", 8);
    addScore(scores, contributions, "fullstack", "goal", 8);
    addScore(scores, contributions, "data", "goal", 8);
    addScore(scores, contributions, "cybersecurity", "goal", 8);
  }
}

function applyField(
  scores: Record<PathKey, number>,
  contributions: Record<PathKey, Record<FactorKey, number>>,
  field: string,
) {
  const exactWeights = STUDY_FIELD_PATH_WEIGHTS[field];
  if (exactWeights) {
    applyPathWeights(scores, contributions, "field", exactWeights);
    return;
  }

  const text = normalize(field);
  if (!text) {
    return;
  }

  if (text.includes("design")) {
    addScore(scores, contributions, "uiux", "field", 20);
    addScore(scores, contributions, "frontend", "field", 10);
  }
  if (text.includes("data") || text.includes("statistics") || text.includes("math")) {
    addScore(scores, contributions, "data", "field", 20);
  }
  if (text.includes("network") || text.includes("security")) {
    addScore(scores, contributions, "cybersecurity", "field", 20);
    addScore(scores, contributions, "backend", "field", 8);
  }
  if (text.includes("software") || text.includes("computer") || text.includes("it")) {
    addScore(scores, contributions, "backend", "field", 10);
    addScore(scores, contributions, "fullstack", "field", 10);
    addScore(scores, contributions, "frontend", "field", 6);
  }
}

function applyLevel(
  scores: Record<PathKey, number>,
  contributions: Record<PathKey, Record<FactorKey, number>>,
  level: ExperienceLevel,
) {
  if (level === "Beginner") {
    addScore(scores, contributions, "frontend", "level", 10);
    addScore(scores, contributions, "uiux", "level", 8);
    addScore(scores, contributions, "fullstack", "level", -4);
    addScore(scores, contributions, "cybersecurity", "level", -3);
  } else if (level === "Intermediate") {
    addScore(scores, contributions, "fullstack", "level", 8);
    addScore(scores, contributions, "backend", "level", 6);
  } else if (level === "Advanced") {
    addScore(scores, contributions, "backend", "level", 10);
    addScore(scores, contributions, "cybersecurity", "level", 10);
    addScore(scores, contributions, "data", "level", 8);
  }
}

function applyWeeklyHours(
  scores: Record<PathKey, number>,
  contributions: Record<PathKey, Record<FactorKey, number>>,
  hoursPerWeek: number,
) {
  if (hoursPerWeek <= 5) {
    addScore(scores, contributions, "frontend", "hoursPerWeek", 8);
    addScore(scores, contributions, "uiux", "hoursPerWeek", 8);
    addScore(scores, contributions, "fullstack", "hoursPerWeek", -4);
    addScore(scores, contributions, "cybersecurity", "hoursPerWeek", -4);
  } else if (hoursPerWeek <= 10) {
    addScore(scores, contributions, "frontend", "hoursPerWeek", 4);
    addScore(scores, contributions, "backend", "hoursPerWeek", 4);
    addScore(scores, contributions, "data", "hoursPerWeek", 4);
  } else {
    addScore(scores, contributions, "fullstack", "hoursPerWeek", 8);
    addScore(scores, contributions, "backend", "hoursPerWeek", 6);
    addScore(scores, contributions, "cybersecurity", "hoursPerWeek", 6);
  }
}

function applyCalibration(
  scores: Record<PathKey, number>,
  contributions: Record<PathKey, Record<FactorKey, number>>,
  input: AssessmentInput,
) {
  if (input.workStyle === "Solo") {
    addScore(scores, contributions, "backend", "calibration", 8);
    addScore(scores, contributions, "data", "calibration", 6);
    addScore(scores, contributions, "cybersecurity", "calibration", 6);
    addScore(scores, contributions, "uiux", "calibration", -2);
  } else if (input.workStyle === "Team") {
    addScore(scores, contributions, "frontend", "calibration", 6);
    addScore(scores, contributions, "fullstack", "calibration", 8);
    addScore(scores, contributions, "uiux", "calibration", 8);
    addScore(scores, contributions, "mobile", "calibration", 4);
  } else {
    addScore(scores, contributions, "fullstack", "calibration", 6);
    addScore(scores, contributions, "frontend", "calibration", 4);
    addScore(scores, contributions, "backend", "calibration", 4);
  }

  if (input.mathComfort === "Low") {
    addScore(scores, contributions, "frontend", "calibration", 5);
    addScore(scores, contributions, "uiux", "calibration", 6);
    addScore(scores, contributions, "mobile", "calibration", 4);
    addScore(scores, contributions, "data", "calibration", -6);
  } else if (input.mathComfort === "Medium") {
    addScore(scores, contributions, "backend", "calibration", 4);
    addScore(scores, contributions, "data", "calibration", 4);
  } else {
    addScore(scores, contributions, "data", "calibration", 10);
    addScore(scores, contributions, "cybersecurity", "calibration", 8);
    addScore(scores, contributions, "backend", "calibration", 6);
  }

  if (input.thinkingStyle === "Creative") {
    addScore(scores, contributions, "uiux", "calibration", 12);
    addScore(scores, contributions, "frontend", "calibration", 8);
    addScore(scores, contributions, "mobile", "calibration", 6);
    addScore(scores, contributions, "backend", "calibration", -2);
  } else if (input.thinkingStyle === "Systems") {
    addScore(scores, contributions, "backend", "calibration", 12);
    addScore(scores, contributions, "cybersecurity", "calibration", 10);
    addScore(scores, contributions, "data", "calibration", 6);
    addScore(scores, contributions, "uiux", "calibration", -2);
  } else {
    addScore(scores, contributions, "fullstack", "calibration", 8);
    addScore(scores, contributions, "frontend", "calibration", 4);
    addScore(scores, contributions, "backend", "calibration", 4);
  }

  if (input.timelineUrgency === "Immediate") {
    addScore(scores, contributions, "frontend", "calibration", 8);
    addScore(scores, contributions, "uiux", "calibration", 8);
    addScore(scores, contributions, "mobile", "calibration", 6);
  } else if (input.timelineUrgency === "1-3 Months") {
    addScore(scores, contributions, "fullstack", "calibration", 8);
    addScore(scores, contributions, "backend", "calibration", 6);
  } else if (input.timelineUrgency === "3-6 Months") {
    addScore(scores, contributions, "backend", "calibration", 8);
    addScore(scores, contributions, "data", "calibration", 8);
    addScore(scores, contributions, "cybersecurity", "calibration", 8);
  } else {
    addScore(scores, contributions, "data", "calibration", 5);
    addScore(scores, contributions, "cybersecurity", "calibration", 5);
    addScore(scores, contributions, "fullstack", "calibration", 5);
  }
}

function applyAdaptiveBias(
  scores: Record<PathKey, number>,
  contributions: Record<PathKey, Record<FactorKey, number>>,
  options?: RecommendationOptions,
) {
  const biasMap = options?.adaptivePathBias;
  if (!biasMap) {
    return;
  }

  (Object.keys(biasMap) as PathKey[]).forEach((key) => {
    const raw = biasMap[key] ?? 0;
    const bounded = Math.max(-10, Math.min(10, Math.round(raw)));
    if (bounded !== 0) {
      addScore(scores, contributions, key, "feedbackSignal", bounded);
    }
  });
}

function clampScore(value: number) {
  return Math.max(0, Math.min(100, value));
}

function buildRoadmap(pathTitle: string): RankedPath["roadmap"] {
  const commonWeek = ["Set weekly study blocks", "Create a GitHub progress repo"];

  if (pathTitle.includes("Frontend")) {
    return {
      thisWeek: [...commonWeek, "Build one responsive landing page"],
      days30: ["Master HTML/CSS/JS fundamentals", "Build 2 mini UI projects"],
      days60: ["Learn React + state management basics", "Build a portfolio site"],
      days90: ["Ship one real-world app with API integration", "Prepare internship-ready case studies"],
    };
  }

  if (pathTitle.includes("Backend")) {
    return {
      thisWeek: [...commonWeek, "Build your first REST API with Node.js"],
      days30: ["Learn API design and SQL basics", "Build CRUD backend project"],
      days60: ["Add auth, validation, and testing", "Deploy to cloud"],
      days90: ["Design scalable architecture", "Build production-style backend with observability"],
    };
  }

  if (pathTitle.includes("Data")) {
    return {
      thisWeek: [...commonWeek, "Analyze one dataset and document insights"],
      days30: ["Learn SQL, Python, and data cleaning", "Create 2 dashboards"],
      days60: ["Practice statistics and storytelling", "Build one end-to-end analytics project"],
      days90: ["Learn ML fundamentals", "Publish portfolio-ready notebooks"],
    };
  }

  if (pathTitle.includes("Cybersecurity")) {
    return {
      thisWeek: [...commonWeek, "Set up safe security lab environment"],
      days30: ["Learn networking + Linux security basics", "Complete 1 beginner CTF track"],
      days60: ["Practice threat modeling + OWASP", "Audit one demo app"],
      days90: ["Build security portfolio reports", "Prepare for entry cert path"],
    };
  }

  if (pathTitle.includes("Mobile")) {
    return {
      thisWeek: [...commonWeek, "Build one simple cross-platform app screen"],
      days30: ["Learn mobile UI fundamentals", "Build 2 feature prototypes"],
      days60: ["Integrate APIs and offline storage", "Publish test build"],
      days90: ["Ship full app MVP", "Collect usage feedback and iterate"],
    };
  }

  if (pathTitle.includes("UI/UX")) {
    return {
      thisWeek: [...commonWeek, "Redesign one app flow in Figma"],
      days30: ["Learn UX research + wireframing", "Create 2 case studies"],
      days60: ["Build component library", "Run user testing cycle"],
      days90: ["Publish full product case study", "Collaborate with developer on shipped design"],
    };
  }

  return {
    thisWeek: [...commonWeek, "Build one end-to-end mini product"],
    days30: ["Pick primary stack and fundamentals", "Ship two guided projects"],
    days60: ["Deepen one specialization", "Publish technical writeups"],
    days90: ["Build capstone product", "Prepare hiring-ready portfolio and CV"],
  };
}

function confidenceFromScores(top: number, second: number) {
  const margin = Math.max(0, top - second);
  return Math.max(52, Math.min(95, 52 + margin));
}

function reasonFromInput(pathTitle: string, input: AssessmentInput) {
  return `Recommended because your personal interest in ${input.interest}, goal of ${input.goal}, ${input.level.toLowerCase()} level, ${input.hoursPerWeek} study hours/week, and ${input.workStyle.toLowerCase()} work style align with ${pathTitle}.`;
}

function buildScoreBreakdown(
  pathKey: PathKey,
  contributions: Record<PathKey, Record<FactorKey, number>>,
  input: AssessmentInput,
): ScoreBreakdownItem[] {
  const points = contributions[pathKey];
  const positiveTotal = Math.max(
    1,
    Math.max(0, points.interest) +
      Math.max(0, points.goal) +
      Math.max(0, points.field) +
      Math.max(0, points.level) +
      Math.max(0, points.hoursPerWeek) +
      Math.max(0, points.calibration) +
      Math.max(0, points.feedbackSignal),
  );

  const rows: ScoreBreakdownItem[] = [
    {
      factor: "Interest",
      impact: Math.round((Math.max(0, points.interest) / positiveTotal) * 100),
      points: points.interest,
      description: `Personal interest selected: ${input.interest}.`,
    },
    {
      factor: "Goal",
      impact: Math.round((Math.max(0, points.goal) / positiveTotal) * 100),
      points: points.goal,
      description: `Career goal selected: ${input.goal}.`,
    },
    {
      factor: "Field of Study",
      impact: Math.round((Math.max(0, points.field) / positiveTotal) * 100),
      points: points.field,
      description: `Field considered: ${input.field}.`,
    },
    {
      factor: "Experience Level",
      impact: Math.round((Math.max(0, points.level) / positiveTotal) * 100),
      points: points.level,
      description: `Current level: ${input.level}.`,
    },
    {
      factor: "Weekly Time",
      impact: Math.round((Math.max(0, points.hoursPerWeek) / positiveTotal) * 100),
      points: points.hoursPerWeek,
      description: `Available time: ${input.hoursPerWeek} hours/week.`,
    },
    {
      factor: "Calibration",
      impact: Math.round((Math.max(0, points.calibration) / positiveTotal) * 100),
      points: points.calibration,
      description: `Based on work style (${input.workStyle}), math comfort (${input.mathComfort}), thinking style (${input.thinkingStyle}), and timeline (${input.timelineUrgency}).`,
    },
    {
      factor: "Community Feedback",
      impact: Math.round((Math.max(0, points.feedbackSignal) / positiveTotal) * 100),
      points: points.feedbackSignal,
      description:
        "Adjusted using anonymized helpful/not-helpful feedback from previous recommendations.",
    },
  ];

  return rows.sort((a, b) => b.impact - a.impact);
}

export function generateRecommendations(
  input: AssessmentInput,
  options?: RecommendationOptions,
): RecommendationResult {
  const scores = baseScores();
  const contributions = createContributions();

  applyInterest(scores, contributions, input.interest);
  applyGoal(scores, contributions, input.goal);
  applyField(scores, contributions, input.field);
  applyLevel(scores, contributions, input.level);
  applyWeeklyHours(scores, contributions, input.hoursPerWeek);
  applyCalibration(scores, contributions, input);
  applyAdaptiveBias(scores, contributions, options);

  const ranked = PATHS.map((path) => ({
    ...path,
    score: clampScore(scores[path.key]),
  })).sort((a, b) => b.score - a.score);

  const secondScore = ranked[1]?.score ?? ranked[0].score;

  const mapped: RankedPath[] = ranked.slice(0, 3).map((path, index) => {
    const confidence =
      index === 0 ? confidenceFromScores(path.score, secondScore) : Math.max(50, 78 - index * 10);

    return {
      title: path.title,
      score: path.score,
      confidence,
      reason: reasonFromInput(path.title, input),
      scoreBreakdown: buildScoreBreakdown(path.key, contributions, input),
      roadmap: buildRoadmap(path.title),
    };
  });

  return {
    top: mapped[0],
    alternatives: mapped.slice(1),
  };
}
