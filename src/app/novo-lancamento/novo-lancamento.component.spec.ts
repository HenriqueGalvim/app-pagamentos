import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoLancamentoComponent } from './novo-lancamento.component';

describe('NovoLancamentoComponent', () => {
  let component: NovoLancamentoComponent;
  let fixture: ComponentFixture<NovoLancamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovoLancamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovoLancamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
