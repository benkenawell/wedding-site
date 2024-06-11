import { Controller } from "@hotwired/stimulus"
import { DateTime } from 'luxon';

// Connects to data-controller="timer"
export default class extends Controller {
  static values = { date: String }
  static targets = ["month", "day", "hour", "minute", "second"]
  
  connect() {
    this.interval = setInterval(this.updateTime.bind(this), 500);
    this.updateTime();
  }

  disconnect() {
    clearInterval(this.interval);
  }


  updateTime () {
    const now = DateTime.now();
    const targetDate = DateTime.fromISO(this.dateValue);
    const duration = targetDate.diff(now, ['month', 'day', 'hour', 'minute', 'second', 'millisecond']);
    
    const month = duration.months;
    this.monthTarget.innerHTML = `${month} month${month === 0 ? '' : 's'}`;
    
    const day = duration.days;
    this.dayTarget.innerHTML = `${day} day${day === 1 ? '' : 's'}`;
    
    const hour = duration.hours;
    this.hourTarget.innerHTML = `${hour} hour${hour === 1 ? '' : 's'}`;
    
    const minute = duration.minutes;
    this.minuteTarget.innerHTML = `${minute} minute${minute === 1 ? '' : 's'}`;

    const second = duration.seconds;
    this.secondTarget.innerHTML = `${second} second${second === 1 ? '' : 's'}`;
  }
}
