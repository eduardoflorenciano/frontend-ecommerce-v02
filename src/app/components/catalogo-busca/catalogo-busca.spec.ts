import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogoBusca } from './catalogo-busca';

describe('CatalogoBusca', () => {
  let component: CatalogoBusca;
  let fixture: ComponentFixture<CatalogoBusca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoBusca],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogoBusca);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
