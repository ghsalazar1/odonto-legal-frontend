import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCasesComponent } from './list-cases.component';

describe('ListCasesComponent', () => {
  let component: ListCasesComponent;
  let fixture: ComponentFixture<ListCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
