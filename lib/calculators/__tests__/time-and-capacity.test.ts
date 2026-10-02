import { describe, expect, it } from "vitest";
import { calculateAgendaOccupancy } from "../agenda-occupancy";
import { calculateWhatsAppOpportunity } from "../whatsapp-opportunity";
import { calculateWhatsAppTime } from "../whatsapp-time";

describe("calculateWhatsAppTime", () => {
  it("matches the page example", () => {
    const result = calculateWhatsAppTime({
      messagesPerDay: 28,
      minutesPerMessage: 2.5,
      daysPerWeek: 6,
      serviceMinutes: 45,
    });
    expect(result.weeklyHours).toBeCloseTo(7, 5);
    expect(result.monthlyHours).toBeCloseTo(30.31, 2);
    expect(result.serviceSlots).toBe(40);
  });

  it("clamps out-of-range and missing values", () => {
    const zeroMinutes = calculateWhatsAppTime({
      messagesPerDay: 10,
      minutesPerMessage: 0,
      daysPerWeek: 1,
      serviceMinutes: 30,
    });
    expect(zeroMinutes.weeklyHours).toBeCloseTo((10 * 0.5) / 60, 5);

    const tooManyMessages = calculateWhatsAppTime({
      messagesPerDay: 1000,
      minutesPerMessage: 1,
      daysPerWeek: 1,
      serviceMinutes: 30,
    });
    expect(tooManyMessages.weeklyHours).toBeCloseTo(300 / 60, 5);

    const notANumber = calculateWhatsAppTime({
      messagesPerDay: Number.NaN,
      minutesPerMessage: Number.NaN,
      daysPerWeek: Number.NaN,
      serviceMinutes: Number.NaN,
    });
    expect(notANumber).toEqual({ weeklyHours: 0, monthlyHours: 0, serviceSlots: 0 });
  });
});

describe("calculateWhatsAppOpportunity", () => {
  it("matches the page example", () => {
    const result = calculateWhatsAppOpportunity({
      messagesPerDay: 18,
      daysPerWeek: 6,
      unansweredRate: 25,
      averageTicket: 60,
    });
    expect(result.monthlyMessages).toBeCloseTo(467.64, 2);
    expect(result.conversationsToReview).toBeCloseTo(116.91, 2);
    expect(Math.round(result.scenarioValue)).toBe(7015);
  });

  it("caps the unanswered rate at 100%", () => {
    const result = calculateWhatsAppOpportunity({
      messagesPerDay: 10,
      daysPerWeek: 1,
      unansweredRate: 250,
      averageTicket: 10,
    });
    expect(result.conversationsToReview).toBeCloseTo(result.monthlyMessages, 5);
  });
});

describe("calculateAgendaOccupancy", () => {
  it("matches the page example", () => {
    const result = calculateAgendaOccupancy({
      professionals: 3,
      hoursPerDay: 8,
      daysPerWeek: 6,
      serviceMinutes: 45,
      bookedPerWeek: 72,
    });
    expect(result.weeklyCapacity).toBe(192);
    expect(result.occupancy).toBe(37.5);
    expect(result.openSlots).toBe(120);
  });

  it("never reports more than 100% or negative open slots", () => {
    const result = calculateAgendaOccupancy({
      professionals: 1,
      hoursPerDay: 1,
      daysPerWeek: 1,
      serviceMinutes: 60,
      bookedPerWeek: 50,
    });
    expect(result.occupancy).toBe(100);
    expect(result.openSlots).toBe(0);
  });
});
