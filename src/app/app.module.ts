import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraComponent } from './camera/camera.component'; // Importa tu CameraComponent


@NgModule({
  declarations: [
    AppComponent,
    CameraComponent, // Declara el componente
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptUISideDrawerModule, // Importa otros módulos necesarios
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent], // Declara el componente raíz
})
export class AppModule {}