import EventRepository from "@/port/Event/EventRepository";
import Event from "@/domain/model/Event";

export default class EventRepositoryIM implements EventRepository {
  private readonly eventList: Event[];

  constructor() {
    this.eventList = [];
  }

  async getEvents(): Promise<Event[]> {
    return this.eventList;
  }
}
