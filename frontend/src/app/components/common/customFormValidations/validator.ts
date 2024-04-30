import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
    static noSpaceAllowed(control: AbstractControl): ValidationErrors | null {
        if (control.value != null && control.value.indexOf(' ') != -1) {
            return { noSpaceAllowed: true }
        }
        return null
    }
    static emailPatternValidator(control: AbstractControl): ValidationErrors | null {
        const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const value = control.value as string;
        if (value && !emailPattern.test(value)) {
            return { 'emailPattern': true };
        }
        return null;
    }

    static atLeastOneSpecialCharValidator(control: AbstractControl): ValidationErrors | null {
        const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
        const value = control.value as string;
        if (value && !specialCharPattern.test(value)) {
            return { 'atLeastOneSpecialChar': true };
        }
        return null;
    }



}