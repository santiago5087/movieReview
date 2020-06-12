import { Component, OnInit, HostBinding } from '@angular/core';

import { GamesService } from '../../services/games.service';
import { Game } from '../../models/Game';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  game: Game = {
    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  }

  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
  }

  saveNewGame() {
    delete this.game.id;
    delete this.game.created_at;
    
    this.gamesService.saveGame(this.game)
      .subscribe(
        res => console.log(res),
        err => console.error(err));

  }

}
