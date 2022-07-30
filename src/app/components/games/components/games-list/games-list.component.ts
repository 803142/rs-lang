import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CssConstants } from 'src/app/shared/constants/css-constants';
import { GamesService } from 'src/app/common/services/games.service';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { selectSetGames } from 'src/app/redux/selectors/settings.selector';
import { LoadListGame } from 'src/app/redux/actions/listGame.actions';
import { GameModel } from '../../../../common/models/games.model';
import { GamesSettingsDialogComponent } from '../games-settings-dialog/games-settings-dialog.component';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
  providers: [GamesService],
})
export class GamesListComponent implements OnInit {
  cols = CssConstants.materialColumnsNumberMiddle;

  rowHeight = CssConstants.materialRowHeightSmall;

  games$: Observable<GameModel[]>;

  setGame: {
    groupAmount: number;
    groupLevel: number;
    hideRequired: boolean;
  };

  constructor(
    public dialog: MatDialog,
    private gamesService: GamesService,
    public breakpointObserver: BreakpointObserver,
    private store: Store<AppState>,
  ) {
    this.store.select(selectSetGames).subscribe(({ optional }) => {
      this.setGame = optional.setGame;
    });
  }

  ngOnInit(): void {
    this.games$ = this.gamesService.getGames();
    this.cssChange();
    if (this.setGame.hideRequired) {
      this.store.dispatch(
        LoadListGame({
          group: this.setGame.groupLevel - 1,
          page: 0,
          wordsPerPage: this.setGame.groupAmount,
        }),
      );
    } else {
      const dialogRef = this.dialog.open(GamesSettingsDialogComponent);
      dialogRef.afterClosed().subscribe();
    }
  }

  cssChange() {
    this.breakpointObserver
      .observe([`(max-width: ${CssConstants.screenMaxWidthAdaptive})`])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.cols = CssConstants.materialColumnsNumberSmall;
          this.rowHeight = CssConstants.materialRowHeightSmall;
        } else {
          this.cols = CssConstants.materialColumnsNumberMiddle;
          this.rowHeight = CssConstants.materialRowHeightMiddle;
        }
      });
  }
}
