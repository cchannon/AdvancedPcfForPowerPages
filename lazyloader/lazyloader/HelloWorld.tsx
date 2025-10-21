import * as React from "react";
import {
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridBody,
  DataGridRow,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

type DemoRow = {
  id: number;
  name: string;
  email: string;
};

const columns: TableColumnDefinition<DemoRow>[] = [
  createTableColumn<DemoRow>({
    columnId: "id",
    renderHeaderCell: () => "ID",
    renderCell: (item) => <TableCellLayout>{item.id}</TableCellLayout>,
  }),
  createTableColumn<DemoRow>({
    columnId: "name",
    renderHeaderCell: () => "Name",
    renderCell: (item) => <TableCellLayout>{item.name}</TableCellLayout>,
  }),
  createTableColumn<DemoRow>({
    columnId: "email",
    renderHeaderCell: () => "Email",
    renderCell: (item) => <TableCellLayout>{item.email}</TableCellLayout>,
  }),
];

const rows: DemoRow[] = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
}));

export interface IHelloWorldProps {}

export class HelloWorld extends React.Component<IHelloWorldProps> {
  render(): React.ReactNode {
    return (
      <FluentProvider theme={webLightTheme}>
        <div style={{ height: 500, width: "100%", overflow: "auto" }}>
          <h3>Fluent UI DataGrid Virtualization Demo</h3>
          <DataGrid
            items={rows}
            columns={columns}
            sortable
            resizableColumns
            getRowId={(item) => item.id.toString()}
          >
            <DataGridHeader>
              <DataGridRow>
                {({ renderHeaderCell }) => (
                  <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                )}
              </DataGridRow>
            </DataGridHeader>
            <DataGridBody<DemoRow>>
              {({ item, rowId }) => (
                <DataGridRow<DemoRow> key={rowId}>
                  {({ renderCell }) => (
                    <DataGridCell>{renderCell(item)}</DataGridCell>
                  )}
                </DataGridRow>
              )}
            </DataGridBody>
          </DataGrid>
        </div>
      </FluentProvider>
    );
  }
}
