import Event from "@/domain/model/Event";

export default interface EventRepository {
  getEvents(): Promise<Event[]>;

  addEvent(event: Event): void;
}
