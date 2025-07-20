import { DateTime } from 'luxon';

class TimerElement extends HTMLElement {
  connectedCallback() {
    this.interval = setInterval(this.updateTime.bind(this), 500)
  }
  disconnectedCallback() {
    clearInterval(this.interval);
  }

  static observedAttributes = ['intervals']
  attributeChangedCallback(name, oldValue, newValue) {
    this.innerHTML = "";
    this.updateTime();
  }

  get intervalSegments() {
    const intervalTargets = this.getAttribute('intervals').split(' ') ?? ["month", "day", "hour", "minute", "second"]
    intervalTargets.push('millisecond');
    return intervalTargets;
  }

  get dateValue() {
    return this.getAttribute('date-target');
  }

  createIntervalTarget(interval) {
    const elem = document.createElement('div');
    elem.id = interval;
    return elem;
  }

  setIntervalTarget(interval, text) {
    const elem = this.querySelector(`#${interval}`) ?? this.createIntervalTarget(interval);
    elem.innerHTML = text;
    if(this.contains(elem)) return;
    else this.appendChild(elem);
  }

  updateTime() {
    const now = DateTime.now();
    const targetDate = DateTime.fromISO(this.dateValue);
    const dates = [now, targetDate].sort((a, b) => b - a);
    const duration = dates[0].diff(dates[1], this.intervalSegments);


    for(const [key, val] of Object.entries(duration.values)) {
      if(key === 'milliseconds') continue;
      this.setIntervalTarget(key, `${val} ${removeS(key)}${val === 1 ? '' : 's'}`);
    }
  }
}

function removeS(str) {
  return str.slice(0, -1);
}

if(!customElements.get('timer-element'))
  customElements.define('timer-element', TimerElement);
