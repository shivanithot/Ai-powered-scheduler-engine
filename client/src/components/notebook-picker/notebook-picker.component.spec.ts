import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotebookPickerComponent } from './notebook-picker.component';

describe('NotebookPickerComponent', () => {
  let component: NotebookPickerComponent;
  let fixture: ComponentFixture<NotebookPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotebookPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotebookPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
