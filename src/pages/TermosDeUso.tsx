import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";

const TermosDeUso = () => {
  return (
    <>
      <PageMeta title="Termos de Uso" description="Termos de Uso do site da Patro Seguros — condições de uso, responsabilidades e direitos do usuário." />
      <Header />
      <main id="main-content">
        <Breadcrumb items={[{ label: "Termos de Uso" }]} />
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl prose prose-sm prose-headings:font-heading prose-headings:tracking-tight">
            <h1>Termos de Uso</h1>
            <p className="text-muted-foreground text-sm">Última atualização: Março de 2026</p>

            <p>Ao acessar e utilizar o site da <strong>Patro Corretora de Seguros</strong> (CNPJ 41.641.558/0001-33), você concorda com os termos e condições descritos abaixo.</p>

            <h2>1. Sobre a Patro Seguros</h2>
            <p>A Patro é uma corretora de seguros devidamente registrada na SUSEP (Registro nº 212113511), habilitada a intermediar a contratação de seguros, planos de saúde e consórcios junto a seguradoras e operadoras parceiras.</p>

            <h2>2. Uso do Site</h2>
            <p>Este site tem caráter informativo e de prestação de serviços. Ao utilizá-lo, você concorda em:</p>
            <ul>
              <li>Fornecer informações verdadeiras e completas nos formulários.</li>
              <li>Não utilizar o site para fins ilícitos ou fraudulentos.</li>
              <li>Não reproduzir, distribuir ou modificar o conteúdo sem autorização prévia.</li>
            </ul>

            <h2>3. Cotações e Contratações</h2>
            <ul>
              <li>As cotações apresentadas são estimativas baseadas nas informações fornecidas e estão sujeitas à análise das seguradoras.</li>
              <li>Os valores e condições finais são definidos pela seguradora emissora da apólice.</li>
              <li>A Patro atua como intermediária — a relação contratual do seguro é entre o cliente e a seguradora.</li>
            </ul>

            <h2>4. Conteúdo e Propriedade Intelectual</h2>
            <p>Todo o conteúdo do site (textos, imagens, logotipos, artigos do blog) é de propriedade da Patro Seguros ou utilizado com autorização. É proibida a reprodução sem autorização expressa.</p>

            <h2>5. Limitação de Responsabilidade</h2>
            <ul>
              <li>A Patro não garante a disponibilidade ininterrupta do site.</li>
              <li>As informações no blog e nas páginas de produtos têm caráter educativo e não substituem consultoria profissional individualizada.</li>
              <li>A Patro não se responsabiliza por decisões tomadas exclusivamente com base no conteúdo do site.</li>
            </ul>

            <h2>6. Links Externos</h2>
            <p>O site pode conter links para sites de terceiros (seguradoras, cotadores, redes sociais). A Patro não se responsabiliza pelo conteúdo, política de privacidade ou práticas desses sites.</p>

            <h2>7. Modificações</h2>
            <p>A Patro reserva-se o direito de alterar estes Termos de Uso a qualquer momento. As alterações entram em vigor a partir de sua publicação nesta página.</p>

            <h2>8. Legislação Aplicável</h2>
            <p>Estes termos são regidos pela legislação brasileira. Eventuais litígios serão resolvidos no foro da Comarca de Guarulhos/SP.</p>

            <h2>9. Contato</h2>
            <p>Para dúvidas sobre estes Termos de Uso:</p>
            <ul>
              <li><strong>E-mail:</strong> contato@patroseguros.com.br</li>
              <li><strong>Telefone/WhatsApp:</strong> (11) 5199-7500</li>
              <li><strong>Endereço:</strong> Av. Salgado Filho, 2120 – Sala 219 – Guarulhos/SP</li>
            </ul>

            <p className="text-xs text-muted-foreground mt-8">Patro Corretora de Seguros · CNPJ 41.641.558/0001-33 · SUSEP 212113511</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TermosDeUso;
