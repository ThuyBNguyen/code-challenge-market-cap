import React, { useEffect, useState } from 'react';
import Layout from 'components/Layout';
import Columns from 'components/CoinsList/Columns';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import Search from 'antd/lib/input/Search';
import Table from 'components/Table';
import Helper from 'utils/helpers';
import useDebounced from 'hooks/useDebounced';
import usePrevious from 'hooks/usePrevious';
import { useAppSelector } from 'store';
import { getCoinsListRequest } from 'providers/CoinsProvider/slice';
import useQuery from 'hooks/useQuery';
require('./styles.less');

const CoinsList = (): JSX.Element => {
  const columns = [
    Columns.rank,
    Columns.name,
    Columns.symbol,
    Columns.price,
    Columns.marketCap,
    Columns.change,
  ];
  const [query, setQuery] = useQuery(getCoinsListRequest);
  const { page = 1, limit = 10 } = query;
  query.offset = (Number(page) - 1) * Number(limit);
  const { list, total, stats } = useAppSelector((state) => state.coins);

  const [searchKeyWord, setSearchKeyWord] = useState(undefined);
  const debouncedSearchValue = useDebounced(searchKeyWord, !!searchKeyWord);
  const previousDebouncedValue = usePrevious(debouncedSearchValue);

  const onChangeSearchKeyWord = (data) => {
    setSearchKeyWord(_get(data, 'target.value'));
  };

  useEffect(() => {
    if (!_isEqual(debouncedSearchValue, previousDebouncedValue)) {
      setQuery({ ...query, search: debouncedSearchValue, page: '1' });
    }
  }, [debouncedSearchValue, previousDebouncedValue, query, setQuery]);

  useEffect(() => {
    if (query.search) {
      setSearchKeyWord(query.search);
    }
  }, [query.search]);

  return (
    <Layout>
      <div className="coins-table">
        <div className="stats-container">
          {_get(stats, 'totalCoins') && <div>Total Coins: {stats.totalCoins} </div>}
          {_get(stats, 'total24hVolume') && (
            <div>Total 24h Volumne: {Helper.currencyFormatter(Number(stats.total24hVolume))} </div>
          )}
          {_get(stats, 'totalExchanges') && <div>Total Exchange: {stats.totalExchanges} </div>}
          {_get(stats, 'totalMarketCap') && (
            <div>Total Market Cap: {Helper.currencyFormatter(Number(stats.totalMarketCap))} </div>
          )}
        </div>
        <Search
          allowClear
          placeholder="Search student"
          onChange={onChangeSearchKeyWord}
          value={searchKeyWord || ''}
          className="search-bar"
        />
        <Table
          loading={false}
          columns={columns}
          dataSource={list}
          scroll={{ x: 1000 }}
          rowKey={(data) => data.objectId}
          total={total}
          pagination={{
            pageSize: limit,
            total: total,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
            current: Number(page),
          }}
        />
      </div>
    </Layout>
  );
};

export default CoinsList;
