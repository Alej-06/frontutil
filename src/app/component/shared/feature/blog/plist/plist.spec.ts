import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Plist } from './plist';

describe('Plist', () => {
  let component: Plist;
  let fixture: ComponentFixture<Plist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Plist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Plist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
