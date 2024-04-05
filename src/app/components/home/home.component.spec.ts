import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports:[],
      providers:[Router],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize typeFilms with two elements', () => {
    component.ngOnInit();
    expect(component.typeFilms.length).toBe(2);
  });

  it('should rediret when click on Movies\'s button to goRoute', () => {
    spyOn(router, 'navigate');
    component.goRoute(0);
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard/movies'], { queryParams: { type: '0' } });
  });

  it('should call goRoute when the Movie\'s button is clicked', () => {
    let button = fixture.debugElement.nativeElement.querySelectorAll('button'); 
    button[0].click();
    fixture.whenStable().then(() => {
      expect(component.goRoute).toHaveBeenCalledWith(0);
    });
  });

  it('should rediret when click on Series\'s button to goRoute', () => {
    spyOn(router, 'navigate');
    component.goRoute(1);
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard/series'], { queryParams: { type: '1' } });
  });

  it('should call goRoute when the Serie\'s button is clicked', () => {
    let button = fixture.debugElement.nativeElement.querySelectorAll('button'); 
    button[1].click();
    fixture.whenStable().then(() => {
      expect(component.goRoute).toHaveBeenCalledWith(1);
    });
  });

});
