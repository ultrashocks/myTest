import MainTitle from '@/components/common/MainTitle.vue';
import Location from '@/components/common/Location.vue';
import SideNavi from '@/components/common/SideNavi.vue';

export default {
  install(app) {
    app.component('MainTitle', MainTitle);
    app.component('Location', Location);
    app.component('SideNavi', SideNavi);
  },
};
