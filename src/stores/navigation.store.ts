import { defineStore } from 'pinia';

export const useNavigationStore = defineStore({
  id: 'navigation',
  state: () => ({
      backButton: false,
      backUrl: '/'
  }),
  actions: {
    setBackButtonVisible(visible: boolean, url: string) {
      this.backButton = visible;
      this.backUrl = url;
    }
  }
});