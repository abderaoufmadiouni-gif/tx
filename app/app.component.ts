import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  bookingForm: FormGroup;
  simulationResult: any = null;

  constructor(private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      pickup: ['', Validators.required],
      destination: ['', Validators.required],
      date: [new Date(), Validators.required],
      time: ['12:00', Validators.required],
      isRoundTrip: [false],
      passengers: [1, [Validators.required, Validators.min(1)]],
      luggage: [0, [Validators.required, Validators.min(0)]],
      distance: [0] // Rempli via l'API Google
    });
  }

  ngOnInit() {}

  // Simulation du calcul de distance (à lier avec Google Distance Matrix)
  calculateDistance() {
    // Ici, vous appelleriez l'API Google pour obtenir la distance réelle
    // Pour l'exemple, on simule 15km
    this.bookingForm.patchValue({ distance: 15 });
  }

  simulate() {
    const val = this.bookingForm.value;
    const distance = val.distance;
    const [hours, minutes] = val.time.split(':').map(Number);
    const date = new Date(val.date);
    const day = date.getDay(); // 0 = Dimanche

    // 1. Déterminer le tarif (Nuit/Dimanche/Férié)
    const isNight = hours >= 19 || hours < 7;
    const isSunday = day === 0;
    const isSpecial = isNight || isSunday; // Simplifié (ajouter les jours fériés via une lib)

    let pricePerKm = 0;
    if (isSpecial) {
      pricePerKm = val.isRoundTrip ? 1.5 : 3;
    } else {
      pricePerKm = val.isRoundTrip ? 1 : 2;
    }

    // 2. Calcul du prix de base
    let totalBase = (distance * pricePerKm) + 3; // +3€ prise en charge
    if (totalBase < 8) totalBase = 8;

    // 3. Frais passagers (à partir du 5ème)
    const extraPassengersCost = val.passengers >= 5 ? (val.passengers - 4) * 4 : 0;

    // 4. Frais bagages (3 gratuits par personne, puis 2€/bagage)
    const freeLuggageAllowance = val.passengers * 3;
    const extraLuggage = Math.max(0, val.luggage - freeLuggageAllowance);
    const luggageCost = extraLuggage * 2;

    this.simulationResult = {
      ...val,
      isSpecial,
      luggageCost,
      total: totalBase + extraPassengersCost + luggageCost
    };
  }
}
