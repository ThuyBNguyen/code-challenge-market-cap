import React, { useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { useRouter } from 'next/router';
import { getCoinDetailRequest } from 'providers/CoinsProvider/slice';
import Layout from 'components/Layout';
import { useAppDispatch, useAppSelector } from 'store';
import Helper from 'utils/helpers';
require('./styles.less');

const CoinDetail = (): JSX.Element => {
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useAppDispatch();
  const { detail } = useAppSelector((state) => state.coins);

  useEffect(() => {
    if (slug) dispatch(getCoinDetailRequest({ uuid: slug }));
  }, [dispatch, slug]);

  const renderMarketInfo = (title: string, content: string): JSX.Element => {
    return (
      <div className="market-info">
        <div className="title">{title}</div>
        <div className="content">{content}</div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="coin-detail">
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/coins">All cryptocurrencies</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{detail.name}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="basic-info">
          <div className="name-rank-container">
            <div className="name-container">
              <img src={detail.iconUrl} />
              <div className="name">{detail.name}</div>
              <div className="symbol">{detail.symbol}</div>
            </div>
            <div className="rank">Rank #{detail.rank}</div>
          </div>
          <div className="price-container">
            <div className="coin-name">{detail.name} price</div>
            <div className="price-change-container">
              <div className="price">Price: {Helper.currencyFormatter(Number(detail.price))}</div>
              <div className={`change ${Number(detail.change) > 0 ? 'increase' : 'decrease'}`}>
                {detail.change}%
              </div>
            </div>
          </div>
        </div>
        <div className="market-info-container">
          {renderMarketInfo('MarketCap', detail.marketCap)}
          {renderMarketInfo('24hVolumne', Helper.currencyFormatter(Number(detail['24hVolume'])))}
          {renderMarketInfo('number of exchange', detail.numberOfExchanges)}
          {renderMarketInfo('number of market', detail.numberOfMarkets)}
        </div>
        <div className="description-container">
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: detail.description }}
          ></div>
          <div>
            <a href={detail.websiteUrl} target="_blank" rel="noreferrer">
              Visit website
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoinDetail;
