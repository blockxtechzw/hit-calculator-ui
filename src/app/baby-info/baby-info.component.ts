import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CrudService } from '../core/crud.service';

@Component({
  selector: 'app-baby-info',
  templateUrl: './baby-info.component.html',
  styleUrls: ['./baby-info.component.scss']
})
export class BabyInfoComponent implements OnInit {

  loading = false;
  form = new UntypedFormGroup({});
  calculatorObj: any;
  items: any[] = [];
  statistics: any;
  constructor(private service: CrudService, private router: Router, private messageService: MessageService, private fb: UntypedFormBuilder) {


  }
  ngOnInit() {
   this.createForm();
   this.getItems();
  }
  ngAfterContentInit(){
    this.checkErrors();
  }

  createForm() {
	  this.form = this.fb.group({
      motherFirstName: new UntypedFormControl(null, Validators.compose([Validators.required])),
      motherLastName: new UntypedFormControl(null, Validators.compose([Validators.required])),
		  birthNumber: new UntypedFormControl(null, Validators.compose([Validators.required])),
      // idNumber: new UntypedFormControl(null, Validators.compose([Validators.required])),
      dateOfBirth: new UntypedFormControl(null, Validators.compose([Validators.required])),
    });
  }
  checkErrorAndSubmit(){
    this.checkErrors();
    this.saveForm();

  }

  isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.form.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
  }
  checkErrors(){
    const controls = this.form.controls;
		if (this.form.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()

			);
			return;
    }
  }

  saveForm(){
    this.loading = true;
    // console.log(this.form.value);


     this.service.postAny(this.form.value, "/baby-info/save").subscribe(
       {
        next: result =>{
          console.log(result);

         this.messageService.add({severity:'success', summary:'Notification', detail:'BABY INFORMATION SAVED SUCCESSFULLY'});
         this.getItems();

       },
       error: err =>{
         this.loading = false;
         this.messageService.add({severity:'error', summary:'Notification', detail:'Failed to create'});
       },
       complete: () =>{
         this.loading = false
       }
       }

     )
  }
  getItems(){
    this.service.getList("/baby-info/list").subscribe(
      {
       next: result =>{

        this.items = result;
        console.log(this.items);

      },
      error: err =>{
        this.loading = false;
        this.messageService.add({severity:'error', summary:'Notification', detail:'Failed to retrieve calculations'});
      },
      complete: () =>{
        this.loading = false
      }
      }

    );
    this.service.getList("/baby-info/statistics").subscribe(
      {
       next: result =>{
         this.statistics = result;
        console.log(result);

      },
      error: err =>{
        this.loading = false;
        this.messageService.add({severity:'error', summary:'Notification', detail:'Failed to retrieve calculations'});
      },
      complete: () =>{
        this.loading = false
      }
      }

    );
  }

}
