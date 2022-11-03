/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ComentarioCancionService } from './comentario-cancion.service';

describe('Service: ComentarioCancion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComentarioCancionService]
    });
  });

  it('should ...', inject([ComentarioCancionService], (service: ComentarioCancionService) => {
    expect(service).toBeTruthy();
  }));
});
