export type DayKey = "today" | "tomorrow" | "week"

export type ActivityType = "study" | "break" | "review" | "practice" | "reflect"

export type LearningMethod = {
  id: string
  name: string
  why: string
  how: string
  minutes: number
  bestFor: string
}

export type PerformanceLever = {
  metric: string
  current: number
  target: number
  action: string
}

export type DailyGoal = {
  id: string
  title: string
  outcome: string
  subject: string
  minutes: number
  impact: "accuracy" | "speed" | "retention" | "confidence"
}

export type SubjectMicroPlan = {
  subject: string
  priority: "high" | "medium" | "low"
  progress: number
  focus: string
  method: string
  resultTarget: string
}

export type TimelineItem = {
  time: string
  activity: string
  type: ActivityType
  tip?: string
}

export type DayStrategy = {
  headline: string
  energyNote: string
  dailyPlan: string
  performanceFocus: string
  learningStyleShift: string
  goals: DailyGoal[]
  methods: LearningMethod[]
  levers: PerformanceLever[]
  subjects: SubjectMicroPlan[]
  nextTopics: string[]
  weakTopics: string[]
  revisionPlan: string
  timeline: TimelineItem[]
  eveningReview: string[]
}

export const STRATEGY_DAY_KEY = "quantrion_strategy_day_v1"

