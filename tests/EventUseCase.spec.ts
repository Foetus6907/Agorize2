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

  async function expectEventsLengthIsOne() {
    await expect(eventUseCase.getEvents()).resolves.toHaveLength(1);
  }

  async function getEvent(): Promise<Event> {
    await expectEventsLengthIsOne();
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
      "2023-01-06T10:30:00", // January 6th, 10:30
      "2023-01-06T14:00:00" // January 6th, 13:30
    );

    await eventUseCase.createRecurringOpeningEvent(startDate, endDate);

    const event = await getEvent();
    expect(event.opening).toBeTruthy();
    expect(event.recurring).toBeTruthy();
  });

  it("should add a Scheduled Intervention Event to the list", async () => {
    const { startDate, endDate } = getStartAndEndDate(
      "2023-01-13T11:30:00", // January 13th 11:30
      "2023-01-13T12:30:00" // January 13th 12:30
    );

    await eventUseCase.createScheduledInterventionEvent(startDate, endDate);

    const event = await getEvent();
    expect(event.opening).toBeFalsy();
    expect(event.recurring).toBeFalsy();
  });

  it("should returns an array with available windows/slots in the calendar", async () => {
    /*
     * Answer should be :
     * I'm available from January 13th, at 10:30, 11:00, 12:30, 13:00, and 13:30
     * I'm not available any other time !
     */

    const { startDate: recOpenEventStartDate, endDate: recOpenEventEndDate } =
      getStartAndEndDate(
        "2023-01-06T10:30:00", // January 6th, 10:30
        "2023-01-06T14:00:00" // January 6th, 13:30
      );

    await eventUseCase.createRecurringOpeningEvent(
      recOpenEventStartDate,
      recOpenEventEndDate
    );
    const {
      startDate: schedInterEventStartDate,
      endDate: schedInterEventEndDate,
    } = getStartAndEndDate(
      "2023-01-13T11:30:00", // January 13th 11:30
      "2023-01-13T12:30:00" // January 13th 12:30
    );

    await eventUseCase.createScheduledInterventionEvent(
      schedInterEventStartDate,
      schedInterEventEndDate
    );

    const {
      startDate: availabilitiesRequestStartDate,
      endDate: availabilitiesRequestEndDate,
    } = getStartAndEndDate(
      "2023-01-09T10:00:00", // January 1st, 10:30
      "2023-01-16T10:00:00" // January 1st, 13:30
    );
    const availabilities = await eventUseCase.getAvailabilities(
      availabilitiesRequestStartDate,
      availabilitiesRequestEndDate
    );
    expect(availabilities).toHaveLength(5);
  });
});
