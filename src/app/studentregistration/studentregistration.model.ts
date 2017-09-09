export class RegistrationData {
    firstName: string = '';
    lastName : string = '';
    email: string = '';
    phone: string = '';
    address: string = '';
    

    clear() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phone = '';
        this.address  = ''; 
    }
}