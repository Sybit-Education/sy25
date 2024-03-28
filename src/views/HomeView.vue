<template>
  <h1>SyKOM24</h1>

  <AgendaItem v-for="agenda in agendaList" :key="agenda.id" :agenda="agenda" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useLoadingStore } from '../stores/loading.store'
import { useAgendaStore } from '../stores/agenda.store'

import AgendaItem from '../components/AgendaItem.vue'
import type { Agenda } from '@/interfaces/agenda'

export default defineComponent({
  name: 'ProjectListView',
  components: { AgendaItem },
  computed: {
    ...mapState(useLoadingStore, {
      showLoadingSpinner: (store) => store.showLoadingSpinner as boolean
    }),
    ...mapState(useAgendaStore, {
      agendaList: (store) => store.agendaList as Array<Agenda>
    })
  }
})
</script>
