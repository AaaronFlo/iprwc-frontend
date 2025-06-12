import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userportal',
  imports: [HeaderComponent,CommonModule],
  templateUrl: './userportal.component.html',
  styleUrl: './userportal.component.css'
})
export class UserportalComponent {

}
