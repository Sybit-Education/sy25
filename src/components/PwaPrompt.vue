<template>
  <div v-if="showPrompt" class="install-pwa">
    <div class="install-pwa-content">
      <i class="pi pi-info-circle install-pwa-icon"></i>
      <span class="install-pwa-text"
        >Installieren Sie diese App auf Ihrem Homescreen, um schnell darauf zuzugreifen.</span
      >
      <button @click="installPWA" class="p-button p-button-outlined install-pwa-button">
        Installieren
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PwaPrompt',
  data() {
    return {
      showPrompt: false,
      deferredPrompt: null
    }
  },
  mounted() {
    window.addEventListener('beforeinstallprompt', this.onBeforeInstallPrompt)
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
        })
      }
    }
  }
}
</script>

<style scoped>
.install-pwa {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #333333; /* Dunkle Hintergrundfarbe */
  border: 1px solid #3498db; /* Farbe des Rahmens */
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.install-pwa-content {
  display: flex;
  align-items: center;
}

.install-pwa-icon {
  font-size: 2rem;
  color: #3498db; /* Farbe des Informations-Icons */
  margin-right: 10px;
}

.install-pwa-text {
  font-size: 1rem;
  color: #ffffff; /* Weiße Textfarbe */
}

.install-pwa-button {
  margin-left: auto;
  color: #3498db; /* Farbe der Installations-Schaltfläche */
}
</style>
