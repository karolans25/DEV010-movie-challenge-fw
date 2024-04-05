import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { DetailComponent } from './detail.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let dataService: DataService;
  let route: ActivatedRoute;
  
  const MOCK_MOVIE_DATA = {
    id: 1,
    backdrop_path: 'backdrop_path_url',
    poster_path: 'poster_path_url',
    title: 'Movie Title',
    release_date: '2022-01-01',
    vote_average: 7.5,
    vote_count: 1000,
    genres: [{ id: 1, name: 'Action' }],
    overview: 'Movie/Serie overview',
  };

  const MOCK_MOVIE_DATA_WITHOUT_POSTER_AND_BACKDROP = {
    id: 2,
    backdrop_path: null,
    poster_path: null,
    title: 'Movie Title',
    release_date: '2022-01-01',
    vote_average: 7.5,
    vote_count: 1000,
    genres: [{ id: 1, name: 'Action' }],
    overview: 'Movie/Serie overview',
  };

  const MOCK_SERIE_DATA = {
    id: 3,
    backdrop_path: 'backdrop_path_url',
    poster_path: 'poster_path_url',
    name: 'Serie Title',
    first_air_date: '2022-01-01',
    vote_average: 7.5,
    vote_count: 1000,
    genres: [{ id: 1, name: 'Action' }],
    overview: 'Movie/Serie overview',
  };

  const MOCK_SERIE_DATA_WITHOUT_POSTER_AND_BACKDROP = {
    id: 4,
    backdrop_path: null,
    poster_path: null,
    name: 'Serie Title',
    first_air_date: '2022-01-01',
    vote_average: 7.5,
    vote_count: 1000,
    genres: [{ id: 1, name: 'Action' }],
    overview: 'Movie/Serie overview',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailComponent, NavbarComponent, FooterComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [DataService],
      // providers: [
      //   {
      //     provide: DataService,
      //     useValue: {
      //       getFilmById: () => of(MOCK_MOVIE_DATA),
      //     },
      //   },
      //   {
      //     provide: ActivatedRoute,
      //     useValue: {
      //       queryParams: of({ id: 1, type: '0' } as Params),
      //     },
      //   },
      // ],
    });
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dataService = TestBed.inject(DataService);
    route = TestBed.inject(ActivatedRoute);
    // fixture.detectChanges();
  });

  // afterEach(() => {
  //   TestBed.resetTestingModule();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the properties', fakeAsync(() => {
    // dataService = TestBed.inject(DataService);
    let detailFilmSpy = spyOn(dataService, 'getFilmById').and.returnValue(of(MOCK_MOVIE_DATA));
    component.ngOnInit();
    tick();

    expect(component).toBeTruthy();
    expect(component.poster).toBeDefined();
    expect(component.backdrop).toBeDefined();
    expect(component.title).toBeDefined();
    expect(component.year).toBeDefined();
    expect(component.date).toBeDefined();
    expect(component.vote_average).toBeDefined();
    expect(component.vote_count).toBeDefined();
    expect(component.genres).toBeDefined();
    expect(component.overview).toBeDefined();
  }));

  it('should initialize the properties of a Movie', fakeAsync(() => {
    dataService = TestBed.inject(DataService);
    let detailFilmSpy = spyOn(dataService, 'getFilmById').and.returnValue(
      of(MOCK_MOVIE_DATA)
    );
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component.poster).toBe('url(\'https:\/\/image.tmdb.org/t/p/w342'+MOCK_MOVIE_DATA.poster_path+'\')');
    expect(component.backdrop).toBe('url(\'https:\/\/image.tmdb.org/t/p/w780'+MOCK_MOVIE_DATA.backdrop_path+'\')');
    expect(component.title).toBe(MOCK_MOVIE_DATA.title);
    expect(component.year).toBe(component.getYearOfDate(MOCK_MOVIE_DATA.release_date));
    expect(component.date).toBe(MOCK_MOVIE_DATA.release_date);
    expect(component.vote_average.toString()).toBe(MOCK_MOVIE_DATA.vote_average.toFixed(1));
    expect(component.vote_count).toBe(MOCK_MOVIE_DATA.vote_count);
    expect(component.genres).toEqual([{ id: 1, name: 'Action' }]);
    expect(component.overview).toBe(MOCK_MOVIE_DATA.overview);
  }));

  it('should initialize the properties of a Movie without poster and backdrop', fakeAsync(() => {
    dataService = TestBed.inject(DataService);
    let detailFilmSpy = spyOn(dataService, 'getFilmById').and.returnValue(
      of(MOCK_MOVIE_DATA_WITHOUT_POSTER_AND_BACKDROP)
    );
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component.poster).toBe("url(../../../assets/not-available.png)");
    expect(component.backdrop).toBe("url(../../../assets/not-available.png) no-repeat top");
    expect(component.title).toBe(MOCK_MOVIE_DATA_WITHOUT_POSTER_AND_BACKDROP.title);
    expect(component.year).toBe(component.getYearOfDate(MOCK_MOVIE_DATA_WITHOUT_POSTER_AND_BACKDROP.release_date));
    expect(component.date).toBe(MOCK_MOVIE_DATA_WITHOUT_POSTER_AND_BACKDROP.release_date);
    expect(component.vote_average.toString()).toBe(MOCK_MOVIE_DATA_WITHOUT_POSTER_AND_BACKDROP.vote_average.toFixed(1));
    expect(component.vote_count).toBe(MOCK_MOVIE_DATA_WITHOUT_POSTER_AND_BACKDROP.vote_count);
    expect(component.genres).toEqual([{ id: 1, name: 'Action' }]);
    expect(component.overview).toBe(MOCK_MOVIE_DATA_WITHOUT_POSTER_AND_BACKDROP.overview);
  }));

  it('should initialize the properties of a serie', fakeAsync(() => {
    dataService = TestBed.inject(DataService);
    // const detailFilmSpy = spyOn(dataService, 'getFilmById').and.returnValue(of(MOCK_SERIE_DATA));

    spyOn(dataService, 'getFilmById').and.returnValue(
      of(MOCK_SERIE_DATA)
    );
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component.poster).toBe('url(\'https:\/\/image.tmdb.org/t/p/w342' + MOCK_SERIE_DATA.poster_path + '\')');
    expect(component.backdrop).toBe('url(\'https:\/\/image.tmdb.org/t/p/w780' + MOCK_SERIE_DATA.backdrop_path + '\')');
    expect(component.title).toBe(MOCK_SERIE_DATA.name);
    expect(component.year).toBe(component.getYearOfDate(MOCK_SERIE_DATA.first_air_date));
    expect(component.date).toBe(MOCK_SERIE_DATA.first_air_date);
    expect(component.vote_average.toString()).toBe(MOCK_SERIE_DATA.vote_average.toFixed(1));
    expect(component.vote_count).toBe(MOCK_SERIE_DATA.vote_count);
    expect(component.genres).toEqual([{ id: 1, name: 'Action' }]);
    expect(component.overview).toBe(MOCK_SERIE_DATA.overview);
  }));

  it('should initialize the properties of a serie without poster and backdrop', fakeAsync(() => {
    dataService = TestBed.inject(DataService);
    let detailFilmSpy = spyOn(dataService, 'getFilmById').and.returnValue(
      of(MOCK_SERIE_DATA_WITHOUT_POSTER_AND_BACKDROP)
    );
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component.poster).toBe("url(../../../assets/not-available.png)");
    expect(component.backdrop).toBe("url(../../../assets/not-available.png) no-repeat top");
    expect(component.title).toBe(MOCK_SERIE_DATA_WITHOUT_POSTER_AND_BACKDROP.name);
    expect(component.year).toBe(component.getYearOfDate(MOCK_SERIE_DATA_WITHOUT_POSTER_AND_BACKDROP.first_air_date));
    expect(component.date).toBe(MOCK_SERIE_DATA_WITHOUT_POSTER_AND_BACKDROP.first_air_date);
    expect(component.vote_average.toString()).toBe(MOCK_SERIE_DATA_WITHOUT_POSTER_AND_BACKDROP.vote_average.toFixed(1));
    expect(component.vote_count).toBe(MOCK_SERIE_DATA_WITHOUT_POSTER_AND_BACKDROP.vote_count);
    expect(component.genres).toEqual([{ id: 1, name: 'Action' }]);
    expect(component.overview).toBe(MOCK_SERIE_DATA_WITHOUT_POSTER_AND_BACKDROP.overview);
  }));

  // it('should call DataService with the params for a film', () => {
  //   const getFilmByIdSpy = spyOn(dataService, 'getFilmById').and.callThrough();
  //   fixture.detectChanges();
  //   expect(getFilmByIdSpy).toHaveBeenCalledWith(1, '0');
  // });

  // // it('should calculate the year from date', () => {
  // //   const year = component.getYearOfDate("2023-06-14");
  // //   expect(year).toBe(2023);
  // // });
});
