<template>
    <div :class="{ 'loader': true, 'loader--absolute': absolute }">
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="40px"
            height="40px"
            viewBox="0 0 50 50"
            style="enable-background:new 0 0 50 50;"
            xml:space="preserve"
        >
            <path
                fill="#000"
                d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
            >
                <animateTransform
                    attributeType="xml"
                    attributeName="transform"
                    type="rotate"
                    from="0 25 25"
                    to="360 25 25"
                    dur="0.6s"
                    repeatCount="indefinite"
                />
            </path>
        </svg>
    </div>
</template>

<style lang="scss" scoped>
.loader {
    height: 100px;
    width: 100%;
    text-align: center;
    padding: 1em;
    margin: 0 auto 1em;
    display: inline-block;
    vertical-align: top;

    &--absolute {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
}

svg path {
    fill: #404ce6;
}
</style>

<script>
export default {
    name: "Loader",
    props: {
        absolute: {
            type: Boolean,
            default: false
        }
    }
};
</script>
