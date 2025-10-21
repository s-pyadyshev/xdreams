export function debounce(func, wait) {
  let timeout;
  return function () {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(this, arguments);
    }, wait);
  };
}

// const onType = debounce(() => {
//   // send request
// }, 500);

// const searchField = document.querySelector("#searchField");

// searchField.addEventListener("keydown", onType);

export function throttle(func, wait) {
  let waiting = false;
  return function () {
    if (waiting) {
      return;
    }

    waiting = true;
    setTimeout(() => {
      func.apply(this, arguments);
      waiting = false;
    }, wait);
  };
}

// Usage
// const onScroll = throttle(() => {}, 100);

// document.addEventListener("scroll", onScroll);

export function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
  const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

  return vertInView && horInView;
}

export function isElementCompletelyInViewport(element) {
  const rect = element.getBoundingClientRect();
  const html = document.documentElement;

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  );
}
