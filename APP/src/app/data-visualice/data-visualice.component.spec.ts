import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVisualiceComponent } from './data-visualice.component';

describe('DataVisualiceComponent', () => {
  let component: DataVisualiceComponent;
  let fixture: ComponentFixture<DataVisualiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataVisualiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataVisualiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
