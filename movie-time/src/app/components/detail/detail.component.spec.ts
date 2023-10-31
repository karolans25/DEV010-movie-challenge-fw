import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { DetailComponent } from './detail.component';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let dataService: DataService;
  let route: ActivatedRoute;

  const mockFilmData = {
    "adult": false,
    "backdrop_path": "/4fLZUr1e65hKPPVw0R3PmKFKxj1.jpg",
    "belongs_to_collection": null,
    "budget": 200000000,
    "genres": [
      {
        "id": 16,
        "name": "Animation"
      },
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 10751,
        "name": "Family"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 10749,
        "name": "Romance"
      }
    ],
    "homepage": "https://movies.disney.com/elemental",
    "id": 976573,
    "imdb_id": "tt15789038",
    "original_language": "en",
    "original_title": "Elemental",
    "overview": "In a city where fire, water, land and air residents live together, a fiery young woman and a go-with-the-flow guy will discover something elemental: how much they have in common.",
    "popularity": 525.657,
    "poster_path": "/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg",
    "production_companies": [
      {
        "id": 2,
        "logo_path": "/wdrCwmRnLFJhEoH8GSfymY85KHT.png",
        "name": "Walt Disney Pictures",
        "origin_country": "US"
      },
      {
        "id": 3,
        "logo_path": "/1TjvGVDMYsj6JBxOAkUHpPEwLf7.png",
        "name": "Pixar",
        "origin_country": "US"
      }
    ],
    "production_countries": [
      {
        "iso_3166_1": "US",
        "name": "United States of America"
      }
    ],
    "release_date": "2023-06-14",
    "revenue": 490797988,
    "runtime": 102,
    "spoken_languages": [
      {
        "english_name": "English",
        "iso_639_1": "en",
        "name": "English"
      }
    ],
    "status": "Released",
    "tagline": "Opposites react.",
    "title": "Elemental",
    "video": false,
    "vote_average": 7.7,
    "vote_count": 2778
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailComponent],
      providers: [
        {
          provide: DataService,
          useValue: {
            getFilmById: () => of(mockFilmData),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ id: '1', type: '0' } as Params),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dataService = TestBed.inject(DataService);
    route = TestBed.inject(ActivatedRoute);
    spyOn(dataService, 'getFilmById').and.returnValue(
      of({
        backdrop_path: 'backdrop_path_url',
        poster_path: 'poster_path_url',
        title: 'Movie Title',
        release_date: '2022-01-01',
        vote_average: 7.5,
        vote_count: 1000,
        genres: [{ id: 1, name: 'Action' }],
        overview: 'Movie overview',
      })
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component properties', () => {
    fixture.detectChanges();

    expect(component.poster).toBe('url(\'https:\/\/image.tmdb.org/t/p/w342poster_path_url\')');
    expect(component.backdrop).toBe('url(\'https:\/\/image.tmdb.org/t/p/w780backdrop_path_url\')');
    expect(component.title).toBe('Movie Title');
    expect(component.year).toBe(2022);
    expect(component.vote_average).toBe(7.5);
    expect(component.vote_count).toBe(1000);
    expect(component.genres).toEqual([{ id: 1, name: 'Action' }]);
    expect(component.overview).toBe('Movie overview');
  });

  // it('should initialize the properties (well done)', () => {
  //   fixture.detectChanges();
  //   expect(component.poster).toBeDefined();
  //   expect(component.backdrop).toBeDefined();
  //   expect(component.title).toBeDefined();
  //   expect(component.year).toBeDefined();
  //   expect(component.date).toBeDefined();
  //   expect(component.vote_average).toBeDefined();
  //   expect(component.vote_count).toBeDefined();
  //   expect(component.genres).toBeDefined();
  //   expect(component.overview).toBeDefined();
  // });

  it('should call DataService with the params for a film', () => {
    const getFilmByIdSpy = spyOn(dataService, 'getFilmById').and.callThrough();
    fixture.detectChanges();
    expect(getFilmByIdSpy).toHaveBeenCalledWith(976573, '0');
  });

  it('should calculate the year from date', () => {
    const year = component.getYearOfDate('2022-01-01');
    expect(year).toBe(2022);
  });
});
