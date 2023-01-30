import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import { ICourse } from '../common/course.interface';
import { ECourseCategory } from '../common/course-category.enum';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  ngOnInit() {

    const http$ = createHttpObservable<ICourse>('./api/courses');
    const courses$ = http$.pipe(
      map((res) => Object.values(res.payload)),
    );

    this.beginnerCourses$ = courses$.pipe(
      map((courses) => courses.filter((course) => course.category === ECourseCategory.BEGINNER))
    )

    this.advancedCourses$ = courses$.pipe(
      map((courses) => courses.filter((course) => course.category === ECourseCategory.ADVANCED))
    )

  }

}
