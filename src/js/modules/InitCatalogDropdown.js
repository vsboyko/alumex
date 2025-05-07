export function InitCatalogDropdown(selector = '.js-catalog') {
  const catalog = document.querySelector(selector);
  if (!catalog) return;

  const btn = catalog.querySelector('.js-catalog-btn');
  const body = catalog.querySelector('.js-catalog-body');

  btn.addEventListener('click', () => {
    const isOpened = catalog.classList.toggle('is-opened');
    
    document.body.classList.toggle('is-menu-opened', isOpened);
  });

  document.addEventListener('click', (e) => {
    if (!catalog.contains(e.target)) {
      catalog.classList.remove('is-opened');
      document.body.classList.remove('is-menu-opened');
    }
  });
}