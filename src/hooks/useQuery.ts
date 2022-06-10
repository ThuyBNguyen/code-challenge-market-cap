import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'store';
import _has from 'lodash/has';
import _isEmpty from 'lodash/isEmpty';
import qs from 'querystring';
import { AnyAction } from 'redux';

/**
 * It is used for getting list easier and setting some common parameters when getting list, such as: page, limit,...
 * @param action is action from redux
 * @param customParameter to set more params in query string beside page, limit
 * @returns
 *
 * Example:
 * const [search] = useQuery(getContactListRequest);
 * const { page = 1, limit = 10 } = search;
 */
const useQuery = (
  action?: (payload: any) => AnyAction,
  customParameter: any = {},
): [Record<string, number | string | string[]>, (data: any, replace?: boolean) => void] => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchObject = router.query;

  const apiCall = useCallback(() => {
    if (action) {
      dispatch(action(searchObject));
    }
  }, [action, searchObject, dispatch]);
  useEffect(() => {
    let reHref = false; // define whether the url lack default parameters
    if (!_has(searchObject, 'page') || !_has(searchObject, 'limit')) {
      searchObject.page = searchObject.page || '1';
      searchObject.limit = searchObject.limit || '10';
      reHref = true;
    }
    if (!_isEmpty(customParameter)) {
      for (const key in customParameter) {
        if (searchObject[key] !== customParameter[key].toString()) {
          searchObject[key] = customParameter[key];
          reHref = true;
        }
      }
    }
    if (reHref) {
      router.replace(`${router.pathname}?${qs.stringify(searchObject)}`);
      return;
    }
    apiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);
  const handleSetSearch = (data, replace = false) => {
    const params = { ...data };
    if (!_has(params, 'page') || !_has(params, 'limit')) {
      params.page = data.page || 1;
      params.limit = data.limit || 10;
    }
    Object.keys(params).forEach((key) =>
      [null, undefined, ''].includes(params[key]) ? delete params[key] : {},
    );
    if (replace) {
      router.replace(`${router.pathname}?${qs.stringify(params)}`);
    } else {
      router.push(`${router.pathname}?${qs.stringify(params)}`);
    }
  };
  return [searchObject, handleSetSearch];
};
export default useQuery;
