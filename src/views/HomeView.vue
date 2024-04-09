<template>
  <ProgressOverlay v-if="showLoadingSpinner" :enabled="showLoadingSpinner" />
  <div v-else>
    <div v-for="(dateGroup, date) in groupedList" :key="date">
      <h2 class="mx-3">
        {{
          new Intl.DateTimeFormat('de-DE', {
            dateStyle: 'short'
          }).format(new Date(date))
        }}
      </h2>
      <div v-for="(timeGroup, time) in dateGroup" :key="time">
        <h3 class="mx-3">{{ time }} Uhr</h3>
        <agenda-item
          v-for="agendaItem in timeGroup"
          :key="agendaItem.date.getTime()"
          :agenda="agendaItem"
        ></agenda-item>
      </div>
      <hr class="my-5" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useLoadingStore } from '../stores/loading.store'
import { useAgendaStore } from '../stores/agenda.store'

import ProgressOverlay from '../components/ProgressOverlay.vue'

import type { Agenda } from '@/interfaces/agenda'

export default defineComponent({
  name: 'ProjectListView',
  components: { ProgressOverlay },
  data() {
    return {
      products: null,
      galleryResponsiveOptions: [
        {
          breakpoint: '1400px',
          numVisible: 4,
          numScroll: 1
        },
        {
          breakpoint: '1199px',
          numVisible: 2,
          numScroll: 1
        },
        {
          breakpoint: '767px',
          numVisible: 2,
          numScroll: 1
        },
        {
          breakpoint: '575px',
          numVisible: 1,
          numScroll: 1
        }
      ]
    }
  },
  computed: {
    ...mapState(useLoadingStore, {
      showLoadingSpinner: (store) => store.showLoadingSpinner as boolean
    }),
    ...mapState(useAgendaStore, {
      agendaList: (store) => store.agendaList as Array<Agenda>,
      groupedList: (store) =>
        store.groupedList as Record<string, Record<string, Agenda[]>> | undefined
    })
  }
})
</script>
