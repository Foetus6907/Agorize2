import EventRepository from "@/port/Event/EventRepository";
import Event from "@/domain/model/Event";

export default class EventUseCase {
  private eventList: Event[] = [];
  private slotTime = 30;
  private numberRecurringWeeks = 4;
  private readonly eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
    this.getEvents().then((events) => {
      this.eventList = events;
    });
  }

  async getEvents(): Promise<Event[]> {
    return await this.eventRepository.getEvents();
  }

  async createRecurringOpeningEvent(
    startDate: string,
    endDate: string,
    id?: string,
    title?: string
  ): Promise<void> {
    const event = new Event(true, true, startDate, endDate, id, title);
    this.eventRepository.addEvent(event);
  }

  async createScheduledInterventionEvent(
    startDate: string,
    endDate: string,
    id?: string,
    title?: string
  ): Promise<void> {
    const event = new Event(false, false, startDate, endDate, id, title);
    this.eventRepository.addEvent(event);
  }

  /*
   *
   * @param startDate: string
   * @param endDate: string
   * @returns Array<string> : all matching available slots between startDate and endDate
   *
   */
  async getAvailabilities(fromDate: string, toDate: string): Promise<string[]> {
    try {
      const allSlots: Array<string> = [];
      this.eventList = await this.getEvents();
      this.eventList
        .filter((event) => event.opening && event.recurring)
        .forEach((event) => {
          allSlots.push(
            ...this.getAllTimeSlots(event.startDate, event.endDate)
          );
        });

      let availableSlots: Array<string> = allSlots;
      this.eventList
        .filter((event) => !event.opening && !event.recurring)
        .forEach((event) => {
          availableSlots = this.removeSlotsMachingInterventionEvent(
            availableSlots,
            event
          );
        });

      /*get available slot between fromDate and endDate*/
      const matchingSlot: Array<string> = availableSlots.filter((slot) => {
        return (
          new Date(slot) >= new Date(fromDate) &&
          new Date(slot) <= new Date(toDate)
        );
      });

      /*remove last slot if it is not a full slot*/
      return matchingSlot.splice(0, matchingSlot.length - 1);
    } catch (e: any) {
      throw new Error(e);
    }
  }

  /*
   * Event is a scheduled intervention event
   * */
  private removeSlotsMachingInterventionEvent(
    slots: Array<string>,
    event: Event
  ) {
    /* remove available slots between event startDate and enDate*/
    return slots.filter((slot) => {
      const slotWithTimeZone = slot;

      return !(
        new Date(slotWithTimeZone) >= new Date(event.startDate) &&
        new Date(slotWithTimeZone) < new Date(event.endDate)
      );
    });
  }

  /*
   * Get all available slots between startDate and endDate
   * Event is a recurring opening event
   * Recurring opening event is available every week
   * 'numberRecurringWeeks' is the number of weeks the event is recurring
   * 'slotTime' is the time between each slot
   * */
  private getAllTimeSlots(fromDate: string, toDate: string): Array<string> {
    const startDate: Date = new Date(fromDate);
    let endDate: Date = new Date(toDate);
    const diffEnMilliseconde = endDate.getTime() - startDate.getTime();
    const diffEnHeures = diffEnMilliseconde / (1000 * 60 * 60); // 1000 ms * 60 s * 60 min = 1h in ms

    const timeSlots: string[] = [];

    for (let o = 0; o < this.numberRecurringWeeks; o++) {
      // for each week
      endDate = new Date(endDate.setDate(endDate.getDate() + 7)); // add 7 days = 1 week
    }

    while (startDate < endDate) {
      for (let i = 0; i < this.numberRecurringWeeks; i++) {
        // for each week
        for (let i = 0; i <= diffEnHeures * 2; i++) {
          timeSlots.push(startDate.toISOString());
          startDate.setMinutes(startDate.getMinutes() + this.slotTime); // add 30 min = 1 slot
        }
        startDate.setDate(startDate.getDate() + 7);
        startDate.setHours(new Date(fromDate).getHours());
      }
    }
    return timeSlots;
  }
}
