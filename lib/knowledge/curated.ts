import type { KnowledgeBrief } from "@/lib/knowledge/local-brief"

export type CuratedReference = KnowledgeBrief & {
  officialName: string
  officialUrl: string
  reviewed: string
}

const reviewed = "October 2026"

export const CURATED_REFERENCES: Record<string, CuratedReference> = {
  "jee-main": {
    officialName: "NTA JEE Main",
    officialUrl: "https://jeemain.nta.nic.in/",
    reviewed,
    overview:
      "JEE Main is the national engineering entrance conducted by the National Testing Agency. The B.E./B.Tech paper is the route into NITs, IIITs, and other centrally funded institutes through JoSAA, and it is also the qualifier for JEE Advanced.\n\nA separate paper covers B.Arch and B.Planning. Session count, application dates, and the exact question paper are published only on the NTA notice for that year.",
    whoItIsFor:
      "Class 12 students and anyone taking a drop year who wants engineering, architecture, or planning admission in India. Qualifying JEE Main does not by itself give an IIT seat.",
    structure:
      "Paper 1 (B.E./B.Tech) tests Physics, Chemistry, and Mathematics. Paper 2 tests the architecture or planning combination, including mathematics, aptitude, and a drawing or planning section. NTA has run the exam in more than one session. Use the current information bulletin for which paper you are writing and how many attempts that year allows.",
    topics: [
      "Physics for Paper 1",
      "Chemistry for Paper 1",
      "Mathematics for Paper 1",
      "Aptitude for B.Arch / B.Planning",
      "Drawing or planning section",
      "Session, rank list, and JoSAA counselling",
    ],
    howToPrepare:
      "Read the latest NTA information bulletin first, then split time across Physics, Chemistry, and Mathematics. Solve recent session papers under the same duration as the real paper. If you want an IIT seat, treat JEE Main as the qualifier and keep a separate plan for JEE Advanced.",
    watchOuts:
      "Do not mix Paper 1 with the architecture paper, and do not treat a coaching cutoff as the official cutoff. Category rank, session, and the counselling seat are different numbers. Fees, exam cities, and eligibility for that year come only from jeemain.nta.nic.in.",
  },
  "jee-advanced": {
    officialName: "JEE Advanced",
    officialUrl: "https://jeeadv.ac.in/",
    reviewed,
    overview:
      "JEE Advanced is the entrance for undergraduate admission to the IITs. Only candidates who qualify through JEE Main, inside the eligibility and rank window published that year, can register.\n\nThe paper is set by one of the IITs on rotation. The pattern of questions changes more often than JEE Main, so an old mock format is not the brochure.",
    whoItIsFor:
      "Students who have already qualified JEE Main and are aiming at an IIT. It is not a second attempt at the same NTA paper.",
    structure:
      "The exam is two papers on the same day, and both are compulsory. Each paper covers Physics, Chemistry, and Mathematics. Question types can include single correct, multiple correct, numerical, and matching styles. Marks, partial marking, and negative marks are defined in that year's brochure.",
    topics: [
      "Physics across both papers",
      "Chemistry across both papers",
      "Mathematics across both papers",
      "Multiple correct and numerical styles",
      "JEE Main qualification window",
      "JoSAA IIT seat allocation",
    ],
    howToPrepare:
      "Confirm you are inside the JEE Main qualification list before you plan the attempt. Practice both papers back to back, because the day is two full papers. Use the last few official papers to learn the marking scheme, then check jeeadv.ac.in for this year's instructions.",
    watchOuts:
      "Eligibility, number of attempts, and the rank list that can register all change by notice. Skipping one paper wastes the attempt. A JEE Main percentile is not a JEE Advanced rank.",
  },
  "neet-ug": {
    officialName: "NTA NEET (UG)",
    officialUrl: "https://neet.nta.nic.in/",
    reviewed,
    overview:
      "NEET-UG is the national entrance for MBBS, BDS, and other undergraduate medical seats that the current regulations bring under this exam. The National Testing Agency conducts it.\n\nAdmission after the score is through all-India and state counselling. The score alone is not a college allotment.",
    whoItIsFor:
      "Students who have studied Physics, Chemistry, and Biology and want an undergraduate medical or dental seat in India. Eligibility age, subjects, and the number of attempts are in the year's information bulletin.",
    structure:
      "The paper is built from Physics, Chemistry, and Biology. Biology is the larger share and is taught as Botany and Zoology. Questions are mainly multiple choice. Duration, language options, and the exact count of questions are in the NTA notice.",
    topics: [
      "Physics",
      "Chemistry",
      "Botany",
      "Zoology",
      "NCERT-level biology depth",
      "All-India and state counselling",
    ],
    howToPrepare:
      "Build Biology first, then keep Physics and Chemistry on a weekly timer. Read the NCERT line by line for Biology and Chemistry, and use the latest NTA bulletin before you trust a coaching syllabus. After the result, follow the counselling authority named in the notice, not a screenshot of a cutoff.",
    watchOuts:
      "State quota, all-India quota, and private-college counselling are different processes. A predicted cutoff is not the official one. Confirm the official site if a link is forwarded on social media, and check neet.nta.nic.in before paying any fee.",
  },
  "upsc-cse": {
    officialName: "UPSC Civil Services",
    officialUrl: "https://upsc.gov.in/",
    reviewed,
    overview:
      "The Civil Services Examination, often called UPSC CSE, selects officers for services such as the IAS, IFS, and IPS. The Union Public Service Commission conducts it.\n\nIt is a three-stage exam: Preliminary, Main, and the Personality Test. Clearing one stage only opens the next stage.",
    whoItIsFor:
      "Graduates who want a career in the listed civil services and who meet the age, attempt, and nationality rules in that year's notification. The attempt limit depends on category and is not the same for every candidate.",
    structure:
      "Prelims has two objective papers: General Studies and CSAT. CSAT is qualifying. Mains is written and descriptive, with qualifying language papers plus General Studies, an essay, and one optional subject. Candidates who clear Mains are called for the interview. The official notification names every paper and the qualifying marks.",
    topics: [
      "Prelims General Studies",
      "CSAT as a qualifying paper",
      "Essay",
      "General Studies I to IV",
      "One optional subject",
      "Personality test",
    ],
    howToPrepare:
      "Start from the latest UPSC notification and the syllabus printed there. Prepare Prelims and the Mains General Studies core together, and choose the optional subject early. Treat CSAT as a paper you must clear, not as an optional extra. Previous official question papers are on upsc.gov.in.",
    watchOuts:
      "A high Prelims score does not carry into Mains. Language papers and CSAT can end the attempt if they are ignored. Age and attempt counts are category-specific. Use only the notification on upsc.gov.in for dates and fees.",
  },
  cat: {
    officialName: "IIM CAT",
    officialUrl: "https://iimcat.ac.in/",
    reviewed,
    overview:
      "CAT is the Common Admission Test for the MBA and other postgraduate management programmes at the IIMs and many other schools that accept the score. One of the IIMs conducts it each year.\n\nThe result is a scaled score and a percentile. A percentile compares you with other test takers. It is not the percentage of questions you got right.",
    whoItIsFor:
      "Graduates, and final-year students if the year's eligibility allows, who want a management programme. Each IIM and each non-IIM school sets its own shortlist. CAT does not allot a seat by itself.",
    structure:
      "The test has three sections: Verbal Ability and Reading Comprehension, Data Interpretation and Logical Reasoning, and Quantitative Ability. There is a time limit for each section. Some questions are multiple choice with negative marking, and some are typed answers without negative marking. The information bulletin for that year is the pattern.",
    topics: [
      "Reading comprehension",
      "Verbal ability",
      "Data interpretation",
      "Logical reasoning",
      "Arithmetic, algebra, and geometry",
      "Section time limits and percentile",
    ],
    howToPrepare:
      "Take timed section tests before full mocks. Accuracy matters more than attempting every question, because multiple-choice items carry negative marks. Read the current bulletin on iimcat.ac.in for section order, duration, and eligibility, then check each institute's own shortlist rules.",
    watchOuts:
      "A coaching percentile predictor is not the IIM cutoff. Each campus can weight class X, class XII, graduation marks, and work experience differently. Register only through iimcat.ac.in.",
  },
  sat: {
    officialName: "College Board SAT",
    officialUrl: "https://satsuite.collegeboard.org/sat",
    reviewed,
    overview:
      "The SAT is a College Board test used by many universities, mainly for undergraduate admission outside India. The current test is digital.\n\nThe total score runs from 400 to 1600, made of two section scores. It is not an Indian entrance exam and it does not replace JEE or NEET.",
    whoItIsFor:
      "Students applying to universities that ask for an SAT score. Some colleges are test-optional, so the score is useful only where the application asks for it.",
    structure:
      "The digital SAT has a Reading and Writing section and a Math section. The test is adaptive between modules inside those sections. A calculator is allowed for the math modules in the digital format. College Board publishes the exact timing and the practice tests in Bluebook.",
    topics: [
      "Reading and writing craft",
      "Information and ideas",
      "Standard English conventions",
      "Algebra",
      "Advanced math and problem solving",
      "Geometry and trigonometry",
    ],
    howToPrepare:
      "Use the official Bluebook practice tests so the timing and the adaptive modules feel familiar. Read the student booklet for what you may bring to the test center. Send scores only to the colleges on your list, and check each college's testing policy for that admission cycle.",
    watchOuts:
      "An SAT score does not admit you to an IIT or a medical college in India. Superscoring and test-optional rules differ by college. Dates and the fee are on the College Board site, not on a coaching poster.",
  },
}

export function getCurated(slug: string) {
  return CURATED_REFERENCES[slug] ?? null
}
