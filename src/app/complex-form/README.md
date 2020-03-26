## Complex Form Module

This lazy loaded feature module is created to demonstrate how to create a complex form the span across different components. All techniques used in this module are derived from the following tutorials, please give them a read for more indepth understanding:

- https://angular.io/guide/reactive-forms
- https://angular.io/guide/dynamic-form
- https://angular.io/guide/lazy-loading-ngmodules

This module allow the user to create a team with at least one players in the team.

_Folder structure of this module loosely follows [the Angular style guid](https://angular.io/guide/styleguide)._

### Components

This module contains 5 components:

- `ComplexFormComponent` is the root component that stitches everything together
  - `TeamNameInputComponent` is used to retrieve team name from user
  - `PlayerListComponent` is created for adding and removing player from the provided form array
    - `PlayerListItemComponent` is used to retrieve player name and player type from user
  - `ResultComponent` is a dialog component for display the retrieved team information

### Models

This module contains serval models to help represent the team information as form inputs:

- `InputBase` represents a basic html input or select
  - Stores information such as `FormControlName` as `key`, validators of needed for the input as `validators`, label of the input as `label`, etc
- `Team` represents the form inputs used to retrieve team information, using `InputBase`
  - `Player` represents the form inputs used to retrieve player information, using `InputBase`
    - `PlayerType` is a enum used for representing different player type

### Services

This module only have require one service, which is `TeamControlService`, to translate `Team` to and from `FormGroup`, and also to translate `Player` to and from `FormGroup`.
