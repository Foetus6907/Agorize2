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

  it("should add a Recurring Opening Event to the list", async () => {
    const eventDates = {
      startDate: "2023-01-06T10:30:00.000Z",
      endDate: "2023-01-06T14:00:00.000Z",
    }; // January 6th 10:30 to 14:00

    await eventUseCase.createRecurringOpeningEvent(
      eventDates.startDate,
      eventDates.endDate
    );

    const event = await getEvent();
    expect(event.opening).toBeTruthy();
    expect(event.recurring).toBeTruthy();
  });

  it("should add a Scheduled Intervention Event to the list", async () => {
    const eventDates = {
      startDate: "2023-01-13T11:30:00.000Z",
      endDate: "2023-01-13T12:30:00.000Z",
    }; // January 13th 11:30 to 12:30

    await eventUseCase.createScheduledInterventionEvent(
      eventDates.startDate,
      eventDates.endDate
    );

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

    const { startDate: recOpenEventStartDate, endDate: recOpenEventEndDate } = {
      startDate: "2023-01-06T10:30:00.000Z", // January 6th, 10:30
      endDate: "2023-01-06T14:00:00.000Z", // January 6th, 13:30
    };

    await eventUseCase.createRecurringOpeningEvent(
      recOpenEventStartDate,
      recOpenEventEndDate
    );
    const {
      startDate: schedInterEventStartDate,
      endDate: schedInterEventEndDate,
    } = {
      startDate: "2023-01-13T11:30:00.000Z", // January 13th 11:30
      endDate: "2023-01-13T12:30:00.000Z", // January 13th 12:30
    };

    await eventUseCase.createScheduledInterventionEvent(
      schedInterEventStartDate,
      schedInterEventEndDate
    );

    const {
      startDate: schedInterEventStartDate2,
      endDate: schedInterEventEndDate2,
    } = {
      startDate: "2023-01-13T12:30:00.000Z", // January 13th 11:30
      endDate: "2023-01-13T13:00:00.000Z", // January 13th 12:30
    };

    await eventUseCase.createScheduledInterventionEvent(
      schedInterEventStartDate2,
      schedInterEventEndDate2
    );

    const {
      startDate: availabilitiesRequestStartDate,
      endDate: availabilitiesRequestEndDate,
    } = {
      startDate: "2023-01-09T10:00:00.000Z", // January 1st, 10:30
      endDate: "2023-01-16T10:00:00.000Z", // January 1st, 13:30
    };
    const availabilities = await eventUseCase.getAvailabilities(
      availabilitiesRequestStartDate,
      availabilitiesRequestEndDate
    );

    expect(availabilities).toHaveLength(4);
    expect(availabilities).toContain("2023-01-13T10:30:00.000Z");
    expect(availabilities).toContain("2023-01-13T11:00:00.000Z");
    expect(availabilities).toContain("2023-01-13T13:00:00.000Z");
    expect(availabilities).toContain("2023-01-13T13:30:00.000Z");
  });
});
