import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./lead-offer-landing.module.css";

const diagnosisItems = [
  ["01", "Raio-X da Agenda", "Marque onde mensagens viram atraso, conflito ou horário perdido."],
  ["02", "Escala de cada barbeiro", "Coloque no papel dias, turnos, almoço, folgas e bloqueios."],
  ["03", "Regras da recepção", "Defina quando confirmar, fazer encaixe ou chamar alguém da equipe."],
  ["04", "Plano para 7 dias", "Escolha o primeiro ajuste, quem cuida e como testar na prática."],
];

const mechanism = [
  ["C", "Canal", "onde o pedido chega"],
  ["A", "Agenda", "onde a disponibilidade nasce"],
  ["D", "Duração", "quanto o serviço ocupa"],
  ["E", "Equipe", "qual barbeiro pode atender"],
  ["I", "Intervenção", "quando chamar alguém da equipe"],
  ["R", "Registro", "onde o horário fica salvo"],
  ["A", "Ajuste", "o que corrigir depois"],
];

const productSteps = [
  ["01", "O cliente chama", "A conversa começa no WhatsApp que ele já usa."],
  ["02", "A recepção entende", "Corte, barba, barbeiro e melhor horário entram na busca."],
  ["03", "A agenda responde", "A disponibilidade considera o profissional correto."],
  ["04", "A ação é registrada", "Somente a regra autorizada aparece no painel."],
  ["05", "A equipe acompanha", "Quando o pedido sai da regra, alguém da equipe assume."],
];

function FlowoLogo() {
  return (
    <Image
      className={styles.logo}
      src="/flowo-logo.svg"
      alt="Flowo"
      width={152}
      height={75}
      priority
    />
  );
}

