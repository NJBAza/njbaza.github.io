'use strict';

/* ------------------------------------------------------------------ *
 * Personal portfolio — interactive behaviour
 *   1. Sidebar toggle (mobile)
 *   2. Industry cards modal (was "testimonials")
 *   3. Portfolio filter (chips + dropdown)
 *   4. Page navigation (About / Resume / Portfolio)
 * ------------------------------------------------------------------ */


// Small helper
const toggleActive = (el) => el && el.classList.toggle('active');


/* 1. Sidebar ------------------------------------------------------- */
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener('click', () => toggleActive(sidebar));
}


/* 2. Industry modal ----------------------------------------------- */
const industryItems = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');
const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const toggleModal = () => {
  toggleActive(modalContainer);
  toggleActive(overlay);
};

if (modalContainer && overlay && modalImg && modalTitle && modalText) {
  industryItems.forEach((item) => {
    item.addEventListener('click', function () {
      const avatar = this.querySelector('[data-testimonials-avatar]');
      const title = this.querySelector('[data-testimonials-title]');
      const text = this.querySelector('[data-testimonials-text]');
      if (avatar) { modalImg.src = avatar.src; modalImg.alt = avatar.alt; }
      if (title) { modalTitle.innerHTML = title.innerHTML; }
      if (text) { modalText.innerHTML = text.innerHTML; }
      toggleModal();
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', toggleModal);
  overlay.addEventListener('click', toggleModal);
}


/* 3. Portfolio filter --------------------------------------------- */
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-selecct-value]'); // HTML attribute kept as-is
const filterBtns = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

const applyFilter = (value) => {
  filterItems.forEach((item) => {
    if (value === 'all' || value === item.dataset.category) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
};

if (select) {
  select.addEventListener('click', function () { toggleActive(this); });
}

selectItems.forEach((item) => {
  item.addEventListener('click', function () {
    const value = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    toggleActive(select);
    applyFilter(value);
  });
});

let lastClickedBtn = filterBtns[0];
filterBtns.forEach((btn) => {
  btn.addEventListener('click', function () {
    const value = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    applyFilter(value);
    if (lastClickedBtn) lastClickedBtn.classList.remove('active');
    this.classList.add('active');
    lastClickedBtn = this;
  });
});


/* 4. Page navigation ---------------------------------------------- */
const navLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

navLinks.forEach((link) => {
  link.addEventListener('click', function () {
    const target = this.innerHTML.toLowerCase();

    pages.forEach((page) => {
      page.classList.toggle('active', page.dataset.page === target);
    });

    navLinks.forEach((nav) => {
      nav.classList.toggle('active', nav === this);
    });

    window.scrollTo(0, 0);
  });
});
