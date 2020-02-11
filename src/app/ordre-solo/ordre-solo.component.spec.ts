import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreSoloComponent } from './ordre-solo.component';

describe('OrdreSoloComponent', () => {
  let component: OrdreSoloComponent;
  let fixture: ComponentFixture<OrdreSoloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdreSoloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdreSoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
