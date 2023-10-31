import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { SimpleChanges } from '@angular/core';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    });
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component properties correctly', () => {
    // Test the initial state of component properties
    expect(component.numOfPages).toBeUndefined();
    expect(component.maxButtons).toBeUndefined();
    expect(component.selection).toBeUndefined();
    expect(component.pages).toEqual([]);
    expect(component.totalPages).toEqual([]);
    expect(component.indixes).toBeUndefined();
    expect(component.msg).toBeUndefined();
  });

  it('should handle ngOnChanges correctly', () => {
    // Simulate changes in the input properties
    component.numOfPages = 10; // Provide a value
    fixture.detectChanges();

    // Check that the component properties have been updated as expected
    expect(component.numOfPages).toBe(10);
    // Add more expectations for other properties if needed
  });

  it('should initialize selection, indices, totalPages, and pages on ngOnChanges', () => {
    // Arrange
    const changes: SimpleChanges = {
      numOfPages: {
        previousValue: undefined,
        currentValue: 10,
        firstChange: false,
        isFirstChange: function (): boolean {
          throw new Error('Function not implemented.');
        }
      },
    };

    // Act
    component.ngOnChanges(changes);

    // Assert
    expect(component.selection).toEqual(1);
    expect(component.indixes).toEqual(0);
    expect(component.totalPages).toEqual([]);
    // Adjust the assertion according to your actual implementation
  });
  
  it('should emit newPageEvent when a page is clicked', () => {
    const emitSpy = spyOn(component.newPageEvent, 'emit');
    const pageIndex = 3; // Simulate clicking on page 3
    component.onPageClicked(pageIndex);

    // Verify that the event has been emitted with the correct index
    expect(emitSpy).toHaveBeenCalledWith(pageIndex);
  });

  it('should emit newPageEvent when the last page is clicked for the first time', () => {
    component.selection = 1;
    const pageIndex = component.numOfPages; // Simulate clicking on last page
    expect(component.indixes).toBe(component.totalPages.length - 1);
    expect(component.pages).toBe(component.totalPages[component.indixes]);

    const emitSpy = spyOn(component.newPageEvent, 'emit');
    component.onPageClicked(pageIndex);

    // Verify that the event has been emitted with the correct index
    expect(emitSpy).toHaveBeenCalledWith(pageIndex);
  });

  it('should change the selection and emit an event when a different page is clicked', () => {
    const emitSpy = spyOn(component.newPageEvent, 'emit');
    component.selection = 2; // Set an initial selection

    const pageIndex = 3;
    component.onPageClicked(pageIndex);

    expect(component.selection).toBe(pageIndex);
    expect(emitSpy).toHaveBeenCalledWith(pageIndex);
    expect(component.msg).toBeUndefined(); // Verify that msg is not set
  });

  it('should show a toast when onPageClicked is called with the same page index', () => {
    // Simulate clicking on the same page
    const pageIndex = 1; // Simulate clicking on page 3
    component.onPageClicked(pageIndex);
    component.onPageClicked(pageIndex); // Assuming the initial selection is also 1

    // Verify that a toast message is displayed or that the `showToast` function is called
    // You can test this by spying on the `showToast` function and checking if it was called.
    // const showToastSpy = spyOn(component.showToast, 'showToast');
    expect(component.showToast).toHaveBeenCalled();
  });

  it('should show a toast and not emit an event when the same page is clicked', () => {
    const emitSpy = spyOn(component.newPageEvent, 'emit');
    component.selection = 2; // Set an initial selection

    const pageIndex = 2; // Clicking on the same page
    const showToastSpy = spyOn(component, 'showToast'); // Spy on showToast function

    component.onPageClicked(pageIndex);

    expect(component.selection).toBe(pageIndex);
    expect(emitSpy).not.toHaveBeenCalled(); // No event should be emitted
    expect(component.msg).toBe(`This is already the page ${pageIndex}`);
    expect(showToastSpy).toHaveBeenCalled(); // Verify that showToast function is called
  });

  it('should navigate to the previous page and emit an event when the current page is not the first page', () => {
    const emitSpy = spyOn(component.newPageEvent, 'emit');
    component.selection = 3; // Set an initial selection
    component.maxButtons = 12; // Set a value for maxButtons
    component.indixes = 1; // Set indixes to a non-zero value
    component.totalPages = [[1, 2, 3, 4, 5]]; // Set sample totalPages

    component.onPreviousClicked();

    expect(component.selection).toBe(2);
    expect(emitSpy).toHaveBeenCalledWith(2);
    expect(component.indixes).toBe(0);
    expect(component.msg).toBeUndefined(); // No toast should be displayed
  });

  it('should show a toast and not emit an event when the current page is the first page', () => {
    const emitSpy = spyOn(component.newPageEvent, 'emit');
    component.selection = 1; // Set an initial selection
    const showToastSpy = spyOn(component, 'showToast'); // Spy on showToast function

    component.onPreviousClicked();

    expect(component.selection).toBe(1);
    expect(emitSpy).not.toHaveBeenCalled(); // No event should be emitted
    expect(component.indixes).toBeUndefined(); // Indixes should not change
    expect(component.msg).toBe('This is already the first page');
    expect(showToastSpy).toHaveBeenCalled(); // Verify that showToast function is called
  });

  it('should navigate to the previous page and update indixes when maxButtons is reached', () => {
    const emitSpy = spyOn(component.newPageEvent, 'emit');
    component.selection = 13; // Set an initial selection
    component.maxButtons = 12; // Set a value for maxButtons
    component.indixes = 1; // Set indixes to a non-zero value
    component.totalPages = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], [25]]; // Set sample totalPages

    component.onPreviousClicked();

    expect(component.selection).toBe(12);
    expect(emitSpy).toHaveBeenCalledWith(12);
    expect(component.indixes).toBe(0); // Indixes should be updated to the first index
  });

  // it('should navigate to the next page and emit an event', () => {
  //   // Simulate moving to the next page
  //   component.selection = 2; // Set an initial selection
  //   const emitSpy = spyOn(component.newPageEvent, 'emit');
  //   component.onNextClicked();

  //   // Verify that the event has been emitted with the new page index (3) and the selection has been updated
  //   expect(emitSpy).toHaveBeenCalledWith(3);
  //   expect(component.selection).toBe(3);
  // });

  it('should navigate to the next page and emit an event when the current page is not the last page', () => {
    const emitSpy = spyOn(component.newPageEvent, 'emit');
    component.selection = 3; // Set an initial selection
    component.numOfPages = 10; // Set a value for numOfPages
    component.maxButtons = 12; // Set a value for maxButtons
    component.indixes = 0; // Set indixes to 0
    component.totalPages = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]; // Set sample totalPages

    component.onNextClicked();

    expect(component.selection).toBe(4);
    expect(emitSpy).toHaveBeenCalledWith(4);
    expect(component.indixes).toBe(0);
    expect(component.msg).toBeUndefined(); // No toast should be displayed
  });

  it('should show a toast and not emit an event when the current page is the last page', () => {
    const emitSpy = spyOn(component.newPageEvent, 'emit');
    component.selection = 10; // Set an initial selection
    component.numOfPages = 10; // Set a value for numOfPages
    const showToastSpy = spyOn(component, 'showToast'); // Spy on showToast function

    component.onNextClicked();

    expect(component.selection).toBe(10);
    expect(emitSpy).not.toHaveBeenCalled(); // No event should be emitted
    expect(component.indixes).toBeUndefined(); // Indixes should not change
    expect(component.msg).toBe('This is already the last page');
    expect(showToastSpy).toHaveBeenCalled(); // Verify that showToast function is called
  });

  it('should navigate to the next page and update indixes when maxButtons is reached', () => {
    const emitSpy = spyOn(component.newPageEvent, 'emit');
    component.selection = 12; // Set an initial selection
    component.numOfPages = 20; // Set a value for numOfPages
    component.maxButtons = 12; // Set a value for maxButtons
    component.indixes = 0; // Set indixes to 0
    component.totalPages = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18, 19, 20],
    ]; // Set sample totalPages

    component.onNextClicked();

    expect(component.selection).toBe(13);
    expect(emitSpy).toHaveBeenCalledWith(13);
    expect(component.indixes).toBe(1); // Indixes should be updated to the second index
  });

  it('should show the toast and hide it after a delay', fakeAsync(() => {
    const toastElement = { // Mock the toast element
      classList: {
        add: jasmine.createSpy('add'),
        remove: jasmine.createSpy('remove'),
      },
    };
    // component.el.nativeElement.querySelector = jasmine.createSpy('querySelector').and.returnValue(toastElement);
    component.showToast();

    expect(toastElement.classList.add).toHaveBeenCalledWith('show');
    tick(3000); // Advance the clock by 3000 milliseconds (simulate the delay)
    expect(toastElement.classList.remove).toHaveBeenCalledWith('show');
  }));

  it('should create an array of total numbers correctly', () => {
    component.numOfPages = 5;
    const totalButtons = component.createArrayOfTotalNums(); // Replace 5 with a sample number
    expect(totalButtons).toEqual([1, 2, 3, 4, 5]); // Adjust the expected array accordingly
  });

  it('should create pages button correctly', () => {
    // You can provide a sample array and check if it's correctly split into pages
    const totalButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    component.createPagesButton(totalButtons);

    // Check if totalPages property contains the expected sub-arrays
    expect(component.totalPages).toEqual([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [13, 14, 15]]); // Adjust the expected array accordingly
  });

  it('should create pages button correctly', () => {
    // You can provide a sample array and check if it's correctly split into pages
    const totalButtons = [1, 2, 3, 4, 5, 6, 7, 8];
    component.createPagesButton(totalButtons);

    // Check if totalPages property contains the expected sub-arrays
    expect(component.totalPages).toEqual([[1, 2, 3, 4, 5, 6, 7, 8]]); // Adjust the expected array accordingly
  });

});
