import {
  animate,
  animateChild,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionService } from 'src/app/common/services/storage/session.service';
import { isLoginSelector } from 'src/app/redux/selectors/auth.selectors';
import { UrlConstants } from 'src/app/shared/constants/url-constants';
import { AboutUs } from '../../aboutUs/models/about-us.model';
import { AboutUsService } from '../../aboutUs/services/about-us.service';
import { RegistrationComponent } from '../../navigation/registration/registration.component';
import { LoginComponent } from '../login/login.component';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text?: string;
}
@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
  animations: [
    trigger('sectionAnimation', [
      transition('initial <=> focused', [query('@childAnimation', stagger(100, [animateChild()]))]),
    ]),
    trigger('childAnimation', [
      state('initial', style({ opacity: 0 })),
      state('focused', style({ opacity: 1 })),
      transition('initial <=> focused', [animate('0.5s')]),
    ]),
  ],
})
export class StartPageComponent implements OnInit, AfterViewInit {
  @ViewChildren('welcomeAnimation')
  childreny!: any;

  isAuth$: Observable<boolean>;

  safeURL: SafeResourceUrl;

  aboutUsItem: Observable<AboutUs>;

  aboutUs: AboutUs[];

  index = 0;

  animationState: string;

  constructor(
    private store: Store,
    private sanitizer: DomSanitizer,
    private aboutUsService: AboutUsService,
    public breakpointObserver: BreakpointObserver,
    private userSession: SessionService,
    private dialog: MatDialog,
    private element: ElementRef,
  ) {
    this.aboutUsService.getTeam().subscribe((aboutUs) => {
      this.aboutUs = aboutUs.reduce((acc, item) => [...acc, { ...item }], []);
    });
    this.aboutUsItem = of(this.aboutUs[this.index]);
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(UrlConstants.urlVideo);
  }

  ngAfterViewInit() {
    const options = {
      threshold: 0.5,
    };

    const fu = (entries, observer) => {
      entries.forEach((elem) => {
        if (elem.isIntersecting) {
          this.animationState = 'focused';
          observer.unobserve(elem.target);
        } else {
          this.animationState = 'initial';
        }
      });
    };

    const observer = new IntersectionObserver(fu, options);
    observer.observe(this.element.nativeElement);
    this.childreny.toArray().map((child) => observer.observe(child.nativeElement));
  }

  ngOnInit() {
    this.isAuth$ = this.store.select(isLoginSelector).pipe(map((el) => !el));
  }

  nextItem(index: number) {
    this.index = index;
    this.aboutUsItem = of(this.aboutUs[index % 8]);
  }

  modalLogin() {
    this.dialog.open(LoginComponent, { width: '480px' });
  }

  modalRegistration() {
    this.dialog.open(RegistrationComponent, { width: '480px' });
  }
}
