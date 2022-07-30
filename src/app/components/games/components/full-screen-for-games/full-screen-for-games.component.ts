import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-screen-for-games',
  templateUrl: './full-screen-for-games.component.html',
  styleUrls: ['./full-screen-for-games.component.scss'],
})
export class FullScreenForGamesComponent implements OnInit, OnDestroy {
  elem!: Element;

  isFullScreen = false;

  constructor(@Inject(DOCUMENT) private document: any, private myElement: ElementRef) {}

  ngOnInit(): void {
    this.checkFullScreenMode();
    this.elem = this.myElement.nativeElement.parentElement;
  }

  ngOnDestroy(): void {
    if (this.isFullScreen) {
      this.document.exitFullscreen();
    }
  }

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  fullscreenmodes(): void {
    this.checkFullScreenMode();
  }

  checkFullScreenMode(): void {
    this.isFullScreen = Boolean(document.fullscreenElement);
  }

  changeFullScreenState(): void {
    if (!this.isFullScreen) {
      this.elem.requestFullscreen();
    } else {
      this.document.exitFullscreen();
    }
  }
}
