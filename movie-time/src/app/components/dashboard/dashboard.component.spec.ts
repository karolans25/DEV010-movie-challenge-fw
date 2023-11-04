import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';
import { OptionsComponent } from '../options/options.component';
import { FilmsComponent } from '../films/films.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { Options } from 'src/app/interfaces/options';

const MOVIE_EXAMPLE = {
  "adult": false,
  "backdrop_path": "/628Dep6AxEtDxjZoGP78TsOxYbK.jpg",
  "genre_ids": [
      28,
      53
  ],
  "id": 575264,
  "original_language": "en",
  "original_title": "Mission: Impossible - Dead Reckoning Part One",
  "overview": "Ethan Hunt and his IMF team embark on their most dangerous mission yet: To track down a terrifying new weapon that threatens all of humanity before it falls into the wrong hands. With control of the future and the world's fate at stake and dark forces from Ethan's past closing in, a deadly race around the globe begins. Confronted by a mysterious, all-powerful enemy, Ethan must consider that nothing can matter more than his mission—not even the lives of those he cares about most.",
  "popularity": 3691.876,
  "poster_path": "/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
  "release_date": "2023-07-08",
  "title": "Mission: Impossible - Dead Reckoning Part One",
  "video": false,
  "vote_average": 7.8,
  "vote_count": 1506
};

