import React, { useEffect, useState } from "react";
import { fakeData } from "../global/fakeTableData";

const Articalqc2Table = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (selectAll) {
      const allArticalIds = fakeData.map((data) => data.ArticalId);
      setSelectedItems(allArticalIds);
    } else {
      setSelectedItems([]);
    }
  }, [selectAll]);

  const handleMasterCheckboxChange = (e) => {
    setSelectAll(e.target.checked);
  };

  const handleCheckboxChange = (e, articalId) => {
    const checked = e.target.checked;

    if (checked) {
      setSelectedItems((prevSelected) => [...prevSelected, articalId]);
    } else {
      setSelectedItems((prevSelected) =>
        prevSelected.filter((item) => item !== articalId)
      );
    }
    setSelectAll(false);
  };

  return (
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleMasterCheckboxChange}
                    />
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    ArticalId
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    ArticalDate
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    Publication Name
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    Headlines
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    Page No
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    PDF Size
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    Reporting Subject
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {fakeData.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={
                          selectAll || selectedItems.includes(data.ArticalId)
                        }
                        onChange={(e) =>
                          handleCheckboxChange(e, data.ArticalId)
                        }
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data.ArticalId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data.ArticalDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data.PublicationName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data.Headlines}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data.PageNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data.PDFSize}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data.ReportingSubject}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articalqc2Table;
