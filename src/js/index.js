import ToggleMobileNav from "./modules/mobileNav";

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

import AOS from 'aos';
import 'aos/dist/aos.css';

new ToggleMobileNav('.hamburger', 
                '.hamburger__icon', 
                'hamburger__icon--active', 
                '.mobile-nav', 
                'mobile-nav--open');

const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    // Navigation arrows
    navigation: {
      nextEl: '#slider-next',
      prevEl: '#slider-prew',
    },
  
  });

  AOS.init();