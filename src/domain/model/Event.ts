export default class Event {
  get opening(): boolean {
    return this._opening;
  }

  get recurring(): boolean {
    return this._recurring;
  }

  get startDate(): Date {
    return this._startDate;
  }

  get endDate(): Date {
    return this._endDate;
  }
  /*Properties : opening, recurring, startDate, endDate */
  private readonly _opening: boolean;
  private readonly _recurring: boolean;
  private readonly _startDate: Date;
  private readonly _endDate: Date;

  constructor(
    opening: boolean,
    recurring: boolean,
    startDate: Date,
    endDate: Date
  ) {
    this._opening = opening;
    this._recurring = recurring;
    this._startDate = startDate;
    this._endDate = endDate;
  }
}
