Proyecto Creado para OpenWebinars

Trabajamos con Nativescript, en este caso creamos el proyecto “testcamera1” para utilizar la cámara del móvil

Creamos un proyecto desde cero con el comando 

ns create testcamera1


Seleccionamos Angular y luego Slide Drawer


Accedemos a la carpeta del proyecto y lo testeamos con la App y ns preview


El siguiente comando instala lo necesario para poder utilizar la cámara del móvil

ns plugin add @nativescript/camera

ns migrate


Luego creamos una carpeta llamada camera en src/app/camera
y dentro 2 archivos 

camera.component.html
camera.component.ts


Le damos permisos a nuestra aplicación modificando y reemplazamos el contenido de todo el archivo “AndroidManifest.xml” ubicado en App_Resources/Android/src/main/


<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="__PACKAGE__">


    <supports-screens
        android:smallScreens="true"
        android:normalScreens="true"
        android:largeScreens="true"
        android:xlargeScreens="true"/>


    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
    <uses-permission android:name="android.permission.CAMERA"/>
    <uses-feature android:name="android.hardware.camera" android:required="false"/>
    <uses-feature android:name="android.hardware.camera.autofocus" android:required="false"/>


    <application
        android:name="com.tns.NativeScriptApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme"
        android:hardwareAccelerated="true">


        <activity
            android:name="com.tns.NativeScriptActivity"
            android:label="@string/title_activity_kimera"
            android:configChanges="keyboard|keyboardHidden|orientation|screenSize|smallestScreenSize|screenLayout|locale|uiMode"
            android:theme="@style/LaunchScreenTheme"
            android:hardwareAccelerated="true"
            android:launchMode="singleTask"
            android:exported="true">


            <meta-data android:name="SET_THEME_ON_LAUNCH" android:resource="@style/AppTheme" />


            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <activity android:name="com.tns.ErrorReportActivity"/>
    </application>
</manifest>


Modificamos el archivo “app.module.ts”


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

Tambien Reemplazamos el contenido de “camera.component.ts”
import { Component } from '@angular/core';
import { takePicture, requestPermissions } from "@nativescript/camera";
import { ImageSource } from "@nativescript/core";


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
})
export class CameraComponent {
  async captureImage() {
    try {
      // Solicitar permisos para usar la cámara
      await requestPermissions();
     
      // Tomar una foto
      const imageAsset = await takePicture({ width: 300, height: 300, keepAspectRatio: true });
     
      // Convertir el resultado a un formato de imagen utilizable
      const imageSource = new ImageSource();
      imageSource.fromAsset(imageAsset).then((image) => {
        console.log("Imagen capturada con éxito", image);
        // Aquí puedes usar la imagen según tu necesidad
      });
    } catch (error) {
      console.error("Error al capturar la imagen:", error);
    }
  }
}


Por último en “camera.component.html” insertamos el botón para Tomar Foto


<StackLayout>
    <Button text="Tomar Foto" (tap)="captureImage()"></Button>
  </StackLayout>


En este caso reemplazamos el GridLayout de Sttings


<GridLayout
          columns="auto, *"
          class="nt-drawer__list-item"
          [class.-selected]="isComponentSelected('/settings')"
          (tap)="onNavItemTap('/settings')"
        >
        <app-camera col="0" text="Settings" class="p-r-50"></app-camera>
        <Label col="1" text="Settings" class="p-r-10"></Label>
        </GridLayout>

