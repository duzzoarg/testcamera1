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
