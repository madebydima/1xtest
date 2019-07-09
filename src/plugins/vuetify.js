import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
  iconfont: "md",
  theme: {
    primary: "#002f5e",
    secondary: "#007acc",
    accent: "#8c9eff",
    error: "#ff0000"
  }
});
