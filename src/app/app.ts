import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FloatingActions } from './components/floating-actions/floating-actions';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, FloatingActions],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
