import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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

  it('should add a genre to the filter and update badge color', () => {
    const genre = { id: 1, name: 'Action' };
    const index = 0;
    component.colors = ['red', 'blue']; // Mock the colors array
    component.optionsForm = new FormGroup({
      genre: new FormControl([]), // Mock the form control
    });

    // Create a badge element and add it to the DOM
    const badge = document.createElement('div');
    badge.id = '1'; // This should match the genre.id
    document.body.appendChild(badge);

    component.addGenreToFilter(genre, index);

    // Assert that the genre is added to the filter and badge color is updated
    expect(component.optionsForm.get('genre')?.value).toEqual(['1']);
    expect(badge.style.backgroundColor).toBe('red'); // Assuming red is the color for index 0
  });
  
  it('should paint a genre badge grey', () => {
    const genreId = '1';

    // Create a badge element and add it to the DOM
    const badge = document.createElement('div');
    badge.id = genreId;
    document.body.appendChild(badge);

    component.paintGreyGenreBadge(genreId);

    // Assert that the badge's background color is grey
    expect(badge.style.backgroundColor).toBe('grey');
  });
});
