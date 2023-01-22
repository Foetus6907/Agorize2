<script setup lang="ts">
import { provide, ref } from "vue";
const leftDrawerOpen = ref(false);
import logo from "@/adapter/primary/assets/img/logo.png";
import EventUseCase from "@/domain/useCase/EventUseCase";
import EventRepositoryIM from "@/adapter/secondary/inMemory/InMemoryRepository";
import { EventUseCaseKey } from "@/adapter/primary/symbols";

const eventRepositoryIM = new EventRepositoryIM();
const eventUseCase = new EventUseCase(eventRepositoryIM);

provide(EventUseCaseKey, eventUseCase);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img :src="logo" alt="logo" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
