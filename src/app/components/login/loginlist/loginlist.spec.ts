import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Loginlist } from './loginlist';

describe('Loginlist', () => {
  let component: Loginlist;
  let fixture: ComponentFixture<Loginlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loginlist],
    }).compileComponents();

    fixture = TestBed.createComponent(Loginlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
