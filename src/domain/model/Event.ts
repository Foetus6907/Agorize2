export default class Event {
  get opening(): boolean {
    return this._opening;
  }

  get recurring(): boolean {
    return this._recurring;
  }

  get startDate(): string {
    return this._startDate;
  }

  get endDate(): string {
    return this._endDate;
  }
  /*Properties : opening, recurring, startDate, endDate */
  private readonly _opening: boolean;
  private readonly _recurring: boolean;
  private readonly _startDate: string;
  private readonly _endDate: string;
  private readonly _id: string;
  private readonly _title: string;

  constructor(
    opening: boolean,
    recurring: boolean,
    startDate: string,
    endDate: string,
    id?: string,
    title?: string
  ) {
    this._opening = opening;
    this._recurring = recurring;
    this._startDate = startDate;
    this._endDate = endDate;

    this._id = id ? id : "";
    this._title = title ? title : "";
  }
}
