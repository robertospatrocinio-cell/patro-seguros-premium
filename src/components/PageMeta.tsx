import { useEffect } from "react";

interface PageMetaProps {
  title: string;
  description: string;
}

const PageMeta = ({ title, description }: PageMetaProps) => {
  useEffect(() => {
    document.title = `${title} | Patro Seguros`;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute("content", description);
      document.head.appendChild(metaDescription);
    }

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", `${title} | Patro Seguros`);

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", description);

    return () => {
      // Reset to defaults on unmount
      document.title = "Patro Seguros | Corretora de Seguros em Guarulhos – Cotação Online";
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute("content", "Corretora de seguros em Guarulhos especializada em seguro auto, residencial, vida e empresarial. Compare cotações das melhores seguradoras e economize. Cotação grátis – Patro Seguros, Cidade Maia.");
      }
    };
  }, [title, description]);

  return null;
};

export default PageMeta;
