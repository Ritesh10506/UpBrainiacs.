import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import countriesData from "../data/countriesData";
import "./Navbar.css";

const Navbar = () => {
  const [isCountriesOpen, setIsCountriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCountriesOpen, setIsMobileCountriesOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const countryList = Object.entries(countriesData).map(
    ([slug, data]) => ({
      slug,
      name: data.countryName,
    })
  );

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileCountriesOpen(false);
  };

  const goToHomeSection = (e, sectionId) => {
    e?.preventDefault();
    closeMobileMenu();

    if (location.pathname === "/") {
      if (sectionId) {
        scrollToSection(sectionId);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    navigate("/");

    setTimeout(() => {
      if (sectionId) {
        scrollToSection(sectionId);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);
  };

  const scrollToRegister = (e) => goToHomeSection(e, "register");
  const scrollToTop = (e) => goToHomeSection(e, null);

  const toggleCountries = (e) => {
    e.preventDefault();
    setIsCountriesOpen((prev) => !prev);
  };

  const closeCountries = () => setIsCountriesOpen(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setIsMobileCountriesOpen(false);
  };

  const toggleMobileCountries = (e) => {
    e.preventDefault();
    setIsMobileCountriesOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCountriesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsCountriesOpen(false);
        closeMobileMenu();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="navbar">
      <Link to="/" className="brand" onClick={scrollToTop}>
        <span className="brand-up">Up</span>
        <span className="brand-brainiacs">Brainiacs</span>
        <span className="brand-dot">.</span>
      </Link>

      <ul className="nav-links">
        <li>
          <a href="#" onClick={scrollToTop}>Home</a>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li className="countries-dropdown" ref={dropdownRef}>
          <a
            href="#"
            className="countries-trigger"
            onClick={toggleCountries}
            aria-haspopup="true"
            aria-expanded={isCountriesOpen}
          >
            Countries
            <span className={`countries-arrow ${isCountriesOpen ? "countries-arrow-open" : ""}`}>
              ▾
            </span>
          </a>

          {isCountriesOpen && (
            <ul className="countries-menu">
              {countryList.map((country) => (
                <li key={country.slug}>
                  <Link to={`/mbbs-in/${country.slug}`} onClick={closeCountries}>
                    {country.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li>
          <Link to="/budget-calculator">Budget Calculator</Link>
        </li>

        <li>
          <a href="#register" onClick={scrollToRegister}>Registration</a>
        </li>
      </ul>

      <button className="start-btn" onClick={scrollToRegister}>
        Apply Now
      </button>

      <button
        className={`hamburger-btn ${isMobileMenuOpen ? "hamburger-open" : ""}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? "mobile-menu-overlay-open" : ""}`}
        onClick={closeMobileMenu}
      />

      <div className={`mobile-menu ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}>
        <ul className="mobile-nav-links">
          <li>
            <a href="#" onClick={scrollToTop}>Home</a>
          </li>

          <li>
            <Link to="/about" onClick={closeMobileMenu}>About</Link>
          </li>

          <li className="mobile-countries">
            <a
              href="#"
              className="mobile-countries-trigger"
              onClick={toggleMobileCountries}
              aria-expanded={isMobileCountriesOpen}
            >
              Countries
              <span className={`countries-arrow ${isMobileCountriesOpen ? "countries-arrow-open" : ""}`}>
                ▾
              </span>
            </a>

            {isMobileCountriesOpen && (
              <ul className="mobile-countries-menu">
                {countryList.map((country) => (
                  <li key={country.slug}>
                    <Link to={`/mbbs-in/${country.slug}`} onClick={closeMobileMenu}>
                      {country.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
              <Link to="/budget-calculator">Budget Calculator</Link>
          </li>

          <li>
            <a href="#register" onClick={scrollToRegister}>Registration</a>
          </li>
        </ul>

        <button className="mobile-apply-btn" onClick={scrollToRegister}>
          Apply Now
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
