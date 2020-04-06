## RxJS Module

This lazy loaded feature module is created to demonstrate how to create, subscribe to, and transform Observables and Subjects. While this module aims to demo the more common operators, and subjects it does not cover everything within the RxJS library. For more information please see [the RxJS documentation](https://rxjs-dev.firebaseapp.com/api) and [the Learn RxJS Documentation](https://www.learnrxjs.io/)

_Folder structure of this module loosely follows [the Angular style guide](https://angular.io/guide/styleguide)._

## Subjects

Within the RxJS library are a special type of Observables called Subjects. Subjects are similar to Observables except they can have multiple observers and owners of the subject can emit new values onto the subject after the creation of a subject using the subject's `next()` function. There are four different types of subjects:

- Subject: The vanilla subject, no state is stored, no history is kept. It just acts as a multicasted Observable.
- Behavior Subject: This subject stores its state. When a new observer subscribes to this subject it will be given the current state (if there is any). Example:

```javascript
const subject = new BehaviorSubject<number>();
subject.subscribe(data => console.log(data)); // Nothing will be emitted to this observer since the state of the behavior subject wasn't initialized on creation.

subject.next(1); // the subject emits 1
// observer1: console.log(1)

subject.subscribe(data => console.log(data)) // The subject will emit the value 1 to this observer
//observer2: console.log(1)

subject.next(2);
// observer1: console.log(2)
// observer2: console.log(2)

```

- Replay Subject: This subject stores a history of emitted values. On creation you can define the buffer limit of its history but by default there is no limit on its buffer size. Example:

```javascript
const subject = new ReplaySubject<number>();
subject.subscribe(data => console.log(data)); // Nothing will be emitted because there is no history

subject.next(1); // the subject emits 1
// observer1: console.log(1)
subject.next(2);
// observer1: console.log(2)

subject.subscribe(data => console.log(data)) // The subject will emit the value 1 to this observer
//observer2: console.log(1)
// observer2: console.log(2)
```

- AsyncSubject: Similar to the vanilla subject but the async subject only emits the last value to observers on completion.

This module only has examples of the replay and behavior subject. For more information on subjects please see [the RxJS documentation](https://rxjs-dev.firebaseapp.com/guide/subject) and [the Learn RxJS Documentation](https://www.learnrxjs.io/learn-rxjs/subjects)

### Components

This module contains 5 components:

- `DashboardComponent` is the root component that allows navigation between the different demos
  - `FibonacciComponent` is used to display the fibonacci demo. It allows you to generate numbers within the fibonacci sequence, view them, and view which numbers are even/odd numbers in the sequence
    - `SequenceListComponent` is used by the `FibonacciComponent` to display the complete sequence generated, and their index number within the sequence
  - `ShoppingCartComponent` is created for adding and removing items to a shopping list and showing their total cost, the calculated cost and the total cost plus tax
  - `CombiningObservablesComponent` is a component that shows different ways to combine observables using example input observables.

### Services

There are two services contained in this module:

- `FibonacciService` is the service responsible for generating the fibonacci sequence. Contains the Replay Subject that stores the entire sequence, and functions that generate new numbers, pushes them onto the sequence and retrieves old numbers that were previously generated.
- `ShoppingCartService` is the service responsible for storing the state of the shopping cart's total using a Behavior Subject. It contains functions that return observables for the total value, the tax value, and the total after tax values. It also contains functions for adding and subtracting from the total.
