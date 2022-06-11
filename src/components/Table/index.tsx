import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { Table as AntTable, Empty } from 'antd';
import useQuery from 'hooks/useQuery';

const Table = ({ loading, total, ...props }) => {
  const [searchQuery, setSearchQuery] = useQuery();
  const { order, orderBy, limit, page } = searchQuery;
  let columns = [];
  if (order && orderBy && !_isEmpty(props.columns)) {
    columns = props.columns.map((col) => {
      if (col.key === orderBy) {
        return { ...col, defaultSortOrder: order };
      }
      return col;
    });
  } else {
    columns = props.columns;
  }

  const handleTableChange = (pagination, filter, sorter) => {
    setSearchQuery({
      ...searchQuery,
      ...filter,
      page: pagination.current,
      limit: pagination.pageSize,
      orderDirection: sorter.order === 'ascend' ? 'asc' : 'desc',
      orderBy: _get(sorter, 'columnKey'),
    });
  };

  return (
    <>
      <AntTable
        {...props}
        loading={{
          spinning: loading,
        }}
        locale={{
          emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No data" />,
        }}
        pagination={{
          pageSize: Number(limit),
          total,
          showTotal: (total, range) => `${range[0]}-${range[1]} / ${total}`,
          current: Number(page),
        }}
        columns={columns}
        onChange={handleTableChange}
      />
    </>
  );
};

Table.propTypes = {
  columns: PropTypes.array,
  search: PropTypes.object,
  loading: PropTypes.bool,
  total: PropTypes.number,
};
export default memo(Table);
