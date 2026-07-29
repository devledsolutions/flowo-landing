import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/lora/500.css";

import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const ink = "#171810";
const cream = "#f4f1ea";
const paper = "#fbfaf7";
const line = "#d9d5cc";
const muted = "#77776f";
const green = "#3e8f5b";

type FilmProps = {
  vertical: boolean;
};

function reveal(frame: number, fps: number, delay = 0) {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 110, mass: 0.8 },
  });
  return {
    opacity: interpolate(progress, [0, 1], [0, 1]),
    transform: `translateY(${interpolate(progress, [0, 1], [36, 0])}px)`,
  };
}

function Brand({ inverted = false }: { inverted?: boolean }) {
  return (
    <Img
      src={staticFile("flowo-logo.svg")}
      style={{
        width: 190,
        height: "auto",
        filter: inverted ? "invert(1)" : "none",
      }}
    />
  );
}

function BrowserFrame({
  children,
  vertical,
}: {
  children: React.ReactNode;
  vertical: boolean;
}) {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: vertical ? 34 : 26,
        overflow: "hidden",
        border: `1px solid ${line}`,
        background: paper,
        boxShadow: "0 40px 100px rgba(0,0,0,.18)",
      }}
    >
      <div
        style={{
          height: vertical ? 74 : 58,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: vertical ? "0 30px" : "0 24px",
          borderBottom: `1px solid ${line}`,
          background: "#f0ede6",
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          {["#ef6a5b", "#e9b94f", "#5bbf74"].map((color) => (
            <span
              key={color}
              style={{ width: 13, height: 13, borderRadius: 99, background: color }}
            />
          ))}
        </div>
        <span
          style={{
            fontSize: vertical ? 17 : 14,
            fontWeight: 600,
            letterSpacing: "0.12em",
            color: muted,
            textTransform: "uppercase",
          }}
        >
          Flowo · operação ao vivo
        </span>
        <span style={{ width: 56 }} />
      </div>
      {children}
    </div>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        bottom: 48,
        transform: "translateX(-50%)",
        maxWidth: 1400,
        padding: "12px 22px",
        borderRadius: 12,
        background: "rgba(0,0,0,.78)",
        color: "#fff",
        fontSize: 28,
        lineHeight: 1.25,
        textAlign: "center",
        zIndex: 30,
      }}
    >
      {children}
    </div>
  );
}

function Intro({ vertical }: FilmProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        background: cream,
        color: ink,
        padding: vertical ? "150px 84px 190px" : "86px 120px 120px",
        fontFamily: "Poppins",
      }}
    >
      <div style={reveal(frame, fps, 8)}>
        <Brand />
      </div>
      <div
        style={{
          marginTop: vertical ? 300 : 175,
          maxWidth: vertical ? 870 : 1350,
          ...reveal(frame, fps, 22),
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: vertical ? 30 : 24,
            fontWeight: 600,
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            color: muted,
          }}
        >
          Recepção com inteligência artificial
        </p>
        <h1
          style={{
            margin: "28px 0 0",
            fontFamily: "Lora",
            fontWeight: 500,
            fontSize: vertical ? 102 : 116,
            lineHeight: 1.02,
            letterSpacing: "-0.045em",
            maxWidth: vertical ? 840 : 1300,
          }}
        >
          Sua equipe atende na cadeira. A Flowo atende no WhatsApp.
        </h1>
      </div>
      <Caption>
        Enquanto sua equipe cuida de cada cliente, novas mensagens continuam chegando.
      </Caption>
    </AbsoluteFill>
  );
}

