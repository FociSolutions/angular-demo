# Angular Demo

This project contains a collection of demo modules that showcase different techniques and features of Angular development and how to implement them.

# Samples

Check out the samples [here](./additional-documentation/samples.html)


## Recommended VSCode Plugins

Since we prefer to use VSCode to implement our Angular application, the following are some VScode plugin recommendations to make the development process a little bit easier:

- Angular Essentials: `johnpapa.angular-essentials`
- Prettier - Code formatter: `esbenp.prettier-vscode`
- npm: `eg2.vscode-npm-script`
- npm Intellisense: `christian-kohler.npm-intellisense`
- Node.js Modules Intellisense: `leizongmin.node-module-intellisense`
- Code Spell Checker: `streetsidesoftware.code-spell-checker`
- GitLens — Git supercharged: `eamodio.gitlens`

The list can also be found in `.vscode/extensions.json` of this solution, please copy `extensions.json` file to other Angular application's `.vscode` folder.

## Angular Log Format

When logging messages, we want to keep a standard format to make it easier for our future selves to debug/troubleshoot. Therefore, we need to make sure the log message follow the format below:

```
<Timestamp> <LogLevel> <ClassName>.<MethodName>: <Message>
```

- `Timestamp` is the ISO string representation of when the message is logged
- `LogLevel` is the uppercase string representation of the message's log level
- `ClassName` is the name of the class that logged the message
- `MethodName` is the name of the method that logged the message, can be omitted if and only if the method is constructor
- `Message` is the actual log message; If necessary, log message should contain data to aid the debugging process

The following are some example log message:

```bash
# Not using ngx-logger:
2020-04-01T14:48:36.580Z DEBUG FooClass.Bar: This is an example

# Using ngx-logger:
2020-04-01T14:48:36.580Z DEBUG [vendor.js:282391] FooClass.Bar: This is an example
```

_Note: `Timestamp` and `LogLevel` will be automatically added to your log message when using [ngx-logger](https://github.com/dbfannin/ngx-logger)_

Do keep in mind that, most likely than not, the Angular application will be deployed remotely. Thus, log messages might be our only way to figure out what went wrong. So try to keep the log messages as informative as possible while not drowning the reader.
