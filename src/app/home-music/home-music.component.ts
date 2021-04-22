import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home-music',
  templateUrl: './home-music.component.html',
  styleUrls: ['./home-music.component.css'],
})
export class HomeMusicComponent implements OnInit {
  constructor() { }
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
      id: 0,
      url: './assets/song1.mp3',
      name: 'I really like you',
      singer: 'Celeina Ann Cover',
      description:
        'I really wanna stop, but I just got the taste for it ' +
        "I feel like I could fly with the boy on the moon So, honey, hold my hand, you like making me wait for it I feel like I could die walking up to the room, oh yeah Late night, watching television But how'd we get in this position? It's way too soon, I know this isn't love But I need to tell you something I really, really, really, really, really, really like you And I want you, do you want me, do you want me, too? I really, really, really, really, really, really like you And I want you, do you want me, do you want me, too? Oh, did I say too much? I'm so in my head When we're out of touch I really, really, really, really, really, really like you And I want you, do you want me, do you want me, too? It's like…",
    },
    {
      id: 1,
      url: './assets/song2.mp3',
      name: 'Nàng thơ',
      singer: 'Hoàng Dũng',
      description:
        'Em, ngày em đánh rơi nụ cười vào anh Có nghĩ sau này em sẽ chờ Và vô tư cho đi hết những ngây thơ Anh, một người hát mãi những điều mong manhLang thang tìm niềm vui đã lỡ Chẳng buồn dặn lòng quên hết những chơ vơ Ta yêu nhau bằng nỗi nhớ chưa khô trên những bức thư Ta đâu bao giờ có lỗi khi không nghe tim chối từ Chỉ tiếc rằng Em không là nàng thơ Anh cũng không còn là nhạc sĩ mộng mơ Tình này nhẹ như gió Lại trĩu lên tim ta những vết hằn Tiếng yêu này mỏng manh Giờ tan vỡ, thôi cũng đành Xếp riêng những ngày tháng hồn nhiên Trả lại... Mai, rồi em sẽ quên ngày mình khờ dại Mong em kỷ niệm này cất lại Mong em ngày buồn thôi ướt đẫm trên vai Mai, ngày em sải bước bên đời thênh thang Chỉ cần một điều em hãy nhớ Có một người từng yêu em tha thiết vô bờ Em không là nàng thơ Anh cũng không còn là nhạc sĩ mộng mơ Tình này nhẹ như gió Lại trĩu lên tim ta những vết hằn Tiếng yêu này mỏng manh Giờ tan vỡ, thôi cũng đành Xếp riêng những ngày tháng hồn nhiên Trả hết cho em',
    },
    {
      id: 2,
      url: './assets/song3.mp3',
      name: 'Sài Gòn đau lòng quá',
      singer: 'Hứa Minh Tuyền x Hoàng Duyên',
    },
    {
      id: 3,
      url: './assets/song4.mp3',
      name: 'Đom đóm',
      singer: 'Jack(J97)',
    },
    {
      id: 4,
      url: './assets/song5.mp3',
      name: 'Chỉ là không cùng nhau',
      singer: 'Tăng Phúc x Trương Thảo Nhi',
    },
    {
      id: 5,
      url: './assets/song6.mp3',
      name: 'Thuận theo ý trời',
      singer: 'Bùi Anh Tuấn',
    },
    {
      id: 6,
      url: './assets/song7.mp3',
      name: 'Tình bạn diệu kỳ',
      singer: 'Amee x  RICKY STAR x LĂNG LD',
    },
  ];

  // biến
  _title = 'List Music';
  currentTime = '00:00:00';
  duration = '00:00:00';
  seek = 0;
  local = '';
  volumes = 100;
  mute = 'fa fa-volume-up';
  play_pause = 'fas fa-play';
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

  // Play music
  openFile(url, id) {
    this.index = id;
    this.hidden_item = 'hidden_item';
    this.visible_item = '';
    this.streamObserver(url).subscribe((event) => { });
    this.play();
    this._title = 'Lyrics';
    this.lyric = this.files[this.index].description;
  }
  goBack() {
    this.hidden_item = '';
    this.visible_item = 'visible_item';
    this._title = 'List Music';
  }
  // Control music
  play() {
    this.play_pause = 'fas fa-pause';
    this.audioObj.play();
  }
  pause() {
    this.play_pause = 'fas fa-play';
    this.audioObj.pause();
  }
  control_music() {
    if (this.play_pause == 'fas fa-play') {
      this.play();
    } else {
      this.pause();
    }
  }

  // Control volume
  mute_volume() {
    this.audioObj.volume = 0;
    this.mute = 'fas fa-volume-off';
    this.volumes = 0;
  }
  unmute_volume() {
    this.audioObj.volume = 1;
    this.mute = 'fa fa-volume-up';
    this.volumes = 100;
  }
  control_volume() {
    if (this.mute == 'fa fa-volume-up') {
      this.mute_volume();
    } else if (this.mute == 'fas fa-volume-off') {
      this.unmute_volume();
    }
  }

  // Control music
  prev() {
    if (this.files[this.index].id > 0) {
      this.index = this.files[this.index].id - 1;
      this.openFile(this.files[this.index].url, this.index);
      this.play();
    } else {
      this.index = this.files.length - 1;
      this.openFile(this.files[this.index].url, this.index);
      this.play();
    }
  }
  next() {
    if (this.files[this.index].id < this.files.length - 1) {
      this.index = this.files[this.index].id + 1;
      this.openFile(this.files[this.index].url, this.index);
      this.play();
    } else {
      this.index = 0;
      this.openFile(this.files[this.index].url, this.index);
      this.play();
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
      this.openFile(this.files[this.index].url, this.index);
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
  timeFormat(time, format = 'HH:mm:ss') {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  addEvents(obj, events, handler) {
    events.forEach((element) => {
      obj.addEventListener(element, handler);
    });
  }
  removeEvents(obj, events, handler) { }

  streamObserver(url) {
    return new Observable((ob) => {
      // Play audio
      this.audioObj.src = url;
      this.name_music = this.files[this.index].name;
      this.name_singer = this.files[this.index].singer;

      const handler = (event: Event) => {
        this.seek = this.audioObj.currentTime;
        this.duration = this.timeFormat(this.audioObj.duration);
        this.currentTime = this.timeFormat(this.audioObj.currentTime);


        if (this.color_random == '#FF8A65') {
          this.random_music();
        } else if (this.color_redo == '#FF8A65') {
          this.redo();
        } else {
          if (this.seek == this.audioObj.duration) {
            this.next();
          }
        }
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
    this.volumes = Math.floor(this.audioObj.volume * 100);
    if (this.audioObj.volume == 0) {
      this.mute = 'fas fa-volume-off';
    } else this.mute = 'fa fa-volume-up';
  }

  change_music(ev) {
    this.audioObj.currentTime = ev.target.value;
  }

  ngOnInit(): void {
  }

  //test
}
