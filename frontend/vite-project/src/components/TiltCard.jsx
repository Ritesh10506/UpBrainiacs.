import { useRef } from "react";
import "./TiltCard.css";

const TiltCard = ({ children, className = "", maxTilt = 8 }) => {
  const cardRef = useRef(null);
  const shineRef = useRef(null);
  const rafRef = useRef(null);
  const rectRef = useRef(null);
  const lastEventRef = useRef(null);

  const applyTilt = () => {
    const card = cardRef.current;
    const e = lastEventRef.current;
    const rect = rectRef.current;
    if (!card || !e || !rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const offsetX = x / rect.width - 0.5;
    const offsetY = y / rect.height - 0.5;

    const rotateY = offsetX * maxTilt * 2;
    const rotateX = -offsetY * maxTilt * 2;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

    if (shineRef.current) {
      const angle = (Math.atan2(y, x) * 180) / Math.PI;
      shineRef.current.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 60%)`;
    }

    rafRef.current = null;
  };

  const handleMouseEnter = () => {
    const card = cardRef.current;
    if (!card) return;

    // Cancel any in-progress reset animation and snap to flat instantly
    card.style.transition = "none";
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";

    // Measure ONLY once, while flat, so the rect stays accurate for the whole hover
    rectRef.current = card.getBoundingClientRect();
  };

  const handleMouseMove = (e) => {
    lastEventRef.current = e;
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(applyTilt);
    }
  };

  const handleMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    lastEventRef.current = null;
    rectRef.current = null;

    const card = cardRef.current;
    if (!card) return;

    card.style.transition =
      "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease-out";
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";

    if (shineRef.current) {
      shineRef.current.style.background =
        "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 60%)";
    }
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="tilt-shine" ref={shineRef}></div>
      <div className="tilt-content">{children}</div>
    </div>
  );
};

export default TiltCard;