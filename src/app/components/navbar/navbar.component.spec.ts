import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    expect(component.title).toBeDefined();
    expect(component.title).toBe('🎞 \t Movie Time \t 📽️');
  });

  it('should contain links', () => {
    expect(component.links.length).toBeGreaterThan(0);
    expect(component.links.length).toBe(3);
  });

  it('should navigate to movies route when the movies\'s link is clicked', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const link = component.links[0];
    component.goPath(link);

    expect(navigateSpy).toHaveBeenCalledWith([link.link], { queryParams: { type: 0 } });
  });

  it('should navigate to series route when the series\'s link is clicked', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const link = component.links[1];
    component.goPath(link);

    expect(navigateSpy).toHaveBeenCalledWith([link.link], { queryParams: { type: 1 } });
  });

  it('should navigat to home route and component when home\'s link is clicked', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const link = component.links[2];
    component.goPath(link);

    expect(navigateSpy).toHaveBeenCalledWith([link.link], { queryParams: {} });
  });

});
