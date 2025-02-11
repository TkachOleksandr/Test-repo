document.addEventListener('DOMContentLoaded', () => {
  const headerOpenMenuBtn = document.querySelector("[data-menu-open='header']");
  const headerCloseMenuBtn = document.querySelector(
    "[data-menu-close='header']"
  );
  const headerMenuOverlay = document.querySelector("[data-menu='header']");
  const headerMenuLinks = document.querySelectorAll(
    '.js-header-mobile-menu-link'
  );

  headerOpenMenuBtn.addEventListener('click', () => {
    headerMenuOverlay.classList.add('is-open');
  });

  headerCloseMenuBtn.addEventListener('click', () => {
    headerMenuOverlay.classList.remove('is-open');
  });

  headerMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      headerMenuOverlay.classList.remove('is-open');
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const headerMenuBtn = document.querySelector('.js-header-menu-btn');
  const headerDropdownMenu = document.querySelector('.js-header-dropdown-menu');

  function toggleHeaderMenu() {
    headerDropdownMenu.classList.toggle('open');
  }

  headerMenuBtn.addEventListener('click', function (event) {
    event.stopPropagation();
    toggleHeaderMenu();
  });

  document.addEventListener('click', function (event) {
    if (
      !headerMenuBtn.contains(event.target) &&
      !headerDropdownMenu.contains(event.target)
    ) {
      headerDropdownMenu.classList.remove('open');
    }
  });

  headerDropdownMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function () {
      headerDropdownMenu.classList.remove('open');
    });
  });
  //  Scroll
  document.querySelectorAll('a[href^="#"]').forEach(headerAnchor => {
    headerAnchor.addEventListener('click', function (event) {
      event.preventDefault();

      const headerTargetId = this.getAttribute('href').substring(1);
      const headerTargetSection = document.getElementById(headerTargetId);
      if (!headerTargetSection) return;

      const headerStartPosition = window.scrollY;
      const headerTargetPosition =
        headerTargetSection.getBoundingClientRect().top + window.scrollY;
      const headerDistance = headerTargetPosition - headerStartPosition;
      const headerDuration = 500;
      let headerStartTime = null;

      function headerAnimation(headerCurrentTime) {
        if (!headerStartTime) headerStartTime = headerCurrentTime;
        const headerTimeElapsed = headerCurrentTime - headerStartTime;
        const headerProgress = Math.min(headerTimeElapsed / headerDuration, 1);

        window.scrollTo(
          0,
          headerStartPosition +
            headerDistance * headerEaseInOutQuad(headerProgress)
        );

        if (headerTimeElapsed < headerDuration) {
          requestAnimationFrame(headerAnimation);
        }
      }

      function headerEaseInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      }

      requestAnimationFrame(headerAnimation);
    });
  });
  // skroll
});
