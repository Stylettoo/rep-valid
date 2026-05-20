import { useEffect, useRef, useState } from "react";
import aboutBadgeImg from "../assets/about-badge.png";

export default function AboutSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [badgeScrollOffset, setBadgeScrollOffset] = useState(0);
  const dragOriginRef = useRef({ x: 0, y: 0 });
  const storyRef = useRef<HTMLDivElement>(null);
  const badgeStickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (event: PointerEvent) => {
      setDragOffset({
        x: event.clientX - dragOriginRef.current.x,
        y: event.clientY - dragOriginRef.current.y,
      });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      setDragOffset({ x: 0, y: 0 });
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const updateBadgePosition = () => {
      if (window.innerWidth <= 1100 || !storyRef.current || !badgeStickyRef.current) {
        setBadgeScrollOffset(0);
        return;
      }

      const topLimit = 16;
      const storyRect = storyRef.current.getBoundingClientRect();
      const storyHeight = storyRef.current.offsetHeight;
      const badgeHeight = badgeStickyRef.current.offsetHeight;
      const maxOffset = Math.max(0, storyHeight - badgeHeight - topLimit);
      const nextOffset = Math.min(Math.max(topLimit - storyRect.top, 0), maxOffset);

      setBadgeScrollOffset(nextOffset);
    };

    updateBadgePosition();
    window.addEventListener("scroll", updateBadgePosition, { passive: true });
    window.addEventListener("resize", updateBadgePosition);

    return () => {
      window.removeEventListener("scroll", updateBadgePosition);
      window.removeEventListener("resize", updateBadgePosition);
    };
  }, []);

  return (
    <section id="sobre-mim" className="about-section">
      <div className="about-container">
        <div className="section-title-wrap">
          <h2 className="section-title">SOBRE MIM</h2>
        </div>

        <div className="about-layout">
          <div ref={storyRef} className="about-story">
            <div className="eyebrow">Minha trajetória</div>

            <h3 className="story-headline">
              Sempre fui movido por <span className="highlight">entender</span> como as coisas
              funcionam.
            </h3>

            <div className="story-text">
              <p>
                Antes do design, minha rotina girava em torno de{" "}
                <strong>processos, dados e organização</strong>. Eu estava constantemente
                analisando fluxos, identificando falhas e buscando formas de tornar o dia a dia
                mais eficiente.
              </p>

              <p>Com o tempo, algo começou a ficar evidente.</p>

              <p>
                Muitos dos problemas que eu encontrava não estavam apenas na operação em si, mas
                na forma como as pessoas{" "}
                <strong>interagiam com sistemas, informações e processos</strong>.
              </p>

              <p>
                Não era só sobre o que estava sendo feito, mas sobre como aquilo era vivido por
                quem usava.
              </p>

              <p>Foi esse ponto de virada que me aproximou do design.</p>

              <p>
                Passei a enxergar que clareza, estrutura e usabilidade não são apenas detalhes,
                mas elementos essenciais para que algo realmente funcione.
              </p>

              <div className="story-divider" />

              <p>
                Hoje, como <strong>UX/UI Designer</strong>, meu foco é transformar sistemas
                complexos em experiências{" "}
                <span className="accent-text">simples, intuitivas e funcionais</span>.
              </p>

              <p>
                Minha base analítica me permite olhar além da interface, entendendo fluxos,
                decisões e impactos por trás de cada interação.
              </p>

              <p>
                Mais do que desenhar telas, meu trabalho é <strong>resolver problemas reais</strong>,
                criando experiências que fazem sentido para quem usa e que geram valor de verdade.
              </p>
            </div>

            <div className="story-footer">
              <span className="mini-pill">UX/UI</span>
              <span className="mini-pill outline">Research</span>
              <span className="mini-pill outline">Processos</span>
              <span className="mini-pill outline">Usabilidade</span>
              <span className="mini-pill outline">Data-Driven</span>
            </div>
          </div>

          <div className="badge-area">
            <div
              ref={badgeStickyRef}
              className="badge-sticky"
              style={{ transform: `translateY(${badgeScrollOffset}px)` }}
            >
              <div className="micro-dots">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <span className="micro-line" />
              <span className="micro-circle" />

              <img
                className={`badge-mock ${isDragging ? "is-dragging" : ""}`}
                loading="lazy"
                decoding="async"
                src={aboutBadgeImg}
                alt="Crachá Edilson Borges"
                draggable={false}
                onPointerDown={(event) => {
                  setIsDragging(true);
                  dragOriginRef.current = {
                    x: event.clientX - dragOffset.x,
                    y: event.clientY - dragOffset.y,
                  };
                }}
                style={{
                  transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) rotate(11deg)`,
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
