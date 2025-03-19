/** for mobile devices, allow changing with a swipe action */
let touchstartX = 0
let touchendX = 0

function minDist(dist) {
  return Math.abs(touchstartX - touchendX) > dist;
}

class SwipeEvent extends Event {
  constructor(type, {direction, ...eventOptions}) {
    super(type, eventOptions);
    this.direction = direction;
  }
}

function checkDirection() {
    if (touchendX < touchstartX && minDist(100)) {
      document.dispatchEvent(new SwipeEvent('swipe', {direction: 'left'}));
    }
    if (touchendX > touchstartX && minDist(100)) {
      document.dispatchEvent(new SwipeEvent('swipe', {direction: 'right'}));
    } 
}

document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
});

document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    checkDirection()
});
