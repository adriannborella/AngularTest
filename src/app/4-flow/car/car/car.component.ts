import { Component, OnInit } from '@angular/core';
import { CarModel } from './models/car.module';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styles: []
})
export class CarComponent implements OnInit {
  public car: CarModel;
  public disableBrake: boolean;
  public disableThrottle: boolean;

  constructor() { }

  ngOnInit() {
    this.car = { name: 'Roadster', maxSpeed: 120, currentSpeed: 0 };
    this.checkLimits();
  }

  private checkLimits() {
    this.disableBrake = false;
    this.disableThrottle = false;

    if (this.car.currentSpeed <= 0) {
      this.car.currentSpeed = 0;
      this.disableBrake = true;
    } else if (this.car.currentSpeed >= this.car.maxSpeed) {
      this.car.currentSpeed = this.car.maxSpeed;
      this.disableThrottle = true;
    }
  }

  public onBrake(drive: number) {
    this.car.currentSpeed -= this.getDelta(drive);
    this.checkLimits();
  }

  public onThrottle(drive: number) {
    this.car.currentSpeed += this.getDelta(drive);
    this.checkLimits();
  }

  private getDelta = (drive: number) =>
    drive + (this.car.maxSpeed - this.car.currentSpeed) / 10;
}
