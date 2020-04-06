# Inputs and Outputs

The purpose of this module is to serve as a general guideline for using [inputs](https://angular.io/api/core/Input) and [outputs](https://angular.io/api/core/Output) for Angular components and provide some examples using Inputs and Outputs. Inputs and outputs are one of the ways components are able to interact with other components. There are other ways such as using the ViewChild decorator to directly interact with a child component, but this couples the components and makes reusing a component difficult. So it is recommended to use inputs and outputs, or services for component communication.

_For more information on inputs and outputs see the [angular documentation on component interaction](https://angular.io/guide/component-interaction)._

_Folder structure of this module loosely follows [the Angular style guide](https://angular.io/guide/styleguide)._

## Guidelines

- Type your input/output if they aren't already implicitly typed.
  - Example: `@Input() myInput: string`.
  - This is especially useful with the release of Angular 9 since the ivy compiler can perform ahead of time checks on the types of the data you bind to your input and output
- Use the `@Input` and `@Output` decorator instead of declaring them within the `@Component` decorator.
- Avoid using inputs and outputs when you need components to interact through multiple levels within your applications hierarchy, or if you need to facilitate an interaction between sibling components. Instead consider using a service for communication.
  - Long chains of inputs and outputs gets confusing as your application hierarchy gets larger and poses a greater risk of introducing unexpected bugs when you modify a component within the chain.
  - For example: If I have a NotificationDisplayComponent that displays notification messages that can be triggered from anywhere in the application I could structure my application to propagate notifications up to a root component to store and send as a list to my NotificationDisplayComponent like so:

    ```
    [RootComponent] ---input----> [NotificationDisplayComponent]
          ^
          |---- output ----- [ChildComponent]
                                  ^
                                  |----output----[ChildComponent]
    ```

    but it would be better to create a service that components on any level could interact with and the NotificationDisplayComponent could listen to

    ```
      [NotificationDisplayComponent] <---notifications-- [service] <--send notification--- [AnyComponent]
    ```
- Use [setter functions](https://angular.io/guide/component-interaction#intercept-input-property-changes-with-a-setter) for intercepting values from an input when you only need to watch a single input at once. If you wish to execute code after changes occur in multiple inputs then you should use the [ngOnChanges life cycle hook](https://angular.io/guide/component-interaction#intercept-input-property-changes-with-ngonchanges). There is also an example of listening to multiple inputs within this module.

  - Example: you may have a component that wants to remove any white spaces at the start or end of a string input
    ```typescript
    trimmedInput: string = '';
    @Input()
    set myInput(input: string) {
      this.trimmedInput = input.trim();
    }
    ```

- Avoid aliasing them. Example: instead of `@Input('myInput') input: string` do `@Input() myInput: string`.
- Avoid prefixing your outputs with `on`. Angular automatically provides an alternative accessor for outputs prefixed with `on-` so if you were to name an output `onClick` you would also get an alias `on-onClick`. This is a minor guideline but is recommended to avoid by the Angular team.
- Avoid creating an output that emits EventEmitters. It can cause memory leaks if you forget to clean up your subscriptions to the previously emitted EventEmitters.
  - Example: `@Output() output: EventEmitter<EventEmitter<string>> // don't do this`

## Components

This module contains 4 components:

- `ParentComponent` is the root component that will be communicating to all other components using their inputs and outputs.
- `TextInputComponent` is a component that takes user input through a text input html tag and emits that value through an `@Output` property.
- `UppercaseTextComponent` is a component that takes text through an `@Input` and turns it into an uppercase format by intercepting the incoming value using a setter function.
- `MultiInputExampleComponent` is a component has two number inputs and displays the sum and product of these values. However it only updates the product value if both numbers have changed during the same changed detection step (something that is much harder to achieve through setter functions and probably shouldn't be done with setter functions). This is to show how you can listen to all input changes using the ngOnChanges.
