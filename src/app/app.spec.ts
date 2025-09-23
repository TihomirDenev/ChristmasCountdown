import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render Christmas countdown title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('🎄 Christmas Countdown 🎄');
  });

  it('should have countdown functionality', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.countdown().days).toBeGreaterThanOrEqual(0);
    expect(app.countdown().hours).toBeGreaterThanOrEqual(0);
    expect(app.countdown().minutes).toBeGreaterThanOrEqual(0);
    expect(app.countdown().seconds).toBeGreaterThanOrEqual(0);
    expect(app.countdown().weeks).toBeGreaterThanOrEqual(0);
  });

  it('should show snowflakes', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const snowflakes = compiled.querySelectorAll('.snowflake');
    expect(snowflakes.length).toBe(10);
  });
});
