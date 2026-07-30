import type { ReactNode } from "react";
import {
  ArrowDownToLine,
  BarChart3,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Clock3,
  CreditCard,
  Home,
  MessageCircleMore,
  Package,
  ReceiptText,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  UsersRound,
  WalletCards,
} from "lucide-react";

const appColors = {
  canvas: "#f5f6f3",
  surface: "#ffffff",
  ink: "#23291f",
  muted: "#5b6758",
  line: "#dfe3dc",
  accent: "#ad2f62",
  accentSoft: "#faedf2",
  success: "#0d7148",
  successSoft: "#e6f3ec",
} as const;

function PhoneShell({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`${className || "relative"} w-[256px] shrink-0 rounded-[2.65rem] bg-black p-[7px] shadow-[0_28px_54px_-22px_oklch(0_0_0/0.68)] ring-1 ring-white/20 sm:w-[286px]`}
    >
      <div className="absolute left-1/2 top-[13px] z-20 h-[21px] w-[78px] -translate-x-1/2 rounded-full bg-black" />
      <div
        className="overflow-hidden rounded-[2.2rem]"
        style={{ backgroundColor: appColors.canvas, color: appColors.ink }}
      >
        <div className="flex items-center justify-between px-5 pb-1 pt-2.5 text-[8px] font-semibold">
          <span>9:41</span>
          <span aria-hidden="true">● ᴡɪꜰɪ ▰</span>
        </div>
        {children}
      </div>
    </div>
  );
}

