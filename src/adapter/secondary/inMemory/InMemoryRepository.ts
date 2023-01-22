import EventRepository from "@/port/Event/EventRepository";
import Event from "@/domain/model/Event";

export default class EventRepositoryIM implements EventRepository {
  private readonly eventList: Event[];

  constructor() {
    this.eventList = [];
  }

  getEvents(): Promise<Event[]> {
    return Promise.resolve(this.eventList);
  }

  addEvent(event: Event): void {
    this.eventList.push(event);
  }
}
