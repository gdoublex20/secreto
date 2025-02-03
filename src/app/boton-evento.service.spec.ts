import { TestBed } from '@angular/core/testing';

import { BotonEventoService } from './boton-evento.service';

describe('BotonEventoService', () => {
  let service: BotonEventoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotonEventoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
