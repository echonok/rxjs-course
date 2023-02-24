import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import {
  debounceTime,
  distinctUntilChanged,
  map, startWith, switchMap,
} from 'rxjs/operators';
import { concat, fromEvent, Observable } from 'rxjs';
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

    const searchLessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map((event) => event.target.value),
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((search) => this.loadLessons(search))
      );
    const initialLessons$ = this.loadLessons();
    this.lessons$ = concat(
      initialLessons$,
      searchLessons$
    );
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
