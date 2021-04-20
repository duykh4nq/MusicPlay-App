import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-home-music',
  templateUrl: './home-music.component.html',
  styleUrls: ['./home-music.component.css'],
})
export class HomeMusicComponent implements OnInit {
  constructor() {}
  audioObj = new Audio();
  audioEvents = [
    'ended',
    'error',
    'play',
    'playing',
    'pause',
    'timeupdate',
    'canplay',
    'loadedmetadata',
    'loadstart',
  ];

  files = [
    {
      url:
        './assets/vincenzo_x_cha_young_i_really_like_you_vincenzo_fmv_-4766407292094388700.mp3',
      name: 'My Song 1',
    },
    {
      url:
        './assets/vincenzo_x_cha_young_i_really_like_you_vincenzo_fmv_-4766407292094388700.mp3',
      name: 'My Song 2',
    },
    {
      url:
        './assets/vincenzo_x_cha_young_i_really_like_you_vincenzo_fmv_-4766407292094388700.mp3',
      name: 'My Song 3',
    },
  ];
  currentTime = '00:00:00';
  duration = '00:00:00';
  seek = 0;

  openFile(url) {
    this.streamObserver(url).subscribe((event) => {});
  }

  play() {
    this.audioObj.play();
  }

  prev() {}
  next() {}
  pause() {
    this.audioObj.pause();
    // this.audioObj.currentTime = 0;
  }
  timeFormat(time, format = 'HH:mm:ss') {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  addEvents(obj, events, handler) {
    events.forEach((element) => {
      obj.addEventListener(element, handler);
    });
  }

  removeEvents(obj, events, handler) {}

  streamObserver(url) {
    return new Observable((ob) => {
      // Play audio
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();
      this.seek = this.audioObj.currentTime;

      const handler = (event: Event) => {
        this.duration = this.timeFormat(this.audioObj.duration);
        this.currentTime = this.timeFormat(this.audioObj.currentTime);
      };

      this.addEvents(this.audioObj, this.audioEvents, handler);
      return () => {
        // Stop Playing
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        // remove event listeners
        this.removeEvents(this.audioObj, this.audioEvents, handler);
        // reset state
        // this.resetState();
      };
    });
  }

  volume_change(ev) {
    this.audioObj.volume = ev.target.value;
  }

  change_duration(ev) {}
  ngOnInit(): void {}
}
