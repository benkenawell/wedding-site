import { Controller } from "@hotwired/stimulus"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
dayjs.extend(relativeTime);
dayjs.extend(duration);

// Connects to data-controller="timer"
export default class extends Controller {
  static values = { date: String }
  static targets = ["month", "day", "hour", "minute", "second"]
  
  connect() {
    this.interval = setInterval(this.updateTime.bind(this), 500);
    console.log(
      'date',
      dayjs(this.dateValue).fromNow(),
      this.interval,
      this.element
    );
    this.updateTime();
  }

  disconnect() {
    console.log('disconnecting');
    clearInterval(this.interval);
  }

  updateTime () {
    const duration = dayjs.duration(dayjs(this.dateValue).diff(dayjs()));
    
    const month = duration.months();
    this.monthTarget.innerHTML = `${month} month${month === 0 ? '' : 's'}`;
    
    const day = duration.days();
    this.dayTarget.innerHTML = `${duration.format('D')} day${day === 1 ? '' : 's'}`;
    
    const hour = duration.hours();
    this.hourTarget.innerHTML = `${hour} hour${hour === 1 ? '' : 's'}`;
    
    const minute = duration.minutes();
    this.minuteTarget.innerHTML = `${minute} minute${minute === 1 ? '' : 's'}`;

    const second = duration.seconds();
    this.secondTarget.innerHTML = `${second} second${second === 1 ? '' : 's'}`;
  }
}
