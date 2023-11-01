import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent]
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set backgroundUrl to a valid URL when backgroundImg is a string', () => {
    component.backgroundImg = 'example.jpg';
    component.ngOnInit(); // Manually call ngOnInit

    expect(component.backgroundUrl).toBe("url('https://image.tmdb.org/t/p/w154" + component.backgroundImg + "')");
  });

  it('should set backgroundUrl to the "not-available" image when backgroundImg is null', () => {
    component.backgroundImg = null;
    component.ngOnInit(); // Manually call ngOnInit

    expect(component.backgroundUrl).toBe('url(../../../assets/not-available.png)');
  });
});
