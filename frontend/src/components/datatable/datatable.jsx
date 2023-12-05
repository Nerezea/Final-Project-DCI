// npm i material-react-table
// basic example : https://www.material-react-table.com/docs/examples/basic

import { MaterialReactTable, useMaterialReactTable } from "material-react-table";

const DataTable = ({columns,data}) => {
  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MaterialReactTable table={table} />;
};

export default DataTable;
