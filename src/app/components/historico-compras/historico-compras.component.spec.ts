import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoComprasComponent } from './historico-compras.component';

describe('HistoricoComprasComponent', () => {
  let component: HistoricoComprasComponent;
  let fixture: ComponentFixture<HistoricoComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoComprasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
