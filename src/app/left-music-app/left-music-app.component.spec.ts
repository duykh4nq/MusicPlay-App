import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftMusicAppComponent } from './left-music-app.component';

describe('LeftMusicAppComponent', () => {
  let component: LeftMusicAppComponent;
  let fixture: ComponentFixture<LeftMusicAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftMusicAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftMusicAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
