import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoRecetaComponent } from './paso-receta.component';

describe('PasoRecetaComponent', () => {
  let component: PasoRecetaComponent;
  let fixture: ComponentFixture<PasoRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasoRecetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasoRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