function BottomNav({ active }: { active: "home" | "agenda" | "comandas" | "clientes" | "mais" }) {
  const items = [
    { key: "home", label: "Início", icon: Home },
    { key: "agenda", label: "Agenda", icon: CalendarDays },
    { key: "comandas", label: "Comandas", icon: ReceiptText },
    { key: "clientes", label: "Clientes", icon: UsersRound },
    { key: "mais", label: "Mais", icon: Package },
  ] as const;

  return (
    <div
      className="grid grid-cols-5 border-t px-2 pb-4 pt-2.5"
      style={{ borderColor: appColors.line, backgroundColor: appColors.surface }}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const selected = item.key === active;
        return (
          <div
            key={item.key}
            className="flex flex-col items-center gap-1 text-[7px] font-semibold"
            style={{ color: selected ? appColors.accent : appColors.muted }}
          >
            <Icon className="h-4 w-4" strokeWidth={selected ? 2.4 : 1.8} aria-hidden="true" />
            <span>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function BackHeader() {
  return (
    <div className="relative flex items-center justify-center px-4 pb-4 pt-5">
      <span
        className="absolute left-4 flex h-9 w-9 items-center justify-center rounded-lg border"
        style={{ borderColor: appColors.line, backgroundColor: appColors.surface }}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="text-[17px] font-semibold tracking-[-0.04em]">flowo</span>
    </div>
  );
}

export function AgendaPhone({ className = "" }: { className?: string }) {
  return (
    <PhoneShell
      className={className}
      label="Prévia ilustrativa da agenda do aplicativo Flowo, com calendário, horário confirmado e acesso a presenças"
    >
      <div className="flex min-h-[506px] flex-col">
        <div className="flex-1 px-4 pb-4 pt-7">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[23px] font-bold tracking-[-0.04em]">Agenda</h3>
              <p className="mt-0.5 text-[10px]" style={{ color: appColors.muted }}>
                3 horários hoje
              </p>
            </div>
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
              style={{ backgroundColor: appColors.ink }}
            >
              <span className="text-xl font-light">+</span>
            </span>
          </div>

          <div className="mt-6">
            <p className="text-[15px] font-bold">Julho de 2026</p>
            <p className="text-[9px]" style={{ color: appColors.muted }}>
              Semana de 27 de julho
            </p>
          </div>
          <div className="mt-4 grid grid-cols-5 text-center">
            {[
              ["Sáb", "25"],
              ["Dom", "26"],
              ["Seg", "27"],
              ["Ter", "28"],
              ["Qua", "29"],
            ].map(([day, date], index) => (
              <div key={day}>
                <p
                  className="text-[8px] font-semibold"
                  style={{ color: index === 2 ? appColors.accent : appColors.muted }}
                >
                  {day}
                </p>
                <span
                  className="mx-auto mt-1.5 flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold"
                  style={
                    index === 2
                      ? { backgroundColor: appColors.ink, color: appColors.surface }
                      : undefined
                  }
                >
                  {date}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-end justify-between gap-3">
            <div>
              <p className="text-[14px] font-bold">Hoje</p>
              <p className="text-[9px]" style={{ color: appColors.muted }}>
                Em ordem de horário
              </p>
            </div>
            <span
              className="rounded-lg border px-2.5 py-2 text-[9px] font-bold"
              style={{ borderColor: appColors.line, backgroundColor: appColors.surface }}
            >
              Presenças
            </span>
          </div>

          <div className="mt-4 grid grid-cols-[38px_4px_1fr] gap-2.5">
            <div>
              <p className="text-[11px] font-bold">09:00</p>
              <p className="text-[8px]" style={{ color: appColors.muted }}>
                09:30
              </p>
            </div>
            <span className="rounded-full" style={{ backgroundColor: appColors.success }} />
            <div>
              <div className="flex items-start justify-between gap-2">
                <p className="text-[10px] font-bold">Lucas Almeida</p>
                <p className="text-[9px] font-bold">R$ 35</p>
              </div>
              <p className="mt-1 text-[8px]" style={{ color: appColors.muted }}>
                Corte masculino com Rafael
              </p>
              <span
                className="mt-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[8px] font-bold"
                style={{ backgroundColor: appColors.successSoft, color: appColors.success }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                Confirmado
              </span>
            </div>
          </div>
        </div>
        <BottomNav active="agenda" />
      </div>
    </PhoneShell>
  );
}

export function ComandasPhone({ className = "" }: { className?: string }) {
  const orders = [
    ["Marcos Ribeiro", "R$ 67,00", "Em aberto"],
    ["João Alves", "R$ 45,00", "Fechada"],
    ["Bruno Costa", "R$ 82,00", "Fechada"],
    ["André Lima", "R$ 35,00", "Fechada"],
  ] as const;

  return (
    <PhoneShell
      className={className}
      label="Prévia ilustrativa das comandas no aplicativo Flowo, com clientes, valores e situação de cada atendimento"
    >
      <div className="flex min-h-[506px] flex-col">
        <div className="flex-1 px-4 pb-4 pt-7">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-[23px] font-bold tracking-[-0.04em]">Comandas</h3>
              <p className="mt-0.5 text-[10px]" style={{ color: appColors.muted }}>
                R$ 67,00 em aberto
              </p>
            </div>
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
              style={{ backgroundColor: appColors.ink }}
            >
              <span className="text-xl font-light">+</span>
            </span>
          </div>

          <div
            className="mt-6 overflow-hidden rounded-xl border"
            style={{ borderColor: appColors.line, backgroundColor: appColors.surface }}
          >
            {orders.map(([customer, price, status], index) => (
              <div
                key={customer}
                className="grid grid-cols-[34px_1fr_auto] items-center gap-3 px-3 py-3.5"
                style={index ? { borderTop: `1px solid ${appColors.line}` } : undefined}
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ backgroundColor: appColors.accentSoft, color: appColors.accent }}
                >
                  <ReceiptText className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[9px] font-bold">{customer}</p>
                  <p className="mt-0.5 text-[8px]" style={{ color: appColors.muted }}>
                    {status} · com Rafael
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-[9px] font-bold">{price}</p>
                  <ChevronRight className="h-3 w-3" style={{ color: appColors.muted }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <BottomNav active="comandas" />
      </div>
    </PhoneShell>
  );
}

export function FinancePhone({ className = "" }: { className?: string }) {
  return (
    <PhoneShell
      className={className}
      label="Prévia ilustrativa do financeiro do aplicativo Flowo, com saldo, recebimentos, repasses e meios de pagamento"
    >
      <div className="min-h-[559px]">
        <BackHeader />
        <div className="px-4 pb-5">
          <h3 className="text-[22px] font-bold tracking-[-0.04em]">Financeiro</h3>
          <p className="text-[10px]" style={{ color: appColors.muted }}>
            Saldo, recebimentos e repasses
          </p>

          <div
            className="mt-5 rounded-xl p-4 text-white"
            style={{ backgroundColor: appColors.ink }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[9px] text-white/70">Disponível para retirada</p>
                <p className="mt-1 text-[27px] font-bold tracking-[-0.04em]">R$ 1.284</p>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                <WalletCards className="h-4 w-4" style={{ color: "#e86594" }} aria-hidden="true" />
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 border-t border-white/15 pt-3">
              <div>
                <p className="text-[8px] text-white/60">Líquido no mês</p>
                <p className="mt-1 text-[10px] font-bold">R$ 8.430</p>
              </div>
              <div className="border-l border-white/15 pl-3">
                <p className="text-[8px] text-white/60">A receber</p>
                <p className="mt-1 text-[10px] font-bold">R$ 1.940</p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-[14px] font-bold">Últimos 7 dias</p>
            <p className="text-[8px]" style={{ color: appColors.muted }}>
              19 movimentações no período
            </p>
            <div
              className="mt-3 flex h-20 items-end justify-between rounded-xl border px-3 pb-3 pt-2"
              style={{ borderColor: appColors.line, backgroundColor: appColors.surface }}
            >
              {[18, 24, 34, 28, 48, 66, 42].map((height, index) => (
                <span
                  key={height + index}
                  className="w-4 rounded-t"
                  style={{
                    height,
                    backgroundColor: index === 6 ? appColors.accent : "#e4e8e1",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-[14px] font-bold">Meios de pagamento</p>
            <div
              className="mt-3 grid grid-cols-3 divide-x rounded-xl border text-center"
              style={{ borderColor: appColors.line, backgroundColor: appColors.surface }}
            >
              {[
                ["PIX", "46%"],
                ["Cartão", "41%"],
                ["Dinheiro", "13%"],
              ].map(([method, percent]) => (
                <div key={method} className="py-3">
                  <p className="text-[8px]" style={{ color: appColors.muted }}>
                    {method}
                  </p>
                  <p className="mt-1 text-[11px] font-bold">{percent}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="mt-4 flex items-center gap-3 rounded-xl border p-3"
            style={{ borderColor: appColors.line, backgroundColor: appColors.surface }}
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ backgroundColor: appColors.successSoft, color: appColors.success }}
            >
              <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[9px] font-bold">Comanda · Lucas Almeida</p>
              <p className="text-[8px]" style={{ color: appColors.muted }}>
                Crédito · concluída
              </p>
            </div>
            <p className="text-[9px] font-bold" style={{ color: appColors.success }}>
              R$ 67
            </p>
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}

export function ConversationsPhone({ className = "" }: { className?: string }) {
  const chats = [
    ["Lucas Almeida", "Pode confirmar para amanhã?", "09:42", true],
    ["Marcos Ribeiro", "Obrigado pelo atendimento!", "Ontem", false],
    ["João Alves", "Quero remarcar meu horário.", "Seg", false],
  ] as const;

  return (
    <PhoneShell
      className={className}
      label="Prévia ilustrativa das conversas no aplicativo Flowo, com busca, histórico do cliente e controle do atendimento"
    >
      <div className="min-h-[559px]">
        <BackHeader />
        <div className="px-4 pb-6">
          <h3 className="text-[22px] font-bold tracking-[-0.04em]">Conversas</h3>
          <p className="text-[10px]" style={{ color: appColors.muted }}>
            Atendimento pelo WhatsApp
          </p>
          <div
            className="mt-5 flex items-center gap-2 rounded-xl px-3 py-3"
            style={{ backgroundColor: "#edf0eb", color: appColors.muted }}
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            <span className="text-[10px]">Buscar cliente ou mensagem</span>
          </div>

          <div className="mt-5">
            {chats.map(([name, message, time, unread], index) => (
              <div
                key={name}
                className="grid grid-cols-[38px_1fr_auto] items-center gap-3 py-3.5"
                style={index ? { borderTop: `1px solid ${appColors.line}` } : undefined}
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[10px] font-bold"
                  style={{ backgroundColor: appColors.accentSoft, color: appColors.accent }}
                >
                  {name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[10px] font-bold">{name}</p>
                  <p className="mt-0.5 truncate text-[8px]" style={{ color: appColors.muted }}>
                    {message}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[7px]" style={{ color: appColors.muted }}>
                    {time}
                  </p>
                  {unread ? (
                    <span
                      className="ml-auto mt-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[7px] font-bold text-white"
                      style={{ backgroundColor: appColors.accent }}
                    >
                      2
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-5 rounded-xl p-4"
            style={{ backgroundColor: appColors.ink, color: appColors.surface }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <p className="text-[10px] font-bold">IA e equipe no mesmo histórico</p>
            </div>
            <p className="mt-2 text-[8px] leading-relaxed text-white/65">
              O profissional autorizado pode assumir a conversa quando o atendimento precisa
              ser humano.
            </p>
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}

export function OperationsPhone({ className = "" }: { className?: string }) {
  const groups = [
    {
      title: "Cadastros",
      rows: [
        ["Serviços e produtos", ShoppingBag],
        ["Equipe e horários", UsersRound],
        ["Estoque e pacotes", Package],
      ],
    },
    {
      title: "Gestão",
      rows: [
        ["Financeiro", WalletCards],
        ["Métricas", BarChart3],
        ["Campanhas", MessageCircleMore],
      ],
    },
    {
      title: "Configurações",
      rows: [
        ["Recebimentos", CreditCard],
        ["Automações", Sparkles],
        ["Conta e integrações", Settings],
      ],
    },
  ] as const;

  return (
    <PhoneShell
      className={className}
      label="Prévia ilustrativa do menu Mais no aplicativo Flowo, com cadastros, gestão e configurações"
    >
      <div className="flex min-h-[506px] flex-col">
        <div className="flex-1 px-4 pb-4 pt-7">
          <h3 className="text-[23px] font-bold tracking-[-0.04em]">Mais</h3>
          <p className="mt-0.5 text-[10px]" style={{ color: appColors.muted }}>
            A operação completa, conforme seu acesso
          </p>

          <div className="mt-5 space-y-4">
            {groups.map((group) => (
              <div key={group.title}>
                <p className="mb-2 text-[8px] font-bold" style={{ color: appColors.muted }}>
                  {group.title}
                </p>
                <div
                  className="overflow-hidden rounded-xl border"
                  style={{ borderColor: appColors.line, backgroundColor: appColors.surface }}
                >
                  {group.rows.map(([label, Icon], index) => (
                    <div
                      key={label}
                      className="flex items-center gap-2.5 px-3 py-2.5"
                      style={index ? { borderTop: `1px solid ${appColors.line}` } : undefined}
                    >
                      <Icon className="h-3.5 w-3.5" style={{ color: appColors.accent }} />
                      <span className="flex-1 text-[9px] font-semibold">{label}</span>
                      <ChevronRight className="h-3 w-3" style={{ color: appColors.muted }} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <BottomNav active="mais" />
      </div>
    </PhoneShell>
  );
}

export function ClientsPhone({ className = "" }: { className?: string }) {
  const clients = [
    ["Lucas Almeida", "12 atendimentos", "LA"],
    ["Marcos Ribeiro", "8 atendimentos", "MR"],
    ["João Alves", "5 atendimentos", "JA"],
    ["Bruno Costa", "3 atendimentos", "BC"],
  ] as const;

  return (
    <PhoneShell
      className={className}
      label="Prévia ilustrativa da lista de clientes no aplicativo Flowo, com busca e histórico de atendimentos"
    >
      <div className="flex min-h-[506px] flex-col">
        <div className="flex-1 px-4 pb-4 pt-7">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-[23px] font-bold tracking-[-0.04em]">Clientes</h3>
              <p className="mt-0.5 text-[10px]" style={{ color: appColors.muted }}>
                Histórico e relacionamento
              </p>
            </div>
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
              style={{ backgroundColor: appColors.ink }}
            >
              <span className="text-xl font-light">+</span>
            </span>
          </div>
          <div
            className="mt-5 flex items-center gap-2 rounded-xl px-3 py-3"
            style={{ backgroundColor: "#edf0eb", color: appColors.muted }}
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            <span className="text-[10px]">Buscar cliente</span>
          </div>

          <div className="mt-4">
            {clients.map(([name, history, initials], index) => (
              <div
                key={name}
                className="grid grid-cols-[36px_1fr_auto] items-center gap-3 py-3.5"
                style={index ? { borderTop: `1px solid ${appColors.line}` } : undefined}
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[9px] font-bold"
                  style={{ backgroundColor: appColors.accentSoft, color: appColors.accent }}
                >
                  {initials}
                </span>
                <div>
                  <p className="text-[10px] font-bold">{name}</p>
                  <p className="mt-0.5 text-[8px]" style={{ color: appColors.muted }}>
                    {history}
                  </p>
                </div>
                <ChevronRight className="h-3.5 w-3.5" style={{ color: appColors.muted }} />
              </div>
            ))}
          </div>

          <div
            className="mt-5 grid grid-cols-2 divide-x rounded-xl border"
            style={{ borderColor: appColors.line, backgroundColor: appColors.surface }}
          >
            <div className="p-3">
              <Clock3 className="h-4 w-4" style={{ color: appColors.accent }} aria-hidden="true" />
              <p className="mt-2 text-[8px]" style={{ color: appColors.muted }}>
                Próximo retorno
              </p>
              <p className="mt-0.5 text-[10px] font-bold">Em 14 dias</p>
            </div>
            <div className="p-3">
              <CircleUserRound
                className="h-4 w-4"
                style={{ color: appColors.accent }}
                aria-hidden="true"
              />
              <p className="mt-2 text-[8px]" style={{ color: appColors.muted }}>
                Preferência
              </p>
              <p className="mt-0.5 text-[10px] font-bold">Corte clássico</p>
            </div>
          </div>
        </div>
        <BottomNav active="clientes" />
      </div>
    </PhoneShell>
  );
}
