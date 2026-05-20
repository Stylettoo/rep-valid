import { useState } from "react";
import govBrHeroMockup from "../assets/mockup-gov-br.png";
import type { ProjectCaseSlug } from "../data/projectCases";

type ProjectItem = {
  slug: ProjectCaseSlug;
  title: string;
  description: string;
  tags: string[];
  variant: "mockup-1" | "mockup-2" | "mockup-3" | "mockup-4";
  showTape?: boolean;
  showMicroDotOne?: boolean;
  showMicroDotTwo?: boolean;
  showMicroLine?: boolean;
};

const projects = [
  {
    slug: "govbr-redesign",
    title: "Gov.br Redesign",
    description:
      "Redesign focado em clareza, hierarquia da informa\u00e7\u00e3o e acesso mais r\u00e1pido aos servi\u00e7os.",
    tags: ["UX/UI", "Research", "Prototype"],
    variant: "mockup-1",
    showTape: true,
    showMicroDotOne: true,
    showMicroLine: true,
  },
  {
    slug: "finance-dashboard",
    title: "Finance Dashboard",
    description:
      "Dashboard intuitivo para gest\u00e3o financeira com leitura r\u00e1pida, visualiza\u00e7\u00e3o de dados e controle.",
    tags: ["UX/UI", "Dashboard"],
    variant: "mockup-2",
    showMicroDotTwo: true,
  },
  {
    slug: "ecommerce-app",
    title: "E-commerce App",
    description:
      "Aplicativo com fluxo de navega\u00e7\u00e3o simplificado, foco em usabilidade e checkout mais direto.",
    tags: ["UX/UI", "Wireframe", "App"],
    variant: "mockup-3",
  },
  {
    slug: "educacao-online",
    title: "Educa\u00e7\u00e3o Online",
    description:
      "Plataforma educacional pensada para consumo de conte\u00fado, navega\u00e7\u00e3o simples e boa reten\u00e7\u00e3o.",
    tags: ["UX/UI", "E-learning", "Web"],
    variant: "mockup-4",
    showMicroLine: true,
  },
] satisfies readonly ProjectItem[];

const visibleProjects = projects.filter((project) => project.slug === "govbr-redesign");

type ProjectsCursorVariant = "default" | "card" | "link";

function ProjectMockup({ variant }: { variant: ProjectItem["variant"] }) {
  if (variant === "mockup-1") {
    return (
      <div className="projects-gov-mockup">
        <img
          src={govBrHeroMockup}
          alt="Preview do projeto Gov.br Redesign"
          className="projects-cover-image projects-cover-image-gov"
        />
      </div>
    );
  }

  if (variant === "mockup-2") {
    return (
      <div className="projects-mockup-ui projects-mockup-dark">
        <div className="projects-bar projects-bar-dark" />
        <div className="projects-layout-row">
          <div className="projects-box projects-box-dark projects-box-narrow" />
          <div className="projects-box projects-box-dark projects-box-chart" />
        </div>
        <div className="projects-layout-row">
          <div className="projects-box projects-box-dark" />
          <div className="projects-box projects-box-dark" />
          <div className="projects-box projects-box-dark" />
        </div>
      </div>
    );
  }

  if (variant === "mockup-3") {
    return (
      <div className="projects-mockup-ui">
        <div className="projects-layout-row">
          <div className="projects-box projects-box-sidebar" />
          <div className="projects-mockup-column">
            <div className="projects-box projects-box-medium" />
            <div className="projects-box projects-box-medium" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-mockup-ui">
      <div className="projects-bar projects-bar-medium" />
      <div className="projects-layout-row">
        <div className="projects-box projects-box-tall" />
      </div>
      <div className="projects-layout-row">
        <div className="projects-box projects-box-half" />
        <div className="projects-box projects-box-low" />
      </div>
    </div>
  );
}

export default function ProjectsSection({
  onOpenProject,
}: {
  onOpenProject: (slug: ProjectCaseSlug) => void;
}) {
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<ProjectsCursorVariant>("default");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const getCursorClasses = () => {
    switch (cursorVariant) {
      case "card":
        return "h-12 w-12 border-[2px] bg-[color:var(--cursor-shell)] after:h-3 after:w-3";
      case "link":
        return "h-12 w-24 rounded-full border-[2px] bg-[color:var(--cursor-shell)] after:h-2.5 after:w-8 after:rounded-full";
      default:
        return "h-8 w-8 border-[2px] bg-[color:var(--cursor-shell)] after:h-2.5 after:w-2.5";
    }
  };

  return (
    <section
      id="projetos"
      className="projects-section md:cursor-none"
      onMouseMove={(event) => {
        setCursorVisible(true);
        setCursorPosition({ x: event.clientX, y: event.clientY });
      }}
      onMouseLeave={() => {
        setCursorVisible(false);
        setCursorVariant("default");
      }}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[90] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[var(--border-subtle)] shadow-[var(--shadow-cursor)] transition-[width,height,opacity,transform,background-color,border-radius] duration-200 ease-out after:rounded-full after:bg-[var(--cursor-core)] after:content-[''] md:flex ${cursorVisible ? "opacity-100" : "opacity-0"} ${getCursorClasses()}`}
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
        }}
      />

      <div className="projects-container">
        <header className="projects-header">
          <div className="projects-title-wrap">
            <h2 className="projects-title">PROJETOS</h2>
          </div>
          <p className="projects-subtitle">
            Uma seleção de projetos com foco em <strong>clareza, usabilidade e experiência</strong>{" "}
            do usuário.
          </p>
        </header>

        <div className="projects-grid">
          {visibleProjects.map((project) => (
            <article
              key={project.slug}
              className="project-card"
              onMouseEnter={() => setCursorVariant("card")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              {project.showTape ? <span className="projects-tape" /> : null}

              <div className={`project-thumb ${project.variant}`}>
                <ProjectMockup variant={project.variant} />
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="tag-list">
                  {project.tags.map((tag, index) => (
                    <span key={tag} className={`tag ${index === 0 ? "tag-primary" : ""}`}>
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="project-link"
                  onMouseEnter={() => setCursorVariant("link")}
                  onMouseLeave={() => setCursorVariant("card")}
                  onClick={() => onOpenProject(project.slug)}
                >
                  Ver projeto <span className="project-arrow"></span>
                </button>
              </div>

              {project.showMicroDotOne ? <span className="project-micro-dot project-micro-dot-one" /> : null}
              {project.showMicroDotTwo ? <span className="project-micro-dot project-micro-dot-two" /> : null}
              {project.showMicroLine ? <span className="project-micro-line" /> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
