import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { OptionsComponent } from './options.component';
import { Genre } from 'src/app/interfaces/genre';
import { Options } from 'src/app/interfaces/options';

describe('OptionsComponent', () => {
  let component: OptionsComponent;
  let fixture: ComponentFixture<OptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionsComponent],
      imports: [ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(OptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit new options when onSubmit is called', () => {
    // Arrange
    const newOptions: Options = {
      search: 'Test Search',
      filter: '0',
      order: '1',
      genre: ['1', '2'],
    };

    spyOn(component.newOptionsEvent, 'emit');

    // Act
    component.optionsForm.setValue(newOptions);
    component.onSubmit();

    // Assert
    expect(component.newOptionsEvent.emit).toHaveBeenCalledWith(newOptions);
  });

  it('should reset form and emit new options when resetForm is called', () => {
    // Arrange
    spyOn(component.newOptionsEvent, 'emit');
    component.optionsForm.setValue({
      search: 'Test Search',
      filter: '0',
      order: '1',
      genre: ['1', '2'],
    });

    // Act
    component.resetForm();

    // Assert
    expect(component.optionsForm.value).toEqual({ search: '', filter: '0', order: '0', genre: [] });
    expect(component.newOptionsEvent.emit).toHaveBeenCalledWith({ search: '', filter: '0', order: '0', genre: [] });
  });

  // it('should add genre to filter and update badge color', () => {
  //   // Set up your test data
  //   const genreId = 1;
  //   const genre: Genre = { id: genreId, name: 'Action' };
  //   const index = 0;

  //   const mockStyle: Partial<CSSStyleDeclaration> = {
  //     backgroundColor: 'red',
  //     // Add other properties you need to test here
  //   };
  //   const mockElement: HTMLElement = {
  //     style: mockStyle as CSSStyleDeclaration,
  //     id: '1',
  //     // Add other properties/methods of HTMLElement as needed
  //   };
  //   // Spy on the DOM manipulation methods
  //   spyOn(document, 'getElementById').and.returnValue({ style: { backgroundColor: '' } });

  //   // Call the function
  //   component.addGenreToFilter(genre, index);

  //   // Expectations
  //   expect(component.optionsForm.get('genre')?.value).toContain(genreId);
  //   expect(document.getElementById(genreId)?.style.backgroundColor).toBe(component.colors[index].toString());
  // });

  // it('should add genre and update the form when addGenre is called', () => {
  //   // Arrange
  //   const genre: Genre = { id: 1, name: 'Action' };
  //   const index = 0;

  //   // Act
  //   component.addGenreToFilter(genre, index);

  //   // Assert
  //   expect(component.optionsForm.get('genre')?.value).toBe(1);
  //   expect(component.optionsForm.get('genre')?.value).toContain(genre.id);
  // });

  // it('should paint genre badge grey when paintGreyGenreBadge is called', () => {
  //   // Arrange
  //   const genreId = '1';

  //   // Act
  //   component.paintGreyGenreBadge(genreId);

  //   // Assert
  //   const badge = document.getElementById(genreId);
  //   expect(badge?.style.backgroundColor).toBe('grey');
  // });
});
