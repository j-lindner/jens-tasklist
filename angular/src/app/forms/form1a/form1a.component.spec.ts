import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form1aComponent } from './form1a.component';

describe('Form1aComponent', () => {
  let component: Form1aComponent;
  let fixture: ComponentFixture<Form1aComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Form1aComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Form1aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
