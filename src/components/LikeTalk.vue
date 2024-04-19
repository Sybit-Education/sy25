<template>
  <span class="like-talk">      
    <Button v-if="talkLiked" @click="likeTalk(false, $event)" rounded ><font-awesome-icon :icon="['fas', 'heart']" /></Button>
    <Button v-else @click="likeTalk(true, $event)" rounded><font-awesome-icon :icon="['far', 'heart']" /></Button>
  </span>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'pinia';
import { useTalkLikeStore } from '../stores/talk-like.store';


export default defineComponent({
  name: 'LikeTalk',
  props: {
    talkId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(useTalkLikeStore, {
      isLiked: (store) => store.isLiked, 
    }),
    talkLiked(): boolean {
      return this.isLiked(this.talkId)
    }
  },
  methods: {
    likeTalk(like: boolean, event: Event) {
      if (event) {
        event.preventDefault()
      }      
      useTalkLikeStore().setLike(this.talkId, like)
    }
  }
})
</script>
<style lang="scss" scoped>
.like-talk {
  display: flex;
  align-items: center;
  z-index: 20;
}

</style>