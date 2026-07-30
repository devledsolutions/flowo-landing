import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  CircleUserRound,
  ClipboardList,
  Home,
  Plus,
  Scissors,
  Smartphone,
  UsersRound,
} from "lucide-react";
import { SIGNUP_URL } from "./cta-links";
import { TrackedLink } from "@/components/analytics/tracked-link";

const appBenefits = [
  {
    icon: CalendarDays,
    title: "Agenda e presenças",
    description: "Cada profissional acompanha o dia e atualiza os atendimentos.",
  },
  {
    icon: ClipboardList,
    title: "Clientes e comandas",
    description: "A rotina da cadeira continua sem depender do computador.",
  },
  {
    icon: UsersRound,
    title: "Acesso por função",
    description: "Barbeiro, gestor e dono veem apenas o que precisam para trabalhar.",
  },
];

const appointments = [
  {
    time: "09:00",
    customer: "Lucas Almeida",
    service: "Corte masculino",
    status: "Confirmado",
  },
  {
    time: "10:30",
    customer: "Pedro Martins",
    service: "Corte + barba",
    status: "Aguardando",
  },
];

export default function MobileAppSection() {
  return (
    <section
      id="app-da-equipe"
      aria-labelledby="app-da-equipe-title"
      className="on-ink section-normal relative isolate overflow-hidden scroll-mt-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-10 hidden font-serif text-[clamp(7rem,19vw,18rem)] font-semibold italic leading-none tracking-[-0.08em] text-ink/[0.025] md:block"
      >
        app
      </div>

      <div className="container-page relative grid items-center gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <div>
          <div className="inline-flex items-center gap-2 border-y border-line py-2 text-caption font-semibold uppercase tracking-[0.16em] text-muted-ink">
            <Smartphone className="h-4 w-4" aria-hidden="true" />
            App Flowo para a equipe
            <span className="h-1 w-1 rounded-full bg-current" aria-hidden="true" />
            Em breve
          </div>

          <h2
            id="app-da-equipe-title"
            className="mt-7 max-w-[13ch] text-h2 font-semibold text-ink-strong"
          >
            A barbearia também vai{" "}
            <em className="font-serif font-medium italic tracking-[-0.008em]">
              no bolso
            </em>
            .
          </h2>

          <p className="mt-5 max-w-[58ch] text-lead text-muted-ink">
            O painel web continua como a central da gestão. No app, barbeiros e
            gestores acompanham a agenda e cuidam da rotina de atendimento
            direto pelo celular.
          </p>

          <ul className="mt-9 divide-y divide-line border-y border-line">
            {appBenefits.map((benefit) => (
              <li
                key={benefit.title}
                className="grid gap-2 py-4 sm:grid-cols-[1.15fr_1.6fr] sm:items-start sm:gap-5"
              >
                <div className="flex items-center gap-3">
                  <benefit.icon
                    className="h-5 w-5 shrink-0 text-ink"
                    aria-hidden="true"
                  />
                  <span className="font-semibold text-ink">{benefit.title}</span>
                </div>
                <p className="text-sm leading-relaxed text-muted-ink">
                  {benefit.description}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <TrackedLink
              href="/aplicativo-para-barbeiros"
              event="CTA Clicked"
              properties={{
                page: "/",
                placement: "mobile_app_section",
                destination: "mobile_app_landing",
                intent: "learn_about_app",
              }}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-label font-semibold text-cream transition-colors duration-200 ease-out-quint hover:bg-ink/90"
            >
              Conhecer o aplicativo
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
            <TrackedLink
              href={SIGNUP_URL}
              event="CTA Clicked"
              properties={{
                page: "/",
                placement: "mobile_app_section",
                destination: "dashboard_signup",
                intent: "start_now",
              }}
              className="inline-flex h-12 items-center justify-center px-5 text-label font-medium text-ink transition-colors duration-200 ease-out-quint hover:text-ink-strong"
            >
              Começar pelo painel web
            </TrackedLink>
          </div>

          <p className="mt-5 flex items-center gap-2 text-caption text-faint-ink">
            <Check className="h-4 w-4" aria-hidden="true" />
            Em preparação para iPhone e Android.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[590px]">
          <div className="absolute left-0 top-10 hidden w-[210px] border-y border-line py-4 lg:block">
            <p className="text-caption uppercase tracking-[0.14em] text-faint-ink">
              Próximo atendimento
            </p>
            <p className="mt-2 font-semibold text-ink">09:00 · Corte</p>
            <p className="text-caption text-muted-ink">Confirmado pelo WhatsApp</p>
          </div>

          <div className="absolute bottom-12 right-0 hidden w-[210px] border-y border-line py-4 text-right lg:block">
            <p className="text-caption uppercase tracking-[0.14em] text-faint-ink">
              Visão individual
            </p>
            <p className="mt-2 font-semibold text-ink">A agenda de cada um</p>
            <p className="text-caption text-muted-ink">Sem misturar acessos</p>
          </div>

          <div
            role="img"
            aria-label="Prévia do aplicativo Flowo em desenvolvimento mostrando a agenda de um barbeiro, dois atendimentos e a navegação principal"
            className="relative z-10 mx-auto w-[286px] rounded-[2.7rem] bg-black p-[9px] shadow-[0_28px_55px_-18px_oklch(0_0_0/0.65)] ring-1 ring-white/20 sm:w-[318px]"
          >
            <div className="absolute left-1/2 top-[17px] z-20 h-[25px] w-[92px] -translate-x-1/2 rounded-full bg-black" />

            <div className="overflow-hidden rounded-[2.15rem] bg-[#f6f6f2] text-[#20231c]">
              <div className="flex items-center justify-between px-6 pb-2 pt-3 text-[10px] font-semibold">
                <span>9:41</span>
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2 w-3 rounded-sm border border-current" />
                  <span className="h-2 w-2 rounded-full bg-current" />
                  <span className="h-2 w-4 rounded-sm bg-current" />
                </div>
              </div>

              <div className="px-5 pb-5 pt-7">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[26px] font-bold tracking-[-0.035em]">
                      Agenda
                    </p>
                    <p className="mt-0.5 text-xs text-[#697064]">
                      2 horários hoje
                    </p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#20231c] text-white">
                    <Plus className="h-5 w-5" aria-hidden="true" />
                  </div>
                </div>

                <div className="mt-7 border-b border-[#d9dcd5] pb-4">
                  <p className="text-sm font-semibold">Quarta, 29 de julho</p>
                  <div className="mt-4 grid grid-cols-5 text-center">
                    {[
                      ["Seg", "27"],
                      ["Ter", "28"],
                      ["Qua", "29"],
                      ["Qui", "30"],
                      ["Sex", "31"],
                    ].map(([day, date], index) => (
                      <div key={day}>
                        <p
                          className={`text-[10px] ${
                            index === 2
                              ? "font-semibold text-[#20231c]"
                              : "text-[#62675f]"
                          }`}
                        >
                          {day}
                        </p>
                        <div
                          className={`mx-auto mt-1.5 flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                            index === 2
                              ? "bg-[#20231c] text-white"
                              : "text-[#454b42]"
                          }`}
                        >
                          {date}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-base font-bold">Hoje</p>
                    <p className="text-[10px] text-[#62675f]">
                      Em ordem de horário
                    </p>
                  </div>
                  <span className="rounded-full border border-[#d9dcd5] px-3 py-1.5 text-[10px] font-semibold">
                    Presenças
                  </span>
                </div>

                <div className="mt-3 divide-y divide-[#d9dcd5]">
                  {appointments.map((appointment, index) => (
                    <div
                      key={appointment.time}
                      className="grid grid-cols-[48px_1fr_14px] gap-2 py-3"
                    >
                      <div>
                        <p className="text-xs font-bold">{appointment.time}</p>
                        <p className="text-[9px] text-[#62675f]">
                          {index === 0 ? "09:40" : "11:30"}
                        </p>
                      </div>
                      <div className="border-l-2 border-[#20231c] pl-3">
                        <p className="truncate text-[11px] font-bold">
                          {appointment.customer}
                        </p>
                        <p className="truncate text-[9px] text-[#697064]">
                          {appointment.service}
                        </p>
                        <span
                          className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] font-semibold ${
                            index === 0
                              ? "bg-[#e1ebe4] text-[#1f714a]"
                              : "bg-[#ecece7] text-[#62675f]"
                          }`}
                        >
                          <span className="h-1 w-1 rounded-full bg-current" />
                          {appointment.status}
                        </span>
                      </div>
                      <ChevronRight
                        className="mt-4 h-3.5 w-3.5 text-[#62675f]"
                        aria-hidden="true"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-4 border-t border-[#d9dcd5] bg-white px-4 pb-5 pt-3 text-[#697064]">
                {[
                  [Home, "Início"],
                  [CalendarDays, "Agenda"],
                  [Scissors, "Comandas"],
                  [CircleUserRound, "Mais"],
                ].map(([Icon, label], index) => {
                  const NavIcon = Icon as typeof Home;
                  return (
                    <div
                      key={label as string}
                      className={`flex flex-col items-center gap-1 text-[8px] ${
                        index === 1 ? "font-semibold text-[#20231c]" : ""
                      }`}
                    >
                      <NavIcon className="h-4 w-4" aria-hidden="true" />
                      <span>{label as string}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="relative z-10 mt-5 text-center text-caption text-faint-ink">
            Prévia do produto em desenvolvimento.
          </p>
        </div>
      </div>
    </section>
  );
}
