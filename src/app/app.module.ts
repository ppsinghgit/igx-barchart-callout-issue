import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { IgxComboModule } from 'igniteui-angular';
import { ComboMainComponent } from './combo-main/combo-main.component';
import { ChartsComponent } from './charts/charts.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, ChartsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    IgxComboModule,
  ],
  providers: [],
  schemas: [],
})
export class AppModule {}
