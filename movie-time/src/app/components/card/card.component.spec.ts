import { ComponentFixture, TestBed, async } from '@angular/core/testing';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the backgroundUrl when backgroundImg is not null', () => {
    component.backgroundImg = 'example.jpg';
    fixture.detectChanges();
    expect(component.backgroundUrl).toBe("url('https://image.tmdb.org/t/p/w154example.jpg')");
  });

  it('should initialize the backgroundUrl when backgroundImg is null', () => {
    component.backgroundImg = null;
    fixture.detectChanges();
    expect(component.backgroundUrl).toBe('url(../../../assets/not-available.png)');
  });
});
