"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { DataTable } from "primereact/datatable";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef, //if using TypeScript (optional, but recommended)
} from "material-react-table";
import { Column } from "primereact/column";

//If using TypeScript, define the shape of your data (optional, but recommended)
interface Person {
  id: number;
  name: string;
  age: number;
}

//mock data - strongly typed if you are using TypeScript (optional, but recommended)
const data: Person[] = [
  {
    id: 1,
    name: "John",
    age: 30,
  },
  {
    id: 2,
    name: "Sara",
    age: 25,
  },
  {
    id: 3,
    name: "Michael",
    age: 40,
  },
  {
    id: 4,
    name: "Jessica",
    age: 22,
  },
  {
    id: 5,
    name: "David",
    age: 35,
  },
  {
    id: 6,
    name: "Emily",
    age: 28,
  },
  {
    id: 7,
    name: "Daniel",
    age: 32,
  },
  {
    id: 8,
    name: "Sophia",
    age: 27,
  },
  {
    id: 9,
    name: "James",
    age: 45,
  },
  {
    id: 10,
    name: "Olivia",
    age: 29,
  },
  {
    id: 11,
    name: "Robert",
    age: 50,
  },
  {
    id: 12,
    name: "Isabella",
    age: 24,
  },
  {
    id: 13,
    name: "William",
    age: 33,
  },
  {
    id: 14,
    name: "Mia",
    age: 26,
  },
  {
    id: 15,
    name: "Joseph",
    age: 38,
  },
  {
    id: 16,
    name: "Charlotte",
    age: 31,
  },
  {
    id: 17,
    name: "Thomas",
    age: 36,
  },
  {
    id: 18,
    name: "Amelia",
    age: 23,
  },
  {
    id: 19,
    name: "Charles",
    age: 42,
  },
  {
    id: 20,
    name: "Evelyn",
    age: 21,
  },
  {
    id: 21,
    name: "Christopher",
    age: 34,
  },
  {
    id: 22,
    name: "Abigail",
    age: 37,
  },
  {
    id: 23,
    name: "Henry",
    age: 39,
  },
  {
    id: 24,
    name: "Grace",
    age: 27,
  },
  {
    id: 25,
    name: "Alexander",
    age: 41,
  },
  {
    id: 26,
    name: "Victoria",
    age: 30,
  },
  {
    id: 27,
    name: "Samuel",
    age: 33,
  },
  {
    id: 28,
    name: "Ava",
    age: 22,
  },
  {
    id: 29,
    name: "Benjamin",
    age: 35,
  },
  {
    id: 30,
    name: "Lily",
    age: 28,
  },
  {
    id: 31,
    name: "Matthew",
    age: 32,
  },
  {
    id: 32,
    name: "Ella",
    age: 24,
  },
];

const rows: GridRowsProp = data;

const columns: GridColDef[] = [
  { field: "age", headerName: "Name", width: 150 },
  { field: "name", headerName: "Age", width: 150 },
];

export default function Home() {
  //column definitions - strongly typed if you are using TypeScript (optional, but recommended)
  const mrtColumns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "name", //simple recommended way to define a column
        header: "Name",
        // muiTableHeadCellProps: { style: { color: "green" } }, //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorFn: (originalRow) => originalRow.age, //alternate way
        id: "age", //id required if you use accessorFn instead of accessorKey
        header: "Age",
        //  Header: <i style={{ color: "red" }}>Age</i>, //optional custom markup
        Cell: ({ cell }) => <i>{cell.getValue<number>().toLocaleString()}</i>, //optional custom cell render
      },
    ],
    []
  );

  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns: mrtColumns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: true, //enable some features
    enableColumnOrdering: true, //enable a feature for all columns
    enableColumnPinning: true, //enable a feature for all columns
    enableGlobalFilter: false, //turn off a feature
  });

  return (
    <main className={styles.main}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <h1>MUIX DataGrid</h1>
          <ul>
            <li>Pin and column sort is only available in pro</li>
          </ul>
          <DataGrid rows={rows} columns={columns} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <h1>MaterialReactTable</h1>
          <ul>
            <li>Has pin and column sort</li>
          </ul>
          <MaterialReactTable table={table} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <h1>primereact DataTable</h1>
          <ul>
            <li>Has column sort, but no pin</li>
          </ul>
          <DataTable
            value={data}
            columnResizeMode="expand"
            resizableColumns
            reorderableColumns
            showGridlines
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column field="name" header="Name" sortable></Column>
            <Column field="age" header="Age" sortable></Column>
          </DataTable>
        </div>
      </div>
    </main>
  );
}
