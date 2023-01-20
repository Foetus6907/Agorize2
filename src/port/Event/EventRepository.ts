import Event from "@/domain/model/Event";

export default interface EventRepository {
  getEvents(): Promise<Event[]>;
}
