import Testimonials from "../components/Testimonials";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Stats from "../components/Stats";
import Benefits from "../components/Benefits";
import RegisterForm from "../components/RegisterForm";
import Countries from "../components/Countries";
import Footer from "../components/Footer";
import PartnerUniversities from "../components/PartnerUniversities";

import "./Home.css";

export default function Home() {

  useEffect(() => {
    const heroContent = document.querySelector(".hero-content");

    if (heroContent) {
      heroContent.classList.add("fade-in");
    }
  }, []);

  const scrollToRegister = () => {
    document
      .getElementById("register")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <>
      <Navbar />

      {/* Hero + Stats together fill exactly one viewport height */}
      <div className="hero-stats-wrap">

        {/* Hero Section */}
        <section id="home" className="hero">

          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-video"
          >
            <source
              src="/hero-video.mp4"
              type="video/mp4"
            />
          </video>

          <div className="hero-overlay"></div>

          <div className="hero-content">

            <h1>
              Your Gateway To
              Foreign Education
            </h1>

            <p>
              We guide students through
              admissions, scholarships,
              visas and university selection.
            </p>

            <button onClick={scrollToRegister}>
              Apply Now
            </button>

          </div>

        </section>

        {/* Stats Section — fills remaining viewport space automatically */}
        <Stats />

      </div>
      <PartnerUniversities />

      {/* Benefits Section */}
      <Benefits />

      {/* Registration Form */}
      <RegisterForm />



      {/* Countries Section */}
      <Countries />


      {/* Testimonials Section */}
      <Testimonials />

      {/* Footer */}
      <Footer />

    </>
  );
}
