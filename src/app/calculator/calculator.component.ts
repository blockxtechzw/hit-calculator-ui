import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CrudService } from '../core/crud.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {

  loading = false;
  form = new UntypedFormGroup({});
  action = "MINUS"
  calculatorObj: any;
  items: any[] = [];
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
		  action: new UntypedFormControl(this.action, Validators.compose([Validators.required])),
      firstValue: new UntypedFormControl(null, Validators.compose([Validators.required])),
      secondValue: new UntypedFormControl(null, Validators.compose([Validators.required])),
    });
  }
  checkErrorAndSubmit(){
    this.checkErrors();
    this.calculate();

  }
  actionChange(action: string){
      this.action = action;
      this.form.get('action')?.setValue(this.action);

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

  calculate(){
    this.loading = true;
   // console.log(this.form.value);


    this.service.postAny(this.form.value, "/calculate/action").subscribe(
      {
       next: result =>{
        this.messageService.add({severity:'success', summary:'Notification', detail:'CALCULATION IS DONE'});
         console.log(result);
         this.calculatorObj = result;
         // this.loading = false;
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
    this.service.getList("/calculate/list").subscribe(
      {
       next: result =>{

        this.items = result;
      },
      error: err =>{
        this.loading = false;
        this.messageService.add({severity:'error', summary:'Notification', detail:'Failed to retrieve calculations'});
      },
      complete: () =>{
        this.loading = false
      }
      }

    )
  }
}
