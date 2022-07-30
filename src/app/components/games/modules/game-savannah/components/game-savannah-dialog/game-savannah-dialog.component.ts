import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-game-savannah-dialog',
  templateUrl: './game-savannah-dialog.component.html',
  styleUrls: ['./game-savannah-dialog.component.scss'],
})
export class GameSavannahDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<GameSavannahDialogComponent>,
  ) {}

  dialogPlayClick() {
    this.dialogRef.close();
  }

  dialogRestartClick() {
    this.data.callBackTrue();
  }
}
