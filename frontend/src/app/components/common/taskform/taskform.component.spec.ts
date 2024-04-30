import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskformComponent } from './taskform.component';

describe('TaskformComponent', () => {
  let component: TaskformComponent;
  let fixture: ComponentFixture<TaskformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskformComponent]
    });
    fixture = TestBed.createComponent(TaskformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
