import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TiltCard from "../components/TiltCard";
import "./About.css";

const services = [
  {
    id: "admission",
    title: "Admission Guidance",
    desc: "Complete documentation support including identity proofs, academic records, English-test scores (IELTS/TOEFL/PTE), plagiarism-free SOPs and LORs, express admission processing, interview preparation and scholarship application assistance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3L2 8l10 5 10-5-10-5z" />
        <path d="M6 10v6c0 1.5 2.5 3 6 3s6-1.5 6-3v-6" />
      </svg>
    ),
  },
  {
    id: "financial",
    title: "Financial Assistance & Scholarships",
    desc: "Access to 25+ nationalised, private, cooperative and foreign banks & NBFCs. Unsecured loans up to ₹1.5 Crore and secured loans up to ₹5 Crore at rates starting from 3.5%, with pre & post loan support, instant eligibility checks and fast, discounted processing throughout.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a2.5 2.5 0 000 5H14a2.5 2.5 0 010 5H6" />
      </svg>
    ),
  },
  {
    id: "insurance",
    title: "Insurance Assistance",
    desc: "Customized travel, mandatory and extended medical insurance plans with tie-ups across leading global providers. End-to-end claim assistance, university waiver guidance and fully online accessibility, backed by 1,20,000+ policies issued to date.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z" />
      </svg>
    ),
  },
  {
    id: "visa",
    title: "Visa Assistance",
    desc: "Personalised guidance mapped to your destination country's exact requirements. Accurate, on-time application filing with full document compliance, and ongoing support through the entire visa processing window to reduce delays or rejections.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 9h18M7 13h4M7 16h6" />
      </svg>
    ),
  },
];

const founders = [
  {
    id: "shikher",
    name: "Shikher Kelvin",
    role: "Founder & Chairman, Upbrainiacs Global Pvt. Ltd.",
    photo: "/about/founder.png",
    desc: `UpBrainiacs Global Private Limited was founded with a strong belief in the talent and potential of Indian students to excel on the global stage. Built from the ground up with a student-first approach, the organisation is dedicated to supporting every student from the very beginning of their study abroad journey. With deep expertise in international education and a commitment to staying ahead of the ever-evolving global education landscape, UpBrainiacs provides accurate guidance, transparent processes, and personalised support at every stage. Through our hands-on approach and unwavering focus on student success, UpBrainiacs has developed a trusted model for international education—one that empowers students, transforms aspirations into reality, and serves as a springboard for those seeking world-class educational opportunities across the globe.`,
    principles: null,
  },
  {
    id: "shreyansh",
    name: "Shreyansh Soni",
    role: "Co-Founder & Director, Upbrainiacs Global Pvt. Ltd.",
    photo: "/about/shreyansh.png",
    desc: `Passion is one of the most important aspects to cherish life, as it makes you feel every breath that you take — and what makes me passionate is the determination I have to improvise and push things to the level of being called the best. Hard work pays well, but smart work pays even better — I believe there is always a better way to get things done, and I love finding that out. I am not the kind of person who would devote anything less than 100% to anything I'm attached to. I believe everyone has their own signature style of working, and so do I — in whichever company I have worked with, I make sure I add improvements through my skills and potential, because I believe there is always scope for improvement.`,
    principles: ['"Be Good, Do Good."', '"Deserve Before You Desire."'],
  },
];

