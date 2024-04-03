<template>
  <ProgressOverlay v-if="showLoadingSpinner" />
  <div v-else>
    <Timeline :value="groupedList">
      <template #opposite="slotProps">
        <p>
          {{
            new Intl.DateTimeFormat('de-DE', {
              dateStyle: 'short',
              timeStyle: 'short'
            }).format(slotProps.item.date)
          }}
        </p>
      </template>
      <template #content="slotProps">
        <agenda-item
          v-for="(item, index) in slotProps.item.agenda"
          :key="index"
          :agenda="item"
        ></agenda-item>
      </template>
    </Timeline>
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
  computed: {
    ...mapState(useLoadingStore, {
      showLoadingSpinner: (store) => store.showLoadingSpinner as boolean
    }),
    ...mapState(useAgendaStore, {
      agendaList: (store) => store.agendaList as Array<Agenda>,
      groupedList: (store) => store.groupedList
    })
  }
})
</script>
