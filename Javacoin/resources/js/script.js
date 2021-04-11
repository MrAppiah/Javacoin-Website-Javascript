'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const initialCoords = section1.getBoundingClientRect();
const video = document.querySelector('video');
const headerTitle = document.querySelector('.header__title');
const h1 = document.getElementById('title');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const burger = document.querySelector('.burger');
const navResponse = document.querySelector('.nav__links');
const navLinks = document.querySelectorAll('.nav__item');
///////////////////////////////////////////////////////////////////////

//  Page navigation

document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();

    const id = this.getAttribute('href');

    const s1Coords = document.querySelector(id).getBoundingClientRect();

    window.scrollTo({
      left: s1Coords.left + window.pageXOffset,
      top: s1Coords.top + window.pageYOffset,
      behavior: 'smooth',
    });
  });
});

// Alternative

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   e.preventDefault();

//   if (e.target.classList.contains('nav__link')) {
//     const id = e.target.getAttribute('href');

//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//   }
// });

//  Smooth scroll

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  // Alternative

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',

  section1.scrollIntoView({ behavior: 'smooth' });
});

//  Tabbed component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Active tab
  clicked.classList.add('operations__tab--active');

  // Active content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Reveal sections

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Background video (hide)
video.onended = function () {
  video.style.display = 'none';
  headerTitle.style.display = '';
};

video.onplaying = function () {
  headerTitle.style.display = 'none';
};

//  Responsive navigation

const navSlide = () => {
  burger.addEventListener('click', () => {
    // Toggle Nav
    navResponse.classList.toggle('nav-active');

    // Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 6 + 0.4
        }s`;
      }
    });
    // Burger Animation
    burger.classList.toggle('toggle');
  });
};

navSlide();
