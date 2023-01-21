<script lang="ts">
export default {
  name: "HomeView",
};
</script>
<script setup lang="ts">
import { reactive } from "vue";
/*
 * Set the Recurring Opening Event for Company Plomberie Faure
 */

const dayMask = "YYYY-MM-DD";
const timeMask = "HH:mm";
const recurringOpeningEvent = reactive({
  id: "1",
  title: "Plomberie Faure",
  day: "2019-07-01",
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
  day: "2019-07-01",
  startTime: "10:30",
  endTime: "14:00",
  color: "red",
});
</script>

<template>
  <q-page-container class="row flex justify-center">
    <q-card class="col-10">
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
              v-model="recurringOpeningEvent.endTime"
              :mask="timeMask"
              :color="recurringOpeningEvent.color"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="justify-center">
        <q-btn color="primary" label="Save" />
      </q-card-actions>
    </q-card>
    <q-card class="col-10">
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
              v-model="scheduledInterventionEvent.endTime"
              :mask="timeMask"
              :color="scheduledInterventionEvent.color"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="justify-center">
        <q-btn color="primary" label="Save" />
      </q-card-actions>
    </q-card>
  </q-page-container>
</template>

<style lang="sass" scoped>
#logo
  width: 15%
</style>
