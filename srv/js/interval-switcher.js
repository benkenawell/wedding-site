/** update the timer-element with a new interval */
function changeInterval(newInterval) {
  document.querySelector('timer-element').setAttribute('intervals', newInterval);
}

/** for keyboards, allow changing with w and m keys */
window.addEventListener('keyup', (event) => {
  if(["w", "W"].includes(event.key)) {
    changeInterval('week day hour minute second')
  }
  if(["m", "M"].includes(event.key)) {
    changeInterval('month day hour minute second');
  }
  if(["d", "D"].includes(event.key)) {
    changeInterval('day hour minute second');
  }
});

/** for rotating throuhg some preset selections */
const intervalOptions = {
  options: ['month day hour minute second', 'week day hour minute second', 'day hour minute second'],
  get current() {
    return this.options.indexOf(document.querySelector('timer-element').getAttribute('intervals')) ?? 0;
  },
  next() { 
    return this.options[(this.current + 1) % this.options.length];
  },
  prev() {
    return this.options[(this.current - 1 + this.options.length) % this.options.length];
  }
}

document.addEventListener('swipe', ({direction}) => {
  if(direction === 'left') changeInterval(intervalOptions.prev());
  if(direction === 'right') changeInterval(intervalOptions.next());
});
window.addEventListener('keyup', ({code}) => {
  if(code === "ArrowLeft") changeInterval(intervalOptions.prev());
  if(code === "ArrowRight") changeInterval(intervalOptions.next());
});


/** save/restore the last set timer interval */
const LocalInterval = {
  key: 'last-interval',
  set value(newInterval) {
    localStorage.setItem(this.key, newInterval);
  },
  get value() {
    return localStorage.getItem(this.key);
  },
  get exists() {
    return !!localStorage.getItem(this.key)
  }
}

addEventListener('DOMContentLoaded', (ev) => {
  if(LocalInterval.exists) {
    changeInterval(LocalInterval.value);
  }
  new MutationObserver(([record]) => {
    if(record.type === "attributes" && record.attributeName === 'intervals') {
      LocalInterval.value = record.target.getAttribute('intervals');
    }
  }).observe(document.querySelector('timer-element'), {attributeFilter: ['intervals']});
});

