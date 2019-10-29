import { Component, OnInit, ViewChild } from "@angular/core";
import { PokemonService } from "../services/pokemon.service";
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  offset = 0;
  pokemon = [];

  @ViewChild(IonInfiniteScroll, null) infinite: IonInfiniteScroll;

  constructor(private pokeService: PokemonService) {}

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon(loadMore = false, event?) {
    if (loadMore) {
      this.offset += 25;
    }

    this.pokeService.getPokemon(this.offset).subscribe(resp => {
      console.log("Result", resp);
      this.pokemon = [...this.pokemon, ...resp];

      if (event) {
        event.target.complete();
      }

      if(this.offset === 125) {
        this.infinite.disabled = true;
      }

    });
  }


  onSearchChange(e) {
    let value = e.detail.value;

    if(value == '') {
      this.offset = 0;
      this.loadPokemon();
      return;
    }

    this.pokeService.findPokemon(value).subscribe(resp => {
      this.pokemon = [resp];
    }, err => {
      this.pokemon = [];
    });
  }

}
