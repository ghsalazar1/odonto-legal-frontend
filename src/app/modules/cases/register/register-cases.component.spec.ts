import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCasesComponent } from './register-cases.component';

describe('RegisterCasesComponent', () => {
  let component: RegisterCasesComponent;
  let fixture: ComponentFixture<RegisterCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
