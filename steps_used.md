## Prerequisites

* Check if you have `node` installed

`node -v`

* Check if you have `npm` installed

`npm -v`


## Install Angular

`npm install -g @angular/cli`

### Generate you Angular project

`ng new <project-name>`

* Would you like to add Angular routing? (y/N) enter y

* Which stylesheet format would you like to use? Select SCSS

When the project has been created go into the project directory

`cd <project-name>`


## Install Bootstrap

### 1. `npm install bootstrap bootstrap-icons`

### 2. add this lines in angular-json

            "styles": [
              "node_modules/bootstrap/scss/bootstrap.scss",
              "node_modules/bootstrap-icons/font/bootstrap-icons.css",
              "src/styles.scss"
            ],
            "scripts": [
              "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
            ]

### 3. `npm install @ng-bootstrap/ng-bootstrap`

### 4. Modify app.module.ts to include NgbModule


    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';

    import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

    import { AppRoutingModule } from './app-routing.module';
    import { AppComponent } from './app.component';

    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        NgbModule,
        AppRoutingModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }

### 5. Modify app.components.ts

    import { Component } from '@angular/core';

    import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.scss']
    })
    export class AppComponent {
      title = 'movie-time';

      constructor(private modalService: NgbModal){

      }

      public open(modal: any): void{
        this.modalService.open(modal);
      }
    }

### 6. Add Bootstrap elements to the app.component.html file

Example:

    <ul class="nav">
      <li class = "nav-item">
        <a class="nav-link active" aria-current="page" href="#">Home</a>
      </li>
      <li class = "nav-item">
        <a class="nav-link" href="#">Services</a>
      </li>
      <li class = "nav-item">
        <a class="nav-link" href="#">About</a>
      </li>
      <li class = "nav-item">
        <a class="nav-link" href="#">Blog</a>
      </li>
    </ul>

    <button type="button" class="btn btn-primary btn-lg">Angular</button>
    <button type="button" class="btn btn-secondary btn-lg">Bootstrap</button>

### 7.Run your app

`ng serve`

When Angular development runs, you can open `http://localhost:4200/` on your browser


## CLI Angular

### Generate components `ng g c componentes/<home>`

`<home>`: it would be the name of the component

### Generate services `ng g s`