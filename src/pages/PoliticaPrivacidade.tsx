import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";

const PoliticaPrivacidade = () => {
  return (
    <>
      <PageMeta title="Política de Privacidade" description="Política de Privacidade da Patro Seguros — saiba como tratamos seus dados pessoais em conformidade com a LGPD." />
      <Header />
      <main id="main-content">
        <Breadcrumb items={[{ label: "Política de Privacidade" }]} />
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl prose prose-sm prose-headings:font-heading prose-headings:tracking-tight">
            <h1>Política de Privacidade</h1>
            <p className="text-muted-foreground text-sm">Última atualização: Março de 2026</p>

            <p>A <strong>Patro Corretora de Seguros</strong> (CNPJ 41.641.558/0001-33), com sede na Avenida Salgado Filho, 2120 – Sala 219 – Guarulhos/SP, está comprometida com a proteção dos dados pessoais de seus clientes, parceiros e visitantes do site, em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).</p>

            <h2>1. Dados que Coletamos</h2>
            <p>Podemos coletar os seguintes dados pessoais:</p>
            <ul>
              <li><strong>Dados de identificação:</strong> nome completo, CPF, RG, data de nascimento.</li>
              <li><strong>Dados de contato:</strong> e-mail, telefone, endereço.</li>
              <li><strong>Dados profissionais:</strong> profissão, empresa, cargo.</li>
              <li><strong>Dados de navegação:</strong> endereço IP, cookies, páginas visitadas, tempo de permanência.</li>
              <li><strong>Dados para cotação:</strong> informações sobre veículos, imóveis, saúde e outras necessárias para a cotação de seguros.</li>
            </ul>

            <h2>2. Como Utilizamos Seus Dados</h2>
            <p>Seus dados pessoais são utilizados para:</p>
            <ul>
              <li>Elaborar cotações de seguros junto às seguradoras parceiras.</li>
              <li>Prestar atendimento e suporte ao cliente.</li>
              <li>Enviar comunicações sobre produtos, serviços e novidades (com seu consentimento).</li>
              <li>Cumprir obrigações legais e regulatórias (SUSEP, Banco Central).</li>
              <li>Melhorar nossos serviços e a experiência do site.</li>
            </ul>

            <h2>3. Base Legal para o Tratamento</h2>
            <p>O tratamento dos seus dados pessoais se fundamenta nas seguintes bases legais previstas na LGPD:</p>
            <ul>
              <li><strong>Consentimento:</strong> quando você preenche formulários ou solicita cotações.</li>
              <li><strong>Execução de contrato:</strong> para processar cotações e apólices de seguro.</li>
              <li><strong>Legítimo interesse:</strong> para melhorar nossos serviços e comunicações.</li>
              <li><strong>Obrigação legal:</strong> para cumprimento de exigências regulatórias.</li>
            </ul>

            <h2>4. Compartilhamento de Dados</h2>
            <p>Seus dados podem ser compartilhados com:</p>
            <ul>
              <li><strong>Seguradoras e operadoras:</strong> para elaboração de cotações e emissão de apólices.</li>
              <li><strong>Órgãos reguladores:</strong> SUSEP e Banco Central, quando exigido por lei.</li>
              <li><strong>Prestadores de serviço:</strong> ferramentas de análise (Google Analytics), plataformas de CRM e e-mail marketing, sob acordos de confidencialidade.</li>
            </ul>
            <p>Nunca vendemos seus dados pessoais a terceiros.</p>

            <h2>5. Armazenamento e Segurança</h2>
            <p>Adotamos medidas técnicas e organizacionais para proteger seus dados, incluindo criptografia, controle de acesso e monitoramento contínuo. Os dados são armazenados pelo tempo necessário para cumprimento das finalidades descritas ou conforme exigido por lei.</p>

            <h2>6. Seus Direitos (LGPD)</h2>
            <p>Você tem o direito de:</p>
            <ul>
              <li>Confirmar a existência de tratamento de dados.</li>
              <li>Acessar seus dados pessoais.</li>
              <li>Corrigir dados incompletos ou desatualizados.</li>
              <li>Solicitar a eliminação de dados desnecessários.</li>
              <li>Revogar o consentimento a qualquer momento.</li>
              <li>Solicitar a portabilidade dos dados.</li>
            </ul>
            <p>Para exercer seus direitos, entre em contato pelo e-mail <a href="mailto:contato@patroseguros.com.br">contato@patroseguros.com.br</a> ou pelo WhatsApp <a href="tel:1151997500">(11) 5199-7500</a>.</p>

            <h2>7. Cookies</h2>
            <p>Nosso site utiliza cookies para:</p>
            <ul>
              <li><strong>Cookies essenciais:</strong> garantir o funcionamento do site.</li>
              <li><strong>Cookies de análise:</strong> Google Analytics, para entender como o site é utilizado.</li>
              <li><strong>Cookies de marketing:</strong> Meta Pixel, para campanhas de remarketing.</li>
            </ul>
            <p>Você pode gerenciar suas preferências de cookies nas configurações do seu navegador.</p>

            <h2>8. Alterações nesta Política</h2>
            <p>Esta política pode ser atualizada periodicamente. A versão mais recente estará sempre disponível nesta página.</p>

            <h2>9. Contato</h2>
            <p>Para dúvidas sobre esta política ou tratamento de dados:</p>
            <ul>
              <li><strong>E-mail:</strong> contato@patroseguros.com.br</li>
              <li><strong>Telefone/WhatsApp:</strong> (11) 5199-7500</li>
              <li><strong>Endereço:</strong> Av. Salgado Filho, 2120 – Ed. Via Alameda – Sala 219 – Cidade Maia, Guarulhos/SP</li>
            </ul>

            <p className="text-xs text-muted-foreground mt-8">Patro Corretora de Seguros · CNPJ 41.641.558/0001-33 · SUSEP 212113511</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PoliticaPrivacidade;
