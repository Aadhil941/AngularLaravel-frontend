import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { HelperService } from 'src/app/shared/services/helper/helper.service';
import { MemberService } from 'src/app/shared/services/member/member.service';
import { DashboardViewComponent } from '../dashboard-view/dashboard-view.component';

@Component({
  selector: 'app-member-crud',
  templateUrl: './member-crud.component.html',
  styleUrls: ['./member-crud.component.scss']
})
export class MemberCrudComponent implements OnInit {
  containerClass: string = '';
  showSpinner: boolean = false;
  memberForm!: FormGroup;
  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required' },
      { type: 'pattern', message: 'Enter a valid name' },
      { type: 'maxlength', message: 'Name cannot be more than 25 characters long' },
    ],
    'contact_no': [
      { type: 'required', message: 'Primary Contact Number is required' },
      { type: 'maxlength', message: 'Primary Contact Number cannot be more than 12 characters long' },
      { type: 'pattern', message: 'Enter a valid Primary Contact Number ' },
    ],
    'address': [
      { type: 'maxlength', message: 'Address cannot be more than 100 characters long' }
    ],
  };

  name = new FormControl('');
  contact_no = new FormControl('');
  address = new FormControl('');

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _dashboardViewComponent: DashboardViewComponent,
    private _memberService: MemberService,
    private _helperService: HelperService,
    private _dialogRef: MatDialogRef<MemberCrudComponent>,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this.memberForm = this._formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.pattern('^[a-zA-Z0-9\\s]*$')
      ])),
      contact_no: new FormControl('', Validators.compose([
        Validators.maxLength(12),
        Validators.pattern('^[0-9\+]*$')
      ])),
      address: new FormControl('', Validators.compose([
        Validators.maxLength(100),
      ])),
    });
  }

  addMemberDetails() {
    this.showSpinner = true;
    this._memberService
      .postMember(this.memberForm.value)
      .subscribe((resp) => {
        this.showSpinner = false;
        this._dialogRef.close();
        this._memberService.reloadData$.next(resp);
        this._helperService.openMessageSnackBar(resp.message, '');
      }, (error) => {
        this.showSpinner = false;
        this._helperService.openErrorSnackBar(error, '');
      });
  }

}
