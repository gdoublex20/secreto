import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuciernagasComponent } from './luciernagas.component';

describe('LuciernagasComponent', () => {
  let component: LuciernagasComponent;
  let fixture: ComponentFixture<LuciernagasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LuciernagasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuciernagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
