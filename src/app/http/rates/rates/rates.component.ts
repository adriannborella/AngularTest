import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RateByDate } from '../models/RateByDate';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styles: []
})
export class RatesComponent implements OnInit {
  private urlapi = 'https://api.exchangeratesapi.io/latest';
  private ratesByDateApi = 'https://api-base.herokuapp.com/api/pub/rates';

  public currentEuroRates: any = null;
  public ratesByDate: RateByDate[] = null;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getCurrentEuroRates();
  }

  public postRatesByDate() {
    const ratesByDate: RateByDate[] = this.transformExchangeRates();
    ratesByDate.forEach(rate =>
      this.httpClient.post<RateByDate>(this.ratesByDateApi, rate).subscribe()
    );
  }

  public getRatesByDate() {
    this.httpClient
      .get<RateByDate[]>(this.ratesByDateApi)
      .subscribe(apiResult => (this.ratesByDate = apiResult));
  }

  public deleteRatesByDate() {
    this.httpClient.delete(this.ratesByDateApi).subscribe();
  }

  private transformExchangeRates(): RateByDate[] {
    const currentDate = this.currentEuroRates.date;
    const currentRates = this.currentEuroRates.rates;
    const ratesByDate = Object.keys(currentRates).map((keyRate: string) => ({
      date: currentDate,
      currency: keyRate,
      euros: currentRates[keyRate]
    }));
    return ratesByDate;
  }

  private getCurrentEuroRates() {
    const currencies = 'USD,GBP,CHF,JPY';
    const url = this.urlapi + '?symbols=' + currencies;
    console.log(url);
    this.httpClient.get(url).subscribe(apiData => (this.currentEuroRates = apiData));
  }
}
