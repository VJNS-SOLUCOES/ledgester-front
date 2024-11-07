import { vMaska } from "maska"
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive("maska", vMaska);
    nuxtApp.vueApp.component('VueDatePicker', VueDatePicker);
    nuxtApp.vueApp.component('VueSlider', VueSlider);
})
