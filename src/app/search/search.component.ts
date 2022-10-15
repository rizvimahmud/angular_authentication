import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs'

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  name = ''
  nameChanged = new Subject<string>()
  @Output() nameChangeEvent = new EventEmitter<string>()

  constructor() {
    this.nameChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe({
      next: (value) => {
        this.nameChangeEvent.emit(value)
      },
    })
  }

  ngOnInit(): void {}

  onNameChange($event: string) {
    this.nameChanged.next($event)
  }
}
