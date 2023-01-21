<script lang="ts">
export default {
  name: "HomeView",
};
</script>
<script setup lang="ts">
import { reactive, ref } from "vue";
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
const scheduledInterventionEvent = reactive({
  id: "1",
  title: "Jean Dupont",
  day: "2023-01-13",
  startTime: "11:30",
  endTime: "12:30",
  color: "red",
});

enum EnumCardToShow {
  RecurringOpeningEvent,
  ScheduledInterventionEvent,
  AvailabilityRequest,
  ShowAvailabilities,
}
let cardToShow = ref(EnumCardToShow.RecurringOpeningEvent);
const setRecurringOpeningEvent = () => {
  cardToShow.value = EnumCardToShow.ScheduledInterventionEvent;
};

const setScheduledInterventionEvent = () => {
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

const requestAvailabilities = () => {
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
        <q-btn color="primary" label="Save" @click="setRecurringOpeningEvent" />
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
          label="Save"
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
        <q-btn color="primary" label="Save" @click="requestAvailabilities" />
      </q-card-actions>
    </q-card>

    <q-card
      v-if="cardToShow === EnumCardToShow.ShowAvailabilities"
      class="col-10"
    >
      <q-card-section>
        <h5 class="q-ma-xs">
          Availabilities: {{ recurringOpeningEvent.title }}:
        </h5>
        <h6 class="q-ma-xs">
          Resident: {{ availabilitiesRequest.id }} -
          {{ availabilitiesRequest.title }}
        </h6>
      </q-card-section>
      <!--      <q-card-section>
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
      </q-card-section>-->
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
