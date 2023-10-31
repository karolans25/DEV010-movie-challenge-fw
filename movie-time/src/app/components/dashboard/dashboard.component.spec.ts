import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of } from 'rxjs';
import { Options } from 'src/app/interfaces/options';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let dataService: jasmine.SpyObj<DataService>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    dataService = jasmine.createSpyObj('DataService', ['getAllOrderOptions', 'getAllFilterOptions', 'getAllGenres', 'getFilms']);
    activatedRoute = jasmine.createSpyObj('ActivatedRoute', ['queryParams']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: DataService, useValue: dataService },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Router, useValue: router },
      ],
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize filterOptions and orderOptions when queryParams change', () => {
    const queryParams: Params = { type: '0' };
    const filterOptions = ['Now playing', 'Popular', 'Top Rated', 'Upcoming'];
    dataService.getAllFilterOptions.and.returnValue([filterOptions, []]);
    dataService.getAllOrderOptions.and.returnValue(['Popularity Descending']);

    activatedRoute.queryParams = of(queryParams);

    component.ngOnInit();

    expect(component.filterOptions).toEqual(filterOptions);
    expect(component.orderOptions).toEqual(['Popularity Descending']);
  });

  it('should call makeARequest when searchByPage is called', () => {
    component.params = { search: '', filter: '0', order: '0', genre: [] };
    const page = 1;
    spyOn(component, 'makeARequest');

    component.searchByPage(page);

    expect(component.makeARequest).toHaveBeenCalledWith(page, component.params);
    expect(component.currentPage).toBe(page);
  });

  it('should call makeARequest and set currentPage when searchByPage is called', () => {
    const page = 2;
    const mockParams = { search: 'example', filter: '1', order: '3', genre: ['4', '5'] };
  
    spyOn(component, 'makeARequest');
    
    component.params = mockParams;
    component.currentPage = 1; // Set an initial currentPage value
    
    component.searchByPage(page);
  
    // Ensure makeARequest is called with the correct arguments
    expect(component.makeARequest).toHaveBeenCalledWith(page, mockParams);
    
    // Ensure currentPage is updated to the new value
    expect(component.currentPage).toBe(page);
  });

  it('should call makeARequest when searchWithOptions is called', () => {
    const options = { search: '', filter: '0', order: '0', genre: [] };
    spyOn(component, 'makeARequest');

    component.searchWithOptions(options);

    expect(component.makeARequest).toHaveBeenCalledWith(1, options);
  });

  it('should call makeARequest with new options and page 1 when searchWithOptions is called', () => {
    const newOptions: Options = {
      search: 'newSearch',
      filter: '2',
      order: '3',
      genre: ['4', '5'],
    };
  
    spyOn(component, 'makeARequest');
  
    component.currentPage = 1; // Set an initial currentPage value
  
    component.searchWithOptions(newOptions);
  
    // Ensure makeARequest is called with the new options and page 1
    expect(component.makeARequest).toHaveBeenCalledWith(1, newOptions);
  
    // Ensure the component's params are updated with the new options
    expect(component.params).toEqual(newOptions);
  
    // Ensure currentPage is set to 1
    expect(component.currentPage).toBe(1);
  });

  it('should call dataService.getFilms and emit updateNumOfPages when makeARequest is called', () => {
    const page = 1;
    const options = { search: '', filter: '0', order: '0', genre: [] };
    const response = { pages: 5, films: [] };
    dataService.getFilms.and.returnValue(of(response));
    spyOn(component.updateNumOfPages, 'emit');

    component.makeARequest(page, options);

    expect(dataService.getFilms).toHaveBeenCalledWith(page, options, component.type);
    expect(component.numOfPages).toBe(response.pages);
    expect(component.films).toEqual(response.films);
    expect(component.updateNumOfPages.emit).toHaveBeenCalledWith(response.pages);
  });
});
