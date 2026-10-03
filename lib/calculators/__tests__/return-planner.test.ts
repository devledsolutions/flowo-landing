import { describe, expect, it } from "vitest";
import { isValidIsoDate, localIsoDate, planReturn } from "../return-planner";

describe("planReturn", () => {
  it("adds the interval and subtracts the advance in calendar days", () => {
    const plan = planReturn({
      lastVisit: "2026-09-04",
      intervalDays: 30,
      advanceDays: 3,
      service: "corte",
      tone: "proximo",
    });
    expect(plan?.returnDate).toBe("2026-10-04");
    expect(plan?.contactDate).toBe("2026-10-01");
  });

  it("crosses month and year boundaries", () => {
    expect(
      planReturn({ lastVisit: "2026-01-31", intervalDays: 30, advanceDays: 0, service: "barba", tone: "direto" })
        ?.returnDate,
    ).toBe("2026-03-02");
    expect(
      planReturn({ lastVisit: "2026-12-20", intervalDays: 15, advanceDays: 2, service: "barba", tone: "direto" }),
    ).toMatchObject({ returnDate: "2027-01-04", contactDate: "2027-01-02" });
  });

  it("is not shifted by daylight saving or the local time zone", () => {
    const plan = planReturn({
      lastVisit: "2026-10-30",
      intervalDays: 7,
      advanceDays: 0,
      service: "corte",
      tone: "direto",
    });
    expect(plan?.returnDate).toBe("2026-11-06");
  });

  it("writes both templates with the service and the opt-out sentence", () => {
    const close = planReturn({ lastVisit: "2026-09-04", intervalDays: 30, advanceDays: 3, service: "corte_e_barba", tone: "proximo" });
    const direct = planReturn({ lastVisit: "2026-09-04", intervalDays: 30, advanceDays: 3, service: "outro", tone: "direto" });
    expect(close?.message).toContain("último corte e barba");
    expect(close?.message).toContain("Se preferir não receber lembretes, é só falar.");
    expect(direct?.message).toContain("último procedimento");
    expect(direct?.message).toContain("Se não quiser receber este tipo de lembrete, é só avisar.");
  });

  it("rejects dates that do not exist", () => {
    expect(isValidIsoDate("2026-02-30")).toBe(false);
    expect(isValidIsoDate("04/09/2026")).toBe(false);
    expect(
      planReturn({ lastVisit: "2026-02-30", intervalDays: 30, advanceDays: 3, service: "corte", tone: "direto" }),
    ).toBeNull();
  });
});

describe("localIsoDate", () => {
  it("uses the local calendar date after 21:00 in Brazil", () => {
    // 22:30 in São Paulo is already the next day in UTC.
    const lateEvening = new Date("2026-09-28T22:30:00-03:00");
    expect(localIsoDate(lateEvening)).toBe("2026-09-28");
    expect(localIsoDate(lateEvening, 24)).toBe("2026-09-04");
  });
});
