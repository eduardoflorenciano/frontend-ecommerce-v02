import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-floating-actions',
  imports: [],
  templateUrl: './floating-actions.html',
  styleUrl: './floating-actions.scss',
})
export class FloatingActions {

  private readonly numeroWhatsapp = '554599051549';
  private readonly mensagemWhatsapp = 'Olá! Vim do site e gostaria de tirar uma dúvida sobre um pneu.';

  protected readonly linkWhatsapp =
    `https://wa.me/${this.numeroWhatsapp}?text=${encodeURIComponent(this.mensagemWhatsapp)}`;

  
  protected readonly mostrarBotaoTopo = signal(false);

  @HostListener('window:scroll')
  protected aoRolarPagina(): void {
    this.mostrarBotaoTopo.set(window.scrollY > 300);
  }

  protected voltarAoTopo(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
