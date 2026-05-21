import type { CSSProperties } from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import contactStickyNoteImg from "../assets/contact-sticky-note.avif";
import contactEmailIconImg from "../assets/contact-email-icon.avif";

const CONTACTS = {
  instagram: "#",
  behance: "#",
  linkedin: "https://www.linkedin.com/in/edilson-borgess/",
  email: "mailto:edilson.borgessb@gmail.com",
  whatsapp: "https://wa.me/5512992540651",
} as const;

const STICKY_INITIAL_PHRASE = "Consegue me pegar?";

const STICKY_PHRASES = [
  "Quase que você me pega hahaha!",
  "Tenta de novo!",
  "Foi por pouco 😜",
  "Você tá ficando rápido!",
  "Ihhh, escapou!",
  "Não desiste agora 👀",
  "Achei que você ia conseguir!",
  "Bora mais uma?",
  "Ainda não foi dessa vez 😆",
] as const;

const STICKY_SUCCESS_PHRASES = [
  "Você conseguiu 🎉",
  "Vitória sua dessa vez 👏",
] as const;

const STICKY_PATH = [
  { left: 76, top: 68, rotate: 9 },
  { left: 36, top: 46, rotate: -8 },
  { left: 75, top: 20, rotate: 11 },
  { left: 30, top: 58, rotate: -11 },
  { left: 72, top: 38, rotate: 8 },
  { left: 40, top: 24, rotate: -9 },
  { left: 70, top: 74, rotate: 10 },
  { left: 28, top: 34, rotate: -7 },
  { left: 68, top: 54, rotate: 7 },
  { left: 34, top: 18, rotate: -10 },
] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function ContactIcon({
  name,
}: {
  name: "instagram" | "behance" | "linkedin" | "email" | "phone";
}) {
  if (name === "email") {
    return (
      <span className="contact-icon" aria-hidden="true">
        <span
          className="contact-icon-image-mask contact-icon-image-mask--email"
          style={{
            WebkitMaskImage: `url(${contactEmailIconImg})`,
            maskImage: `url(${contactEmailIconImg})`,
          }}
        />
      </span>
    );
  }

  if (name === "phone") {
    return (
      <span className="contact-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="contact-icon-svg">
          <path
            d="M9.1 6.9c.32-.32.8-.4 1.18-.2l1.5.78c.43.22.62.73.45 1.18l-.53 1.38c-.1.25-.04.54.16.73l1.91 1.91c.2.2.48.26.73.16l1.38-.53c.45-.17.96.02 1.18.45l.78 1.5c.2.38.12.86-.2 1.18l-.78.78c-.56.56-1.38.77-2.14.57-1.54-.42-3.09-1.42-4.64-2.97-1.55-1.55-2.55-3.1-2.97-4.64-.2-.76.01-1.58.57-2.14l.78-.78Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }

  if (name === "instagram") {
    return (
      <span className="contact-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="contact-icon-svg">
          <rect
            x="4.2"
            y="4.2"
            width="15.6"
            height="15.6"
            rx="4.4"
            ry="4.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle
            cx="12"
            cy="12"
            r="3.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="16.8" cy="7.2" r="1" fill="currentColor" />
        </svg>
      </span>
    );
  }

  if (name === "behance") {
    return (
      <span className="contact-icon contact-icon--behance" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="contact-icon-svg">
          <path
            d="M5 7.4h5.62c1.82 0 3 .96 3 2.48 0 1.04-.54 1.8-1.48 2.14 1.22.26 1.94 1.22 1.94 2.54 0 1.76-1.38 2.94-3.52 2.94H5V7.4Zm5.02 3.86c1 0 1.58-.42 1.58-1.14 0-.74-.58-1.12-1.58-1.12H7.08v2.26h2.94Zm.18 4.36c1.18 0 1.86-.48 1.86-1.36 0-.86-.68-1.3-1.86-1.3H7.08v2.66h3.12Z"
            fill="currentColor"
          />
          <path d="M15.38 8.05h3.72v1.04h-3.72z" fill="currentColor" />
          <path
            d="M19.42 14.8c-.3 1.6-1.46 2.58-3.08 2.58-2.1 0-3.4-1.38-3.4-3.58 0-2.2 1.32-3.62 3.34-3.62 2.02 0 3.28 1.38 3.28 3.54v.46h-4.72c.08 1 .64 1.62 1.54 1.62.66 0 1.16-.26 1.4-.76h1.64Zm-4.54-1.74h3.12c-.06-.94-.62-1.48-1.5-1.48-.86 0-1.44.54-1.62 1.48Z"
            fill="currentColor"
          />
        </svg>
      </span>
    );
  }

  return (
    <span
      className={`contact-icon ${name === "linkedin" ? "contact-icon--linkedin" : ""}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="contact-icon-svg">
        <rect
          x="4.5"
          y="4.5"
          width="15"
          height="15"
          rx="1.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <g transform="translate(-0.45 0)">
          <path d="M8 10h2v6H8z" fill="currentColor" />
          <circle cx="9" cy="7.8" r="1.1" fill="currentColor" />
          <path
            d="M12.2 10h1.9v.95c.4-.7 1.06-1.15 2.02-1.15 1.46 0 2.38.98 2.38 2.7V16h-2v-3.14c0-.98-.42-1.5-1.22-1.5-.84 0-1.34.6-1.34 1.58V16h-1.85v-6Z"
            fill="currentColor"
          />
        </g>
      </svg>
    </span>
  );
}

export default function ContactSection() {
  const gameRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLButtonElement | null>(null);
  const rafLockedRef = useRef(false);
  const pathIndexRef = useRef(0);
  const pointerEngagedRef = useRef(false);
  const [moveCount, setMoveCount] = useState(0);
  const [caught, setCaught] = useState(false);
  const [stickyPosition, setStickyPosition] = useState({
    left: 50,
    top: 50,
    rotate: -10,
  });
  const [clickFeedback, setClickFeedback] = useState(false);
  const [stickyPhrase, setStickyPhrase] = useState(STICKY_INITIAL_PHRASE);

  const confettiPieces = useMemo(
    () =>
      Array.from({ length: 22 }, (_, index) => {
        const fromLeft = index % 2 === 0;
        const horizontalMid = fromLeft
          ? -120 - (index % 5) * 32
          : 120 + (index % 5) * 32;
        const verticalStart = -36 - (index % 5) * 12;
        const fallDrift = fromLeft
          ? -80 - (index % 5) * 28
          : 80 + (index % 5) * 28;
        const size = 8 + (index % 4) * 3;
        const delay = index * 18;
        const burst = 520 + (index % 5) * 45;
        const fall = 1100 + (index % 4) * 110;
        const rotate = fromLeft ? 150 + index * 12 : -150 - index * 12;
        const shape =
          index % 3 === 0 ? "circle" : index % 3 === 1 ? "strip" : "square";
        const color =
          index % 4 === 0
            ? "#fbc740"
            : index % 4 === 1
              ? "#8ecdf2"
              : index % 4 === 2
                ? "#ffffff"
                : "#58b9ad";

        return {
          id: `confetti-${index}`,
          style: {
            "--confetti-origin-x": `${stickyPosition.left}%`,
            "--confetti-origin-y": `${stickyPosition.top}%`,
            "--confetti-mid-x": `${horizontalMid}px`,
            "--confetti-end-x": `${horizontalMid + fallDrift}px`,
            "--confetti-start-y": `${verticalStart}px`,
            "--confetti-size": `${size}px`,
            "--confetti-delay": `${delay}ms`,
            "--confetti-burst-duration": `${burst}ms`,
            "--confetti-fall-duration": `${fall}ms`,
            "--confetti-rotate": `${rotate}deg`,
            "--confetti-color": color,
          } as CSSProperties,
          shape,
        };
      }),
    [stickyPosition.left, stickyPosition.top],
  );

  const stickyTransform = useMemo(() => {
    if (caught) {
      return "translate(-50%, -50%) rotate(-3deg) scale(1.04)";
    }

    if (clickFeedback) {
      return `translate(-50%, -50%) rotate(${stickyPosition.rotate}deg) scale(0.98)`;
    }

    return `translate(-50%, -50%) rotate(${stickyPosition.rotate}deg)`;
  }, [caught, clickFeedback, stickyPosition.rotate]);

  const moveSticky = useCallback(
    (clientX: number, clientY: number) => {
      if (caught || rafLockedRef.current || !gameRef.current || !stickyRef.current) {
        return;
      }

      const stickyRect = stickyRef.current.getBoundingClientRect();
      const stickyCenterX = stickyRect.left + stickyRect.width / 2;
      const stickyCenterY = stickyRect.top + stickyRect.height / 2;
      const dx = clientX - stickyCenterX;
      const dy = clientY - stickyCenterY;
      const distance = Math.hypot(dx, dy);

      if (distance > 150) {
        pointerEngagedRef.current = false;
        return;
      }

      if (pointerEngagedRef.current) {
        return;
      }

      rafLockedRef.current = true;
      pointerEngagedRef.current = true;

      requestAnimationFrame(() => {
        const nextStep = STICKY_PATH[pathIndexRef.current % STICKY_PATH.length];
        pathIndexRef.current += 1;

        const nextMoveCount = moveCount + 1;

        setStickyPosition({
          left: clamp(nextStep.left, 18, 82),
          top: clamp(nextStep.top, 18, 82),
          rotate: nextStep.rotate,
        });
        setMoveCount(nextMoveCount);
        setStickyPhrase(
          nextMoveCount >= 4
            ? "Agora pode clicar!"
            : STICKY_PHRASES[Math.floor(Math.random() * STICKY_PHRASES.length)],
        );
        rafLockedRef.current = false;
      });
    },
    [caught, moveCount],
  );

  const handleStickyClick = useCallback(() => {
    if (moveCount < 3 && !caught) {
      setClickFeedback(true);
      setStickyPhrase(
        STICKY_PHRASES[Math.floor(Math.random() * STICKY_PHRASES.length)],
      );
      window.setTimeout(() => setClickFeedback(false), 180);
      return;
    }

    setCaught(true);
    pointerEngagedRef.current = true;
    setStickyPhrase(
      STICKY_SUCCESS_PHRASES[
        Math.floor(Math.random() * STICKY_SUCCESS_PHRASES.length)
      ],
    );
  }, [caught, moveCount]);

  return (
    <section className="contact-section" id="contato">
      <div className="contact-container">
        <div className="contact-layout">
          <div
            ref={gameRef}
            className="contact-game"
            onMouseMove={(event) => moveSticky(event.clientX, event.clientY)}
            onTouchMove={(event) => {
              const touch = event.touches[0];
              if (touch) {
                moveSticky(touch.clientX, touch.clientY);
              }
            }}
          >
            {caught ? (
              <div className="contact-confetti" aria-hidden="true">
                {confettiPieces.map((piece) => (
                  <span
                    key={piece.id}
                    className={`contact-confetti-piece contact-confetti-piece--${piece.shape}`}
                    style={piece.style}
                  />
                ))}
              </div>
            ) : null}

            <button
              ref={stickyRef}
              type="button"
              className={`contact-sticky ${caught ? "is-caught" : ""}`}
              style={{
                left: `${stickyPosition.left}%`,
                top: `${stickyPosition.top}%`,
                transform: stickyTransform,
              }}
              aria-label="Minigame de post-it"
              onClick={handleStickyClick}
            >
              <img
                src={contactStickyNoteImg}
                alt=""
                aria-hidden="true"
                className="contact-sticky-image"
                loading="lazy"
                decoding="async"
              />
              <span className="contact-sticky-text">{stickyPhrase}</span>
            </button>

            <div className={`contact-success ${caught ? "is-visible" : ""}`}>
              Boa. Agora vamos conversar.
            </div>
          </div>

          <div className="contact-copy">
            <h2 className="contact-ghost">
              NÃO ME
              <br />
              ACHOU
              <br />
              POR AÍ?
            </h2>

            <div className="contact-headline">Vamos conversar</div>

            <div className="contact-box">
              <div className="contact-row">
                <a className="contact-pill" href={CONTACTS.instagram} aria-label="Instagram">
                  <ContactIcon name="instagram" />
                  <span>Instagram</span>
                </a>

                <a className="contact-pill" href={CONTACTS.behance} aria-label="Behance">
                  <ContactIcon name="behance" />
                  <span>Behance</span>
                </a>

                <a className="contact-pill" href={CONTACTS.linkedin} aria-label="LinkedIn">
                  <ContactIcon name="linkedin" />
                  <span>LinkedIn</span>
                </a>
              </div>

              <div className="contact-row contact-row-bottom">
                <a className="contact-pill" href={CONTACTS.email} aria-label="Email">
                  <ContactIcon name="email" />
                  <span>edilson.borgessb@gmail.com</span>
                </a>

                <a className="contact-pill" href={CONTACTS.whatsapp} aria-label="WhatsApp">
                  <ContactIcon name="phone" />
                  <span className="contact-no-wrap">+55 12 99254-0651</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
