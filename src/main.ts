import './polyfills';

import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './app/material-module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

import {MenuOverviewExample} from './app/menu-overview-example';
import {SidenavComponent} from './app/sidenav/sidenav.component';

import { DocumentorComponent } from './app/documentor/documentor.component';

import { DocumentationComponent } from './app/documentation/documentation.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';

import { MenuSelectorService } from './app/menu-selector.service';

// Default MatFormField appearance to 'fill' as that is the new recommended approach and the
// `legacy` and `standard` appearances are scheduled for deprecation in version 10.
// This makes the examples that use MatFormField render the same in StackBlitz as on the docs site.
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    SidenavComponent,
 DocumentorComponent, 
 DocumentationComponent,
 
    ],
  declarations: [SidenavComponent,MenuOverviewExample,DocumentationComponent,DocumentorComponent,
  DashboardComponent,
  
  ],
  bootstrap: [DocumentorComponent],
  providers: [
    MenuSelectorService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */