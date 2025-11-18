import { Component } from '@angular/core';
import { BlogService } from '../../../service/blog';
import { BotoneraService } from '../../../service/botonera';
import { IPage } from '../../../model/plistmodel';
import { Blog } from '../../../model/blog';
import { neighborhood } from '../../../environment/environment';

@Component({
  selector: 'app-botonera',
  imports: [],
  templateUrl: './botonera.html',
  styleUrl: './botonera.css',
})
export class Botonera {
  oPage: IPage<Blog> | null = null;
  numPage: number = 0;
  numRpp: number = 5;

  constructor(private blogService: BlogService, private oBotoneraService: BotoneraService) {}

  oBotonera: string[] = [];

  ngOnInit() {
    this.getPage();
  }

  getBotonera(numPag: number, numPages: number, neighborhood: number): string[] {
    // el usuario siempre espera que las páginas sean 1-based (la primera un uno)
    // sin embargo, el backend trabaja con páginas 0-based (la primera es la 0)
    let botonera: string[] = [];
    let paginaActual = numPag + 1;
    // Calcular el rango de páginas a mostrar
    for (let i = 1; i <= numPages; i++) {
      if (i == 1) {
        botonera.push('1');
      } else if (i == paginaActual) {
        // PRIMERA
        botonera.push(i.toString());
      } else if (i == numPages) {
        //ÚLTIMA
        botonera.push(i.toString());
      } else if (i >= paginaActual - neighborhood && i < paginaActual) {
        //VECINDAD POR ABAJO
        botonera.push(i.toString());
      } else if (i <= paginaActual + neighborhood && i > paginaActual) {
        //VECINDAD POR ARRIBA
        botonera.push(i.toString());
      } else if (i == paginaActual - neighborhood - 1) {
        //ABREVIACIÓN DE PÁGINAS POR ABAJO
        botonera.push('...');
      } else if (i == paginaActual + neighborhood + 1) {
        //ABREVIACIÓN DE PÁGINAS POR ARRIBA
        botonera.push('...');
      }
    }

    return botonera;
  }

  getPage() {
    this.blogService.getPage(this.numPage, this.numRpp).subscribe({
      next: (data: IPage<Blog>) => {
        this.oPage = data;
        // queremos que se calcule la botonera
        this.oBotonera = this.oBotoneraService.getBotonera(
          this.oPage.number,
          this.oPage.totalPages,
          neighborhood
        );
        console.log('Botonera...' + this.oBotonera);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  goToPage(numPage: number) {
    this.numPage = numPage;
    this.getPage();
    return false; // EVITA LA ACCIÓN POR DEFECTO DEL NAVEGADOR, ES DECIR, EVITA EL HREF
  }
}
