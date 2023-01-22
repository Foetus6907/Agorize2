import { InjectionKey } from "vue";
import EventUseCase from "@/domain/useCase/EventUseCase";

export const EventUseCaseKey: InjectionKey<EventUseCase> =
  Symbol("EventUseCase");
