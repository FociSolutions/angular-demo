## Web Storage Module

This lazy loaded feature module is created to demonstrate how to add, update, delete, and get items using the [Web Storage Api](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API). This module demonstrates the use of both the `localStorage` and `sessionStorage`. It should be noted that these are not the only way to store data client side.

_Folder structure of this module loosely follows [the Angular style guide](https://angular.io/guide/styleguide)._

## Session Storage

This storage mechanism maintains a separate storage for each origin within a given page session. This means that data stored until the browser or tab is closed. The maximum amount of data that can be stored using this storage is 5mb and data can only be stored as string values.

## Local Storage

Local storage is similar to the session storage except data is persisted even if the browser is closed. To clear this storage you have to manually clear it. Its limit is also 5mb and it can only store string values.

## Components

This module contains 1 component:

- `StorageComponent` provides a user interface for the user to interact with. Allows the user to make calls to the LocalStorageService and SessionStorageService in order to update, and delete items. It also leverages these services to display their current states to the user.

## Services

There are two services contained in this module:

- `LocalStorageService` provides functions for getting, updating/adding, and deleting items from local storage.
- `SessionStorageService` provides functions for getting, updating/adding, and deleting items from session storage.
