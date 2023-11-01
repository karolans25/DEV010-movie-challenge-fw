import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let modalService: NgbModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [NgbModal], // Provide NgbModal service
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(NgbModal);

    // Mock the NgbModal service's open method
    spyOn(modalService, 'open');
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'movie-time'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('movie-time');
  // });

  // // it('should render title', () => {
  // //   const fixture = TestBed.createComponent(AppComponent);
  // //   fixture.detectChanges();
  // //   const compiled = fixture.nativeElement as HTMLElement;
  // //   expect(compiled.querySelector('.content span')?.textContent).toContain('movie-time app is running!');
  // // });

  // it('should open the modal', () => {
  //   const modalMock = 'modal-mock'; // You can provide a mock modal

  //   component.open(modalMock);

  //   // Verify that the NgbModal service's open method was called with the provided modal
  //   expect(modalService.open).toHaveBeenCalledWith(modalMock);
  // });
});
