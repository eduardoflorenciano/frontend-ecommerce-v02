import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecaoProdutos } from './secao-produtos';

describe('SecaoProdutos', () => {
  let component: SecaoProdutos;
  let fixture: ComponentFixture<SecaoProdutos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecaoProdutos],
    }).compileComponents();

    fixture = TestBed.createComponent(SecaoProdutos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
