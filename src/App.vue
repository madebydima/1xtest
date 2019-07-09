<template>
    <v-app>
        <v-content>
            <transition name="slide-fade" mode="out-in">
                <router-view />
            </transition>
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            //
        };
    }
};
</script>
<style lang="scss">
/* ============ Transitions ============ */
.slide-fade-enter-active {
    transition: all 0.2s ease;
}

.slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
