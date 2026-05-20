import { useEffect, useState } from "react";
import PortfolioHero from "./components/PortfolioHero";
import ProjectsSection from "./components/ProjectsSection";
import AboutSection from "./components/AboutSection";
import PortfolioLoading from "./components/PortfolioLoading";
import ThinkingCardsSection from "./components/ThinkingCardsSection";
import ContactSection from "./components/ContactSection";
import ProjectCasePage from "./components/ProjectCasePage";
import { projectCaseMap, type ProjectCaseSlug } from "./data/projectCases";

const LOADING_SESSION_KEY = "portfolio-loading-seen";
const APP_BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, "");

function getProjectFromLocation() {
  if (typeof window === "undefined") return null;

  const pathname =
    APP_BASE_PATH && window.location.pathname.startsWith(APP_BASE_PATH)
      ? window.location.pathname.slice(APP_BASE_PATH.length) || "/"
      : window.location.pathname;

  const pathMatch = pathname.match(/^\/projeto\/([^/]+)\/?$/);
  if (pathMatch) {
    const slug = decodeURIComponent(pathMatch[1]) as ProjectCaseSlug;
    return slug in projectCaseMap ? slug : null;
  }

  const params = new URLSearchParams(window.location.search);
  const project = params.get("project") as ProjectCaseSlug | null;
  return project && project in projectCaseMap ? project : null;
}

export default function App() {
  const [activeProject, setActiveProject] = useState<ProjectCaseSlug | null>(() =>
    getProjectFromLocation(),
  );
  const [showMobileDesktopNotice, setShowMobileDesktopNotice] = useState(false);

  const [showLoading, setShowLoading] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(LOADING_SESSION_KEY) !== "true";
  });

  useEffect(() => {
    const handlePopState = () => {
      setActiveProject(getProjectFromLocation());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    document.documentElement.style.removeProperty("overflow");
    document.documentElement.style.removeProperty("overflow-y");
    document.documentElement.style.overflowX = "hidden";
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("overflow-y");
    document.body.style.overflowX = "hidden";

    return () => {
      document.documentElement.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("overflow-y");
      document.documentElement.style.overflowX = "hidden";
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("overflow-y");
      document.body.style.overflowX = "hidden";
    };
  }, [showLoading]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (showLoading) return;

    const shouldShowOnMobile =
      window.matchMedia("(max-width: 1024px)").matches &&
      (window.matchMedia("(hover: none)").matches ||
        window.matchMedia("(pointer: coarse)").matches);

    if (shouldShowOnMobile) {
      setShowMobileDesktopNotice(true);
    }
  }, [showLoading]);

  const openProject = (slug: ProjectCaseSlug) => {
    const url = new URL(window.location.href);
    if (APP_BASE_PATH) {
      url.pathname = `${APP_BASE_PATH}/`;
      url.searchParams.set("project", slug);
    } else {
      url.pathname = `/projeto/${slug}`;
      url.searchParams.delete("project");
    }
    window.history.pushState({}, "", url);
    setActiveProject(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeProject = () => {
    const url = new URL(window.location.href);
    url.pathname = APP_BASE_PATH ? `${APP_BASE_PATH}/` : "/";
    url.searchParams.delete("project");
    window.history.pushState({}, "", url);
    setActiveProject(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const dismissMobileDesktopNotice = () => {
    setShowMobileDesktopNotice(false);
  };

  const project = activeProject ? projectCaseMap[activeProject] : null;

  return (
    <>
      {!project && showMobileDesktopNotice ? (
        <div
          className="mobile-desktop-notice"
          role="dialog"
          aria-modal="false"
          aria-labelledby="mobile-desktop-notice-title"
        >
          <div
            className="mobile-desktop-notice__backdrop"
            onClick={dismissMobileDesktopNotice}
          />
          <div className="mobile-desktop-notice__card">
            <button
              type="button"
              className="mobile-desktop-notice__close"
              aria-label="Fechar aviso"
              onClick={dismissMobileDesktopNotice}
            >
              ×
            </button>
            <p className="mobile-desktop-notice__eyebrow">Aviso</p>
            <h2
              id="mobile-desktop-notice-title"
              className="mobile-desktop-notice__title"
            >
              Para uma melhor experiência
            </h2>
            <p className="mobile-desktop-notice__text">
              Este portfólio foi pensado principalmente para desktop. Se puder,
              acesse em uma tela maior para visualizar melhor os detalhes.
            </p>
            <button
              type="button"
              className="mobile-desktop-notice__button"
              onClick={dismissMobileDesktopNotice}
            >
              Entendi
            </button>
          </div>
        </div>
      ) : null}

      {showLoading ? (
        <PortfolioLoading
          onFinish={() => {
            sessionStorage.setItem(LOADING_SESSION_KEY, "true");
            setShowLoading(false);
          }}
        />
      ) : null}

      {project ? (
        <ProjectCasePage project={project} onBack={closeProject} />
      ) : (
        <>
          <PortfolioHero />
          <ProjectsSection onOpenProject={openProject} />
          <AboutSection />
          <ThinkingCardsSection />
          <ContactSection />
        </>
      )}
    </>
  );
}
