"use client";

import React, { useEffect, useState } from "react";
import Pagination from "./Pagniation";
import Paragraph from "./Paragraph";

interface TableColumn {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  itemsPerPage?: number;
  containerClassName?: string;
  title?: string;
  description?: string;
  headerRight?: React.ReactNode;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  itemsPerPage = 10,
  containerClassName = "",
  title,
  headerRight,
  description,
}) => {

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const totalPages = Math.ceil(
    data.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedData = data.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div
      className={`w-full border border-border-white rounded-lg bg-white overflow-hidden ${containerClassName}`}
    >
      {title && (
        <div className="px-5 py-4 border-b border-border-white">
          <div className="flex justify-between items-center">
            <Paragraph bold xl mainblack>
              {title}
            </Paragraph>
            {headerRight && <div>{headerRight}</div>}
          </div>
          <Paragraph sm gray>
            {description}
          </Paragraph>
        </div>
      )}

      <div className="overflow-hidden w-full  min-w-0">
        <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">

          <table className="min-w-full">

            <thead className="bg-slate-50 py-2.5">

              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={`px-4 py-4 text-xs font-semibold uppercase text-gray whitespace-nowrap ${index === columns.length - 1 ? "text-right" : "text-left"}`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>

            </thead>

            <tbody>

              {paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-light-orange transition-all duration-300 curs or-default"
                >
                  {columns.map((column, colIndex) => (

                    <td
                      key={colIndex}
                      className={`px-4 py-3.5 whitespace-nowrap ${colIndex === columns.length - 1 ? "text-right" : "text-left"}`}
                    >
                      {column.render ? (
                        column.render(row[column.key], row)
                      ) : column.key === "status" ? (
                        <span
                          className={`
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-medium
                          ${row[column.key] === "Active"
                              ? "bg-green/10 text-green"
                              : row[column.key] === "Inactive"
                                ? "bg-red/10 text-red"
                                : "bg-off-white text-main-gray"
                            }
                        `}
                        >
                          {row[column.key]}
                        </span>
                      ) : column.key === "badge" ? (

                        <span
                          className={`
                          px-3
                          py-1
                          rounded-md
                          text-xs
                          font-semibold
                          ${row[column.key] === "CHECKED IN"
                              ? "bg-green/10 text-green"
                              : row[column.key] === "VACANT"
                                ? "bg-gray-100 text-main-gray"
                                : "bg-red/10 text-red"
                            }
                        `}
                        >
                          {row[column.key]}
                        </span>

                      ) : column.key === "action" ? (

                        <button
                          className="px-4 py-2 rounded-lg border border-off-white text-sm font-medium hover:border-orange hover:text-orange transition-all duration-300"
                        >
                          {row[column.key]}
                        </button>

                      ) : (
                        <span className="text-sm text-main-black">
                          {row[column.key]}
                        </span>
                      )}

                    </td>

                  ))}
                </tr>
              ))}

            </tbody>


          </table>

        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-5 py-4 border-t border-border-white bg-slate-50">

        <Paragraph sm gray>
          Showing{" "}
          {startIndex + 1}-
          {Math.min(
            startIndex + itemsPerPage,
            data.length
          )}{" "}
          of {data.length} rooms
        </Paragraph>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={(page) => setCurrentPage(page)}
        />

      </div>

    </div>
  );
};

export default Table;