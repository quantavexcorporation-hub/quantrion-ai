export type SubjectKey = "Physics" | "Chemistry" | "Mathematics" | "Biology"

export type NeedLevel = "critical" | "high" | "helpful" | "optional"

export type MicroConcept = {
  id: string
  name: string
  whyNeeded: string
  needScore: number
  needLevel: NeedLevel
  mastery: number
  durationSec: number
  videoTitle: string
  keyPoints: string[]
  unlocks: string[]
}

export type DeepTopic = {
  id: string
  subject: SubjectKey
  name: string
  chapter: string
  summary: string
  wholeConceptGoal: string
  micros: MicroConcept[]
}

export const DEEP_TOPICS: DeepTopic[] = [
  {
    id: "integration-techniques",
    subject: "Mathematics",
    name: "Integration Techniques",
    chapter: "Calculus",
    summary:
      "A deep topic made of many micro-skills. Missing one micro-concept breaks whole-problem solving.",
    wholeConceptGoal: "Solve mixed indefinite/definite integrals under exam timing.",
    micros: [
      {
        id: "int-sub",
        name: "u-Substitution",
        whyNeeded: "Most composite integrals collapse only after a correct substitution choice.",
        needScore: 96,
        needLevel: "critical",
        mastery: 62,
        durationSec: 95,
        videoTitle: "Micro: Spot the inner function in 60s",
        keyPoints: ["Identify f'(g(x))·g'(x)", "Set u = inner", "Back-substitute carefully"],
        unlocks: ["trig-int", "parts"],
      },
      {
        id: "parts",
        name: "Integration by Parts",
        whyNeeded: "Required when product of unlike functions appears (x·ln x, x·e^x).",
        needScore: 94,
        needLevel: "critical",
        mastery: 45,
        durationSec: 110,
        videoTitle: "Micro: LIATE pick + one worked twin",
        keyPoints: ["LIATE ordering", "uv − ∫v du", "When to stop repeating parts"],
        unlocks: ["trig-int"],
      },
      {
        id: "partial",
        name: "Partial Fractions",
        whyNeeded: "Rational functions in JEE/Board papers often need decomposition first.",
        needScore: 88,
        needLevel: "high",
        mastery: 78,
        durationSec: 100,
        videoTitle: "Micro: Linear & quadratic factor split",
        keyPoints: ["Proper vs improper", "Cover-up method", "Irreducible quadratics"],
        unlocks: [],
      },
      {
        id: "trig-int",
        name: "Trigonometric Integrals",
        whyNeeded: "Powers of sin/cos need identities — a frequent exam trap micro-skill.",
        needScore: 85,
        needLevel: "high",
        mastery: 58,
        durationSec: 90,
        videoTitle: "Micro: Odd/even power decision tree",
        keyPoints: ["Save one sin/cos", "Half-angle for even powers", "t = tan(x/2) warning"],
        unlocks: [],
      },
      {
        id: "def-props",
        name: "Definite Integral Properties",
        whyNeeded: "Saves time; whole-topic speed depends on property shortcuts.",
        needScore: 80,
        needLevel: "helpful",
        mastery: 70,
        durationSec: 75,
        videoTitle: "Micro: f(a−x) and king property",
        keyPoints: ["∫₀ᵃ f(x)=∫₀ᵃ f(a−x)", "Even/odd on symmetric limits", "When not to force it"],
        unlocks: [],
      },
      {
        id: "area-app",
        name: "Area under Curves",
        whyNeeded: "Application layer — only after core techniques are stable.",
        needScore: 72,
        needLevel: "helpful",
        mastery: 55,
        durationSec: 85,
        videoTitle: "Micro: Sketch → limits → integrate",
        keyPoints: ["Intersection points", "Split regions", "Absolute area"],
        unlocks: [],
      },
    ],
  },
  {
    id: "electrostatics",
    subject: "Physics",
    name: "Electrostatics",
    chapter: "Electric Charges & Fields",
    summary:
      "Deep physics topic. Micro-concepts like field vs potential are easy to confuse without short targeted videos.",
    wholeConceptGoal: "Handle Coulomb, field, potential, and Gauss problems as one connected system.",
    micros: [
      {
        id: "coulomb",
        name: "Coulomb’s Law Micro",
        whyNeeded: "Foundation vector force — every later numerical inherits this.",
        needScore: 97,
        needLevel: "critical",
        mastery: 74,
        durationSec: 80,
        videoTitle: "Micro: Vector force in 90 seconds",
        keyPoints: ["Direction along joining line", "Superposition", "Unit vector care"],
        unlocks: ["e-field", "potential"],
      },
      {
        id: "e-field",
        name: "Electric Field Concept",
        whyNeeded: "Students mix force and field; this micro prevents that failure mode.",
        needScore: 95,
        needLevel: "critical",
        mastery: 61,
        durationSec: 100,
        videoTitle: "Micro: Field as force per unit charge",
        keyPoints: ["E = F/q₀", "Field lines rules", "Point vs continuous"],
        unlocks: ["gauss", "potential"],
      },
      {
        id: "potential",
        name: "Electric Potential",
        whyNeeded: "Scalar path often faster than vectors — needed for whole-topic efficiency.",
        needScore: 91,
        needLevel: "critical",
        mastery: 52,
        durationSec: 105,
        videoTitle: "Micro: Potential vs potential energy",
        keyPoints: ["V scalar", "ΔV = −∫E·dl", "Equipotential surfaces"],
        unlocks: ["capacitors-bridge"],
      },
      {
        id: "gauss",
        name: "Gauss’s Law Micro",
        whyNeeded: "Symmetry problems become trivial only if this micro is solid.",
        needScore: 89,
        needLevel: "high",
        mastery: 48,
        durationSec: 115,
        videoTitle: "Micro: Choose the Gaussian surface",
        keyPoints: ["Flux meaning", "When Gauss helps", "Sphere / cylinder / plane"],
        unlocks: [],
      },
      {
        id: "dipoles",
        name: "Electric Dipole",
        whyNeeded: "Common exam sub-tree inside electrostatics chapter tests.",
        needScore: 76,
        needLevel: "helpful",
        mastery: 66,
        durationSec: 70,
        videoTitle: "Micro: Axial & equatorial field",
        keyPoints: ["p = q·2a", "Axial vs equatorial", "Torque in uniform field"],
        unlocks: [],
      },
    ],
  },
  {
    id: "organic-mechanisms",
    subject: "Chemistry",
    name: "Organic Reaction Mechanisms",
    chapter: "Haloalkanes & Alcohols",
    summary:
      "Whole mechanism chapters fail when micro-concepts like nucleophile strength are fuzzy.",
    wholeConceptGoal: "Predict SN1/SN2/E1/E2 outcomes from structure and conditions.",
    micros: [
      {
        id: "nuc-base",
        name: "Nucleophile vs Base",
        whyNeeded: "Wrong label → wrong pathway. Must-watch before full mechanism sets.",
        needScore: 98,
        needLevel: "critical",
        mastery: 50,
        durationSec: 85,
        videoTitle: "Micro: Who attacks carbon vs who pulls proton",
        keyPoints: ["Charge & polarizability", "Steric bulk", "Solvent hint"],
        unlocks: ["sn2", "sn1", "e2"],
      },
      {
        id: "sn2",
        name: "SN2 Micro-Concept",
        whyNeeded: "Backside attack + inversion is a core exam idea inside the whole topic.",
        needScore: 95,
        needLevel: "critical",
        mastery: 58,
        durationSec: 95,
        videoTitle: "Micro: One-step inversion animation",
        keyPoints: ["Primary favored", "Strong nuc", "Stereochemistry"],
        unlocks: [],
      },
      {
        id: "sn1",
        name: "SN1 Micro-Concept",
        whyNeeded: "Carbocation stability decides branching — required for whole-topic judgment.",
        needScore: 94,
        needLevel: "critical",
        mastery: 54,
        durationSec: 95,
        videoTitle: "Micro: Carbocation ladder in 90s",
        keyPoints: ["3° favored", "Racemization", "Rearrangements warning"],
        unlocks: ["e1"],
      },
      {
        id: "e2",
        name: "E2 Elimination",
        whyNeeded: "Competes with SN2; students need this micro to avoid pathway confusion.",
        needScore: 87,
        needLevel: "high",
        mastery: 49,
        durationSec: 90,
        videoTitle: "Micro: Anti-periplanar in plain English",
        keyPoints: ["Strong base", "Heat bias", "Zaitsev tendency"],
        unlocks: [],
      },
      {
        id: "e1",
        name: "E1 Elimination",
        whyNeeded: "Pairs with SN1 — helpful for complete mechanism mastery.",
        needScore: 78,
        needLevel: "helpful",
        mastery: 46,
        durationSec: 80,
        videoTitle: "Micro: Two-step eliminate after carbocation",
        keyPoints: ["Weak base possible", "Same intermediate as SN1", "Competition cues"],
        unlocks: [],
      },
    ],
  },
  {
    id: "genetics",
    subject: "Biology",
    name: "Genetics & Inheritance",
    chapter: "Principles of Inheritance",
    summary:
      "Deep bio topic with micro ideas (alleles, segregation, linkage) that short videos clarify fast.",
    wholeConceptGoal: "Solve pedigree and monohybrid/dihybrid problems with correct gene logic.",
    micros: [
      {
        id: "allele",
        name: "Gene vs Allele",
        whyNeeded: "Language micro-concept — without it, every later definition collapses.",
        needScore: 96,
        needLevel: "critical",
        mastery: 72,
        durationSec: 70,
        videoTitle: "Micro: Locus, allele, genotype",
        keyPoints: ["Same gene, variants", "Homo/hetero", "Phenotype link"],
        unlocks: ["mendel", "punnett"],
      },
      {
        id: "mendel",
        name: "Segregation & Independent Assortment",
        whyNeeded: "Laws are the engine of whole-topic problem solving.",
        needScore: 93,
        needLevel: "critical",
        mastery: 65,
        durationSec: 100,
        videoTitle: "Micro: Two laws, two visuals",
        keyPoints: ["Anaphase I link", "When assortment fails", "Dihybrid ratios"],
        unlocks: ["punnett"],
      },
      {
        id: "punnett",
        name: "Punnett Micro-Skill",
        whyNeeded: "Operational tool for almost every inheritance numerical.",
        needScore: 90,
        needLevel: "high",
        mastery: 68,
        durationSec: 85,
        videoTitle: "Micro: Build a 4-square without mistakes",
        keyPoints: ["Gamete rows/cols", "Probability multiply", "Common ratio traps"],
        unlocks: [],
      },
      {
        id: "linkage",
        name: "Linkage & Crossing Over",
        whyNeeded: "Explains exceptions to independent assortment in advanced items.",
        needScore: 74,
        needLevel: "helpful",
        mastery: 40,
        durationSec: 95,
        videoTitle: "Micro: Why ratios break",
        keyPoints: ["Linked genes", "Recombination frequency", "Map distance idea"],
        unlocks: [],
      },
    ],
  },
]

