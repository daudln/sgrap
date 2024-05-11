import db from ".";
import { school } from "./schema/school";

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
