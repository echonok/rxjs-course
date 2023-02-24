import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable, timer } from 'rxjs';
import { delayWhen, map, retryWhen, shareReplay } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import { ICourse } from '../common/course.interface';
import { ECourseCategory } from '../common/course-category.enum';
import { IAPIResponse } from '../common/api-response.interface';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  ngOnInit() {

    const http$ = createHttpObservable<IAPIResponse<ICourse>>('./api/courses');
    const courses$ = http$.pipe(
      map((res) => Object.values(res.payload)),
      shareReplay(),
      retryWhen((errors) => errors.pipe(
        delayWhen(() => timer(2_000))
      ))
    );

    this.beginnerCourses$ = courses$.pipe(
      map((courses) => courses.filter((course) => course.category === ECourseCategory.BEGINNER))
    )

    this.advancedCourses$ = courses$.pipe(
      map((courses) => courses.filter((course) => course.category === ECourseCategory.ADVANCED))
    )

  }

}
