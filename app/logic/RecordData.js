class RecordData {
  constructor() {
    this.records = [];

    let recordString = '[]';
    this.records.push(recordString);

    recordString = `[{ "val1": 100, "cat": "a", "cat2": "a1", "cat3": "x", "date": "2016-01-01", "month": "2016-01", "day": "01" },
{ "val1": 200, "cat": "a", "cat2": "a2", "cat3": "x", "date": "2016-01-01", "month": "2016-01", "day": "01" },
{ "val1": 100, "cat": "a", "cat2": "a2", "cat3": "y", "date": "2016-01-01", "month": "2016-01", "day": "01" },
{ "val1": 200, "cat": "a", "cat2": "a3", "cat3": "y", "date": "2016-01-01", "month": "2016-01", "day": "01" },
{ "val1": 400, "cat": "a", "cat2": "a2", "cat3": "y", "date": "2016-01-02", "month": "2016-01", "day": "02" },
{ "val1": 150, "cat": "a", "cat2": "a1", "cat3": "x", "date": "2016-01-03", "month": "2016-01", "day": "03" },
{ "val1": 300, "cat": "b", "cat2": "b1", "cat3": "x", "date": "2016-01-02", "month": "2016-01", "day": "02" },
{ "val1": 200, "cat": "c", "cat2": "c1", "cat3": "y", "date": "2016-01-03", "month": "2016-01", "day": "03" },
{ "val1": 1000, "cat": "c", "cat2": "c1", "cat3": "x", "date": "2016-01-03", "month": "2016-01", "day": "03" },
{ "val1": 100, "cat": "c", "cat2": "c1", "cat3": "x", "date": "2016-01-03", "month": "2016-01", "day": "03" }]`;
    this.records.push(recordString);
  }


  getAt(index) {
    return this.records[index];
  }
}

export default RecordData;
