<template>
  <div v-if="showPrompt && !installationDeclined" class="install-pwa">
    <div class="install-pwa-content">
      <font-awesome-icon :icon="['fas', 'circle-info']" class="install-pwa-icon" />
      <span class="install-pwa-text"
        >Installiere die App auf dem Homescreen, um schnell darauf zuzugreifen.</span
      >
      <Button @click="installPWA" class="p-button install-pwa-button" severity="info">
        <font-awesome-icon :icon="['fas', 'mobile-screen-button']" />
      </Button>
      <Button @click="declineInstallation" class="p-button p-button-outlined install-pwa-button">
        <font-awesome-icon :icon="['fas', 'ban']" />
      </Button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PwaPrompt',
  data() {
    return {
      showPrompt: false,
      deferredPrompt: null,
      installationDeclined: false
    }
  },
  mounted() {
    window.addEventListener('beforeinstallprompt', this.onBeforeInstallPrompt)
    this.checkInstallationDeclined()
  },
  beforeUnmount() {
    window.removeEventListener('beforeinstallprompt', this.onBeforeInstallPrompt)
  },
  methods: {
    onBeforeInstallPrompt(event) {
      window.removeEventListener('beforeinstallprompt', this.onBeforeInstallPrompt)
      this.showPrompt = true
      event.preventDefault()
      this.deferredPrompt = event
    },
    installPWA() {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt()
        this.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('Benutzer hat die Installation akzeptiert.')
          } else {
            console.log('Benutzer hat die Installation abgelehnt.')
          }
          this.showPrompt = false
          this.deferredPrompt = null
          if (choiceResult.outcome === 'declined') {
            this.declineInstallationLocally() // Funktion zum Speichern der lokalen Ablehnung aufrufen
          }
        })
      }
    },
    declineInstallation() {
      this.showPrompt = false
      this.declineInstallationLocally() // Funktion zum Speichern der lokalen Ablehnung aufrufen
    },
    declineInstallationLocally() {
      localStorage.setItem('installationDeclined', 'true')
      this.installationDeclined = true
    },
    checkInstallationDeclined() {
      const declined = localStorage.getItem('installationDeclined')
      if (declined === 'true') {
        this.installationDeclined = true
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.install-pwa {
  position: fixed;
  bottom: 40px;
  right: auto;
  left: auto;
  background-color: var(--surface-100); /* Dunkle Hintergrundfarbe */
  border: 1px solid var(--primary-color); /* Farbe des Rahmens */
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.install-pwa-content {
  display: flex;
  align-items: center;
}

.install-pwa-icon {
  font-size: 2rem;
  margin-right: 0.5rem;
}

.install-pwa-button {
  margin-left: auto;
}
</style>
