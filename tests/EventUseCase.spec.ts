import "jest";
import EventRepositoryIM from "../src/adapter/secondary/inMemory/InMemoryRepository";
import EventUseCase from "../src/domain/useCase/EventUseCase";
import Event from "../src/domain/model/Event";

describe("EventUseCase", () => {
  let eventRepository: EventRepositoryIM;
  let eventUseCase: EventUseCase;

  beforeEach(() => {
    eventRepository = new EventRepositoryIM();
    eventUseCase = new EventUseCase(eventRepository);
  });

  async function getEvent(): Promise<Event> {
    await expect(eventUseCase.getEvents()).resolves.toHaveLength(1);
    const events = await eventUseCase.getEvents();
    return events[0];
  }

  function getStartAndEndDate(
    startDateAsString: string,
    endDateAsString: string
  ): { startDate: Date; endDate: Date } {
    const startDate = new Date(startDateAsString); // July 8th 11:30
    const endDate = new Date(endDateAsString); // July 8th 12:30
    return { startDate, endDate };
  }

  it("should add a Recurring Opening Event to the list", async () => {
    const { startDate, endDate } = getStartAndEndDate(
      "2023-01-01T10:30:00", // January 1st, 10:30
      "2023-01-01T13:30:00" // January 1st, 13:30
    );

    await eventUseCase.createRecurringOpeningEvent(startDate, endDate);

    const event = await getEvent();
    expect(event.opening).toBeTruthy();
    expect(event.recurring).toBeTruthy();
  });

  it("should add a Scheduled Intervention Event to the list", async () => {
    const { startDate, endDate } = getStartAndEndDate(
      "2023-01-07T11:30:00", // January 7th 11:30
      "2023-01-07T12:30:00" // January 8th 12:30
    );

    await eventUseCase.createScheduledInterventionEvent(startDate, endDate);

    const event = await getEvent();
    expect(event.opening).toBeFalsy();
    expect(event.recurring).toBeFalsy();
  });
});
