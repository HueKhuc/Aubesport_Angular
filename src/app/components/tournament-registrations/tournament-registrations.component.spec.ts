import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentRegistrationsComponent } from './tournament-registrations.component';

describe('TournamentRegistrationsComponent', () => {
  let component: TournamentRegistrationsComponent;
  let fixture: ComponentFixture<TournamentRegistrationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TournamentRegistrationsComponent]
    });
    fixture = TestBed.createComponent(TournamentRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
