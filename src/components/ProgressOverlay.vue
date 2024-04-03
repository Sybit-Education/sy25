<template>
    <div class="progress-overly">
        <BlockUI :blocked="blocked" fullScreen />
        <ProgressSpinner v-if="showLoadingSpinner"  aria-label="Loading ..." />
    </div>
</template>

<style lang="scss">
.progress-overlay {
    width: 100vw;
    height: 100vw;
}
</style>