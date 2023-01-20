import EventRepository from "@/port/Event/EventRepository";
import Event from "@/domain/model/Event";

export default class EventUseCase {
  private eventList: Event[];
  private readonly eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
    this.eventList = [];
    this.getEvents().then((events) => {
      this.eventList = events;
    });
  }

  async getEvents(): Promise<Event[]> {
    return this.eventList;
  }

  async createRecurringOpeningEvent(
    startDate: Date,
    endDate: Date
  ): Promise<void> {
    const event = new Event(true, true, startDate, endDate);
    this.eventList.push(event);
  }

  async createScheduledInterventionEvent(
    startDate: Date,
    endDate: Date
  ): Promise<void> {
    const event = new Event(false, false, startDate, endDate);
    this.eventList.push(event);
  }

  /*get availabilities:
   *
   * Answer should be :
   * I'm available from July 8th, at 10:30, 11:00, 12:30, 13:00, and 13:30
   * I'm not available any other time !
   */
  async getAvailabilities(fromDate: Date, toDate: Date): Promise<string[]> {
    const availableSlots: string[] = [];

    return availableSlots;
  }
}
