<script lang="ts">
export default {
  name: "HomeView",
};
</script>
<script setup lang="ts">
import { inject, reactive, Ref, ref } from "vue";
import { EventUseCaseKey } from "@/adapter/primary/symbols";
const eventUseCase = inject(EventUseCaseKey);

enum EnumCardToShow {
  RecurringOpeningEvent,
  ScheduledInterventionEvent,
  AvailabilityRequest,
  ShowAvailabilities,
}
interface EventRequestForm {
  id: string;
  title: string;
  day: string;
  startTime: string;
  endTime: string;
  color: string;
}
let cardToShow = ref(EnumCardToShow.RecurringOpeningEvent);
/*
 * Set the Recurring Opening Event for Company Plomberie Faure
 */
const dayMask = "YYYY-MM-DD";
const timeMask = "HH:mm";
const recurringOpeningEvent = reactive({
  id: "1",
  title: "Plomberie Faure",
  day: "2023-01-06",
  startTime: "10:30",
  endTime: "14:00",
  color: "green",
});

/*
 * Set the Intervention Schedule for Resident Jean Dupont
 */
const scheduledInterventionEvent: EventRequestForm = reactive({
  id: "1",
  title: "Jean Dupont",
  day: "2023-01-13",
  startTime: "11:30",
  endTime: "12:30",
  color: "red",
});

function getStartDateEventRequestForm(requestForm: EventRequestForm) {
  let startDate = new Date(requestForm.day);
  startDate.setUTCHours(
    parseInt(requestForm.startTime.split(":")[0]),
    parseInt(requestForm.startTime.split(":")[1])
  );
  return startDate;
}

function getEndDateEventRequestForm(requestForm: EventRequestForm) {
  let endDate = new Date(requestForm.day);
  endDate.setUTCHours(
    parseInt(requestForm.endTime.split(":")[0]),
    parseInt(requestForm.endTime.split(":")[1])
  );
  return endDate;
}

const setRecurringOpeningEvent = () => {
  let startDate = getStartDateEventRequestForm(recurringOpeningEvent);
  let endDate = getEndDateEventRequestForm(recurringOpeningEvent);

  eventUseCase?.createRecurringOpeningEvent(
    startDate.toISOString(),
    endDate.toISOString()
  );
  cardToShow.value = EnumCardToShow.ScheduledInterventionEvent;
};

const setScheduledInterventionEvent = () => {
  let startDate = getStartDateEventRequestForm(scheduledInterventionEvent);
  let endDate = getEndDateEventRequestForm(scheduledInterventionEvent);

  eventUseCase?.createScheduledInterventionEvent(
    startDate.toISOString(),
    endDate.toISOString()
  );
  cardToShow.value = EnumCardToShow.AvailabilityRequest;
};

const availabilitiesRequestMask = "YYYY-MM-DD HH:mm";
// availabilitiesRequest: create a new request for availabilities
const availabilitiesRequest = reactive({
  id: "2",
  title: "Jon Wick",
  date: { from: "2023-01-09 11:30", to: "2023-01-16 12:30" },
  color: "blue",
});

const groupByDay = (table: string[]) => {
  return table.reduce((acc: { [key: string]: string[] }, curr: string) => {
    const date = curr.split("T")[0];
    if (!acc[date]) {
      acc[date] = [curr];
    } else {
      acc[date].push(curr);
    }
    return acc;
  }, {});
};

const availabilities: Ref<string[]> = ref([]);
const groupeByDayAvalabilities: Ref<{ [p: string]: string[] }> = ref({});
const requestAvailabilities = async () => {
  let startDate = new Date(availabilitiesRequest.date.from);
  let endDate = new Date(availabilitiesRequest.date.to);

  try {
    availabilities.value =
      (await eventUseCase?.getAvailabilities(
        startDate.toISOString(),
        endDate.toISOString()
      )) ?? [];
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Error getting availabilities", e);
  }
  groupeByDayAvalabilities.value = groupByDay(availabilities.value);
  cardToShow.value = EnumCardToShow.ShowAvailabilities;
};
</script>

