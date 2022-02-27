import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iconstructor } from 'src/app/interfaces/iconstructor';
import { ConstructorsService } from 'src/app/services/constructors.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-constructor-detail',
  templateUrl: './constructor-detail.component.html',
  styleUrls: ['./constructor-detail.component.css']
})
export class ConstructorDetailComponent implements OnInit {

  cons: Iconstructor | undefined;
  id: string | undefined;
  like: boolean | undefined;

  //ActivatedRoute
  constructor(private activatedRoute: ActivatedRoute, private constructorService: ConstructorsService, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.loadConstructor()
  }

  loadConstructor() {
      //ActivatedRoute
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.firebaseService
      .getConstructorLikes()
      .subscribe((response) => {
        response.indexOf(this.cons?.constructorId) > -1
          ? this.buttonLikeToTrue()
          : this.buttonLikeToFalse();
      });

    this.constructorService
      .getConstructorById(this.id)
      .subscribe((response) => {
        this.cons = response[0];
      });
  }

  likeConstructor(id: string) {
    this.firebaseService.checkLikeConstructor(id);
    this.like ? this.buttonLikeToFalse() : this.buttonLikeToTrue();
  }

  buttonLikeToFalse() {
    this.like = false;
  }

  buttonLikeToTrue() {
    this.like = true;
  }

}