const SERIE_EXAMPLE = {
  "backdrop_path": "/q3jHCb4dMfYF6ojikKuHd6LscxC.jpg",
  "first_air_date": "2021-06-09",
  "genre_ids": [
      18,
      10765
  ],
  "id": 84958,
  "name": "Loki",
  "origin_country": [
      "US"
  ],
  "original_language": "en",
  "original_name": "Loki",
  "overview": "After stealing the Tesseract during the events of “Avengers: Endgame,” an alternate version of Loki is brought to the mysterious Time Variance Authority, a bureaucratic organization that exists outside of time and space and monitors the timeline. They give Loki a choice: face being erased from existence due to being a “time variant” or help fix the timeline and stop a greater threat.",
  "popularity": 2782.511,
  "poster_path": "/voHUmluYmKyleFkTu3lOXQG702u.jpg",
  "vote_average": 8.2,
  "vote_count": 10333
};

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let activatedRoute: ActivatedRoute;
  // const dataService: DataService = {
  //   getAllOrderOptions: () => ['OrderOption1', 'OrderOption2'],
  //   API: '',
  //   URL: '',
  //   filterEntity: [],
  //   orderParam: [],
  //   genres: [],
  //   http: new HttpClient(): HttpClient,
  //   getAllFilterOptions: function (): [string[], string[]] {
  //     throw new Error('Function not implemented.');
  //   },
  //   getAllGenres: function (type: string): Observable<any> {
  //     throw new Error('Function not implemented.');
  //   },
  //   getFilms: function (page: number, extraParams: Options, type: string): Observable<any> {
  //     throw new Error('Function not implemented.');
  //   },
  //   getFilmById: function (id: number, type: string): Observable<any> {
  //     throw new Error('Function not implemented.');
  //   },
  //   constructParams: function (page: number, extraParams: Options): HttpParams {
  //     throw new Error('Function not implemented.');
  //   },
  //   constructEntity: function (type: string, filter: string, search: string): string {
  //     throw new Error('Function not implemented.');
  //   }
  // };

  // let dataService: jasmine.SpyObj<DataService>;
  // let activatedRoute: jasmine.SpyObj<ActivatedRoute>;
  // let router: jasmine.SpyObj<Router>;

  // const activatedRoute = {
  //   queryParams: new BehaviorSubject({ search: '', filter: '0', order: '0', genre: [], type: '0' }),
  // };
  let dataService: DataService;

  beforeEach(() => {
    // dataService = jasmine.createSpyObj('DataService', ['getAllOrderOptions', 'getAllFilterOptions', 'getAllGenres', 'getFilms']);
    // activatedRoute = jasmine.createSpyObj('ActivatedRoute', ['queryParams']);
    // router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [DashboardComponent, NavbarComponent, OptionsComponent, FilmsComponent, PaginationComponent, FooterComponent],
      providers: [
        { provide: DataService, useValue: {
            getAllOrderOptions: () => ['OrderOption1', 'OrderOption2'],
            API: '',
            URL: '',
            filterEntity: [],
            orderParam: [],
            genres: [],
            // http: new HttpClient(): HttpClient,
            getAllFilterOptions: function (): [string[], string[]] {
              throw new Error('Function not implemented.');
            },
            getAllGenres: function (type: string): Observable<any> {
              throw new Error('Function not implemented.');
            },
            getFilms: function (page: number, extraParams: Options, type: string): Observable<any> {
              throw new Error('Function not implemented.');
            },
            getFilmById: function (id: number, type: string): Observable<any> {
              throw new Error('Function not implemented.');
            },
            constructParams: function (page: number, extraParams: Options): HttpParams {
              throw new Error('Function not implemented.');
            },
            constructEntity: function (type: string, filter: string, search: string): string {
              throw new Error('Function not implemented.');
            }
          }
        },
        { provide: ActivatedRoute, useValue: { queryParams: of({ type: '0', search: '', filter: '0', order: '0' }) } },
        // { provide: ActivatedRoute, useValue: activatedRoute },
        // { provide: Router, useValue: router },
      ],
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    // fixture.detectChanges();
  });

  it('should create', fakeAsync (() => {
    expect(component).toBeTruthy();
  }));

  it('should call to makeARequest and update currentPage', () => {
    const page = 2;
    component.params = { search: '', filter: '', order: '', genre: [''], };
    spyOn(component, 'makeARequest');
    component.searchByPage(page);

    expect(component.makeARequest).toHaveBeenCalledWith(page, component.params);
    expect(component.currentPage).toBe(page);
  });

  it('should update params and call to makeARequest with page 1', () => {
    const options = { search: '', filter: '', order: '', genre: [''], };
    spyOn(component, 'makeARequest');
    component.searchWithOptions(options);

    expect(component.params).toEqual(options);
    expect(component.makeARequest).toHaveBeenCalledWith(1, options);
  });

  // it('debería actualizar params y llamar a makeARequest con page 1', () => {
  //   const options = { search: '', filter: '', order: '', genre: [''], };
  //   spyOn(component, 'makeARequest'); // Espiamos el método makeARequest
  //   component.searchWithOptions(options); // Llamamos a la función a probar

  //   expect(component.params).toEqual(options); // Comprobamos si params se actualiza con las opciones
  //   expect(component.makeARequest).toHaveBeenCalledWith(1, options); // Comprobamos si makeARequest se llama con page 1 y las opciones
  // });

  it('should open a new tab with the correct URL for a Movie', () => {
    const index = 0;
    component.type = '0'; // Set the component type
    component.films = [MOVIE_EXAMPLE];

    const windowOpenSpy = spyOn(window, 'open');
    component.showDetailFilm(index);

    expect(windowOpenSpy).toHaveBeenCalledWith(
      'detail/movie?type=0&id='+MOVIE_EXAMPLE.id,
      '_blank'
    );
  });

  it('should open a new tab with the correct URL for a Serie', () => {
    const index = 0;
    component.type = '1';
    component.films = [SERIE_EXAMPLE];

    const windowOpenSpy = spyOn(window, 'open');
    component.showDetailFilm(index);

    expect(windowOpenSpy).toHaveBeenCalledWith(
      'detail/serie?type=1&id='+SERIE_EXAMPLE.id,
      '_blank'
    );
  });

  it('should initialize properties on ngOnInit', () => {
    // const filterOptions = [['Option1'], ['Option2']];
    const genres = [{ id: 1, name: 'Genre1' }, { id: 2, name: 'Genre2' }];
  
    const getAllOrderOptionsSpy = spyOn(dataService, 'getAllOrderOptions').and.returnValue(['OrderOption1', 'OrderOption2']);
    const getAllFilterOptionsSpy = spyOn(dataService, 'getAllFilterOptions').and.returnValue([['Option1'], ['Option2']]);
    const getAllGenresSpy = spyOn(dataService, 'getAllGenres').and.returnValue(of({ genres }));
  
    component.ngOnInit();
  
    expect(component.orderOptions).toEqual(['OrderOption1', 'OrderOption2']);
    expect(component.filterOptions).toEqual(['Option1'], ['Option2']);
    expect(component.genres).toEqual(genres);
    expect(component.params).toEqual({ search: '', filter: '0', order: '0', genre: [] });
  });
  
  // it('should initialize filterOptions and orderOptions when queryParams change', () => {
  //   // const queryParams: Params = { type: '0' };
  //   const filterOptions = ['Now playing', 'Popular', 'Top Rated', 'Upcoming'];
  //   dataService.getAllFilterOptions.and.returnValue([filterOptions, []]);
  //   dataService.getAllOrderOptions.and.returnValue(['Popularity Descending']);

  //   // activatedRoute.queryParams = of(queryParams);

  //   component.ngOnInit();

  //   expect(component.filterOptions).toEqual(filterOptions);
  //   expect(component.orderOptions).toEqual(['Popularity Descending']);
  // });

  // it('should call makeARequest when searchByPage is called', () => {
  //   activatedRoute.queryParams.next({ search: '', filter: '0', order: '0', genre: [], type: '0' });
  //   // component.params = { search: '', filter: '0', order: '0', genre: [] };
  //   const page = 1;
  //   spyOn(component, 'makeARequest');

  //   component.searchByPage(page);

  //   expect(component.makeARequest).toHaveBeenCalledWith(page, component.params);
  //   expect(component.currentPage).toBe(page);
  // });

  // it('should call makeARequest and set currentPage when searchByPage is called', () => {
  //   const page = 2;
  //   const mockParams = { search: 'example', filter: '1', order: '3', genre: ['4', '5'] };
  
  //   spyOn(component, 'makeARequest');
    
  //   component.params = mockParams;
  //   component.currentPage = 1; // Set an initial currentPage value
    
  //   component.searchByPage(page);
  
  //   // Ensure makeARequest is called with the correct arguments
  //   expect(component.makeARequest).toHaveBeenCalledWith(page, mockParams);
    
  //   // Ensure currentPage is updated to the new value
  //   expect(component.currentPage).toBe(page);
  // });

  // it('should call makeARequest when searchWithOptions is called', () => {
  //   const options = { search: '', filter: '0', order: '0', genre: [] };
  //   spyOn(component, 'makeARequest');

  //   component.searchWithOptions(options);

  //   expect(component.makeARequest).toHaveBeenCalledWith(1, options);
  // });

  // it('should call makeARequest with new options and page 1 when searchWithOptions is called', () => {
  //   const newOptions: Options = {
  //     search: 'newSearch',
  //     filter: '2',
  //     order: '3',
  //     genre: ['4', '5'],
  //   };
  
  //   spyOn(component, 'makeARequest');
  
  //   component.currentPage = 1; // Set an initial currentPage value
  
  //   component.searchWithOptions(newOptions);
  
  //   // Ensure makeARequest is called with the new options and page 1
  //   expect(component.makeARequest).toHaveBeenCalledWith(1, newOptions);
  
  //   // Ensure the component's params are updated with the new options
  //   expect(component.params).toEqual(newOptions);
  
  //   // Ensure currentPage is set to 1
  //   expect(component.currentPage).toBe(1);
  // });

  // it('should call dataService.getFilms and emit updateNumOfPages when makeARequest is called', () => {
  //   const page = 1;
  //   const options = { search: '', filter: '0', order: '0', genre: [] };
  //   const response = { pages: 5, films: [] };
  //   dataService.getFilms.and.returnValue(of(response));
  //   spyOn(component.updateNumOfPages, 'emit');

  //   component.makeARequest(page, options);

  //   expect(dataService.getFilms).toHaveBeenCalledWith(page, options, component.type);
  //   expect(component.numOfPages).toBe(response.pages);
  //   expect(component.films).toEqual(response.films);
  //   expect(component.updateNumOfPages.emit).toHaveBeenCalledWith(response.pages);
  // });
});
