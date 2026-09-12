import { Injectable } from '@angular/core';
import { Marca } from '../models/marca.model';

@Injectable({ providedIn: 'root' })
export class MarcaService {
  private readonly marcas: Marca[] = [
    { nome: 'Bridgestone', logoUrl: '/bridgestone-Logo.png' },
    { nome: 'Doublecoin', logoUrl: '/doublecoin-logo.png' },
    { nome: 'Firemax', logoUrl: '/firemax-logo.png' },
    { nome: 'Linglong Tire', logoUrl: '/linglong-logo.png' },
    { nome: 'Michelin', logoUrl: '/michelin-logo.webp' },
    { nome: 'Pirelli', logoUrl: '/pirelli-logo.webp' },
    { nome: 'XBRI', logoUrl: '/xbri-logo.png' },
  ];

  obterMarcas(): Marca[] {
    return this.marcas;
  }
}
