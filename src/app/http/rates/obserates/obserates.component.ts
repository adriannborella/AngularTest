import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, share, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { RateByDate } from '../models/RateByDate';
import { ExchangeRates } from '../models/ExchangeRates';


@Component({
  selector: 'app-obserates',
  templateUrl: './obserates.component.html',
  styles: []
})
export class ObseratesComponent implements OnInit {
  private ratesApi = 'https://api.exchangeratesapi.io/latest';
  public currentEuroRates$: Observable<any> = null;
  public ratesByDate$: Observable<RateByDate[]> = null;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getCurrentEuroRates()
  }

  private getCurrentEuroRates() {
    const url = `${this.ratesApi}?symbols=USD,GBP,CHF,JPY`;
    this.currentEuroRates$ = this.httpClient.get<ExchangeRates>(url).pipe(share());
    this.ratesByDate$ = this.currentEuroRates$.pipe(
      tap(d => console.log(d)),
      map(this.transformData),
      tap(t => console.log(t))
    );
  }
  private transformData(exchangeRates: ExchangeRates): RateByDate[] {
    const currentDate = exchangeRates.date;
    const currentRates = exchangeRates.rates;
    const ratesByDate = Object.keys(currentRates).map((keyRate: string) => ({
      date: currentDate,
      currency: keyRate,
      euros: currentRates[keyRate]
    }));
    return ratesByDate;
  }

}