const About = () => {
  return (
    <>
      <title>About Us | UpBrainiacs — MBBS Abroad Consultancy</title>
      <meta
        name="description"
        content="UpBrainiacs Global Private Limited is a premier international education consultancy specialising in MBBS admissions and higher education abroad. Meet our founders and explore our admission, financial, insurance and visa assistance services."
      />
      <link rel="canonical" href="https://upbrainiacs.com/about" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://upbrainiacs.com/about" />
      <meta property="og:title" content="About Us | UpBrainiacs" />
      <meta
        property="og:description"
        content="A premier international education consultancy — trusted guidance, transparent counselling and comprehensive support for MBBS and higher education abroad."
      />
      <meta property="og:image" content="https://upbrainiacs.com/ub-logo.png" />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About UpBrainiacs",
          url: "https://upbrainiacs.com/about",
          description:
            "UpBrainiacs Global Private Limited is a premier international education consultancy specialising in MBBS admissions and higher education abroad, providing trusted guidance, transparent counselling and comprehensive support.",
          mainEntity: {
            "@type": "EducationalOrganization",
            name: "UpBrainiacs",
            url: "https://upbrainiacs.com",
            logo: "https://upbrainiacs.com/ub-logo.png",
            founders: [
              {
                "@type": "Person",
                name: "Shikher Kelvin",
                jobTitle: "Founder & Chairman",
              },
              {
                "@type": "Person",
                name: "Shreyansh Soni",
                jobTitle: "Co-Founder & Director",
              },
            ],
          },
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: services.map((s, i) => ({
            "@type": "Service",
            position: i + 1,
            name: s.title,
            description: s.desc,
            provider: {
              "@type": "EducationalOrganization",
              name: "UpBrainiacs",
            },
          })),
        })}
      </script>

      <Navbar />

      <section className="about-section">
        {/* Intro — starts right below the fixed navbar */}
        <div className="about-intro">
          <span className="about-eyebrow">ABOUT</span>
          <h1 className="about-brandline">
            <span className="brand-up">Up</span>
            <span className="brand-brainiacs">Brainiacs</span>
            <span className="brand-dot">.</span>
          </h1>
          <p className="about-lead">
            <strong>UpBrainiacs Global Private Limited</strong> is a premier
            international education consultancy committed to empowering
            aspiring students with access to world-class educational
            opportunities across the globe. Specialising in MBBS admissions
            and higher education abroad, we provide trusted guidance,
            transparent counselling, and comprehensive support to help
            students make informed decisions about their academic future.
          </p>
          <p className="about-lead about-lead-secondary">
            Driven by a student-first philosophy, UpBrainiacs Global offers
            end-to-end admission solutions designed to simplify every stage
            of the overseas education journey — from personalised career
            counselling and university selection to application processing,
            document verification, visa assistance, education loan
            guidance, travel support, and post-arrival assistance.
          </p>
          <p className="about-lead about-lead-secondary">
            With a growing network of internationally recognised
            universities and strategic academic partners, UpBrainiacs
            Global serves as a trusted gateway to global education,
            enabling students and parents to make confident and
            well-informed decisions at every step.
          </p>
          <p className="about-lead about-lead-secondary">
            At the heart of our organisation lies an unwavering commitment
            to integrity, transparency, and excellence. Our counsellors work
            closely with students and their families, offering personalised
            support throughout the entire admission process while
            maintaining the highest standards of professionalism and
            ethical practice.
          </p>
          <div className="about-divider" />
        </div>

        {/* Founders — side by side */}
        <div className="founder-wrap">
          <div className="founders-row">
            {founders.map((f,idx) => (
              <TiltCard className="founder-tilt" maxTilt={4} key={f.id}>
                <div className={`founder-card${idx % 2 === 1 ? " founder-card--reverse" : ""}`}>
                  <div className="founder-photo-side">
                    <span className="founder-logo-badge">
                      <img src="/ub-logo.png" alt="UpBrainiacs" loading="lazy" />
                    </span>

                    <div className="founder-accent-block"></div>

                    <div className="founder-photo-frame">
                      <img
                        src={f.photo}
                        alt={`${f.name} — ${f.role}`}
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="founder-quote-side">
                    <span className="founder-eyebrow">A MESSAGE FROM</span>

                    <div className="founder-quote-card">
                      <span className="quote-glyph">"</span>
                      <p className="founder-quote-text">{f.desc}</p>
                      <span className="quote-glyph quote-glyph-end">"</span>

                      {f.principles && (
                        <div className="founder-principles">
                          {f.principles.map((p, idx) => (
                            <span key={idx}>{p}</span>
                          ))}
                        </div>
                      )}

                      <div className="founder-signature">
                        <span className="founder-name">— {f.name}</span>
                        <span className="founder-role">{f.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Services — mouse-follow 3D tilt cards, full descriptions */}
        <div className="about-services">
          <h2 className="about-heading">Our Services</h2>
          <div className="services-tilt-grid">
            {services.map((s, i) => {
              const num = String(i + 1).padStart(2, "0");
              return (
                <div className="tilt-grid-cell" key={s.id}>
                  <TiltCard className="tilt-grid-inner" maxTilt={5}>
                    <span className="tilt-num">{num}</span>
                    <div className="tilt-icon">{s.icon}</div>
                    <h3 className="tilt-title">{s.title}</h3>
                    <p className="tilt-desc">{s.desc}</p>
                  </TiltCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;