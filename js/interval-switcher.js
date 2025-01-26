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
});


/** for mobile devices, allow changing with a swipe action */
let touchstartX = 0
let touchendX = 0
const intervalOptions = {
  options: ['month day hour minute second', 'week day hour minute second'],
  get current() {
    return this.options.indexOf(document.querySelector('timer-element').getAttribute('intervals')) ?? 0;
  },
  next() { 
    return this.options[(this.current + 1) % this.options.length];
  },
  prev() {
    return this.options[Math.abs(this.current - 1) % this.options.length];
  }
}

function minDist(dist) {
  return Math.abs(touchstartX - touchendX) > dist;
}

function checkDirection() {
    if (touchendX < touchstartX && minDist(100)) {
      changeInterval(intervalOptions.prev());
    }
    if (touchendX > touchstartX && minDist(100)) {
      changeInterval(intervalOptions.next())
    } 
}

document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
});

document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    checkDirection()
});

/** save/restore the default timer interval */
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

