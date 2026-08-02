import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./BudgetCalculator.css";

const countryData = {
  georgia: { name: "Georgia", tuitionPerYear: 7000, livingPerYear: 3000, hostelPerYear: 1400, visaOneTime: 300, travelOneTime: 700, insurancePerYear: 250, durationYears: 6 },
  kyrgyzstan: { name: "Kyrgyzstan", tuitionPerYear: 3500, livingPerYear: 1800, hostelPerYear: 800, visaOneTime: 200, travelOneTime: 500, insurancePerYear: 180, durationYears: 5 },
  russia: { name: "Russia", tuitionPerYear: 5000, livingPerYear: 2500, hostelPerYear: 1100, visaOneTime: 250, travelOneTime: 600, insurancePerYear: 200, durationYears: 6 },
  kazakhstan: { name: "Kazakhstan", tuitionPerYear: 4500, livingPerYear: 2200, hostelPerYear: 900, visaOneTime: 200, travelOneTime: 550, insurancePerYear: 180, durationYears: 5 },
  romania: { name: "Romania", tuitionPerYear: 9000, livingPerYear: 4000, hostelPerYear: 1800, visaOneTime: 350, travelOneTime: 750, insurancePerYear: 300, durationYears: 6 },
  uzbekistan: { name: "Uzbekistan", tuitionPerYear: 3500, livingPerYear: 1700, hostelPerYear: 750, visaOneTime: 200, travelOneTime: 500, insurancePerYear: 170, durationYears: 5 },
  nepal: { name: "Nepal", tuitionPerYear: 6000, livingPerYear: 1800, hostelPerYear: 700, visaOneTime: 100, travelOneTime: 200, insurancePerYear: 150, durationYears: 5.5 },
  poland: { name: "Poland", tuitionPerYear: 13000, livingPerYear: 5000, hostelPerYear: 2200, visaOneTime: 400, travelOneTime: 800, insurancePerYear: 350, durationYears: 6 },
};

const usdToInr = 87;

const rowIcons = {
  tuition: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3L2 8l10 5 10-5-10-5z" />
      <path d="M6 10v6c0 1.5 2.5 3 6 3s6-1.5 6-3v-6" />
    </svg>
  ),
  living: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2v20M17 5H9.5a2.5 2.5 0 000 5H14a2.5 2.5 0 010 5H6" />
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
  oneTime: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9h18M7 13h4M7 16h6" />
    </svg>
  ),
};

const BudgetCalculatorPage = () => {
  const [country, setCountry] = useState("georgia");
  const [years, setYears] = useState(countryData.georgia.durationYears);
  const [currency, setCurrency] = useState("usd");

  const data = countryData[country];

  const handleCountryChange = (key) => {
    setCountry(key);
    setYears(countryData[key].durationYears);
  };

  const stepYears = (delta) => {
    setYears((prev) => {
      const next = Math.round((prev + delta) * 2) / 2; // keep clean 0.5 steps
      if (next < 1) return 1;
      if (next > 7) return 7;
      return next;
    });
  };

  const breakdown = useMemo(() => {
    const tuition = data.tuitionPerYear * years;
    const living = data.livingPerYear * years;
    const hostel = data.hostelPerYear * years;
    const insurance = data.insurancePerYear * years;
    const oneTime = data.visaOneTime + data.travelOneTime;
    const totalUSD = tuition + living + hostel + insurance + oneTime;

    return {
      tuition,
      living,
      hostel,
      insurance,
      oneTime,
      totalUSD,
      totalINR: totalUSD * usdToInr,
    };
  }, [data, years]);

  const formatUSD = (n) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  const formatINR = (n) => `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

  const rows = [
    { key: "tuition", label: "Tuition Fees", value: breakdown.tuition, suffix: `(${years} yrs)` },
    { key: "living", label: "Living Expenses", value: breakdown.living, suffix: `(${years} yrs)` },
    { key: "hostel", label: "Hostel / Accommodation", value: breakdown.hostel, suffix: `(${years} yrs)` },
    { key: "insurance", label: "Health Insurance", value: breakdown.insurance, suffix: `(${years} yrs)` },
    { key: "oneTime", label: "Visa + Travel", value: breakdown.oneTime, suffix: "(one-time)" },
  ];

  return (
    <>
      <title>MBBS Abroad Budget Calculator | UpBrainiacs</title>
      <meta
        name="description"
        content="Estimate your total MBBS abroad budget in USD and INR — tuition, living costs, hostel, insurance, visa and travel — for Georgia, Russia, Kazakhstan, Kyrgyzstan, Uzbekistan, Romania, Nepal and Poland."
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
            Get an estimated cost breakdown in USD or INR for studying MBBS
            in your chosen destination.
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
                {Object.entries(countryData).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.name}
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
                  onClick={() => stepYears(-0.5)}
                  aria-label="Decrease years"
                >
                  −
                </button>
                <span className="years-display">{years}</span>
                <button
                  type="button"
                  className="stepper-btn"
                  onClick={() => stepYears(0.5)}
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