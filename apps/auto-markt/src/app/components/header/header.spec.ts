import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // RouterLink setzt href erst, wenn die Direktive aktiv ist. Ein statisches
  // routerLink-Attribut ohne Import haette hier kein href.
  it('should link the brand to home', () => {
    const brand = (fixture.nativeElement as HTMLElement).querySelector('h1 a');
    expect(brand?.getAttribute('href')).toBe('/');
  });

  it('should link the navigation to home and products', () => {
    const links = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('nav a'),
    );
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/',
      '/products',
    ]);
  });
});
