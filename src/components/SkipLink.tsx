import type { MouseEvent } from "react";

const SkipLink = () => {
  const skipToContent = (event: MouseEvent<HTMLAnchorElement>) => {
    const main = document.querySelector<HTMLElement>("#root main:not([aria-busy='true'])")
      ?? document.getElementById("main-content")
      ?? document.querySelector<HTMLElement>("main");
    if (!main) return;

    event.preventDefault();
    if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
    main.focus({ preventScroll: true });
    main.scrollIntoView({ block: "start", behavior: "auto" });
  };

  return (
    <a
      href="#main-content"
      onClick={skipToContent}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      Ir para o conteúdo principal
    </a>
  );
};

export default SkipLink;
