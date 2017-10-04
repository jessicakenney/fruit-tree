import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTreesComponent } from './all-trees.component';

describe('AllTreesComponent', () => {
  let component: AllTreesComponent;
  let fixture: ComponentFixture<AllTreesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTreesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
