import { useEffect, useRef, useState } from "react";
import macbookImg from "../../photos/MACBOOK.avif";
import headphoneImg from "../../photos/HEADPHONE.png";
import cameraImg from "../../photos/CAMERA-ZVE10.png";
import cappuccinoImg from "../../photos/CAPUCCINO.avif";
import postItImg from "../../photos/POST-IT.png";
import prendedoresImg from "../../photos/PRENDEDORES.png";
import ticketImg from "../../photos/ticket aviao.png";
import ticketDarkImg from "../../photos/ticket-dark-theme.png";
import clipImg from "../../photos/CLIP.avif";
import plantaImg from "../../photos/PLANTA.avif";
import papelAmassadoImg from "../../photos/PAPEL-AMASSADO.avif";
import glassesHeroImg from "../assets/glasses-hero.png";
import macbookAudio from "../../audio/macbook-sound-effect.mp3";
import headphoneAudio from "../../audio/headphone-audio-3-AM Coding Session - Lofi Hip Hop Mix [Study & Coding Beats] - Lofi Ghostie.mp3";
import cameraAudio from "../../audio/camera-sound-effect.mp3";
import ticketAudio from "../../audio/ticket-audio.mp3";
import SiteHeader, { type ThemeMode } from "./SiteHeader";

const audioByItem = {
  notebook: macbookAudio,
  headphone: headphoneAudio,
  camera: cameraAudio,
  ticket: ticketAudio,
} as const;

const decorativeItems = [
  // ====== NOTEBOOK ======
  {
    key: "notebook",
    type: "image",
    src: macbookImg,
    alt: "",
    className: "hero-scene-item hero-scene-item--notebook",
    animation: "heroFloat 6.2s cubic-bezier(0.4,0,0.2,1) infinite",
  },
  // ====== HEADPHONE ======
  {
    key: "headphone",
    type: "image",
    src: headphoneImg,
    alt: "",
    className: "hero-scene-item hero-scene-item--headphone",
    animation: "heroFloat 6.8s cubic-bezier(0.4,0,0.2,1) infinite",
  },
  // ====== CAFE ======
  {
    key: "cafe",
    type: "image",
    src: cappuccinoImg,
    alt: "",
    className: "hero-scene-item hero-scene-item--cafe",
    animation: "heroFloat 6.4s cubic-bezier(0.4,0,0.2,1) infinite",
  },
  // ====== CAMERA ======
  {
    key: "camera",
    type: "image",
    src: cameraImg,
    alt: "",
    className: "hero-scene-item hero-scene-item--camera",
    animation: "heroFloat 7.4s cubic-bezier(0.4,0,0.2,1) infinite",
  },
  // ====== PRENDEDORES ======
  {
    key: "prendedores",
    type: "image",
    src: prendedoresImg,
    alt: "",
    className: "hero-scene-item hero-scene-item--prendedores",
    animation: "heroFloat 5.8s cubic-bezier(0.4,0,0.2,1) infinite",
  },
  // ====== TICKET ======
  {
    key: "ticket",
    type: "image",
    src: ticketImg,
    alt: "",
    className: "hero-scene-item hero-scene-item--ticket",
    animation: "heroFloat 6.7s cubic-bezier(0.4,0,0.2,1) infinite",
  },
] as const;

