import { TestBed, inject } from '@angular/core/testing';

import { FruitTreeService } from './fruit-tree.service';

describe('AlbumService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FruitTreeService]
    });
  });

  it('should ...', inject([FruitTreeService], (service: FruitTreeService) => {
    expect(service).toBeTruthy();
  }));
});