function Pressure({ vertical }: FilmProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const messages = [
    "Tem horário hoje?",
    "Pode ser com o Rafael?",
    "Quanto custa barba + cabelo?",
    "Consegue às 18h?",
  ];
  return (
    <AbsoluteFill
      style={{
        background: ink,
        color: "#fff",
        fontFamily: "Poppins",
        padding: vertical ? "150px 72px 200px" : "86px 112px 120px",
      }}
    >
      <div style={reveal(frame, fps, 5)}>
        <Brand inverted />
      </div>
      <div
        style={{
          marginTop: vertical ? 190 : 92,
          display: "grid",
          gridTemplateColumns: vertical ? "1fr" : "0.9fr 1.1fr",
          gap: vertical ? 74 : 100,
          alignItems: "center",
        }}
      >
        <div style={reveal(frame, fps, 14)}>
          <p
            style={{
              margin: 0,
              color: "#aaa99f",
              textTransform: "uppercase",
              letterSpacing: "0.13em",
              fontWeight: 600,
              fontSize: vertical ? 28 : 22,
            }}
          >
            O gargalo acontece enquanto você trabalha
          </p>
          <h2
            style={{
              margin: "24px 0 0",
              fontSize: vertical ? 86 : 96,
              lineHeight: 1.02,
              letterSpacing: "-0.05em",
              maxWidth: 870,
            }}
          >
            Cada mensagem pendente pode virar um horário perdido.
          </h2>
        </div>
        <div style={{ display: "grid", gap: vertical ? 22 : 18 }}>
          {messages.map((message, index) => (
            <div
              key={message}
              style={{
                ...reveal(frame, fps, 18 + index * 8),
                marginLeft: index % 2 ? (vertical ? 70 : 90) : 0,
                padding: vertical ? "26px 30px" : "20px 28px",
                border: "1px solid #393a33",
                borderRadius: 22,
                background: index === messages.length - 1 ? "#fff" : "#23241f",
                color: index === messages.length - 1 ? ink : "#fff",
                fontSize: vertical ? 32 : 26,
                fontWeight: 500,
              }}
            >
              {message}
            </div>
          ))}
        </div>
      </div>
      <Caption>A IA da Flowo atende, entende o serviço e consulta a agenda.</Caption>
    </AbsoluteFill>
  );
}

function WhatsAppScene({ vertical }: FilmProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rows = [
    { side: "client", text: "Oi! Tem corte com o Rafael hoje?" },
    { side: "flowo", text: "Tenho 16h30 ou 18h. Qual funciona melhor?" },
    { side: "client", text: "18h 🙌" },
    { side: "flowo", text: "Perfeito. Corte com Rafael confirmado às 18h." },
  ];
  return (
    <AbsoluteFill
      style={{
        background: "#e8e5dd",
        padding: vertical ? "110px 58px 180px" : "72px 110px 115px",
        fontFamily: "Poppins",
        color: ink,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: vertical ? "1fr" : "0.58fr 1.42fr",
          gap: vertical ? 58 : 70,
          alignItems: "center",
          height: "100%",
        }}
      >
        <div style={reveal(frame, fps, 6)}>
          <p
            style={{
              margin: 0,
              fontSize: vertical ? 27 : 21,
              fontWeight: 600,
              letterSpacing: ".13em",
              textTransform: "uppercase",
              color: muted,
            }}
          >
            WhatsApp + agenda
          </p>
          <h2
            style={{
              margin: "22px 0 0",
              fontSize: vertical ? 80 : 82,
              lineHeight: 1.02,
              letterSpacing: "-.048em",
            }}
          >
            A conversa já nasce conectada à operação.
          </h2>
        </div>
        <div style={{ ...reveal(frame, fps, 12), alignSelf: "center" }}>
          <BrowserFrame vertical={vertical}>
            <div
              style={{
                padding: vertical ? "48px 34px 54px" : "36px 42px 42px",
                minHeight: vertical ? 770 : 610,
                background:
                  "radial-gradient(circle at 20% 15%, #ffffff 0, #f6f4ee 42%, #efebe3 100%)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  paddingBottom: 24,
                  borderBottom: `1px solid ${line}`,
                }}
              >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 99,
                    background: ink,
                    color: "#fff",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 700,
                  }}
                >
                  F
                </div>
                <div>
                  <strong style={{ display: "block", fontSize: 24 }}>Flowo</strong>
                  <span style={{ color: green, fontSize: 18 }}>online agora</span>
                </div>
              </div>
              <div style={{ display: "grid", gap: 18, marginTop: 30 }}>
                {rows.map((row, index) => (
                  <div
                    key={row.text}
                    style={{
                      ...reveal(frame, fps, 20 + index * 13),
                      justifySelf: row.side === "client" ? "end" : "start",
                      maxWidth: "78%",
                      padding: vertical ? "21px 25px" : "17px 22px",
                      borderRadius:
                        row.side === "client" ? "20px 20px 5px 20px" : "20px 20px 20px 5px",
                      background: row.side === "client" ? "#dcefd8" : "#fff",
                      border: `1px solid ${row.side === "client" ? "#bed9b7" : line}`,
                      fontSize: vertical ? 28 : 23,
                      lineHeight: 1.35,
                    }}
                  >
                    {row.text}
                  </div>
                ))}
              </div>
            </div>
          </BrowserFrame>
        </div>
      </div>
      <Caption>O cliente escolhe um horário válido e recebe a confirmação na conversa.</Caption>
    </AbsoluteFill>
  );
}

