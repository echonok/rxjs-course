import { Component, OnInit } from '@angular/core';
import { interval, merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  ngOnInit(): void {

    const intervals1$ = interval(1000);
    const intervals2$ = intervals1$.pipe(
      map((val) => 10 * val)
    );
    const result$ = merge(intervals1$, intervals2$);
    result$.subscribe(console.log);

  }

}