function WindowDots() {
  return (
    <div className={styles.windowDots} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

function ReviewBanner({ current }: { current: "diagnostico" | "implantacao" }) {
  return (
    <aside className={styles.reviewBanner}>
      <span>Direção visual para revisão</span>
      <nav aria-label="Alternar mockup">
        <Link
          data-active={current === "diagnostico"}
          href="/design-review/ofertas/diagnostico"
        >
          Lead magnet
        </Link>
        <Link
          data-active={current === "implantacao"}
          href="/design-review/ofertas/implantacao"
        >
          Oferta Flowo
        </Link>
      </nav>
    </aside>
  );
}

function SiteNav({
  cta,
  ctaHref,
  links,
}: {
  cta: string;
  ctaHref: string;
  links: Array<[string, string]>;
}) {
  return (
    <header className={styles.navWrap}>
      <div className={styles.nav}>
        <FlowoLogo />
        <nav className={styles.desktopNav} aria-label="Navegação principal do mockup">
          {links.map(([label, href]) => (
            <a data-lead-magnet-cta={href === "#formulario"} href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>
        <a
          className={styles.navCta}
          data-lead-magnet-cta={ctaHref === "#formulario"}
          href={ctaHref}
        >
          {cta}
        </a>
      </div>
    </header>
  );
}

function BookStack() {
  return (
    <div className={styles.bookStage} aria-label="Prévia do Raio-X da Agenda">
      <div className={`${styles.book} ${styles.bookBack}`}>
        <small>FLOWO • WORKBOOK</small>
        <strong>Escala de cada barbeiro</strong>
        <span>Turnos, almoço, folgas e bloqueios.</span>
      </div>
      <div className={`${styles.book} ${styles.bookMiddle}`}>
        <small>FLOWO • CHECKLIST</small>
        <strong>Regras da recepção</strong>
        <span>Saiba quando confirmar e quando assumir.</span>
      </div>
      <div className={`${styles.book} ${styles.bookFront}`}>
        <small>FLOWO • DIAGNÓSTICO</small>
        <strong>Raio-X da Agenda</strong>
        <span>12 situações reais. Um primeiro ajuste.</span>
        <div className={styles.coverRule} />
        <em>Material prático para barbearias</em>
      </div>
      <div className={styles.scoreChip}>
        <strong>12</strong>
        <span>perguntas práticas</span>
      </div>
    </div>
  );
}

function DiagnosisPreview() {
  return (
    <div className={styles.previewWindow}>
      <div className={styles.windowBar}>
        <WindowDots />
        <span>raio-x-da-agenda.pdf</span>
      </div>
      <div className={styles.previewDocument}>
        <small>FOLHA 01 • DIAGNÓSTICO</small>
        <h3>Marque o que acontece hoje.</h3>
        {[
          "Mensagens interrompem um atendimento.",
          "A equipe precisa perguntar quem está disponível.",
          "Os horários de cada barbeiro não aparecem na agenda.",
          "Exceções não têm responsável definido.",
        ].map((item, index) => (
          <div className={styles.checkRow} key={item}>
            <span className={styles.checkBox} />
            <small>{String(index + 1).padStart(2, "0")}</small>
            <p>{item}</p>
          </div>
        ))}
        <div className={styles.previewOutcome}>
          <span>SAÍDA</span>
          <strong>1 prioridade · 1 responsável · 1 teste</strong>
        </div>
      </div>
    </div>
  );
}

export function DiagnosisLanding({
  review = true,
  form,
}: {
  review?: boolean;
  form?: ReactNode;
} = {}) {
  return (
    <main className={styles.page} id="main-content">
      {review ? <ReviewBanner current="diagnostico" /> : null}
      <SiteNav
        cta="Baixar o Raio-X"
        ctaHref="#formulario"
        links={[
          ["O que você recebe", "#conteudo"],
          ["Como funciona", "#metodo"],
          ["Dúvidas", "#duvidas"],
        ]}
      />

      <section className={styles.diagnosisHero}>
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow}>Raio-X gratuito da agenda da sua barbearia</div>
          <h1>
            Você para o corte só para responder <span>“tem horário?”</span>
          </h1>
          <p>
            Em 25 a 40 minutos, descubra onde sua barbearia perde tempo entre
            mensagens, agenda e horários de cada barbeiro. No fim, você sabe o
            primeiro ajuste que precisa fazer.
          </p>
          <div className={styles.heroActions}>
            <a
              className={styles.primaryCta}
              data-lead-magnet-cta="true"
              href="#formulario"
            >
              Baixar meu Raio-X da Agenda
            </a>
            <span>PDF gratuito · acesso imediato</span>
          </div>
          <ul className={styles.heroChecks}>
            <li>Telefone opcional</li>
            <li>Baixe na hora</li>
            <li>Para quem atende sozinho ou com equipe</li>
          </ul>
        </div>
        <BookStack />
      </section>

      <section className={styles.problemBand}>
        <p>O WhatsApp apita no meio do corte.</p>
        <h2>Você abre a agenda, procura quem está livre e responde na correria.</h2>
        <span>
          Se o cliente demora para confirmar, o horário pode mudar e a conversa
          começa de novo.
        </span>
      </section>

      <section className={styles.editorialSection} id="conteudo">
        <header className={styles.sectionIntro}>
          <small>O QUE VEM NO PDF</small>
          <h2>Um material para preencher, não só para ler.</h2>
          <p>
            Você marca o que acontece hoje, compara a escala da equipe e escolhe
            uma mudança para testar nos próximos sete dias.
          </p>
        </header>
        <div className={styles.editorialList}>
          {diagnosisItems.map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.mechanismSection} id="metodo">
        <div className={styles.methodCopy}>
          <small>MÉTODO C.A.D.E.I.R.A.</small>
          <h2>Coloque a rotina na mesa antes de comprar outro sistema.</h2>
          <p>
            As sete perguntas ligam a mensagem do cliente ao horário confirmado:
            por onde ele chama, qual serviço quer, quem pode atender e quando a
            equipe precisa entrar.
          </p>
          <div className={styles.methodList}>
            {mechanism.map(([letter, title, copy]) => (
              <div key={`${letter}-${title}`}>
                <span>{letter}</span>
                <strong>{title}</strong>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
        <DiagnosisPreview />
      </section>

      <section className={styles.fitSection}>
        <article>
          <small>É PARA VOCÊ SE...</small>
          <h3>O WhatsApp ainda depende de alguém olhando a agenda.</h3>
          <ul>
            <li>cada barbeiro tem seus próprios dias, horários e folgas;</li>
            <li>confirmações e encaixes ficam na cabeça de alguém;</li>
            <li>o cliente está no WhatsApp e o horário está em outro lugar.</li>
          </ul>
        </article>
        <article className={styles.fitInverse}>
          <small>O QUE ESTE MATERIAL NÃO PROMETE</small>
          <h3>Agenda lotada ou faturamento garantido.</h3>
          <p>
            O PDF mostra onde agir primeiro. O resultado depende da rotina da
            barbearia e do que a equipe colocar em prática.
          </p>
        </article>
      </section>

      <section className={styles.formSection} id="formulario">
        <div>
          <small>RECEBA O PDF</small>
          <h2>Faça o Raio-X antes de responder mais um “tem horário?”.</h2>
          <p>
            O PDF abre assim que você enviar o formulário. Também mandamos o link
            para o seu e-mail.
          </p>
        </div>
        {form ?? (
          <form className={styles.formCard}>
            <label>
              Seu nome
              <input placeholder="Como podemos chamar você?" />
            </label>
            <label>
              E-mail para entrega
              <input type="email" placeholder="voce@barbearia.com.br" />
            </label>
            <label>
              WhatsApp <span>opcional</span>
              <input inputMode="tel" placeholder="(00) 00000-0000" />
            </label>
            <label className={styles.consent}>
              <input type="checkbox" />
              <span>Quero receber conteúdos e novidades por e-mail.</span>
            </label>
            <label className={styles.consent}>
              <input type="checkbox" />
              <span>Autorizo mensagens de marketing por SMS.</span>
            </label>
            <button type="button">Baixar meu Raio-X da Agenda</button>
            <p>
              A entrega não depende dos consentimentos opcionais. Consulte a Política
              de Privacidade.
            </p>
          </form>
        )}
      </section>

      <section className={styles.faq} id="duvidas">
        <small>DÚVIDAS DIRETAS</small>
        <details>
          <summary>O material é gratuito?</summary>
          <p>Não há cobrança pelo material. O produto Flowo possui assinatura paga.</p>
        </details>
        <details>
          <summary>Preciso informar telefone?</summary>
          <p>Não. Telefone e consentimento de SMS são opcionais.</p>
        </details>
        <details>
          <summary>Funciona para quem atende sozinho?</summary>
          <p>
            Sim. Você preenche sua própria rotina, sem etapas que dependam de uma
            equipe.
          </p>
        </details>
      </section>
    </main>
  );
}

function ProductEvidence() {
  const rows = [
    ["09:00", "Lucas", "Corte + barba", "Confirmado"],
    ["10:30", "Rafael", "Corte", "Aguardando"],
    ["13:00", "Bruno", "Barba", "Confirmado"],
  ];
  return (
    <div className={styles.productFrame}>
      <div className={styles.windowBar}>
        <WindowDots />
        <span>Prévia de demonstração · dados ilustrativos</span>
      </div>
      <div className={styles.productChrome}>
        <aside>
          <FlowoLogo />
          {["Hoje", "Agenda", "Clientes", "Comandas", "Conversas"].map((item, index) => (
            <span data-active={index === 1} key={item}>
              {item}
            </span>
          ))}
        </aside>
        <div className={styles.productContent}>
          <div className={styles.productHeading}>
            <div>
              <small>TERÇA-FEIRA</small>
              <h3>Agenda da equipe</h3>
            </div>
            <button type="button">Novo horário</button>
          </div>
          <div className={styles.staffPills}>
            <span data-active="true">Todos</span>
            <span>Lucas</span>
            <span>Rafael</span>
            <span>Bruno</span>
          </div>
          <div className={styles.schedule}>
            {rows.map(([time, person, service, status]) => (
              <div key={`${time}-${person}`}>
                <strong>{time}</strong>
                <span>{person}</span>
                <p>{service}</p>
                <em>{status}</em>
              </div>
            ))}
          </div>
          <div className={styles.conversationProof}>
            <span>WhatsApp</span>
            <p>“Tem horário com o Lucas depois das 9h?”</p>
            <strong>Disponibilidade consultada na agenda</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ImplementationLanding() {
  return (
    <main className={styles.page} id="main-content">
      <ReviewBanner current="implantacao" />
      <SiteNav
        cta="Candidatar barbearia"
        ctaHref="#candidatura"
        links={[
          ["Demonstração", "#demonstracao"],
          ["Como funciona", "#mecanismo"],
          ["Implantação", "#implantacao"],
        ]}
      />

      <section className={styles.offerHero}>
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow}>Recepção com IA conectada à operação</div>
          <h1>
            Seu WhatsApp pode atender <span>sem tirar você da cadeira.</span>
          </h1>
          <p>
            A Flowo consulta a agenda de cada barbeiro, responde dentro das
            regras da casa e deixa a equipe acompanhar tudo no painel.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryCta} href="#candidatura">
              Candidatar minha barbearia
            </a>
            <a className={styles.textCta} href="#demonstracao">
              Ver como funciona
            </a>
          </div>
          <p className={styles.conditions}>
            A partir de R$249/mês · sem teste · sem fidelidade · implantação acompanhada
          </p>
        </div>
        <div className={styles.heroEvidence} id="demonstracao">
          <ProductEvidence />
        </div>
      </section>

      <section className={styles.statementBand}>
        <span>AGENDA ONLINE ≠ RECEPÇÃO</span>
        <h2>Uma agenda organiza horários. A Flowo conecta a conversa à operação.</h2>
      </section>

      <section className={styles.productMechanism} id="mecanismo">
        <header className={styles.sectionIntro}>
          <small>O MECANISMO</small>
          <h2>WhatsApp na entrada. Agenda como fonte de verdade.</h2>
          <p>
            A IA não inventa horário. Ela consulta os serviços, a escala e as
            regras configuradas pela barbearia.
          </p>
        </header>
        <div className={styles.stepRail}>
          {productSteps.map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.valueSection}>
        <div className={styles.valueHeadline}>
          <small>O QUE ESTÁ NO MESMO FLUXO</small>
          <h2>Recepção primeiro. Operação conectada depois.</h2>
        </div>
        <div className={styles.valueGrid}>
          {[
            ["Recepção no WhatsApp", "Atendimento, consulta e ações autorizadas."],
            ["Agenda por profissional", "Jornadas, serviços e disponibilidade individual."],
            ["Clientes e histórico", "Contexto visível para a equipe."],
            ["Comandas", "O atendimento continua no pós-serviço."],
            ["Campanhas", "Uso conforme regras e limites do plano."],
            ["Recebimento opcional", "Dinheiro e maquininha própria continuam possíveis."],
          ].map(([title, copy], index) => (
            <article data-featured={index === 0 || index === 1} key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.onboardingSection} id="implantacao">
        <div>
          <small>IMPLANTAÇÃO ACOMPANHADA</small>
          <h2>Antes da rotina real, valide a conversa.</h2>
          <p>
            Serviços, horários e regras são organizados. A equipe combina quando
            alguém precisa assumir e testa os pedidos mais comuns antes de ativar.
          </p>
        </div>
        <ol>
          <li>
            <span>1</span>
            <strong>Preparar</strong>
            <p>serviços, equipe e horários</p>
          </li>
          <li>
            <span>2</span>
            <strong>Configurar</strong>
            <p>tom, escopo e exceções</p>
          </li>
          <li>
            <span>3</span>
            <strong>Testar</strong>
            <p>cenários e resultado no painel</p>
          </li>
          <li>
            <span>4</span>
            <strong>Ativar</strong>
            <p>somente após aceite</p>
          </li>
        </ol>
      </section>

      <section className={styles.pricingProof}>
        <div>
          <small>RISCO REDUZIDO, SEM PROMESSA VAZIA</small>
          <h2>Assinatura paga desde o início. Liberdade para sair.</h2>
          <p>
            A Flowo não oferece teste. Em contrapartida, não há fidelidade e a
            implantação é acompanhada.
          </p>
        </div>
        <div className={styles.priceCard}>
          <span>SOLO</span>
          <strong>
            R$249<small>/mês</small>
          </strong>
          <ul>
            <li>recepção com IA</li>
            <li>operação individual</li>
            <li>onboarding acompanhado</li>
          </ul>
          <a href="#candidatura">Ver candidatura</a>
        </div>
      </section>

      <section className={styles.candidateSection} id="candidatura">
        <div>
          <small>CANDIDATURA PARA IMPLANTAÇÃO</small>
          <h2>Conte como sua barbearia atende hoje.</h2>
          <p>
            Avaliamos profissionais, volume de conversa e rotina atual antes de
            indicar o caminho adequado.
          </p>
        </div>
        <form className={styles.formCard}>
          <label>
            Nome da barbearia
            <input placeholder="Ex.: Barbearia Central" />
          </label>
          <label>
            Seu WhatsApp
            <input inputMode="tel" placeholder="(00) 00000-0000" />
          </label>
          <label>
            Quantos profissionais atendem?
            <select defaultValue="">
              <option value="" disabled>
                Selecione
              </option>
              <option>1 profissional</option>
              <option>2 a 6 profissionais</option>
              <option>7 ou mais profissionais</option>
            </select>
          </label>
          <button type="button">Enviar candidatura</button>
          <p>A candidatura não cria assinatura nem cobrança.</p>
        </form>
      </section>
    </main>
  );
}
