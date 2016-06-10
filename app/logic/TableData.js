class TableData {
  constructor(pivot, options) {
    this.pivot = pivot;
    this.options = options;
  }

  create() {
    if (!this.pivot) {
      return null;
    }

    const headerRows = this.generateTableHeadRow();
    const bodyRows = this.generateTableRows();

    return { headerRows, bodyRows };
  }

  generateTableRows() {
    const rows = [];

    const nestedKeys = this.pivot.getNestedRowKeys();
    const prowAttrs = this.pivot.getRowAttrs();

    const func = (dataset, rowKey = [], fullRowKey = []) => {
      let rowspan = null;
      let colspan = 1;

      const keyObject = { key: dataset.key, style: ['pivot-row-label'] };
      rowKey.push(keyObject);
      fullRowKey.push(dataset.key);

      if (!dataset.children) {
        colspan = 2;
        rows.push({ rowKey, fullRowKey });
      } else {
        rowspan = 0;
        dataset.children.forEach((data, index) => {
          const child = func(data, index === 0 ? rowKey : [], Object.assign([], fullRowKey));
          rowspan += (child.rowspan || 1);

          if (this.options.showSubTotal
            && prowAttrs[data.depth - 1].showSubTotal === true
            && child.colspan !== 2) {
            rowspan ++;
          }
        });

        // total of row key
        if (this.options.showSubTotal && prowAttrs[dataset.depth - 1].showSubTotal === true) {
          rows.push({
            rowKey: [{
              key: `Total of ${dataset.key}`,
              colspan: prowAttrs.length - dataset.depth + 2,
              style: ['pivot-row-label pivot-cat-total-label'],
            }],
            fullRowKey,
          });
        }
      }

      return Object.assign(keyObject, { rowspan, colspan });
    };

    nestedKeys.children.forEach(dataset => func(dataset));

    if (this.options.showTotal) {
      rows.push({
        rowKey: [{
          key: 'Total',
          colspan: prowAttrs.length + 1,
          style: ['pivot-col-total-label'],
        }],
        fullRowKey: [],
      });
    }


    let cols = this.pivot.getSortedColKeys();
    if (this.options.showTotal) {
      cols = cols.concat([[]]);
    }

    rows.forEach((row) => {
      const values = [];

      cols.forEach((colKey) => {
        let vals = this.pivot.values(row.fullRowKey, colKey);
        if (vals === null) {
          vals = [];
          this.pivot.getMeasureAttrs().forEach(() => vals.push(null));
        }
        values.push(vals);
      });

      Object.assign(row, { values });
    });

    return rows;
  }

  generateTableHeadRow() {
    const rows = [];

    const nestedKeys = this.pivot.getNestedColKeys();
    const prowAttrs = this.pivot.getRowAttrs();
    const pcolAttrs = this.pivot.getColAttrs();
    const measures = this.pivot.getMeasureAttrs();

    const func = dataset => {
      let colspan = 1;
      let row = rows[(dataset.depth - 1)];

      if (!row) {
        row = { caption: [], colKey: [] };
        rows.push(row);
      }

      const keyObject = { key: dataset.key };
      row.colKey.push(keyObject);

      if (!dataset.children) {
        colspan = measures.length;
      } else {
        colspan = 0;
        dataset.children.forEach(data => {
          colspan += (func(data).colspan || 1);
        });
      }

      colspan = colspan === 1 ? null : colspan;
      return Object.assign(keyObject, { colspan });
    };

    nestedKeys.children.forEach(data => func(data));

    if (rows.length === 0) {
      rows.push({ caption: [], colKey: [] });
    }

    if (this.options.showTotal) {
      rows[0].colKey.push({
        key: 'Total',
        colspan: measures.length,
        rowspan: pcolAttrs.length || null,
        style: ['pivot-row-total-label'],
      });
    }


    // measures
    let pcols = this.pivot.getColKeys();
    if (this.options.showTotal) {
      pcols = pcols.concat([[]]);
    }

    const row = { caption: [], colKey: [] };
    pcols.forEach(() => {
      measures.forEach(measure => {
        row.colKey.push({ key: measure.name, colspan: null, style: ['pivot-col-label'] });
      });
    });
    rows.push(row);

    // caption
    rows.forEach((data, index) => {
      const caption = data.caption;

      if (index === 0 && prowAttrs.length > 0) {
        caption.push({
          key: null,
          colspan: prowAttrs.length,
          rowspan: pcolAttrs.length,
          style: ['pivot-col-label'],
        });
      }

      if (index === 0 || index < pcolAttrs.length) {
        caption.push({
          key: pcolAttrs.length > 0 ? pcolAttrs[index].id : '',
          colspan: null,
          style: ['pivot-col-label'],
        });
      } else {
        prowAttrs.forEach(attr => {
          caption.push({ key: attr.id, colspan: null, style: ['pivot-col-label'] });
        });
        caption.push({ key: null, colspan: null, style: ['pivot-col-label'] });
      }
    });

    return rows;
  }
}

export default TableData;
