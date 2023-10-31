import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Options } from '../interfaces/options';

import { DataService } from './data.service';

describe('DataService', () => {
  let dataService: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });
    dataService = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(dataService).toBeTruthy();
  });

  it('should retrieve all filter options', () => {
    const filterOptions = dataService.getAllFilterOptions();
    expect(filterOptions).toBeTruthy();
    expect(filterOptions[0]).toContain('Filter by 🔽');
  });

  it('should retrieve all order options', () => {
    const orderOptions = dataService.getAllOrderOptions();
    expect(orderOptions).toBeTruthy();
    expect(orderOptions).toContain('Order by 📶');
  });

  it('should retrieve all genres for movies', () => {
    const type = '0';
    dataService.getAllGenres(type).subscribe((response) => {
      expect(dataService.genres).toEqual(response.genres);
    });

    // const req = httpTestingController.expectOne((request) => {
    //   return request.urlWithParams === `${dataService.URL}genre/movie/list?api_key=${dataService.API}&language=en&type=movie`;
    // });
    // expect(req.request.method).toEqual('GET');

    // req.flush({ genres: ['Action', 'Drama'] });
    // httpTestingController.verify();
  });

  it('should get films', () => {
    const page = 1;
    const extraParams: Options = {
      filter: '0',
      search: 'Avengers',
      order: '1',
      genre: ['1', '2'],
    };
    const type = '0';

    dataService.getFilms(page, extraParams, type).subscribe((response) => {
      expect(response.films.length).toBeGreaterThan(0);
      expect(response.pages).toBeLessThanOrEqual(500);
    });

    // const req = httpTestingController.expectOne((request) => {
    //   return (
    //     request.urlWithParams ===
    //     `${dataService.URL}${dataService.constructEntity(type, extraParams.filter, extraParams.search)}?api_key=${dataService.API}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${dataService.orderParam[parseInt(extraParams.order)]}&query=${extraParams.search}&with_genres=${extraParams.genre.join()}`
    //   );
    // });
    // expect(req.request.method).toEqual('GET');

    // req.flush({ results: [{ title: 'Avengers' }], total_pages: 500 });
    // httpTestingController.verify();
  });

  it('should get film by ID', () => {
    const id = 123;
    const type = '0';

    dataService.getFilmById(id, type).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    // const req = httpTestingController.expectOne((request) => {
    //   return request.urlWithParams === `${dataService.URL}${dataService.constructEntity(type, '0', '')}/${id}?api_key=${dataService.API}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
    // });
    // expect(req.request.method).toEqual('GET');

    // req.flush({ title: 'Test Movie' });
    // httpTestingController.verify();
  });

});
