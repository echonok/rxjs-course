import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map, shareReplay } from 'rxjs/operators';
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
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }),
      finalize(() => {
        console.log('Finalize...');
      }),
      map((res) => Object.values(res.payload)),
      shareReplay(),
    );

    this.beginnerCourses$ = courses$.pipe(
      map((courses) => courses.filter((course) => course.category === ECourseCategory.BEGINNER))
    )

    this.advancedCourses$ = courses$.pipe(
      map((courses) => courses.filter((course) => course.category === ECourseCategory.ADVANCED))
    )

  }

}
