import ContentHeader from '@/components/common/ContentHeader.vue';
import SideNavi from '@/components/common/SideNavi.vue';

export default {
  install(app) {
    app.component('ContentHeader', ContentHeader);
    app.component('SideNavi', SideNavi);
  },
};