export function needBadge(level: NeedLevel): { label: string; className: string } {
  switch (level) {
    case "critical":
      return { label: "Must watch", className: "bg-rose-500/15 text-rose-300 border-rose-400/30" }
    case "high":
      return { label: "Highly needed", className: "bg-amber-500/15 text-amber-300 border-amber-400/30" }
    case "helpful":
      return { label: "Helpful", className: "bg-sky-500/15 text-sky-300 border-sky-400/30" }
    default:
      return { label: "Optional", className: "bg-secondary text-muted-foreground border-border" }
  }
}

export function sortByNeed(micros: MicroConcept[]): MicroConcept[] {
  return [...micros].sort((a, b) => b.needScore - a.needScore)
}

export function suggestedWatchPath(topic: DeepTopic): MicroConcept[] {
  // Critical/high first, then by needScore; keep dependency-friendly order when possible
  const critical = sortByNeed(topic.micros.filter((m) => m.needLevel === "critical"))
  const high = sortByNeed(topic.micros.filter((m) => m.needLevel === "high"))
  const rest = sortByNeed(
    topic.micros.filter((m) => m.needLevel === "helpful" || m.needLevel === "optional")
  )
  return [...critical, ...high, ...rest]
}

export function searchTopics(query: string, subject?: SubjectKey | "All"): DeepTopic[] {
  const q = query.trim().toLowerCase()
  return DEEP_TOPICS.filter((t) => {
    if (subject && subject !== "All" && t.subject !== subject) return false
    if (!q) return true
    const blob = `${t.name} ${t.chapter} ${t.subject} ${t.summary} ${t.micros.map((m) => m.name).join(" ")}`.toLowerCase()
    return blob.includes(q)
  })
}

export const EXPLORER_RECENT_KEY = "quantrion_subconcept_recent"
