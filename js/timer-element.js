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
    const duration = targetDate.diff(now, this.intervalSegments);
    // console.log("intervals", now, this.intervalSegments)
    // console.log("duration", duration);


    for(const [key, val] of Object.entries(duration.values)) {
      // console.log(key, val)
      if(key === 'milliseconds') continue;
      this.setIntervalTarget(key, `${val} ${removeS(key)}${val === 1 ? '' : 's'}`);
    }
    return;
    
    const month = duration.months;
    // this.monthTarget.innerHTML = `${month} month${month === 1 ? '' : 's'}`;
    this.setIntervalTarget('month', `${month} month${month === 1 ? '' : 's'}`)
    
    const day = duration.days;
    // this.dayTarget.innerHTML = `${day} day${day === 1 ? '' : 's'}`;
    this.setIntervalTarget('day', `${day} day${day === 1 ? '' : 's'}`)
    
    const hour = duration.hours;
    // this.hourTarget.innerHTML = `${hour} hour${hour === 1 ? '' : 's'}`;
    this.setIntervalTarget('hour',`${hour} hour${hour === 1 ? '' : 's'}`)
    
    const minute = duration.minutes;
    // this.minuteTarget.innerHTML = `${minute} minute${minute === 1 ? '' : 's'}`;
    this.setIntervalTarget('minute', `${minute} minute${minute === 1 ? '' : 's'}`)

    const second = duration.seconds;
    // this.secondTarget.innerHTML = `${second} second${second === 1 ? '' : 's'}`;
    this.setIntervalTarget('second', `${second} second${second === 1 ? '' : 's'}`)
  }
}

function removeS(str) {
  return str.slice(0, -1);
}

if(!customElements.get('timer-element'))
  customElements.define('timer-element', TimerElement);
