import { createId } from "@paralleldrive/cuid2";
import db from ".";
import { school } from "./schema/school";
import { Subject, subject } from "./schema/subject";

const schools = [
  {
    name: "Everest Academy",
    motto: "Reach New Heights",
  },
  {
    name: "Golden Horizon High School",
    motto: "Shine Bright, Aim High",
  },
  {
    name: "Victory Heights Secondary School",
    motto: "Striving for Excellence",
  },
  {
    name: "Eagle Crest Institute",
    motto: "Soar to Success",
  },
  {
    name: "Phoenix Preparatory School",
    motto: "Rise from the Ashes",
  },
  {
    name: "Infinity High",
    motto: "Unlimited Potential, Infinite Possibilities",
  },
  {
    name: "Harmony Academy",
    motto: "Unity in Knowledge, Harmony in Achievement",
  },
  {
    name: "Royal Crown Secondary School",
    motto: "Excellence with Dignity",
  },
  {
    name: "Astro Academy",
    motto: "Reach for the Stars",
  },
  {
    name: "Vanguard Secondary School",
    motto: "Leading the Way in Education",
  },
  {
    name: "Zenith High",
    motto: "Towards the Pinnacle of Success",
  },
  {
    name: "Aurora Academy",
    motto: "Illuminate the Path to Knowledge",
  },
  {
    name: "Supreme Scholars Secondary School",
    motto: "Where Excellence Reigns Supreme",
  },
  {
    name: "Pinnacle Preparatory Institute",
    motto: "Scaling New Heights of Achievement",
  },
  {
    name: "Paragon High School",
    motto: "Striving for Perfection",
  },
  {
    name: "Olympus Secondary School",
    motto: "Aim for Greatness",
  },
  {
    name: "Celestial Heights High",
    motto: "Rising Above, Soaring Beyond",
  },
  {
    name: "Sovereign Secondary School",
    motto: "Empowering Tomorrow's Leaders",
  },
  {
    name: "Enigma High",
    motto: "Unlocking Potential, Solving Challenges",
  },
  {
    name: "Galaxy Grove Secondary School",
    motto: "Exploring New Frontiers of Knowledge",
  },
  {
    name: "Majestic Minds Academy",
    motto: "Cultivating Brilliance, Nurturing Talent",
  },
  {
    name: "Elysium Elite Secondary School",
    motto: "Where Dreams Take Flight",
  },
  {
    name: "Genesis High",
    motto: "Creating Futures, Shaping Destinies",
  },
  {
    name: "Ascendancy Academy",
    motto: "Ascending to Greatness",
  },
  {
    name: "Zenith Zenith High School",
    motto: "Beyond the Summit",
  },
  {
    name: "Equinox Institute",
    motto: "Balanced Excellence",
  },
  {
    name: "Momentum High",
    motto: "Driving Success Forward",
  },
  {
    name: "Astral Academy",
    motto: "Guiding Stars to Success",
  },
  {
    name: "Epiphany Secondary School",
    motto: "Revelation in Learning",
  },
  {
    name: "Virtuoso Valley High",
    motto: "Where Talent Meets Opportunity",
  },
  {
    name: "Legacy Lane Secondary School",
    motto: "Honoring Tradition, Embracing Innovation",
  },
  {
    name: "Eminent Heights High",
    motto: "Rising Above, Shining Bright",
  },
  {
    name: "Apex Academy",
    motto: "At the Peak of Excellence",
  },
  {
    name: "Catalyst High",
    motto: "Igniting Minds, Fueling Futures",
  },
  {
    name: "Renaissance Secondary School",
    motto: "Reviving Knowledge, Rekindling Passion",
  },
  {
    name: "Elite Endeavors Institute",
    motto: "Striving for Elite Achievement",
  },
  {
    name: "Noble Nexus High School",
    motto: "Connecting Minds, Inspiring Hearts",
  },
  {
    name: "Voyageur High",
    motto: "Embarking on a Journey of Excellence",
  },
  {
    name: "Excellence Express Secondary School",
    motto: "On the Fast Track to Success",
  },
];

