# ClientAngular (nodebucket)

## Web App ([repo](https://github.com/david-rachwalik/nodebucket))

WEB 450 - Mastering the MEAN Stack Bootcamp (Bellevue University)

Bellevue University | Web Development [Degree](http://www.bellevue.edu/degrees/bachelor/web-development-bs 'Designed by developers for developers.')

## Contributors

- Richard Krasso
- David Rachwalik

### Project Commands Used

Generate a new [Angular](https://angular.io) application

```bash
ng new <app-name>
```

Install Angular Material ("custom" theme, 'y' typography, 'y' animations) ([background](https://material.angular.io/guide/theming#application-background-color))

```bash
ng add @angular/material
```

Install [Angular Flex-Layout](https://github.com/angular/flex-layout) ([wiki](https://github.com/angular/flex-layout/wiki), [API](https://github.com/angular/flex-layout/wiki/API-Documentation))

```bash
npm i @angular/flex-layout
```

---

[Default Angular component css display block](https://stackoverflow.com/questions/51032328/angular-component-default-style-css-display-block) (generated components will contain css `:host { display: block; }`)

```json
...
// Set default value in angular.json (Angular v9.1+)
"projectType": "application",
"schematics": {
  "@schematics/angular:component": {
    "displayBlock": true
  }
}
...
```

### Angular Generate Commands Used

Generate a new Angular component

```bash
ng g c <component-name>
```

Generate a new Angular module

```bash
ng g m <module-name>
```

Generate a new Angular service

```bash
ng g s <service-name> --skip-tests
```
