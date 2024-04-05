import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { FilmsComponent } from './films.component';
import { Movie } from '../../interfaces/movie';
import { Serie } from '../../interfaces/serie';

describe('FilmsComponent', () => {
  let component: FilmsComponent;
  let fixture: ComponentFixture<FilmsComponent>;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
      declarations: [FilmsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event when a card is clicked', () => {
    let clickedCardIndex: number | undefined;
    component.clickedCardEvent.subscribe((index) => {
      clickedCardIndex = index;
    });
    const testIndex = 1;
    component.onCardClicked(testIndex);

    expect(clickedCardIndex).toBe(testIndex);
  });

  it('should return the correct year from a valid date string', () => {
    const dateString = '2023-10-28';
    const result = component.getYearOfDate(dateString);

    expect(result).toBe(2023);
  });

  it('should handle an invalid date string gracefully', () => {
    const invalidDateString = 'invalid-date';
    const result = component.getYearOfDate(invalidDateString);

    expect(isNaN(result)).toBe(true);
  });
});
