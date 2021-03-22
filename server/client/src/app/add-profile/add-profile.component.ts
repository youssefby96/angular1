import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import {Publication} from '../shared/publication.model';


@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})
export class AddProfileComponent implements OnInit {

  newPublication = new Publication();

  constructor( public userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  addPublication(){
    this.userService.ajouterPublication(this.newPublication).subscribe(publ => {
      console.log(publ);
    });
    this.router.navigate(['userprofile']).then(() => {
      window.location.reload(); });
  }

}
