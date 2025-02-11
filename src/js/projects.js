// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';
// import styles bundle
import 'swiper/css/bundle';

 const swiper = new Swiper('.mySwiper', {
  navigation: {
     prevEl: '.projects_icon-arrow-left',
     nextEl: '.projects_icon-arrow-right',
  },
    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown:  true,
    },
    Mousewheel: {
        sensetivity: 1, 
    },
  });
  