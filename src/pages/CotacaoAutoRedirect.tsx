import { useEffect } from "react";
import PageMeta from "@/components/PageMeta";

const SEGFY_URL =
  "https://villa.segfy.com/Publico/Segurados/Orcamentos/SolicitarCotacao?e=t6RDiR%2F1ioARkspweLWOgQ%3D%3D";

const CotacaoAutoRedirect = () => {
  useEffect(() => {
    window.location.replace(SEGFY_URL);
  }, []);

  return (
    <>
      <PageMeta
        title="Cotação Seguro Auto | Patro Seguros"
        description="Redirecionando para o formulário de cotação de Seguro Auto da Patro Seguros."
        noindex
      />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${SEGFY_URL}`} />
      </noscript>
      <main
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
          padding: "2rem",
          textAlign: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <p>Redirecionando para a cotação de Seguro Auto...</p>
        <a href={SEGFY_URL} rel="noopener noreferrer">
          Clique aqui se não for redirecionado automaticamente
        </a>
      </main>
    </>
  );
};

export default CotacaoAutoRedirect;