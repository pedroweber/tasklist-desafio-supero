import { TestBed } from '@angular/core/testing';

import { TasklistServiceService } from './tasklist-service.service';

describe('TasklistServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TasklistServiceService = TestBed.get(TasklistServiceService);
    expect(service).toBeTruthy();
  });
});
