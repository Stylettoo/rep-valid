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
    title: "Reimaginando a experiência do Gov.br",
    description:
      "Redesign estratégico focado em reduzir carga cognitiva e tornar o acesso aos serviços públicos mais claro e intuitivo.",
    tags: ["UX Strategy", "Redesign", "Arquitetura da Informação"],
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

function ProjectMockup({ variant }: { variant: ProjectItem["variant"] }) {
  if (variant === "mockup-1") {
    return (
      <div className="projects-gov-mockup">
        <img
          src={govBrHeroMockup}
          alt="Preview do projeto Gov.br Redesign"
          className="projects-cover-image projects-cover-image-gov"
          loading="lazy"
          decoding="async"
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
  return (
    <section id="projetos" className="projects-section">
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
              data-cursor="card"
            >
              {project.showTape ? <span className="projects-tape" /> : null}

              <div className={`project-thumb ${project.variant}`}>
                <ProjectMockup variant={project.variant} />
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="tag-list">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  data-cursor="link"
                  className="project-link"
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