export const subjectsData: Subject[] = [
  // Arts & Humanities
  {
    id: createId(),
    code: "ARTH101",
    name: "Art History",
    description: "Study of visual arts through time",
    category: "ART",
  },
  {
    id: createId(),
    code: "MUSC202",
    name: "Music Theory",
    description: "Fundamentals of music composition",
    category: "ART",
  },
  {
    id: createId(),
    code: "WRLT303",
    name: "World Literature",
    description: "Literary works from various cultures",
    category: "ART",
  },
  {
    id: createId(),
    code: "PHIL404",
    name: "Philosophy",
    description: "Study of fundamental questions of existence",
    category: "ART",
  },
  {
    id: createId(),
    code: "DRAM505",
    name: "Drama & Theatre",
    description: "Study of performance and dramatic works",
    category: "ART",
  },
  {
    id: createId(),
    code: "FILM606",
    name: "Film Studies",
    description: "Analysis and theory of cinema",
    category: "ART",
  },
  //  Sciences
  {
    id: createId(),
    code: "BIOL107",
    name: "Biology",
    description: "Study of living organisms",
    category: "SCIENCE",
  },
  {
    id: createId(),
    code: "CHEM108",
    name: "Chemistry",
    description: "Study of matter and its properties",
    category: "SCIENCE",
  },
  {
    id: createId(),
    code: "PHYS109",
    name: "Physics",
    description: "Study of matter, energy, and their interactions",
    category: "SCIENCE",
  },
  {
    id: createId(),
    code: "ASTR110",
    name: "Astronomy",
    description: "Study of celestial objects and phenomena",
    category: "SCIENCE",
  },
  {
    id: createId(),
    code: "ERTH111",
    name: "Earth Science",
    description: "Study of the Earth's physical structure and processes",
    category: "SCIENCE",
  },
  {
    id: createId(),
    code: "ENVS112",
    name: "Environmental Science",
    description: "Study of the natural world and human impact",
    category: "SCIENCE",
  },
  //  Social Sciences
  {
    id: createId(),
    code: "PSYC113",
    name: "Psychology",
    description: "Study of the mind and behavior",
    category: "SCIENCE",
  },
  {
    id: createId(),
    code: "SOCI114",
    name: "Sociology",
    description: "Study of human social relationships and institutions",
    category: "SCIENCE",
  },
  {
    id: createId(),
    code: "ANTH115",
    name: "Anthropology",
    description: "Study of human societies and cultures",
    category: "SCIENCE",
  },
  {
    id: createId(),
    code: "ECON116",
    name: "Economics",
    description:
      "Study of production, distribution, and consumption of goods and services",
    category: "SCIENCE",
  },
  {
    id: createId(),
    code: "POLS117",
    name: "Political Science",
    description: "Study of political systems and behavior",
    category: "SCIENCE",
  },
  //  Additional Subjects (You can customize these further)
  {
    id: createId(),
    code: "COMP118",
    name: "Computer Science",
    description: "Study of computation and algorithms",
    category: "SCIENCE",
  },
  {
    id: createId(),
    code: "STAT119",
    name: "Statistics",
    description: "Collection, analysis, and interpretation of data",
    category: "SCIENCE",
  },
  {
    id: createId(),
    code: "GEOG120",
    name: "Geography",
    description: "Study of the Earth's surface, features, and phenomena",
    category: "SCIENCE",
  },
  {
    id: createId(),
    code: "HIST121",
    name: "History",
    description: "Study of past events and their significance",
    category: "ART",
  }, // Could also be categorized as Social Science
];

async function seedDataFromJSON(): Promise<void> {
  try {
    await db.insert(school).values(schools);
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

seedDataFromJSON()
  .then(() => {
    console.log("Data seeding completed.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error during data seeding:", error);
    process.exit(1);
  });
