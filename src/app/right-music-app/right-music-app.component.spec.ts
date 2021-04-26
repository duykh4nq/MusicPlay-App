import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightMusicAppComponent } from './right-music-app.component';

describe('RightMusicAppComponent', () => {
  let component: RightMusicAppComponent;
  let fixture: ComponentFixture<RightMusicAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightMusicAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightMusicAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
