import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GamesSettingsDialogComponent } from '../games-settings-dialog/games-settings-dialog.component';

@Component({
  selector: 'app-games-settings',
  templateUrl: './games-settings.component.html',
  styleUrls: ['./games-settings.component.scss'],
})
export class GamesSettingsComponent {
  constructor(public dialog: MatDialog) {}

  openDialogSettings() {
    const dialogRef = this.dialog.open(GamesSettingsDialogComponent);
    dialogRef.afterClosed().subscribe();
  }
}
