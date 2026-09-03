/**
 * Budget Calculator data — one entry per college, per country.
 *
 * tuitionPerYear : USD, per year
 * otc            : USD, one-time charge (application/admission/misc. one-time
 *                  cost). For Georgia this comes from the college-wise figures
 *                  provided directly; for every other country it's a flat
 *                  $2500 as instructed.
 * durationYears  : whole years only (no .5 steps)
 *
 * Hostel ($3000/year) and Health Insurance ($1200 one-time) are flat across
 * every college/country and are applied in BudgetCalculator.jsx rather than
 * repeated here.
 *
 * NOTES / ASSUMPTIONS (please double-check these):
 * - Georgia colleges are exactly the 9 already in src/data/georgia.js — no
 *   colleges were added or removed. Tuition + OTC for each come from the
 *   photos you provided.
 * - The photo's fee list has "BAU" ($5000) and the OTC list has "BSU"
 *   ($3000) — these were merged as the same college (Batumi Shota Rustaveli
 *   State University). Flag if that's wrong.
 * - "SEU Georgian National University" wasn't in either photo, so its
 *   tuition keeps the existing site figure ($5500/yr) and OTC defaults to
 *   $2500 like every non-Georgia college.
 * - Every other country's college list is exactly what's already in
 *   src/data/<country>.js — nothing added or removed. Tuition figures are
 *   pulled from each college's existing `fee` field. Where that field wasn't
 *   a clean "$X / Year" figure (Romania in EUR, Nepal total-course costs,
 *   Poland mixed-currency ranges), it was converted/averaged to a per-year
 *   USD estimate. Romania used EUR→USD at ~1.08.
 * - Fractional durations (e.g. Nepal's "5.5 Years") are rounded up to the
 *   nearest whole year, per your instruction to keep duration in whole years.
 */

const OTHER_COUNTRY_OTC = 2500;
const HOSTEL_PER_YEAR = 3000;
const INSURANCE_ONE_TIME = 1200;

const budgetData = {
  georgia: {
    name: "Georgia",
    colleges: [
      { name: "Tbilisi State Medical University", tuitionPerYear: 8000, otc: 3000, durationYears: 6 },
      { name: "University of Georgia", tuitionPerYear: 6500, otc: 2500, durationYears: 6 },
      { name: "David Tvildiani Medical University", tuitionPerYear: 6000, otc: 2000, durationYears: 6 },
      { name: "New Vision University", tuitionPerYear: 7000, otc: 2500, durationYears: 6 },
      { name: "Batumi Shota Rustaveli State University", tuitionPerYear: 5000, otc: 3000, durationYears: 6 },
      { name: "European University, Tbilisi", tuitionPerYear: 6500, otc: 2500, durationYears: 6 },
      { name: "Grigol Robakidze University (GRUNI)", tuitionPerYear: 5500, otc: 1500, durationYears: 6 },
      { name: "Caucasus International University (CIU)", tuitionPerYear: 6000, otc: 2500, durationYears: 6 },
      { name: "SEU Georgian National University", tuitionPerYear: 5500, otc: 2500, durationYears: 6 },
    ],
  },

  kyrgyzstan: {
    name: "Kyrgyzstan",
    colleges: [
      { name: "Osh State University", tuitionPerYear: 3500, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
      { name: "Jalalabad State University", tuitionPerYear: 3800, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
      { name: "Jalalabad International University", tuitionPerYear: 4000, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
      { name: "Osh International Medical University", tuitionPerYear: 3500, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
      { name: "Central Asian International Medical University", tuitionPerYear: 3600, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
      { name: "Kyrgyz Russian Slavic University", tuitionPerYear: 4500, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
    ],
  },

  russia: {
    name: "Russia",
    colleges: [
      { name: "Kazan Federal University", tuitionPerYear: 7000, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
      { name: "Pirogov Russian National Research Medical University", tuitionPerYear: 8000, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
      { name: "First Moscow State Medical University (Sechenov University)", tuitionPerYear: 10000, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
      { name: "Bashkir State Medical University", tuitionPerYear: 4500, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
      { name: "Orenburg State Medical University", tuitionPerYear: 5000, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
    ],
  },

  kazakhstan: {
    name: "Kazakhstan",
    colleges: [
      { name: "Kazakh National Medical University", tuitionPerYear: 6500, otc: OTHER_COUNTRY_OTC, durationYears: 5 },
      { name: "Astana Medical University", tuitionPerYear: 5500, otc: OTHER_COUNTRY_OTC, durationYears: 5 },
      { name: "South Kazakhstan Medical Academy", tuitionPerYear: 4800, otc: OTHER_COUNTRY_OTC, durationYears: 5 },
      { name: "Karaganda Medical University", tuitionPerYear: 5000, otc: OTHER_COUNTRY_OTC, durationYears: 5 },
      { name: "West Kazakhstan Marat Ospanov Medical University", tuitionPerYear: 4500, otc: OTHER_COUNTRY_OTC, durationYears: 5 },
    ],
  },

  romania: {
    name: "Romania",
    colleges: [
      { name: "Carol Davila University of Medicine and Pharmacy", tuitionPerYear: 9180, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
      { name: "Iuliu Hatieganu University of Medicine and Pharmacy", tuitionPerYear: 8640, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
      { name: "Grigore T. Popa University of Medicine and Pharmacy", tuitionPerYear: 8100, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
      { name: "Victor Babes University of Medicine and Pharmacy", tuitionPerYear: 8100, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
      { name: "University of Medicine and Pharmacy of Craiova", tuitionPerYear: 7020, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
    ],
  },

  uzbekistan: {
    name: "Uzbekistan",
    colleges: [
      { name: "Tashkent Medical Academy", tuitionPerYear: 3800, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
      { name: "Samarkand State Medical University", tuitionPerYear: 3500, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
      { name: "Bukhara State Medical Institute", tuitionPerYear: 3500, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
      { name: "Andijan State Medical Institute", tuitionPerYear: 3200, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
      { name: "Fergana Medical Institute of Public Health", tuitionPerYear: 3600, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
    ],
  },

  nepal: {
    name: "Nepal",
    colleges: [
      { name: "Manipal College of Medical Sciences (MCOMS), Pokhara", tuitionPerYear: 10000, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
      { name: "Chitwan Medical College (CMC), Bharatpur", tuitionPerYear: 12000, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
      { name: "Lumbini Medical College (LMC), Tansen/Palpa", tuitionPerYear: 13000, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
      { name: "KIST Medical College & Teaching Hospital, Lalitpur", tuitionPerYear: 11800, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
    ],
  },

  poland: {
    name: "Poland",
    colleges: [
      { name: "Medical University of Gdańsk", tuitionPerYear: 16400, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
      { name: "Medical University of Białystok", tuitionPerYear: 16300, otc: OTHER_COUNTRY_OTC, durationYears: 6 },
    ],
  },
};

export { HOSTEL_PER_YEAR, INSURANCE_ONE_TIME };
export default budgetData;
