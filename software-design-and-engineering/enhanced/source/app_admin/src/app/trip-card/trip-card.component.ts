import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent implements OnInit {
  @Input('trip') trip!: Trip;
  @Output() tripDeleted = new EventEmitter<string>();

  constructor(
    private router: Router,
    private tripDataService: TripDataService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
  }

  public editTrip(trip: Trip): void {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  public deleteTrip(trip: Trip): void {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${trip.name}?`
    );

    if (!confirmed) {
      return;
    }

    this.tripDataService.deleteTrip(trip.code)
      .subscribe({
        next: () => {
          this.tripDeleted.emit(trip.code);
        },
        error: (error: any) => {
          console.log('Error deleting trip: ' + error);
        }
      });
  }

  public canEditTrips(): boolean {
    return this.authenticationService.canEditTrips();
  }

  public canDeleteTrips(): boolean {
    return this.authenticationService.canDeleteTrips();
  }
}