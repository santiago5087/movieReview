import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

import { GamesService } from '../../services/games.service';
import { Game } from '../../models/Game';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  movieForm: FormGroup;

  edit = false;
  game: Game = {
    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  }

  constructor(private gamesService: GamesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) { 
      this.createForm();
    }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.gamesService.getGame(params.id)
        .subscribe(
          res => {
            this.movieForm = this.fb.group({
              id: [res.id],
              title: [res.title],
              description: [res.description],
              image: [res.image],
              created_at: [new Date()]
            });
            console.log(res);
            this.game = res;
            this.edit = true;
          },
          err => console.error(err)
        );
    } 
  }

  createForm() {
    this.movieForm = this.fb.group({
      id: [0],
      title: [''],
      description: [''],
      image: [''],
      created_at: [new Date()]
    });
  }

  saveNewGame() {
    delete this.game.id;
    delete this.game.created_at;
    
    this.gamesService.saveGame(this.game)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/games']);
        },
        err => console.error(err));

  }

  updateGame() {
    delete this.game.created_at;
    this.gamesService.updateGame(this.game.id, this.game)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/games']);
        },
        err => console.error(err)
      );
  }

}
