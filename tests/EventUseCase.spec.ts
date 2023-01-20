import "jest";
import EventRepositoryIM from "../src/adapter/secondary/inMemory/InMemoryRepository";
import EventUseCase from "../src/domain/useCase/EventUseCase";

describe("EventUseCase", () => {
  it("sould add a Recurring Opening Event to the list", async () => {
    const eventRepository = new EventRepositoryIM();
    const eventUseCase = new EventUseCase(eventRepository);
    const startDate = new Date("2021-01-07T10:30:00"); // July 1st, 10:30
    const endDate = new Date("2021-01-07T13:30:00"); // July 1st, 13:30

    await eventUseCase.createRecurringOpeningEvent(startDate, endDate);

    await expect(eventUseCase.getEvents()).resolves.toHaveLength(1);
    const events = await eventUseCase.getEvents();
    const event = events[0];
    expect(event.opening).toBeTruthy();
    expect(event.recurring).toBeTruthy();
    expect(1).toEqual(1);
  });
  it("sould add a Scheduled Intervention Event to the list", async () => {
    const eventRepository = new EventRepositoryIM();
    const eventUseCase = new EventUseCase(eventRepository);
    const startDate = new Date("2021-08-07T11:30:00"); // July 8th 11:30
    const endDate = new Date("2021-08-07T12:30:00"); // July 8th 12:30

    await eventUseCase.createScheduledInterventionEvent(startDate, endDate);

    await expect(eventUseCase.getEvents()).resolves.toHaveLength(1);
    const events = await eventUseCase.getEvents();
    const event = events[0];
    expect(event.opening).toBeFalsy();
    expect(event.recurring).toBeFalsy();
    expect(1).toEqual(1);
  });
});
