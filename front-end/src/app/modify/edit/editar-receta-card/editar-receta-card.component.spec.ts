import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRecetaCardComponent } from './editar-receta-card.component';

describe('EditarRecetaCardComponent', () => {
  let component: EditarRecetaCardComponent;
  let fixture: ComponentFixture<EditarRecetaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarRecetaCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarRecetaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
