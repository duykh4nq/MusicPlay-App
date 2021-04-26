import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { Observable, fromEvent } from 'rxjs';
import { Music } from '../music';
import { MUSICS } from 'app/list-music';

@Component({
  selector: 'app-left-music-app',
  templateUrl: './left-music-app.component.html',
  styleUrls: ['./left-music-app.component.css']
})
export class LeftMusicAppComponent implements OnInit {
  files: Music[] = MUSICS;
  audioObj = new Audio();
  audioEvents = [
    'ended',
    'error',
    'play',
    'playing',
    'pause',
    'timeupdate',
    'canplay',
    'loadstart',
  ];

  _title = 'List Music';
  currentTime = '00:00';
  duration = '00:00';
  seek;
  seek2 = 0;
  buffer = 0;
  local = '';
  volumes = 100;
  mute = 'fa fa-volume-up';
  play_pause = 'fa fa-play';
  index = 0;
  color_redo = 'rgba(255, 255, 255, 0.1)';
  color_random = 'rgba(255, 255, 255, 0.1)';
  name_music = 'Please choose the song';
  name_singer = '';
  lyric = '';
  tmp = 0;
  searchText;
  hidden_item = '';
  visible_item = 'visible_item';
  volumeBarWidth;
  constructor() { }
  // Control music
  play() {
    this.play_pause = 'fa fa-pause';
    this.audioObj.play();
  }
  pause() {
    this.play_pause = 'fa fa-play';
    this.audioObj.pause();
  }
  control_music() {
    this.play_pause == 'fa fa-play' ? this.play() : this.pause();
  }

  // Control volume
  mute_volume() {
    this.audioObj.volume = 0;
    this.mute = 'fa fa-volume-off';
    this.volumes = 0;
  }
  unmute_volume() {
    this.audioObj.volume = 1;
    this.mute = 'fa fa-volume-up';
    this.volumes = Math.floor(this.volumeBarWidth * 100);
  }
  control_volume() {
    this.mute == 'fa fa-volume-up' ? this.mute_volume() : this.unmute_volume();
  }

  // Control music
  prev() {
    if (this.color_redo == '#FF8A65') {
      this.openFile(this.files[this.index].url, this.index);
    } else if (this.color_random == '#FF8A65') {
      this.openFile(this.files[this.random_()].url, this.random_());
    } else {
      if (this.files[this.index].id > 0) {
        this.openFile(this.files[--this.index].url, this.index);
      } else {
        this.index = this.files.length - 1;
        this.openFile(this.files[this.index].url, this.index);
      }
    }
  }
  next() {
    if (this.color_redo == '#FF8A65') {
      this.openFile(this.files[this.index].url, this.index);
    } else if (this.color_random == '#FF8A65') {
      this.openFile(this.files[this.random_()].url, this.random_());
    } else {
      if (this.files[this.index].id < this.files.length - 1) {
        this.openFile(this.files[++this.index].url, this.index);
      } else {
        this.index = 0;
        this.openFile(this.files[this.index].url, this.index);
      }
    }
  }

  // Redo music
  change_color() {
    if (this.color_redo == 'rgba(255, 255, 255, 0.1)') {
      this.color_redo = '#FF8A65';
      this.color_random = 'rgba(255, 255, 255, 0.1)';
    } else this.color_redo = 'rgba(255, 255, 255, 0.1)';
  }
  redo() {
    if (this.seek == this.audioObj.duration) {
      this.audioObj.loop;
      this.play();
    }
  }

  //Random music
  change_color2() {
    if (this.color_random == 'rgba(255, 255, 255, 0.1)') {
      this.color_random = '#FF8A65';
      this.color_redo = 'rgba(255, 255, 255, 0.1)';
    } else this.color_random = 'rgba(255, 255, 255, 0.1)';
  }
  random_() {
    this.tmp = Math.floor(Math.random() * this.files.length);
    if (this.tmp == this.index) {
      return this.random_();
    }
    return this.tmp;
  }
  random_music() {
    if (this.seek == this.audioObj.duration) {
      this.openFile(this.files[this.random_()].url, this.random_());
      this.play();
    }
  }

  // format time
  timeFormat(time, format = 'mm:ss') {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  addEvents(obj, events, handler) {
    events.forEach((element) => {
      fromEvent(obj, element).subscribe(handler);
    });
  }

  openFile(url, id) {
    this.index = id;
    this.hidden_item = 'hidden_item';
    this.visible_item = '';
    this.streamObserver(url).subscribe((event) => { });
    this.play();
    this._title = 'Lyrics';
    this.lyric = this.files[this.index].description;
  }

  streamObserver(url) {
    return new Observable((ob) => {
      // Play audio
      this.audioObj.src = url;
      this.name_music = this.files[this.index].name;
      this.name_singer = this.files[this.index].singer;

      const handler = () => {
        if (this.audioObj.currentTime > 0) {
          this.seek =
            (this.audioObj.currentTime / this.audioObj.duration) * 100;
          this.duration = this.timeFormat(this.audioObj.duration);
          this.currentTime = this.timeFormat(this.audioObj.currentTime);

          for (let i = 0; i < this.audioObj.buffered.length; i++) {
            if (this.audioObj.buffered.start(this.audioObj.buffered.length - 1 - i) < this.audioObj.currentTime) {
              this.seek2 = (100 * this.audioObj.buffered.end(this.audioObj.buffered.length - 1 - i)) / this.audioObj.duration;
            }
            break;
          }

          if (this.color_random == '#FF8A65') {
            this.random_music();
          } else if (this.color_redo == '#FF8A65') {
            this.redo();
          } else {
            if (this.audioObj.currentTime == this.audioObj.duration) {
              this.next();
            }
          }
        }
      };

      this.addEvents(this.audioObj, this.audioEvents, handler);
    });
  }
  volume_change(e) {
    const width = e.offsetX;
    this.volumeBarWidth = width / 140;
    this.audioObj.volume = this.volumeBarWidth;
    this.volumes = Math.floor(this.audioObj.volume * 100);
    if (this.audioObj.volume == 0) {
      this.mute = 'fa fa-volume-off';
    } else this.mute = 'fa fa-volume-up';
  }

  change_music(e) {
    const width = e.offsetX;
    const progressBarWidth = (width / 200) * 100;
    this.seek = progressBarWidth;
    this.audioObj.currentTime = (width * this.audioObj.duration) / 200;
  }

  ngOnInit(): void {
  }

}
