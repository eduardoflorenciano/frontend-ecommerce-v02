import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Logindatails } from './logindatails';

describe('Logindatails', () => {
  let component: Logindatails;
  let fixture: ComponentFixture<Logindatails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Logindatails],
    }).compileComponents();

    fixture = TestBed.createComponent(Logindatails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
