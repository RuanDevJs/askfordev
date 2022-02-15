import Vue from 'vue';
import Router from "vue-router";

Vue.use(Router);

/*** Components ***/
import SignIn from "../views/SignIn.vue"
import Asks from "../views/Asks.vue";
import Ask from "../views/Ask.vue";

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "SignIn",
            component: SignIn
        },
        {
            path: "/asks",
            name: "Asks",
            component: Asks,
        },
        {
            path: "/asks/:id",
            name: "Ask",
            props: true,
            component: Ask
        }
    ], 
})

export default router;