import { useRef, useState } from "react";
import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    type: "video",
    src: "/testimonials/video1.mp4",
    name: "Campus life",
    course: "Caucasus International University (CIU)",
    quote: "UpBrainiacs partner university.",
  },
  {
    id: 2,
    type: "photo",
    src: "/testimonials/photo2.jpg",
    name: "batch",
    course: "MBBS, Kazakhstan",
    quote: "Transparent, stress-free loan and admission process.",
  },
  {
    id: 3,
    type: "photo",
    src: "/testimonials/photo3.jpg",
    name: "batch",
    course: "MBBS, Romania",
    quote: "Felt like family from counselling to admission.",
  },
  {
    id: 4,
    type: "photo",
    src: "/testimonials/photo4.jpg",
    name: "student group",
    course: "MBBS, Georgia",
    quote: "Felt like family from counselling in ciu.",
  },
   {
    id: 5,
    type: "video",
    src: "/testimonials/video2.mp4",
    name: "campus",
    course: "MBBS, CIU",
    quote: "students life in ciu university",
  },

   {
    id: 6,
    type: "photo",
    src: "/testimonials/photo5.jpg",
    name: "Ananya Sharma",
    course: "MBBS, Tbilisi State Medical University",
    quote: "UpBrainiacs guided me through every step of my MBBS journey.",
  },
  {
    id: 7,
    type: "photo",
    src: "/testimonials/photo6.jpg",
    name: "Student Depature",
    course: "MBBS Abroad",
    quote: "UpBrainiacs guided them through every step of my MBBS journey.",
  },
   {
    id: 7,
    type: "video",
    src: "/testimonials/video3.mp4",
    name: "Orientation",
    course: "MBBS,CIU",
    quote: "partner university ciu",
  },
];

const Testimonials = () => {
  const [paused, setPaused] = useState(false);
  const videoRefs = useRef({});

  const handlePlay = (id) => {
    setPaused(true);
    Object.entries(videoRefs.current).forEach(([key, vid]) => {
      if (Number(key) !== id && vid) vid.pause();
    });
  };

  const handlePauseAll = () => setPaused(false);

  // Duplicate the list for a seamless infinite loop
  const loopList = [...testimonials, ...testimonials];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-header">
        <span className="testimonials-eyebrow">TESTIMONIALS</span>
        <h2 className="testimonials-heading">
          What Our <span className="highlight">Students Say</span>
        </h2>
        <div className="testimonials-divider" />
      </div>

      <div
        className="marquee-viewport"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => !anyVideoPlaying(videoRefs) && setPaused(false)}
      >
        <div className={`marquee-track ${paused ? "marquee-paused" : ""}`}>
          {loopList.map((t, i) => (
            <div className="testimonial-card" key={`${t.id}-${i}`}>
              <div className="testimonial-media">
                {t.type === "video" ? (
                  <video
                    ref={(el) => (videoRefs.current[t.id] = el)}
                    src={t.src}
                    controls
                    playsInline
                    onPlay={() => handlePlay(t.id)}
                    onPause={handlePauseAll}
                    className="testimonial-video"
                  />
                ) : (
                  <img src={t.src} alt={t.name} className="testimonial-photo" />
                )}
              </div>
              <div className="testimonial-info">
                <p className="testimonial-quote">"{t.quote}"</p>
                <span className="testimonial-name">{t.name}</span>
                <span className="testimonial-course">{t.course}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

function anyVideoPlaying(videoRefs) {
  return Object.values(videoRefs.current).some(
    (vid) => vid && !vid.paused && !vid.ended
  );
}

export default Testimonials;