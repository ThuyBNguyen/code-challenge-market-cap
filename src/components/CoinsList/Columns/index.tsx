/* eslint-disable react/display-name */
import React from 'react';
import Link from 'next/link';
import _get from 'lodash/get';
import { ColumnType } from 'antd/lib/table/interface';
import Helper from 'utils/helpers';

const Columns: {
  rank: ColumnType<string>;
  name: ColumnType<string>;
  symbol: ColumnType<string>;
  price: ColumnType<string>;
  marketCap: ColumnType<string>;
  change: ColumnType<string>;
} = {
  rank: {},
  name: {},
  symbol: {},
  price: {},
  marketCap: {},
  change: {},
};

Columns.rank = {
  title: 'Rank',
  dataIndex: 'rank',
  key: 'rank',
};

Columns.name = {
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: (_, record) => {
    return (
      <Link href={`/coins/${encodeURIComponent(_get(record, 'uuid'))}`}>
        <div className="name-container">
          <img src={_get(record, 'iconUrl', '')} />
          <div className="name">{_get(record, 'name')}</div>
        </div>
      </Link>
    );
  },
};

Columns.symbol = {
  title: 'Symbol',
  dataIndex: 'symbol',
  key: 'symbol',
};

Columns.price = {
  title: 'Price',
  dataIndex: 'price',
  key: 'price',
  render: (price) => Helper.currencyFormatter(price),
  sorter: true,
};

Columns.marketCap = {
  title: 'Market Cap',
  dataIndex: 'marketCap',
  key: 'marketCap',
  render: (price) => Helper.currencyFormatter(price),
  sorter: true,
};

Columns.change = {
  title: 'Change',
  dataIndex: 'change',
  key: 'change',
  sorter: true,
  render: (change) => <div>{change}%</div>,
};

export default Columns;
