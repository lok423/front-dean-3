import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';

@Component({
  selector: 'app-issue-dialog',
  templateUrl: './issue-dialog.component.html',
  styleUrls: ['./issue-dialog.component.css']
})
export class IssueDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<IssueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string, ) { }

  ngOnInit() {
  }
  close() {
    this.dialogRef.close();
  }
  save() {
      this.dialogRef.close();
    }
  }

