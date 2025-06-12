import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adminportal',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './adminportal.component.html',
  styleUrl: './adminportal.component.css'
})
export class AdminportalComponent {

}
