import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJobFormComponent } from './new-job-form.component';

describe('NewJobFormComponent', () => {
  let component: NewJobFormComponent;
  let fixture: ComponentFixture<NewJobFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewJobFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewJobFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
