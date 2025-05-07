export class SmoothScroll {
  constructor(selector, duration = 600) {
    this.links = document.querySelectorAll(selector);
    this.duration = duration;
    this.init();
    this.handlePageLoad();
  }

  init() {
    this.links.forEach(link => {
      link.addEventListener('click', (event) => {
        this.handleClick(event);
      });
    });
  }

  handleClick(event) {
    const targetId = event.currentTarget.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();
      this.scrollTo(target);
    }
  }

  scrollTo(target) {
    const start = window.pageYOffset;
    const end = target.offsetTop;
    const change = end - start;
    let currentTime = 0;
    const increment = 20;

    const animateScroll = () => {
      currentTime += increment;
      const val = this.easeInOutQuad(currentTime, start, change, this.duration);
      window.scrollTo(0, val);
      if (currentTime < this.duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    animateScroll();
  }

  easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  handlePageLoad() {
    const hash = window.location.hash;

    if (hash) {
      const target = document.querySelector(hash);

      if (target) {
        window.setTimeout(() => {
          this.scrollTo(target);
        }, 0);
      }
    }
  }
}