<template>
  <q-page-container class="row flex justify-center">
    <q-card
      v-if="cardToShow === EnumCardToShow.RecurringOpeningEvent"
      class="col-10"
    >
      <q-card-section>
        <h5 class="q-ma-xs">
          Set your weekly recurring opening day and hours:
        </h5>
        <h6 class="q-ma-xs">
          Company: {{ recurringOpeningEvent.id }} -
          {{ recurringOpeningEvent.title }}
        </h6>
      </q-card-section>
      <q-card-section>
        <div class="q-gutter-md row items-start justify-around">
          <div class="block">
            <p class="q-ma-xs">
              Select Day:
              {{ recurringOpeningEvent.day }}
            </p>
            <q-date
              v-model="recurringOpeningEvent.day"
              :mask="dayMask"
              :color="recurringOpeningEvent.color"
            />
          </div>
          <div class="block">
            <p class="q-ma-xs">
              Select Start time:
              {{
                recurringOpeningEvent.startTime?.split(" ").reverse().shift() ??
                ""
              }}
            </p>
            <q-time
              :format24h="true"
              v-model="recurringOpeningEvent.startTime"
              :mask="timeMask"
              :color="recurringOpeningEvent.color"
            />
          </div>
          <div class="block">
            <p class="q-ma-xs">
              Select End time:
              {{
                recurringOpeningEvent.endTime?.split(" ").reverse().shift() ??
                ""
              }}
            </p>
            <q-time
              :format24h="true"
              v-model="recurringOpeningEvent.endTime"
              :mask="timeMask"
              :color="recurringOpeningEvent.color"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="justify-center">
        <q-btn color="primary" label="Next" @click="setRecurringOpeningEvent" />
      </q-card-actions>
    </q-card>
    <q-card
      v-if="cardToShow === EnumCardToShow.ScheduledInterventionEvent"
      class="col-10"
    >
      <q-card-section>
        <h5 class="q-ma-xs">
          Set you schedule Intervention with {{ recurringOpeningEvent.title }}:
        </h5>
        <h6 class="q-ma-xs">
          Resident: {{ scheduledInterventionEvent.id }} -
          {{ scheduledInterventionEvent.title }}
        </h6>
      </q-card-section>
      <q-card-section>
        <div class="q-gutter-md row items-start justify-around">
          <div class="block">
            <p class="q-ma-xs">
              Select Day:
              {{ scheduledInterventionEvent.day }}
            </p>
            <q-date
              v-model="scheduledInterventionEvent.day"
              :mask="dayMask"
              :color="scheduledInterventionEvent.color"
            />
          </div>
          <div class="block">
            <p class="q-ma-xs">
              Select Start time:
              {{
                scheduledInterventionEvent.startTime
                  ?.split(" ")
                  .reverse()
                  .shift() ?? ""
              }}
            </p>
            <q-time
              :format24h="true"
              v-model="scheduledInterventionEvent.startTime"
              :mask="timeMask"
              :color="scheduledInterventionEvent.color"
            />
          </div>
          <div class="block">
            <p class="q-ma-xs">
              Select End time:
              {{
                scheduledInterventionEvent.endTime
                  ?.split(" ")
                  .reverse()
                  .shift() ?? ""
              }}
            </p>
            <q-time
              :format24h="true"
              v-model="scheduledInterventionEvent.endTime"
              :mask="timeMask"
              :color="scheduledInterventionEvent.color"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="justify-center">
        <q-btn
          color="primary"
          label="Next"
          @click="setScheduledInterventionEvent"
        />
      </q-card-actions>
    </q-card>

    <q-card
      v-if="cardToShow === EnumCardToShow.AvailabilityRequest"
      class="col-10"
    >
      <q-card-section>
        <h5 class="q-ma-xs">
          Find availabilities {{ availabilitiesRequest.title }}:
        </h5>
        <h6 class="q-ma-xs">
          Resident: {{ availabilitiesRequest.id }} -
          {{ availabilitiesRequest.title }}
        </h6>
      </q-card-section>
      <q-card-section>
        <div class="q-gutter-md row items-start justify-around">
          <div class="block">
            <p class="q-ma-xs">
              From:
              {{ availabilitiesRequest.date.from }}
              to
              {{ availabilitiesRequest.date.to }}
            </p>
            <q-date
              v-model="availabilitiesRequest.date"
              :mask="availabilitiesRequestMask"
              :color="availabilitiesRequest.color"
              range
            />
          </div>
          <div class="block">
            <p class="q-ma-xs">
              Select Start time:
              {{
                availabilitiesRequest.date?.from.split(" ").reverse().shift() ??
                ""
              }}
            </p>
            <q-time
              :format24h="true"
              v-model="availabilitiesRequest.date.from"
              :mask="availabilitiesRequestMask"
              :color="availabilitiesRequest.color"
            />
          </div>
          <div class="block">
            <p class="q-ma-xs">
              Select End time:
              {{
                availabilitiesRequest.date?.to.split(" ").reverse().shift() ??
                ""
              }}
            </p>
            <q-time
              :format24h="true"
              v-model="availabilitiesRequest.date.to"
              :mask="availabilitiesRequestMask"
              :color="availabilitiesRequest.color"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="justify-center">
        <q-btn color="primary" label="Next" @click="requestAvailabilities" />
      </q-card-actions>
    </q-card>

    <q-card
      v-if="cardToShow === EnumCardToShow.ShowAvailabilities"
      class="col-10"
    >
      <q-card-section>
        <h5 class="q-ma-xs">
          Availabilities with contractor: {{ recurringOpeningEvent.title }}:
        </h5>
        <h6 class="q-ma-xs">
          Resident: {{ availabilitiesRequest.id }} -
          {{ availabilitiesRequest.title }}
        </h6>
        <h6 class="q-ma-xs">
          From: {{ availabilitiesRequest.date.from }} to
          {{ availabilitiesRequest.date.to }}
        </h6>
        <h6></h6>
      </q-card-section>
      <q-card-section>
        <div class="q-gutter-md row items-start justify-around">
          <div
            v-if="
              JSON.stringify(groupeByDayAvalabilities) === JSON.stringify({})
            "
          >
            No availabilities found !
          </div>
          <div
            v-else
            v-for="(day, key) in groupeByDayAvalabilities"
            :key="key"
            class="justify-center items-center q-card col-auto q-ma-sm"
          >
            <div class="q-ma-xs row flex justify-center">
              {{ new Date(day.at(0) ?? "").toLocaleDateString() }}
            </div>
            <div class="row flex justify-center">
              <q-badge
                class="q-ma-xs col-auto"
                v-for="time in day"
                :key="time"
                :label="
                  new Date(time).getUTCHours() +
                  ':' +
                  String(new Date(time).getUTCMinutes()).padStart(2, '0')
                "
                :color="recurringOpeningEvent.color"
              />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="justify-center">
        <q-btn color="primary" label="Save" @click="requestAvailabilities" />
      </q-card-actions>
    </q-card>
  </q-page-container>
</template>

<style lang="sass" scoped>
#logo
  width: 15%
</style>
