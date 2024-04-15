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
        <div class="flex flex-row md:flex-col">
          <agenda-item
            v-for="agendaItem in timeGroup"
            :key="agendaItem.date.getTime()"
            :agenda="agendaItem"
            class="flex-1 md:flex-0"
          />
        </div>
      </div>
      <hr class="my-5" />
    </div>
  </div>
  <Button rounded @click="scrollToActiveEvent()" class="jump-to-current-button"
    ><font-awesome-icon :icon="['far', 'clock']"
  /></Button>
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
  mounted() {
    this.updateActiveAgendaItems() // Rufe die Methode beim Laden der Komponente auf
    setInterval(this.updateActiveAgendaItems, 60000) // Alle Minute aktualisieren
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
  },
  methods: {
    updateActiveAgendaItems() {
      const currentDate = new Date()

      this.agendaList.forEach((agenda: Agenda) => {
        const endTime = new Date(agenda.date.getTime() + agenda.duration * 1000)
        if (
          currentDate.getTime() > agenda.date.getTime() &&
          currentDate.getTime() < endTime.getTime()
        ) {
          agenda.isActive = true
        } else {
          agenda.isActive = false
        }
      })
    },
    scrollToActiveEvent() {
      const eventElementList: HTMLElement[] = Array.from(
        document.getElementsByName('active-agenda')
      )

      if (eventElementList && eventElementList[0]) {
        eventElementList[0].scrollIntoView({
          behavior: 'instant',
          block: 'start',
          inline: 'nearest'
        })
        const navbarHeight = 90 /* Höhe deiner Navigationsleiste */
        window.scrollTo({ top: window.scrollY - navbarHeight, behavior: 'smooth' })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.jump-to-current-button {
  position: fixed;
  bottom: 65px;
  right: 20px;
  padding: 10px;
  z-index: 1000;
  &:hover {
    background-color: var(--primary-color);
    color: var(--surface-100);
  }
  svg {
    font-size: 2rem;
  }
}
</style>
