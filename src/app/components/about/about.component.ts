import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'about',
  styleUrls: ['./about.component.sass'],
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

  public localState: any;
  constructor(
    public route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.route .data .subscribe((data: any) =>  this.localState = data.yourData );
    this.asyncDataWithWebpack();
  }

  private asyncDataWithWebpack() {
    setTimeout(() => {
      System.import('../../../assets/mock-data/mock-data.json').then( json =>  this.localState = json );
    });
  }

}
