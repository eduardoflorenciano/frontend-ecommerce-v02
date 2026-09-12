import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarrosselProdutos } from './carrossel-produtos';

describe('CarrosselProdutos', () => {
  let component: CarrosselProdutos;
  let fixture: ComponentFixture<CarrosselProdutos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrosselProdutos],
    }).compileComponents();

    fixture = TestBed.createComponent(CarrosselProdutos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
