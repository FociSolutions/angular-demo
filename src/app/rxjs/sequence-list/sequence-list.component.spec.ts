import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { SequenceListComponent } from './sequence-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SequenceListComponent', () => {
  let component: SequenceListComponent;
  let fixture: ComponentFixture<SequenceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SequenceListComponent],
      imports: [BrowserAnimationsModule, LoggerTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
