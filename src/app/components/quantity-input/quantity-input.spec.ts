import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuantityInput } from './quantity-input';

describe('QuantityInput', () => {
  let component: QuantityInput;
  let fixture: ComponentFixture<QuantityInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantityInput],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantityInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
