import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import {Publication} from '../shared/publication.model';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  publications : Publication[];

  //userDetails;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
   /* this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {
        console.log(err);
      }
    );*/
    this.userService.listePublication().subscribe(publs => {
      console.log(publs);
      this.publications = publs;
    });
  }
  deletePublication(p : Publication){
    let conf=confirm("Etes-voussûr?");
    if(conf)
    this.userService.supprimerPublication(p.idPublication).subscribe(()=>{
      console.log("produitsupprimé");});
      this.router.navigate(['produits']).then(()=>{
        window.location.reload();
  });
}

    onLogout(){
      this.userService.deleteToken();
      this.router.navigate(['/seconnecter']);
    }






}
