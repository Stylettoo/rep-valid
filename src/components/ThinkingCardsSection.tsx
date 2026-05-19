import { useState } from "react";
import focoCardImg from "../assets/mindset-card-focus.png";
import processoCardImg from "../assets/mindset-card-process.png";
import visaoCardImg from "../assets/mindset-card-vision.png";
import baseCardImg from "../assets/mindset-card-base.png";
import visionCornerImg from "../assets/mindset-card-vision-corner.avif";

const cards = [
  {
    id: "foco",
    image: focoCardImg,
    alt: "Ilustração de foco em formato de ticket",
    title: "Foco",
    text: "Simplifico sistemas complexos e transformo experiências em algo mais claro, intuitivo e eficiente.",
  },
  {
    id: "processo",
    image: processoCardImg,
    alt: "Ilustração de processo em formato de ticket",
    title: "Processo",
    text: "Entendo o contexto, mapeio fluxos e identifico pontos de fricção antes de estruturar qualquer solução.",
  },
  {
    id: "visao",
    image: visaoCardImg,
    alt: "Ilustração de visão em formato de ticket",
    title: "Visão",
    text: "Busco enxergar além da interface, entendendo como as pessoas realmente interagem com sistemas e informações.",
  },
] as const;

function ThinkingImageCard({
  image,
  alt,
  title,
  text,
}: {
  image: string;
  alt: string;
  title: string;
  text: string;
}) {
  const [showBase, setShowBase] = useState(false);
  const [flipStage, setFlipStage] = useState<"idle" | "out" | "in">("idle");

  const handleFlip = () => {
    if (flipStage !== "idle") {
      return;
    }

    setFlipStage("out");

    window.setTimeout(() => {
      setShowBase((current) => !current);
      setFlipStage("in");
    }, 180);

    window.setTimeout(() => {
      setFlipStage("idle");
    }, 360);
  };

  return (
    <article className="mindset-card-perspective">
      <button
        type="button"
        className={`mindset-flip-card ${flipStage === "out" ? "is-flipping-out" : ""} ${flipStage === "in" ? "is-flipping-in" : ""}`}
        onClick={handleFlip}
        aria-pressed={showBase}
        aria-label={`Virar ${alt}`}
      >
        <img
          src={showBase ? baseCardImg : image}
          alt={showBase ? "" : alt}
          aria-hidden={showBase ? "true" : undefined}
          className={`mindset-gallery-image ${showBase ? "mindset-gallery-image-back" : ""}`}
        />
        {showBase ? (
          <div className="mindset-card-copy-overlay" aria-hidden="true">
            <h3 className="mindset-card-overlay-title">{title}</h3>
            <p className="mindset-card-overlay-text">{text}</p>
          </div>
        ) : null}
      </button>
    </article>
  );
}

export default function ThinkingCardsSection() {
  return (
    <section className="mindset-section">
      <div className="mindset-container">
        <div className="mindset-header">
          <span className="mindset-eyebrow">Como eu penso</span>
          <h2 className="mindset-heading">Experience</h2>
        </div>

        <img
          src={visionCornerImg}
          alt=""
          aria-hidden="true"
          className="mindset-floating-corner-image"
        />

        <div className="mindset-grid mindset-grid--gallery">
          {cards.map((card) => (
            <ThinkingImageCard
              key={card.id}
              image={card.image}
              alt={card.alt}
              title={card.title}
              text={card.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
