import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import {
  debounceTime,
  distinctUntilChanged,
  map, startWith, switchMap, throttle, throttleTime,
} from 'rxjs/operators';
import { concat, fromEvent, interval, Observable } from 'rxjs';
import { Lesson } from '../model/lesson';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

  courseId: string = '';
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  @ViewChild('searchInput', { static: true, read: ElementRef }) input: ElementRef;

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.courseId = this.route.snapshot.params['id'];
    this.course$ = createHttpObservable<Course>(`/api/courses/${this.courseId}`);
  }

  ngAfterViewInit() {
    fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map((event) => event.target.value),
        // throttleTime(500),
        throttle(() => interval(500)),
      )
      .subscribe(console.log);
  }

  loadLessons(search = ''): Observable<Lesson[]> {
    return createHttpObservable<{ payload: Lesson[] }>(`/api/lessons?courseId=${this.courseId}&filter=${search}`)
      .pipe(
        map(({ payload }) => {
          console.log(payload)
          return payload
        })
      );
  }

}
