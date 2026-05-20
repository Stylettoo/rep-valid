import { useEffect, useMemo, useRef, useState } from "react";

const words = ["Olá", "Hello", "Hola"] as const;

const initialDelay = 40;
const letterDelay = 12;
const betweenWords = 20;
const holdWord = 72;
const revealDelay = 80;
const revealDuration = 720;

type CharState = {
  key: string;
  char: string;
  className: string;
};

export default function PortfolioLoading({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const [stage, setStage] = useState<"active" | "reveal">("active");
  const [realProgress, setRealProgress] = useState(0);
  const [realReady, setRealReady] = useState(false);
  const [sequenceProgress, setSequenceProgress] = useState(0);
  const [sequenceComplete, setSequenceComplete] = useState(false);
  const [charStates, setCharStates] = useState<CharState[]>(
    [...words[0]].map((char, index) => ({
      key: `${words[0]}-${index}`,
      char,
      className: "char",
    })),
  );

  const timeoutRefs = useRef<number[]>([]);

  const sequenceDuration = useMemo(() => {
    let total = initialDelay + holdWord;

    for (let index = 1; index < words.length; index += 1) {
      total += words[index - 1].length * letterDelay + 90;
      total += betweenWords;
      total += words[index].length * letterDelay + 110;
      total += holdWord;
    }

    return total;
  }, []);

  const progress = useMemo(() => {
    if (realReady && sequenceComplete) return 100;

    const realCap = realReady ? 99 : realProgress;
    const sequenceCap = sequenceComplete ? 99 : sequenceProgress;

    return Math.min(realCap, sequenceCap);
  }, [realProgress, realReady, sequenceProgress, sequenceComplete]);

  useEffect(() => {
    const startedAt = performance.now();
    let frameId = 0;

    const updateProgress = (now: number) => {
      const elapsed = now - startedAt;
      const next = Math.min(99, (elapsed / sequenceDuration) * 99);
      setSequenceProgress(next);

      if (elapsed < sequenceDuration) {
        frameId = window.requestAnimationFrame(updateProgress);
      } else {
        setSequenceProgress(99);
        setSequenceComplete(true);
      }
    };

    frameId = window.requestAnimationFrame(updateProgress);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [sequenceDuration]);

  useEffect(() => {
    let cancelled = false;
    const removers: Array<() => void> = [];
    const homeHeroImageSelectors = [
      '#home img[fetchpriority="high"]',
      "#home .hero-desktop-postit",
      "#home .hero-mobile-postit",
    ];
    const projectHeroImageSelectors = [
      ".visualCard img",
      ".heroImageFrame img",
    ];
    const trackedImages = [
      ...document.querySelectorAll(
        [...homeHeroImageSelectors, ...projectHeroImageSelectors].join(", "),
      ),
    ].filter((img) => !img.closest(".portfolio-loading")) as HTMLImageElement[];

    let total = trackedImages.length;
    let completed = 0;

    if ("fonts" in document) {
      total += 1;
    }

    const update = () => {
      if (cancelled) return;

      const next = Math.min(100, Math.round((completed / Math.max(total, 1)) * 100));
      setRealProgress(next);

      if (completed >= total) {
        setRealReady(true);
        setRealProgress(100);
      }
    };

    const markComplete = () => {
      completed += 1;
      update();
    };

    trackedImages.forEach((img) => {
      if (img.complete) {
        markComplete();
        return;
      }

      const onDone = () => {
        markComplete();
        img.removeEventListener("load", onDone);
        img.removeEventListener("error", onDone);
      };

      img.addEventListener("load", onDone);
      img.addEventListener("error", onDone);

      removers.push(() => {
        img.removeEventListener("load", onDone);
        img.removeEventListener("error", onDone);
      });
    });

    if ("fonts" in document) {
      void document.fonts.ready.then(() => {
        if (cancelled) return;
        markComplete();
      });
    }

    if (!trackedImages.length && !("fonts" in document)) {
      setRealReady(true);
      setRealProgress(100);
      return () => {
        cancelled = true;
      };
    }

    update();

    return () => {
      cancelled = true;
      removers.forEach((remove) => remove());
    };
  }, []);

  useEffect(() => {
    const clearTimers = () => {
      timeoutRefs.current.forEach((id) => window.clearTimeout(id));
      timeoutRefs.current = [];
    };

    const schedule = (callback: () => void, delay: number) => {
      const id = window.setTimeout(callback, delay);
      timeoutRefs.current.push(id);
    };

    const setWordVisible = (word: string) => {
      setCharStates(
        [...word].map((char, index) => ({
          key: `${word}-${index}`,
          char,
          className: "char",
        })),
      );
    };

    const animateOut = (word: string) =>
      new Promise<void>((resolve) => {
        setCharStates(
          [...word].map((char, index) => ({
            key: `${word}-${index}`,
            char,
            className: "char",
          })),
        );

        schedule(() => {
          setCharStates((current) =>
            current.map((item) => ({
              ...item,
              className: "char out",
            })),
          );
        }, 0);

        schedule(resolve, word.length * letterDelay + 90);
      });

    const animateIn = (word: string) =>
      new Promise<void>((resolve) => {
        setCharStates(
          [...word].map((char, index) => ({
            key: `${word}-${index}`,
            char,
            className: "char in",
          })),
        );

        schedule(() => {
          setCharStates((current) =>
            current.map((item) => ({
              ...item,
              className: `${item.className} show`,
            })),
          );
        }, 20);

        schedule(resolve, word.length * letterDelay + 110);
      });

    const runSequence = async () => {
      setWordVisible(words[0]);
      await new Promise<void>((resolve) => schedule(resolve, initialDelay + holdWord));

      for (let index = 1; index < words.length; index += 1) {
        await animateOut(words[index - 1]);
        await new Promise<void>((resolve) => schedule(resolve, betweenWords));
        await animateIn(words[index]);
        await new Promise<void>((resolve) => schedule(resolve, holdWord));
      }
    };

    void runSequence();

    return clearTimers;
  }, []);

  useEffect(() => {
    if (!realReady || !sequenceComplete || stage === "reveal") return;

    const revealTimer = window.setTimeout(() => {
      setStage("reveal");
    }, revealDelay);

    const finishTimer = window.setTimeout(() => {
      onFinish();
    }, revealDelay + revealDuration);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(finishTimer);
    };
  }, [onFinish, realReady, sequenceComplete, stage]);

  return (
    <div className={`portfolio-loading ${stage === "reveal" ? "is-reveal" : ""}`}>
      <div className="portfolio-loading-panel">
        <div className="portfolio-loading-header">
          <div className="portfolio-loading-brand">
            Designed by <strong>Edilson</strong>
          </div>

          <div className="portfolio-loading-status">
            <div className="portfolio-loading-status-top">
              <span>Carregando</span>
              <span>{Math.round(progress)}%</span>
            </div>

            <div className="portfolio-loading-bar">
              <div
                className="portfolio-loading-bar-fill"
                style={{ transform: `scaleX(${progress / 100})` }}
              />
            </div>
          </div>
        </div>

        <div className="portfolio-loading-center">
          <div className="portfolio-loading-center-inner">
            <div className="portfolio-loading-ghosts" aria-hidden="true">
              <span className="portfolio-loading-ghost">H</span>
              <span className="portfolio-loading-ghost">o</span>
              <span className="portfolio-loading-ghost">O</span>
              <span className="portfolio-loading-ghost">á</span>
              <span className="portfolio-loading-ghost">o</span>
            </div>

            <div className="portfolio-loading-word" aria-live="polite">
              {charStates.map((item, index) => (
                <span
                  key={item.key}
                  className={`portfolio-loading-char ${item.className}`}
                  style={{ transitionDelay: `${index * letterDelay}ms` }}
                >
                  {item.char === " " ? "\u00A0" : item.char}
                </span>
              ))}
            </div>

            <div className="portfolio-loading-accent-line" />
            <div className="portfolio-loading-subtitle">Bem-vindo ao meu portfólio</div>
          </div>
        </div>

        <div className="portfolio-loading-bottom">
          <span className="portfolio-loading-dot" />
          <span>Iniciando experiência</span>
        </div>
      </div>
    </div>
  );
}
