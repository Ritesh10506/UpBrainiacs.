import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import budgetData, {
  HOSTEL_PER_YEAR,
  INSURANCE_ONE_TIME,
} from "../data/budgetData";
import "./BudgetCalculator.css";

const usdToInr = 87;

const rowIcons = {
  tuition: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3L2 8l10 5 10-5-10-5z" />
      <path d="M6 10v6c0 1.5 2.5 3 6 3s6-1.5 6-3v-6" />
    </svg>
  ),
  hostel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 10.5L12 4l9 6.5" />
      <path d="M5 9.5V20h14V9.5" />
      <path d="M9 20v-6h6v6" />
    </svg>
  ),
  insurance: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z" />
    </svg>
  ),
  otc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9h18M7 13h4M7 16h6" />
    </svg>
  ),
};

const countryKeys = Object.keys(budgetData);

const BudgetCalculatorPage = () => {
  const [country, setCountry] = useState(countryKeys[0]);
  const [collegeIndex, setCollegeIndex] = useState(0);
  const [currency, setCurrency] = useState("usd");

  const countryInfo = budgetData[country];
  const college = countryInfo.colleges[collegeIndex];

  const [years, setYears] = useState(college.durationYears);

  const handleCountryChange = (key) => {
    setCountry(key);
    setCollegeIndex(0);
    setYears(budgetData[key].colleges[0].durationYears);
  };

  const handleCollegeChange = (idxStr) => {
    const idx = Number(idxStr);
    setCollegeIndex(idx);
    setYears(countryInfo.colleges[idx].durationYears);
  };

  const stepYears = (delta) => {
    setYears((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > 7) return 7;
      return next;
    });
  };

  const breakdown = useMemo(() => {
    const tuition = college.tuitionPerYear * years;
    const hostel = HOSTEL_PER_YEAR * years;
    const insurance = INSURANCE_ONE_TIME;
    const otc = college.otc;
    const totalUSD = tuition + hostel + insurance + otc;

    return {
      tuition,
      hostel,
      insurance,
      otc,
      totalUSD,
      totalINR: totalUSD * usdToInr,
    };
  }, [college, years]);

  const formatUSD = (n) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  const formatINR = (n) => `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

  const rows = [
    { key: "tuition", label: "Tuition Fees", value: breakdown.tuition, suffix: `(${years} yrs)` },
    { key: "hostel", label: "Hostel / Accommodation", value: breakdown.hostel, suffix: `(${years} yrs)` },
    { key: "insurance", label: "Health Insurance", value: breakdown.insurance, suffix: "(one-time)" },
    { key: "otc", label: "OTC (One-Time Charge)", value: breakdown.otc, suffix: "(one-time)" },
  ];

  return (
    <>
      <title>MBBS Abroad Budget Calculator | UpBrainiacs</title>
      <meta
        name="description"
        content="Estimate your total MBBS abroad budget in USD and INR — pick your country and college and get a tuition, hostel, insurance and one-time charge breakdown for Georgia, Russia, Kazakhstan, Kyrgyzstan, Uzbekistan, Romania, Nepal and Poland."
      />
      <link rel="canonical" href="https://upbrainiacs.com/budget-calculator" />

      <Navbar />

      <section className="budget-page">
        <div className="budget-blob budget-blob-1"></div>
        <div className="budget-blob budget-blob-2"></div>

        <div className="budget-calc-header">
          <span className="budget-eyebrow">PLAN YOUR JOURNEY</span>
          <h1 className="budget-heading">MBBS Abroad Budget Calculator</h1>
          <p className="budget-subtext">
            Pick your country and college to get an estimated cost breakdown
            in USD or INR.
          </p>
          <div className="budget-header-divider" />
        </div>

        <div className="budget-calc-card">
          <div className="currency-toggle">
            <button
              className={`currency-btn ${currency === "usd" ? "currency-active" : ""}`}
              onClick={() => setCurrency("usd")}
            >
              USD ($)
            </button>
            <button
              className={`currency-btn ${currency === "inr" ? "currency-active" : ""}`}
              onClick={() => setCurrency("inr")}
            >
              INR (₹)
            </button>
          </div>

          <div className="budget-inputs">
            <div className="budget-field">
              <label>Destination Country</label>
              <select
                value={country}
                onChange={(e) => handleCountryChange(e.target.value)}
              >
                {countryKeys.map((key) => (
                  <option key={key} value={key}>
                    {budgetData[key].name}
                  </option>
                ))}
              </select>
            </div>

            <div className="budget-field">
              <label>College / University</label>
              <select
                value={collegeIndex}
                onChange={(e) => handleCollegeChange(e.target.value)}
              >
                {countryInfo.colleges.map((c, idx) => (
                  <option key={c.name} value={idx}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="budget-field">
              <label>Course Duration (years)</label>
              <div className="years-stepper">
                <button
                  type="button"
                  className="stepper-btn"
                  onClick={() => stepYears(-1)}
                  aria-label="Decrease years"
                >
                  −
                </button>
                <span className="years-display">{years}</span>
                <button
                  type="button"
                  className="stepper-btn"
                  onClick={() => stepYears(1)}
                  aria-label="Increase years"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="budget-breakdown">
            {rows.map((row, idx) => (
              <div
                className="budget-row"
                key={row.key}
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
                <div className="budget-row-label">
                  <span className="budget-row-icon">{rowIcons[row.key]}</span>
                  <span>
                    {row.label}{" "}
                    <span className="budget-row-suffix">{row.suffix}</span>
                  </span>
                </div>
                <div className="budget-row-value">
                  <span className="budget-usd">
                    {currency === "usd"
                      ? formatUSD(row.value)
                      : formatINR(row.value * usdToInr)}
                  </span>
                </div>
              </div>
            ))}

            <div className="budget-total-row">
              <span>Estimated Total</span>
              <div className="budget-total-values">
                {currency === "usd" ? (
                  <>
                    <span className="budget-total-usd">
                      {formatUSD(breakdown.totalUSD)}
                    </span>
                    <span className="budget-total-inr">
                      ≈ {formatINR(breakdown.totalINR)}
                    </span>
                  </>
                ) : (
                  <span className="budget-total-usd">
                    {formatINR(breakdown.totalINR)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="budget-disclaimer">
            These are approximate estimates for planning purposes only, based
            on industry-average figures. Actual costs vary by university,
            lifestyle and exchange rates. Contact our counsellors for a
            personalised, accurate breakdown.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BudgetCalculatorPage;
