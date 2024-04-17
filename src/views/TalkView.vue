<template>
  <ProgressOverlay v-if="showLoadingSpinner" :enabled="showLoadingSpinner" />
  <div v-else>
    <div v-if="talk">
      <Card class="talk m-1 mt-3" :class="typeCssClass">
        <template #title>
          <TalkItem :talkId="talkId" class="talk__title my-2"></TalkItem>
        </template>
        <template #subtitle>
          <div class="my-3">
            <span>
              {{
                new Intl.DateTimeFormat('de-DE', {
                  timeStyle: 'short'
                }).format(agenda.date)
              }}
              <span v-if="agenda.endTime"
                >-
                {{
                  new Intl.DateTimeFormat('de-DE', {
                    timeStyle: 'short'
                  }).format(agenda.endTime)
                }}</span
              >
              Uhr
            </span>
            <span v-if="agenda.duration" class="p-text-secondary flex-0 mx-3">
              Dauer: <font-awesome-icon :icon="['fas', 'clock']" /> {{ agenda.duration / 60 }} min.
            </span>
          </div>
          <Badge v-if="talk.tag" :value="talk.tag" class="talk__tag" />
          <span v-if="agenda.room" class="my-3">
            Raum: <RoomChip :roomId="agenda.room[0]"></RoomChip>
          </span>

          <div class="talk__speaker my-3">
            <SpeakerItem :talkId="talkId" :show-title="true"></SpeakerItem>
          </div>
        </template>
        <template #content>
          <hr />
          <markdown-text class="talk__description" :text="talk.description" />
        </template>
      </Card>
      <RoomItem v-if="agenda.room" :roomId="agenda.room[0]" />
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'pinia'
import { useLoadingStore } from '../stores/loading.store'
import { useTalkStore } from '@/stores/talk.store'
import { useAgendaStore } from '../stores/agenda.store'
import { useNavigationStore} from '@/stores/navigation.store'
import { defineComponent } from 'vue'
import SpeakerItem from '@/components/SpeakerItem.vue'
import RoomChip from '@/components/RoomChip.vue'

export default defineComponent({
  name: 'TalkView',
  components: { SpeakerItem, RoomChip },

  props: {
    agendaId: {
      type: String,
      required: true
    },
    talkId: {
      type: String,
      required: true
    }
  },
  mounted() {
    useNavigationStore().setBackButtonVisible(true, '/')
  },
  computed: {
    ...mapState(useTalkStore, {
      talkById: (state) => state.getById
    }),
    ...mapState(useLoadingStore, {
      showLoadingSpinner: (store) => store.showLoadingSpinner as boolean
    }),
    ...mapState(useAgendaStore, {
      agendaById: (state) => state.getById
    }),
    talk() {
      return this.talkById(this.talkId)
    },
    agenda() {
      return this.agendaById(this.agendaId)
    },
    typeCssClass() {
      return this.talk.isPause ? 'talk--pause' : 'talk--talk'
    }
  }
})
</script>

<style lang="scss" scoped>
.talk {
  min-height: 50vh
}
.talk--talk {
  background-image: url('/img/microphone.png');
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: 50%;
}
.talk--pause {
  background-image: url('/img/coffee.png');
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: 50%;
}
.talk__description {
  line-height: 1.5rem;
}
.talk__tag {
  position: absolute;
  right: 18px;
  top: 65px;
}
</style>
