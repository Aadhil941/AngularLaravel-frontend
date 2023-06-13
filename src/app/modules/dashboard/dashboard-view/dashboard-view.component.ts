import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MemberCrudComponent } from '../member-crud/member-crud.component';
import { MemberService, MemberSource } from 'src/app/shared/services/member/member.service';
import { HelperService } from 'src/app/shared/services/helper/helper.service';
import { fromEvent, merge, tap } from 'rxjs';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss']
})

export class DashboardViewComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'contact_no', 'address'];
  dataSource!: MemberSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  showSpinner: boolean = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _memberService: MemberService,
    private _helperService: HelperService,
    public _dialog: MatDialog
  ) {
    this._memberService.reloadData$.subscribe(
      response => {
        if (response) {
          this.getDetails();
        }
      }
    )
  }

  ngOnInit() {
    // this.initialLoad();
    this.dataSource = new MemberSource(this._memberService);
    this.dataSource.getAllData(1, 'id', 'desc', 0, 10);
  }

  ngAfterViewInit() {
    this.dataSource.counter$
      .pipe(
        tap((count: any) => {
          if (this.paginator) {
            this.paginator.length = count;
          }
        })
      ).subscribe();

    // reset the paginator after sorting
    this.sort?.sortChange.subscribe(() => {
      if (this.paginator) {
        this.paginator.pageIndex = 0
      }
    });

    // on sort or paginate events, load a new page
    if (this.sort && this.paginator) {
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          tap(() => this.getDetails())
        )
        .subscribe();
    }

  }

  getDetails() {
    this.dataSource?.getAllData(
      1,
      this.sort.active ?? 'id',
      this.sort.direction ?? 'desc',
      this.paginator.pageIndex ?? '1',
      this.paginator.pageSize ?? '10',
    );
  }

  signOut() {
    this._router.navigate(['/sign-in']);
    this._authService.signOut();
  }

  addMember() {
    const dialogRef = this._dialog.open(MemberCrudComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  initialLoad() {
    this.showSpinner = true;

    this._memberService
      .getMembers()
      .subscribe((resp) => {
        this.dataSource = resp.data;
        this.showSpinner = false;
        this._helperService.openMessageSnackBar(resp.message, '');
      }, (error) => {
        this.showSpinner = false;
        this._helperService.openErrorSnackBar(error, '');
      });
  }

}
