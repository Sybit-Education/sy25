import { defineStore } from 'pinia'


interface State {
  likedTalks: Array<{talkId: string, liked: boolean}>
}

export const useTalkLikeStore = defineStore('talk-like', {
  state: (): State => {
    return {
      likedTalks: [],
    }
  },
  persist: true,
    getters: {
      getLikedTalks: (state) => state.likedTalks,
      isLiked: (state) => (talkId: string) => {
        return state.likedTalks.find((talk) => talk.talkId === talkId)?.liked as boolean
      }
    },
    actions: {
      toggleLike(talkId: string): void {
        const talk = this.likedTalks.find((talk) => talk.talkId === talkId)
        if (talk) {
            talk.liked = !talk.liked
        } else {
            this.likedTalks.push({ talkId, liked: true })
        }
      },
      setLike(talkId: string, liked: boolean): void {
        const talk = this.likedTalks.find((talk) => talk.talkId === talkId)
        if (talk) {
          talk.liked = liked
        } else {
          this.likedTalks.push({ talkId, liked })
        }
      }
    }
})