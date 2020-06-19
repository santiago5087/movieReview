import { Component, OnInit, HostBinding } from '@angular/core';

import { flyInOut } from '../../animations/app.animation';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
  host: {
    '[@flyInOut]' : 'true' // Se aplica al padre porque es el encargado de crear/destruir los elem.
  },
  animations: [
    flyInOut()
    ]
})
export class GameListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  games: any = [];

  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    this.gamesService.getGames()
    .subscribe(
      games => this.games = games,
      err => console.error(err)
    );
  }

  deleteGame(id: string) {
    this.gamesService.deleteGame(id)
      .subscribe(
        res => {
          console.log(res);
          this.getGames();
        },
        err => console.log(err)
      );
  }

}
