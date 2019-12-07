import { Component, OnInit } from '@angular/core';
import { Option } from './models/option.model';
import { Contact } from './models/contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styles: []
})
export class ContactsComponent implements OnInit {
  public header = 'Contactos';
  public description = 'Manage tour contact list';
  public numContacts = 0;
  public counterClass = 'tag secondary';
  public formHidden = true;
  public workStatuses: Option[];
  public contact: Contact;
  public contacts: Contact[] = [];

  constructor() { }

  ngOnInit() {
    this.workStatuses = [
      { id: 0, description: 'unknow' },
      { id: 1, description: 'student' },
      { id: 2, description: 'unemployed' },
      { id: 3, description: 'employed' }
    ];
    this.newContact();
    this.contacts = [];
  }

  newContact() {
    this.contact = {
      name: '',
      isVIP: false,
      gender: '',
      workStatus: 0,
      companyName: '',
      education: ''
    };
  }

  public saveContact() {
    console.log('Guardando contacto');
    this.contacts.push({ ...this.contact });
    this.updateCounter();
    this.formHidden = true;
  }

  public AgregarContacto() {
    this.newContact();
    this.formHidden = false;
  }

  public deleteContact(contact: Contact) {
    this.contacts = this.contacts.filter(c => c.name !== contact.name);
    this.updateCounter();
  }

  public editContact(contact: Contact){
    this.contact = this.contacts.filter(c => c.name === contact.name)[0];
    this.formHidden = false;
  }

  private updateCounter() {
    this.numContacts = this.contacts.length;
    this.counterClass = this.numContacts === 0 ? 'tag secondary' : 'tag primary';
  }
}
