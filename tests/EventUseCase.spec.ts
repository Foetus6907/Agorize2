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

  it("sould add a Recurring Opening Event to the list", async () => {
    const { startDate, endDate } = getStartAndEndDate(
      "2021-01-07T10:30:00", // July 1st, 10:30
      "2021-01-07T13:30:00" // July 1st, 13:30
    );

    await eventUseCase.createRecurringOpeningEvent(startDate, endDate);

    const event = await getEvent();
    expect(event.opening).toBeTruthy();
    expect(event.recurring).toBeTruthy();
  });

  it("sould add a Scheduled Intervention Event to the list", async () => {
    const { startDate, endDate } = getStartAndEndDate(
      "2021-08-07T11:30:00", // July 8th 11:30
      "2021-08-07T12:30:00" // July 8th 12:30
    );

    await eventUseCase.createScheduledInterventionEvent(startDate, endDate);

    const event = await getEvent();
    expect(event.opening).toBeFalsy();
    expect(event.recurring).toBeFalsy();
  });
});