function AgendaScene({ vertical }: FilmProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const professionals = [
    { name: "Rafael", time: "18:00", service: "Corte", top: 31 },
    { name: "Lucas", time: "16:30", service: "Barba", top: 17 },
    { name: "Marina", time: "17:15", service: "Corte + barba", top: 24 },
  ];
  return (
    <AbsoluteFill
      style={{
        background: paper,
        color: ink,
        padding: vertical ? "110px 58px 180px" : "72px 110px 115px",
        fontFamily: "Poppins",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Brand />
        <p
          style={{
            margin: 0,
            color: muted,
            fontWeight: 600,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            fontSize: vertical ? 22 : 18,
          }}
        >
          Terça-feira · operação da equipe
        </p>
      </div>
      <div
        style={{
          marginTop: vertical ? 110 : 66,
          display: "grid",
          gridTemplateColumns: vertical ? "1fr" : "0.68fr 1.32fr",
          gap: vertical ? 64 : 70,
          alignItems: "center",
        }}
      >
        <div style={reveal(frame, fps, 5)}>
          <h2
            style={{
              fontSize: vertical ? 80 : 84,
              lineHeight: 1.03,
              letterSpacing: "-.048em",
              margin: 0,
            }}
          >
            Cada profissional com seus horários. Uma visão para o gestor.
          </h2>
          <p
            style={{
              fontSize: vertical ? 31 : 24,
              lineHeight: 1.45,
              color: muted,
              maxWidth: 720,
              margin: "28px 0 0",
            }}
          >
            A equipe acompanha a agenda e pode assumir qualquer conversa quando precisar.
          </p>
        </div>
        <div style={reveal(frame, fps, 12)}>
          <BrowserFrame vertical={vertical}>
            <div
              style={{
                padding: vertical ? "36px 28px 48px" : "30px 34px 38px",
                minHeight: vertical ? 660 : 560,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "90px repeat(3, 1fr)",
                  border: `1px solid ${line}`,
                  borderRadius: 18,
                  overflow: "hidden",
                  height: vertical ? 560 : 470,
                }}
              >
                <div style={{ background: "#efede7", borderRight: `1px solid ${line}` }}>
                  {["15h", "16h", "17h", "18h", "19h"].map((time) => (
                    <div
                      key={time}
                      style={{
                        height: "20%",
                        padding: "14px 12px",
                        borderBottom: `1px solid ${line}`,
                        color: muted,
                        fontSize: 17,
                      }}
                    >
                      {time}
                    </div>
                  ))}
                </div>
                {professionals.map((person, index) => (
                  <div
                    key={person.name}
                    style={{
                      position: "relative",
                      borderRight: index < 2 ? `1px solid ${line}` : undefined,
                      background:
                        "repeating-linear-gradient(to bottom, transparent 0, transparent calc(20% - 1px), #e3dfd6 calc(20% - 1px), #e3dfd6 20%)",
                    }}
                  >
                    <div
                      style={{
                        height: 54,
                        padding: "14px 12px",
                        borderBottom: `1px solid ${line}`,
                        fontWeight: 600,
                        fontSize: vertical ? 18 : 17,
                        background: "#f5f3ee",
                      }}
                    >
                      {person.name}
                    </div>
                    <div
                      style={{
                        ...reveal(frame, fps, 22 + index * 10),
                        position: "absolute",
                        top: `${person.top}%`,
                        left: 12,
                        right: 12,
                        padding: vertical ? "14px 12px" : "12px 10px",
                        borderRadius: 12,
                        background: index === 0 ? ink : "#e8e4da",
                        color: index === 0 ? "#fff" : ink,
                        border: index === 0 ? "none" : `1px solid ${line}`,
                        fontSize: vertical ? 17 : 16,
                      }}
                    >
                      <strong style={{ display: "block" }}>{person.time}</strong>
                      {person.service}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BrowserFrame>
        </div>
      </div>
      <Caption>O gestor acompanha tudo e a equipe pode assumir o atendimento.</Caption>
    </AbsoluteFill>
  );
}

function Operations({ vertical }: FilmProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cards = [
    ["Núcleo", "Agenda, IA, comandas e histórico"],
    ["Opcional", "Pagamentos integrados e cashback"],
    ["Conforme o plano", "Comissões e recursos financeiros"],
  ];
  return (
    <AbsoluteFill
      style={{
        background: ink,
        color: "#fff",
        padding: vertical ? "150px 72px 195px" : "88px 116px 120px",
        fontFamily: "Poppins",
      }}
    >
      <Brand inverted />
      <div style={{ marginTop: vertical ? 205 : 105, ...reveal(frame, fps, 6) }}>
        <p
          style={{
            margin: 0,
            color: "#aaa99f",
            fontSize: vertical ? 27 : 21,
            textTransform: "uppercase",
            letterSpacing: ".13em",
            fontWeight: 600,
          }}
        >
          Você escolhe como operar
        </p>
        <h2
          style={{
            margin: "24px 0 0",
            fontSize: vertical ? 82 : 88,
            lineHeight: 1.02,
            letterSpacing: "-.05em",
            maxWidth: 1450,
          }}
        >
          O essencial vem conectado. Os adicionais entram quando fizer sentido.
        </h2>
      </div>
      <div
        style={{
          marginTop: vertical ? 100 : 72,
          display: "grid",
          gridTemplateColumns: vertical ? "1fr" : "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        {cards.map(([label, text], index) => (
          <div
            key={label}
            style={{
              ...reveal(frame, fps, 18 + index * 9),
              minHeight: vertical ? 190 : 210,
              padding: vertical ? "30px 32px" : "30px",
              borderRadius: 22,
              border: "1px solid #3b3c35",
              background: index === 0 ? "#f7f5ef" : "#23241f",
              color: index === 0 ? ink : "#fff",
            }}
          >
            <p
              style={{
                margin: 0,
                color: index === 0 ? muted : "#aaa99f",
                textTransform: "uppercase",
                letterSpacing: ".12em",
                fontWeight: 600,
                fontSize: vertical ? 21 : 17,
              }}
            >
              {label}
            </p>
            <p
              style={{
                margin: "20px 0 0",
                fontSize: vertical ? 34 : 29,
                lineHeight: 1.25,
                fontWeight: 600,
              }}
            >
              {text}
            </p>
          </div>
        ))}
      </div>
      <Caption>Pagamentos integrados, cashback e recursos financeiros são opcionais.</Caption>
    </AbsoluteFill>
  );
}

function Outro({ vertical }: FilmProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        background: cream,
        color: ink,
        fontFamily: "Poppins",
        display: "grid",
        placeItems: "center",
        padding: vertical ? "100px 80px 190px" : "80px 120px 120px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          ...reveal(frame, fps, 4),
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Brand />
        </div>
        <h2
          style={{
            margin: vertical ? "80px auto 0" : "55px auto 0",
            fontFamily: "Lora",
            fontWeight: 500,
            fontSize: vertical ? 104 : 112,
            lineHeight: 1.03,
            letterSpacing: "-.045em",
            maxWidth: vertical ? 860 : 1450,
          }}
        >
          Sua barbearia trabalhando. Sua recepção, sempre pronta.
        </h2>
        <div
          style={{
            margin: vertical ? "88px auto 0" : "60px auto 0",
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            padding: vertical ? "23px 34px" : "18px 30px",
            borderRadius: 14,
            background: ink,
            color: "#fff",
            fontSize: vertical ? 29 : 24,
            fontWeight: 600,
          }}
        >
          Conheça a Flowo <span aria-hidden>→</span>
        </div>
      </div>
      <Caption>Flowo. Sua recepção, sempre pronta.</Caption>
    </AbsoluteFill>
  );
}

export function FlowoFilm({ vertical }: FilmProps) {
  return (
    <AbsoluteFill style={{ background: ink }}>
      <Audio
        src={staticFile("videos/source/flowo-institucional-trilha.mp3")}
        volume={0.3}
      />
      <Audio
        src={staticFile("videos/source/flowo-institucional-voz.mp3")}
        volume={1}
      />
      <Sequence from={0} durationInFrames={180}>
        <Intro vertical={vertical} />
      </Sequence>
      <Sequence from={180} durationInFrames={240}>
        <Pressure vertical={vertical} />
      </Sequence>
      <Sequence from={420} durationInFrames={330}>
        <WhatsAppScene vertical={vertical} />
      </Sequence>
      <Sequence from={750} durationInFrames={300}>
        <AgendaScene vertical={vertical} />
      </Sequence>
      <Sequence from={1050} durationInFrames={210}>
        <Operations vertical={vertical} />
      </Sequence>
      <Sequence from={1260} durationInFrames={120}>
        <Outro vertical={vertical} />
      </Sequence>
    </AbsoluteFill>
  );
}