function DecorativeItem({
  item,
  onMouseEnter,
  onMouseLeave,
}: {
  item: (typeof decorativeItems)[number];
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const isInteractive = item.key in audioByItem;
  const baseClassName = `${isInteractive ? "cursor-pointer" : "pointer-events-none"} select-none will-change-transform motion-reduce:transform-none motion-reduce:animate-none`;

  const style = item.animation ? { animation: item.animation } : undefined;

  if (item.type === "image") {
    return (
      <img
        src={item.src}
        alt={item.alt}
        aria-hidden="true"
        className={`${baseClassName} ${item.className}`}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`${baseClassName} ${item.className}`}
      style={style}
    />
  );
}

type CursorVariant = "default" | "media" | "note" | "cta";

export default function PortfolioHero() {
  const audioRefs = useRef<Partial<Record<keyof typeof audioByItem, HTMLAudioElement>>>({});
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [headphoneActive, setHeadphoneActive] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const entries = Object.entries(audioByItem) as Array<[keyof typeof audioByItem, string]>;

    for (const [key, src] of entries) {
      const audio = new Audio(src);
      audio.preload = "auto";
      audio.loop = key === "headphone";
      audioRefs.current[key] = audio;
    }

    return () => {
      for (const audio of Object.values(audioRefs.current)) {
        audio?.pause();
      }
    };
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const nextTheme: ThemeMode = savedTheme === "dark" ? "dark" : "light";

    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  }, []);

  const handleAudioEnter = (key: keyof typeof audioByItem) => {
    const audio = audioRefs.current[key];

    if (!audio) return;

    audio.currentTime = 0;
    void audio.play().catch(() => {
      // Ignore autoplay-style failures until the user interacts again.
    });
  };

  const handleAudioLeave = (key: keyof typeof audioByItem) => {
    const audio = audioRefs.current[key];

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
  };

  const handleCursorMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setCursorVisible(true);
    setCursorPosition({ x: event.clientX, y: event.clientY });
  };

  const handleCursorLeave = () => {
    setCursorVisible(false);
    setCursorVariant("default");
  };

  const handleToggleTheme = () => {
    const nextTheme: ThemeMode = theme === "light" ? "dark" : "light";

    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const currentTicketImg = theme === "dark" ? ticketDarkImg : ticketImg;
  const themedDecorativeItems = decorativeItems.map((item) =>
    item.key === "ticket" ? { ...item, src: currentTicketImg } : item,
  );

  const getCursorClasses = () => {
    switch (cursorVariant) {
      case "media":
        return "h-16 w-16 border-[3px] bg-[color:var(--cursor-shell)] after:h-4 after:w-4";
      case "note":
        return "h-14 w-14 rotate-12 rounded-[8px] border-[2px] bg-[color:var(--cursor-shell)] after:h-4 after:w-4";
      case "cta":
        return "h-14 w-28 rounded-full border-[3px] bg-[color:var(--cursor-shell)] after:h-3 after:w-12 after:rounded-full";
      default:
        return "h-10 w-10 border-[2px] bg-[color:var(--cursor-shell)] after:h-3 after:w-3";
    }
  };

  return (
    <div
      className="min-h-screen bg-[var(--bg-frame)] p-[14px] [font-family:Inter,system-ui,sans-serif] md:cursor-none"
      onMouseMove={handleCursorMove}
      onMouseLeave={handleCursorLeave}
    >
      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -8px, 0); }
        }

        @keyframes heroTilt {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50% { transform: translate3d(0, -8px, 0) rotate(-1deg); }
        }

        @keyframes musicNoteCurveLeft {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0) rotate(6deg) scale(0.68);
          }
          18% {
            opacity: 0.95;
            transform: translate3d(-6px, -8px, 0) rotate(2deg) scale(0.82);
          }
          55% {
            opacity: 0.85;
            transform: translate3d(-22px, -28px, 0) rotate(-8deg) scale(0.96);
          }
          100% {
            opacity: 0;
            transform: translate3d(-42px, -68px, 0) rotate(-16deg) scale(1.08);
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[100] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[var(--border-subtle)] shadow-[var(--shadow-cursor)] transition-[width,height,opacity,transform,background-color,border-radius] duration-200 ease-out after:rounded-full after:bg-[var(--cursor-core)] after:content-[''] md:flex ${cursorVisible ? "opacity-100" : "opacity-0"} ${getCursorClasses()}`}
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
        }}
      />

      <main
        id="home"
        className="relative min-h-[calc(100vh-28px)] overflow-hidden rounded-[32px] bg-[var(--bg-primary)] shadow-[var(--shadow-soft)]"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 mx-auto min-h-[calc(100vh-28px)] max-w-[1728px] px-4 pt-28 md:px-6 md:pt-32 lg:px-7">
          <SiteHeader homePrefix="" theme={theme} onToggleTheme={handleToggleTheme} />

          <section className="relative flex min-h-[calc(100vh-160px)] flex-col items-center justify-start px-4 pb-10 pt-8 text-center md:hidden">
            <img
              src={macbookImg}
              alt=""
              aria-hidden="true"
              className="hero-mobile-item hero-mobile-item--notebook"
              style={{ animation: "heroFloat 6.2s cubic-bezier(0.4,0,0.2,1) infinite" }}
            />

            <img
              src={headphoneImg}
              alt=""
              aria-hidden="true"
              className="hero-mobile-item hero-mobile-item--headphone"
              style={{ animation: "heroFloat 6.8s cubic-bezier(0.4,0,0.2,1) infinite" }}
            />

            <img
              src={cappuccinoImg}
              alt=""
              aria-hidden="true"
              className="hero-mobile-item hero-mobile-item--cafe"
              style={{ animation: "heroFloat 6.4s cubic-bezier(0.4,0,0.2,1) infinite" }}
            />

            <img
              src={cameraImg}
              alt=""
              aria-hidden="true"
              className="hero-mobile-item hero-mobile-item--camera"
              style={{ animation: "heroFloat 7.4s cubic-bezier(0.4,0,0.2,1) infinite" }}
            />

            <img
              src={currentTicketImg}
              alt=""
              aria-hidden="true"
              className="hero-mobile-item hero-mobile-item--ticket"
              style={{ animation: "heroFloat 6.7s cubic-bezier(0.4,0,0.2,1) infinite" }}
            />

            <img
              src={postItImg}
              alt="Post-its com a frase Insights transformam experiências"
              className="hero-mobile-postit"
            />

            <div className="relative z-10 inline-flex flex-col items-start">
              <span
                aria-hidden="true"
                className="hero-title-highlight absolute left-[-8px] top-[31%] -z-10 h-[26px] w-[62%] rounded-[4px]"
              />
              <span
                aria-hidden="true"
                className="hero-title-highlight absolute bottom-[1%] left-[-8px] -z-10 h-[26px] w-[103%] rounded-[4px]"
              />

              <h1 className="hero-title text-left text-[64px] font-bold uppercase leading-[0.92] tracking-[-0.04em]">
                UX-UI
                <br />
                DESIGNER
              </h1>
            </div>

            <p className="relative z-10 mt-10 max-w-[336px] text-left text-[26px] font-normal leading-[0.98] tracking-[-0.045em] text-[var(--text-secondary)]">
              Transformando sistemas complexos
              <br /> em <span className="font-extrabold">experiências simples e intuitivas</span>
            </p>

            <a
              href="#projetos"
              className="hero-cta relative z-10 mt-12 inline-flex min-h-[60px] min-w-[224px] items-center justify-center rounded-full px-8 text-[20px] font-extrabold tracking-[-0.03em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
            >
              Ver projetos
            </a>
          </section>

          <section
            className="relative hidden min-h-[700px] items-start justify-center py-8 sm:min-h-[760px] md:flex md:min-h-[820px] lg:min-h-[900px]"
          >
            {themedDecorativeItems.map((item, index) => (
              <DecorativeItem
                key={`${item.key}-${index}`}
                item={item}
                onMouseEnter={
                  item.key in audioByItem
                    ? () => {
                        handleAudioEnter(item.key as keyof typeof audioByItem);
                        if (item.key === "headphone") setHeadphoneActive(true);
                        setCursorVariant("media");
                      }
                    : undefined
                }
                onMouseLeave={
                  item.key in audioByItem
                    ? () => {
                        handleAudioLeave(item.key as keyof typeof audioByItem);
                        if (item.key === "headphone") setHeadphoneActive(false);
                        setCursorVariant("default");
                      }
                    : undefined
                }
              />
            ))}

            {/* ====== CLIP ====== */}
            <img
              src={clipImg}
              alt=""
              aria-hidden="true"
              className="hero-scene-item hero-scene-item--clip"
              style={{ animation: "heroFloat 7.2s cubic-bezier(0.4,0,0.2,1) infinite" }}
            />

            {headphoneActive ? (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-[118px] top-[28px] hidden h-[170px] w-[170px] md:block lg:right-[132px] lg:top-[18px] lg:h-[220px] lg:w-[220px]"
              >
                <span
                  className="hero-headphone-note hero-headphone-note--one"
                  style={{ animation: "musicNoteCurveLeft 1.5s ease-out infinite" }}
                >
                  ♪
                </span>
                <span
                  className="hero-headphone-note hero-headphone-note--two"
                  style={{ animation: "musicNoteCurveLeft 1.5s ease-out 0.25s infinite" }}
                >
                  ♫
                </span>
                <span
                  className="hero-headphone-note hero-headphone-note--three"
                  style={{ animation: "musicNoteCurveLeft 1.5s ease-out 0.45s infinite" }}
                >
                  ♪
                </span>
              </div>
            ) : null}

            {/* ====== PLANTA ====== */}
            <img
              src={plantaImg}
              alt=""
              aria-hidden="true"
              className="hero-scene-item hero-scene-item--plant"
              style={{ animation: "heroFloat 6.3s cubic-bezier(0.4,0,0.2,1) infinite" }}
            />

            {/* ====== PAPEL AMASSADO ====== */}
            <img
              src={papelAmassadoImg}
              alt=""
              aria-hidden="true"
              className="hero-scene-item hero-scene-item--paper"
              style={{ animation: "heroFloat 6.1s cubic-bezier(0.4,0,0.2,1) infinite" }}
            />

            {/* ====== OCULOS ====== */}
            <img
              src={glassesHeroImg}
              alt=""
              aria-hidden="true"
              className="hero-scene-item hero-scene-item--glasses"
              style={{ animation: "heroFloat 6.5s cubic-bezier(0.4,0,0.2,1) infinite" }}
            />

            <div className="relative z-10 mt-[92px] flex w-full max-w-[980px] flex-col items-start px-4 text-left md:mt-[84px] md:px-0 md:pl-[122px]">
              {/* ====== POST-ITS ====== */}
              <img
                src={postItImg}
                alt="Post-its com a frase Insights transformam experiências"
                className="hero-desktop-postit"
                onMouseEnter={() => setCursorVariant("note")}
                onMouseLeave={() => setCursorVariant("default")}
              />

              {/* ====== TITULO PRINCIPAL ====== */}
              <div className="relative inline-flex flex-col items-start">
                {/* ====== FAIXA AMARELA SUPERIOR ====== */}
                <span
                  aria-hidden="true"
                  className="hero-title-highlight absolute left-[-12px] top-[35%] -z-10 h-[32px] w-[63%] rounded-[4px] sm:h-[42px] md:h-[48px] lg:h-[52px]"
                />
                {/* ====== FAIXA AMARELA INFERIOR ====== */}
                <span
                  aria-hidden="true"
                  className="hero-title-highlight absolute bottom-[-2%] left-[-12px] -z-10 h-[32px] w-[103.8%] rounded-[4px] sm:h-[42px] md:h-[48px] lg:h-[52px]"
                />

                <h1 className="hero-title text-left text-[64px] font-bold uppercase leading-[0.94] tracking-[-0.04em] sm:text-[58px] md:text-[106px] lg:text-[126px] xl:text-[155px]">
                  UX-UI
                  <br />
                  DESIGNER
                </h1>
              </div>

              {/* ====== SUBTITULO ====== */}
              <p className="mt-11 max-w-[780px] text-left text-[23px] font-normal leading-[1] tracking-[-0.045em] text-[var(--text-secondary)] sm:text-[28px] md:max-w-[700px] md:text-[34px] lg:max-w-[760px] lg:text-[38px]">
                Transformando sistemas complexos
                <br /> em <span className="font-extrabold">experiências simples e intuitivas</span>
              </p>

              {/* ====== BOTAO CTA ====== */}
              <a
                href="#projetos"
                className="hero-cta mt-12 ml-[250px] inline-flex min-h-[62px] min-w-[200px] items-center justify-center rounded-full px-10 text-[22px] font-extrabold tracking-[-0.03em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] md:min-h-[62px] md:min-w-[244px] md:text-[22px]"
                onMouseEnter={() => setCursorVariant("cta")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                Ver projetos
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
