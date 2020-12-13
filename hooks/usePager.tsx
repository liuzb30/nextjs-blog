import { useEffect, useState } from "react";
import _ from "lodash";
import Link from "next/link";

type Options = {
  page: number;
  totalPage: number;
};

export function usePager(options: Options) {
  const { page, totalPage } = options;
  const [pages, setPages] = useState([]);

  useEffect(() => {
    let temp: number[] = [];
    temp.push(1);
    temp.push(totalPage);
    for (let i = page - 2; i <= page + 2; i++) {
      temp.push(i);
    }
    temp = _.uniq(temp)
      .sort()
      .filter((i) => i > 0 && i <= totalPage);
    temp = temp.reduce((pre, current) => {
      if (current - pre[pre.length - 1] > 1) {
        pre.push(-1);
      }
      pre.push(current);
      return pre;
    }, []);

    setPages(temp);
  }, [page, totalPage]);
  const pager =
    totalPage > 1 ? (
      <>
        <div className="pager">
          {page > 1 && (
            <Link href={`?page=${page - 1}`}>
              <a>上一页</a>
            </Link>
          )}
          {pages.map((n) =>
            n === -1 ? (
              <span key={n}>...</span>
            ) : (
              <Link href={`?page=${n}`} key={n}>
                <a className={page === n ? "active" : ""}>{n}</a>
              </Link>
            )
          )}
          {page < totalPage && (
            <Link href={`?page=${page + 1}`}>
              <a>下一页</a>
            </Link>
          )}
        </div>
        <style jsx>{`
          .pager {
            margin-top: 10px;
            padding: 10px 0;
          }
          .pager span,
          .pager a {
            margin-right: 10px;
          }
          .pager a {
            padding: 8px;
            border: 1px solid #eee;
            color: #222;
          }
          .pager a.active {
            color: blue;
          }
        `}</style>
      </>
    ) : null;
  return {
    pager,
  };
}
