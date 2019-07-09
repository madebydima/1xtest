<template>
    <v-container fluid fill-height>
        <v-layout row wrap justify-center align-center>
            <v-flex xs12>
                <v-img :src="require('../assets/logo.png')" class="logo" contain height="40"></v-img>
                <hello />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Hello from "../components/Hello";

export default {
    components: {
        Hello
    }
};
</script>
<style lang="scss" scoped>
.logo {
    position: absolute;
    top: 10%;
    left: 0;
    width: 100%;
}
</style>

