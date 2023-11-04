import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let modalService: NgbModal;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterTestingModule
      ],
      providers: [NgbModal], // Provide NgbModal service
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(NgbModal);

    // Mock the NgbModal service's open method
    spyOn(modalService, 'open');
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'MovieTime'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('MovieTime');
  });

  it('should open the modal', () => {
    const modalMock = 'modal-mock'; // You can provide a mock modal
    component.open(modalMock);
    // Verify that the NgbModal service's open method was called with the provided modal
    expect(modalService.open).toHaveBeenCalledWith(modalMock);
  });
});
