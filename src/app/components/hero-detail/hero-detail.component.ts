import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../../model';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../../services';
import {Location} from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  constructor(
    private activeRoute: ActivatedRoute,
    private location: Location,
    private heroService: HeroService
  ) {}

  ngOnInit() {
    this.getHero();
  }

  /** Получение героя по номеру id */
  getHero(): void {
    console.log(this.activeRoute.snapshot);
    console.log(this.activeRoute.snapshot.paramMap);
    /* Метод значений параметров роут извлеченных из url адреса */
    const id = +this.activeRoute.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(
      hero => {
        this.hero = hero;
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }
}