export function buildDayStrategy(day: DayKey): DayStrategy {
  if (day === "tomorrow") {
    return {
      headline: "Tomorrow’s performance ladder",
      energyNote: "Prime weak Chemistry early; protect Math depth for peak focus hours.",
      dailyPlan:
        "Morning: high-cognition Math/Physics. Midday: Chemistry correction. Evening: spaced recall + light mock burst.",
      performanceFocus: "Lift Chemistry accuracy without losing Math speed.",
      learningStyleShift: "Switch from passive notes → teach-back + timed drills.",
      goals: [
        {
          id: "t1",
          title: "Chemistry mechanism map",
          outcome: "Explain SN1 vs SN2 without notes",
          subject: "Chemistry",
          minutes: 45,
          impact: "retention",
        },
        {
          id: "t2",
          title: "Integration sprint",
          outcome: "8/10 correct under 12 min",
          subject: "Mathematics",
          minutes: 40,
          impact: "speed",
        },
        {
          id: "t3",
          title: "Electrostatics numericals",
          outcome: "Reduce silly errors to ≤1",
          subject: "Physics",
          minutes: 50,
          impact: "accuracy",
        },
      ],
      methods: [
        {
          id: "feynman",
          name: "Feynman teach-back",
          why: "Exposes fake fluency before the exam does.",
          how: "Explain the concept aloud in simple words for 5 minutes, then fix gaps.",
          minutes: 15,
          bestFor: "Chemistry mechanisms",
        },
        {
          id: "interleave",
          name: "Interleaved practice",
          why: "Improves transfer and exam adaptability.",
          how: "Mix 3 topic types in one set instead of one-topic blocks only.",
          minutes: 30,
          bestFor: "Math + Physics numericals",
        },
        {
          id: "retrieval",
          name: "Closed-book retrieval",
          why: "Builds durable memory faster than re-reading.",
          how: "Write formulas/steps from memory, then check against notes.",
          minutes: 20,
          bestFor: "Evening revision",
        },
      ],
      levers: [
        { metric: "Accuracy", current: 71, target: 80, action: "Error log after every set — rewrite the fix once." },
        { metric: "Speed", current: 64, target: 72, action: "Timed 12-minute bursts with strict stop." },
        { metric: "Retention", current: 58, target: 70, action: "D+1 recall card for today’s new ideas." },
        { metric: "Confidence", current: 62, target: 75, action: "End with 5 wins logged (problems you cracked)." },
      ],
      subjects: [
        {
          subject: "Chemistry",
          priority: "high",
          progress: 45,
          focus: "Organic mechanisms under exam wording",
          method: "Feynman + 10 reaction drills",
          resultTarget: "+8% accuracy this week",
        },
        {
          subject: "Physics",
          priority: "high",
          progress: 75,
          focus: "Electrostatics application numericals",
          method: "Worked example → twin problem",
          resultTarget: "Fewer unit/sign errors",
        },
        {
          subject: "Mathematics",
          priority: "medium",
          progress: 82,
          focus: "Definite integration patterns",
          method: "Interleaved sets + timer",
          resultTarget: "Faster pattern recognition",
        },
      ],
      nextTopics: [
        "Organic mechanisms (SN1 vs SN2 under time)",
        "Definite integration patterns (area + properties)",
        "Electrostatics numericals (Coulomb applications)",
      ],
      weakTopics: [
        "Thermodynamics first-law applications — 2 worked + 4 solo",
        "Organic retention — spaced cards tonight",
        "Vector algebra cross/dot products — 15-min drill",
      ],
      revisionPlan:
        "Spaced loop: D+1 quick recall (15 min), D+3 mixed test (30 min), D+7 mini mock (45 min).",
      timeline: [
        { time: "06:45 – 07:05", activity: "Light mobility + intention set", type: "break", tip: "Name tomorrow’s #1 outcome." },
        { time: "07:15 – 08:00", activity: "Chemistry teach-back + drills", type: "study" },
        { time: "08:00 – 08:15", activity: "Hydration break", type: "break" },
        { time: "09:00 – 10:30", activity: "Math depth block (integration)", type: "study" },
        { time: "10:30 – 10:45", activity: "Active recall flash", type: "review" },
        { time: "16:00 – 17:00", activity: "Physics numerical correction set", type: "practice" },
        { time: "21:00 – 21:25", activity: "Closed-book retrieval + next-day priming", type: "reflect" },
      ],
      eveningReview: [
        "What improved today — accuracy, speed, or clarity?",
        "One mistake pattern to kill tomorrow.",
        "One learning method that worked — schedule it again.",
      ],
    }
  }

  if (day === "week") {
    return {
      headline: "7-day performance & learning system",
      energyNote: "Build one compounding habit: daily retrieval + weekly interleaved mock.",
      dailyPlan:
        "Mon–Wed deep weak topics, Thu mixed practice, Fri timed simulation, Sat analysis, Sun light recall + rest quality.",
      performanceFocus: "Raise overall readiness from ~68% toward 78% with fewer high-priority gaps.",
      learningStyleShift: "From long passive hours → shorter high-quality deliberate practice cycles.",
      goals: [
        {
          id: "w1",
          title: "Close Chemistry gap",
          outcome: "Chemistry progress 45% → 58%",
          subject: "Chemistry",
          minutes: 300,
          impact: "accuracy",
        },
        {
          id: "w2",
          title: "Weekly interleaved mock",
          outcome: "Complete 1 full mixed set + error log",
          subject: "All",
          minutes: 120,
          impact: "confidence",
        },
        {
          id: "w3",
          title: "Retention engine",
          outcome: "D+1/D+3 cards for every new topic",
          subject: "All",
          minutes: 140,
          impact: "retention",
        },
      ],
      methods: [
        {
          id: "deliberate",
          name: "Deliberate practice",
          why: "Targets the exact error that costs marks.",
          how: "Pick one failure mode, drill only that for a focused block.",
          minutes: 40,
          bestFor: "Weak-topic days",
        },
        {
          id: "spaced",
          name: "Spaced repetition",
          why: "Stops forgetting after ‘I understood it yesterday’.",
          how: "Schedule D+1 / D+3 / D+7 recall for each new concept.",
          minutes: 20,
          bestFor: "Nightly review",
        },
        {
          id: "analysis",
          name: "Exam autopsy",
          why: "Turns mocks into mark gains.",
          how: "Tag each miss: concept / careless / time / misread — fix the top tag.",
          minutes: 35,
          bestFor: "Post-mock Saturdays",
        },
      ],
      levers: [
        { metric: "Accuracy", current: 71, target: 82, action: "Weekly error-theme focus (one theme per subject)." },
        { metric: "Speed", current: 64, target: 76, action: "Two timed blocks on alternate days." },
        { metric: "Retention", current: 58, target: 74, action: "Never skip D+1 recall." },
        { metric: "Confidence", current: 62, target: 80, action: "Friday simulation + calm review ritual." },
      ],
      subjects: [
        {
          subject: "Chemistry",
          priority: "high",
          progress: 45,
          focus: "Mechanisms + thermodynamics applications",
          method: "Deliberate practice + spaced cards",
          resultTarget: "+13 progress points",
        },
        {
          subject: "Physics",
          priority: "high",
          progress: 75,
          focus: "Numerical consistency under time",
          method: "Twin-problem method",
          resultTarget: "Stable 80%+ in timed sets",
        },
        {
          subject: "Mathematics",
          priority: "medium",
          progress: 82,
          focus: "Speed + pattern switching",
          method: "Interleaving",
          resultTarget: "Faster set completion",
        },
        {
          subject: "Biology",
          priority: "low",
          progress: 70,
          focus: "Maintain with light retrieval",
          method: "Closed-book diagrams",
          resultTarget: "No regression",
        },
      ],
      nextTopics: [
        "Week theme: Chemistry rescue + Physics timing",
        "Insert one interleaved mock by Friday",
        "Protect sleep on heavy cognitive days",
      ],
      weakTopics: [
        "Thermodynamics applications",
        "Organic retention",
        "Careless numerical errors under clock",
      ],
      revisionPlan:
        "Daily D+1 (15m) · Midweek D+3 mixed (30m) · Weekend D+7 simulation (45–90m) · Sunday light recall only.",
      timeline: [
        { time: "Mon", activity: "Chemistry deep rescue block", type: "study" },
        { time: "Tue", activity: "Physics timed numericals", type: "practice" },
        { time: "Wed", activity: "Math interleaving + weak vectors", type: "study" },
        { time: "Thu", activity: "Mixed subject practice set", type: "practice" },
        { time: "Fri", activity: "Timed simulation + calm cool-down", type: "practice" },
        { time: "Sat", activity: "Exam autopsy + fix plan", type: "reflect" },
        { time: "Sun", activity: "Light recall + recovery quality", type: "review" },
      ],
      eveningReview: [
        "Weekly scoreboard: accuracy / speed / retention / confidence.",
        "Drop one low-value habit that stole focus.",
        "Lock next week’s top 3 outcomes on Sunday night.",
      ],
    }
  }

  // today (default)
  return {
    headline: "Today’s strategy to improve results",
    energyNote: "Protect peak morning focus for hardest cognition — Chemistry needs deliberate rescue today.",
    dailyPlan:
      "High-cognition Math/Physics before noon · Chemistry deep block mid-afternoon · evening closed-book recall · 25/5 focus cycles.",
    performanceFocus: "Convert study hours into mark-moving outcomes: accuracy first, then speed.",
    learningStyleShift: "Stop re-reading. Learn by retrieval, teach-back, and timed problem sets.",
    goals: [
      {
        id: "d1",
        title: "Weak-topic correction",
        outcome: "Finish Thermodynamics first-law set with solutions checked",
        subject: "Physics",
        minutes: 45,
        impact: "accuracy",
      },
      {
        id: "d2",
        title: "Organic retention burst",
        outcome: "Recall 12 mechanisms closed-book",
        subject: "Chemistry",
        minutes: 35,
        impact: "retention",
      },
      {
        id: "d3",
        title: "Integration speed lane",
        outcome: "Beat yesterday’s time by 10%",
        subject: "Mathematics",
        minutes: 40,
        impact: "speed",
      },
      {
        id: "d4",
        title: "Confidence close",
        outcome: "Log 5 solved wins + 1 error pattern",
        subject: "All",
        minutes: 15,
        impact: "confidence",
      },
    ],
    methods: [
      {
        id: "pomodoro-deliberate",
        name: "25/5 deliberate cycles",
        why: "Keeps intensity high without burnout.",
        how: "25 min one outcome only → 5 min reset (water/stretch) → repeat.",
        minutes: 25,
        bestFor: "All deep blocks",
      },
      {
        id: "worked-twin",
        name: "Worked example → twin",
        why: "Builds transfer, not copying.",
        how: "Study 1 solved problem, then solve a near-twin without looking.",
        minutes: 30,
        bestFor: "Physics/Math numericals",
      },
      {
        id: "error-log",
        name: "Error-log learning",
        why: "Performance rises when mistakes become a syllabus.",
        how: "For each miss: cause tag + 1-line fix + 1 similar re-try.",
        minutes: 15,
        bestFor: "After every practice set",
      },
      {
        id: "prime-night",
        name: "Next-day priming",
        why: "Sleep consolidates what you preview.",
        how: "Spend 8 minutes skimming tomorrow’s hardest topic titles only.",
        minutes: 8,
        bestFor: "Night wind-down",
      },
    ],
    levers: [
      { metric: "Accuracy", current: 71, target: 78, action: "Slow first 3 problems today — quality over rush." },
      { metric: "Speed", current: 64, target: 70, action: "One timed set after accuracy set, not before." },
      { metric: "Retention", current: 58, target: 66, action: "Closed-book recall tonight for new organic items." },
      { metric: "Confidence", current: 62, target: 70, action: "End day with wins list, not open loops." },
    ],
    subjects: [
      {
        subject: "Physics",
        priority: "high",
        progress: 75,
        focus: "Thermodynamics applications + electrostatics numericals",
        method: "Worked example → twin",
        resultTarget: "Cleaner multi-step solutions",
      },
      {
        subject: "Chemistry",
        priority: "high",
        progress: 45,
        focus: "SN1/SN2 + retention of mechanisms",
        method: "Teach-back + retrieval cards",
        resultTarget: "Higher recall under prompt wording",
      },
      {
        subject: "Mathematics",
        priority: "medium",
        progress: 82,
        focus: "Definite integration patterns",
        method: "Interleaved timed set",
        resultTarget: "Faster pattern pick-up",
      },
      {
        subject: "Biology",
        priority: "low",
        progress: 70,
        focus: "Maintain with light diagram recall",
        method: "Closed-book sketch",
        resultTarget: "Hold steady",
      },
    ],
    nextTopics: [
      "Electrostatics numericals (Coulomb’s Law applications)",
      "Definite integration patterns (area under curves)",
      "Organic chemistry mechanisms (SN1 vs SN2)",
    ],
    weakTopics: [
      "Thermodynamics — first law applications (priority block)",
      "Organic retention — 35-minute deep + night cards",
      "Vector algebra — cross/dot product drill (15 min)",
    ],
    revisionPlan:
      "Spaced repetition: D+1 quick recall (15 min), D+3 test burst (30 min), D+7 mixed exam simulation (45 min).",
    timeline: [
      { time: "07:30 – 08:00", activity: "Memory warm-up & formula sprint", type: "study", tip: "No phone. One sheet only." },
      { time: "08:00 – 08:20", activity: "Break & hydration", type: "break" },
      { time: "09:00 – 11:00", activity: "Core concept + problem depth block", type: "study", tip: "Math/Physics peak cognition." },
      { time: "11:00 – 11:15", activity: "Quick retrieval review", type: "review" },
      { time: "16:00 – 17:00", activity: "Weak-topic correction set", type: "practice", tip: "Chemistry rescue window." },
      { time: "17:00 – 17:30", activity: "Twin-problem practice", type: "practice" },
      { time: "21:00 – 21:30", activity: "Active recall + next-day priming", type: "reflect" },
    ],
    eveningReview: [
      "Did today’s goals move accuracy, speed, retention, or confidence?",
      "Which learning method felt strongest — repeat it tomorrow.",
      "Write tomorrow’s single most important outcome in one line.",
    ],
  }
}
