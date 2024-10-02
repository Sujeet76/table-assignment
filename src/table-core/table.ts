import { TableOptions, TableColumn } from "../types/table.types";

export class Table<T extends { id: number }> {
  private options: TableOptions<T>;
  private currentPage: number;
  private sortColumn: keyof T | null = null;
  private sortDirection: "asc" | "desc" = "asc";
  private tableElement: HTMLTableElement;
  private paginationContainer: HTMLElement | null = null;
  private itemsPerPage: number;
  private selectedRows: Set<string | number> = new Set();

  constructor(options: TableOptions<T>) {
    this.options = options;
    this.currentPage = 1;
    this.itemsPerPage = options.itemsPerPage || 10;
    this.tableElement = document.createElement("table");
    this.paginationContainer = document.getElementById(
      options.paginationContainer || ""
    );

    this.initializeColumns();
    this.loadPersistedData();
    this.renderTable();
  }

  private initializeColumns() {
    const actionColumn: TableColumn<T> = {
      key: "action",
      header: "Action",
      sortable: false,
      editable: false,
      inputType: null,
    };
    this.options.columns = [actionColumn, ...this.options.columns];
  }

  private persistData() {
    if (this.options.persistData && this.options.persistKey) {
      localStorage.setItem(
        this.options.persistKey,
        JSON.stringify(this.options.data)
      );
    }
  }

  private loadPersistedData(): void {
    if (this.options.persistData && this.options.persistKey) {
      const persistedData = localStorage.getItem(this.options.persistKey);
      if (persistedData) {
        this.options.data = JSON.parse(persistedData);
      }
    }
  }

  private renderTable() {
    this.tableElement.innerHTML = "";
    this.renderTableHeader();
    this.renderTableBody();
    if (this.paginationContainer) this.renderPagination();
    this.attachEventListeners();
  }

  private renderTableHeader() {
    const tableHeader = document.createElement("thead");
    const tableHeaderRow = document.createElement("tr");

    this.options.columns.forEach((column) => {
      const th = document.createElement("th");
      this.setHeaderContent(th, column);
      this.setHeaderAttributes(th, column);
      tableHeaderRow.appendChild(th);
    });

    tableHeader.appendChild(tableHeaderRow);
    this.tableElement.appendChild(tableHeader);
  }

  private setHeaderContent(
    th: HTMLTableCellElement,
    column: TableColumn<T>
  ): void {
    if (typeof column.header === "string") {
      if (column.key === "action") {
        const input = this.createSelectAllCheckbox();
        th.appendChild(input);
      } else {
        th.textContent = column.header;
      }
    } else if (column.header instanceof HTMLElement) {
      th.appendChild(column.header.cloneNode(true));
    }
  }

  private setHeaderAttributes(
    th: HTMLTableCellElement,
    column: TableColumn<T>
  ): void {
    th.setAttribute("data-key", column.key as string);
    if (column.sortable) {
      th.classList.add("sortable");
      th.setAttribute("data-sortable", "true");
    }
  }

  private createSelectAllCheckbox(): HTMLInputElement {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.addEventListener("change", (e) => this.handleSelectAll(e));
    return input;
  }

  private renderTableBody() {
    const tableBody =
      this.tableElement.querySelector("tbody") ||
      document.createElement("tbody");
    tableBody.innerHTML = "";

    const pageData = this.getPaginatedData();

    if (pageData.length === 0) {
      const emptyRow = this.createEmptyRow();
      tableBody.appendChild(emptyRow);
    } else {
      pageData.forEach((item) => {
        const row = this.createTableRow(item);
        tableBody.appendChild(row);
      });
    }
    if (!this.tableElement.contains(tableBody)) {
      this.tableElement.appendChild(tableBody);
    }
  }

  private getPaginatedData(): T[] {
    const startIdx = (this.currentPage - 1) * this.itemsPerPage;
    const endIdx = startIdx + this.itemsPerPage;
    return this.options.data.slice(startIdx, endIdx);
  }

  private createTableRow(item: T): HTMLTableRowElement {
    const row = document.createElement("tr");
    row.setAttribute("data-id", item.id.toString());

    this.options.columns.forEach((column) => {
      const cell = document.createElement("td");
      this.setCellContent(cell, column, item);
      this.setCellAttributes(cell, column);
      row.appendChild(cell);
    });

    return row;
  }

  private createEmptyRow(): HTMLTableRowElement {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.setAttribute("data-empty", "true");
    cell.textContent = "No data";
    row.appendChild(cell);
    return row;
  }

  private setCellContent(
    cell: HTMLTableCellElement,
    column: TableColumn<T>,
    item: T
  ): void {
    if (column.key === "action") {
      const input = this.createRowSelectionCheckbox(item.id);
      cell.appendChild(input);
    } else {
      cell.textContent = item[column.key] as string;
    }
  }

  private setCellAttributes(
    cell: HTMLTableCellElement,
    column: TableColumn<T>
  ): void {
    cell.setAttribute("data-key", column.key as string);
    if (column.editable) {
      cell.setAttribute("data-editable", "true");
    }
  }

  private createRowSelectionCheckbox(id: string | number): HTMLInputElement {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.addEventListener("change", (e) => this.handleRowSelection(e, id));
    return input;
  }

  private getSortedData(): T[] {
    if (!this.sortColumn) return this.options.data;
    const newData = [...this.options.data].sort((a, b) => {
      if (a[this.sortColumn!] < b[this.sortColumn!])
        return this.sortDirection === "asc" ? -1 : 1;
      if (a[this.sortColumn!] > b[this.sortColumn!])
        return this.sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    this.options.data = newData;
    console.log({
      newData,
      oldData: this.options.data,
    });
    return newData;
  }

  private renderPagination(): void {
    if (!this.paginationContainer) return;
    this.paginationContainer.innerHTML = "";

    const totalPages = Math.ceil(this.options.data.length / this.itemsPerPage);

    const prevButton = this.createPaginationButton(
      "Prev",
      this.currentPage === 1
    );
    const pageInfo = this.createPageInfo(totalPages);
    const nextButton = this.createPaginationButton(
      "Next",
      this.currentPage === totalPages
    );

    this.paginationContainer.append(prevButton, pageInfo, nextButton);
  }

  private createPaginationButton(
    text: string,
    disabled: boolean
  ): HTMLButtonElement {
    const button = document.createElement("button");
    button.textContent = text;
    button.id = `${
      this.options.paginationContainer
    }-${text.toLowerCase()}-button`;
    button.disabled = disabled;
    return button;
  }

  private createPageInfo(totalPages: number): HTMLSpanElement {
    const pageInfo = document.createElement("span");
    pageInfo.id = `${this.options.paginationContainer}-page-info`;
    pageInfo.textContent = `Page ${this.currentPage} of ${totalPages}`;
    return pageInfo;
  }

  private attachEventListeners(): void {
    this.attachSortEventListeners();
    this.attachEditEventListeners();
    this.attachPaginationEventListeners();
  }

  private attachSortEventListeners(): void {
    const thead = this.tableElement.querySelector("thead");
    if (!thead) return;
    thead.addEventListener("click", (e) => this.handleSortClick(e));
  }

  private handleSortClick(e: Event): void {
    const target = e.target as HTMLElement;
    const th = target.closest("th");
    if (!th || th.getAttribute("data-sortable") !== "true") return;

    const dataKey = th.getAttribute("data-key") as keyof T;
    this.handleSort(dataKey);
    this.persistData();
  }

  private handleSort(column: keyof T): void {
    const thead = this.tableElement.querySelector("thead");
    if (!thead) return;

    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.resetSortIndicators(thead);
      this.sortColumn = column;
      this.sortDirection = "asc";
    }

    this.updateSortIndicator(thead, column);
    this.getSortedData();
    this.renderTableBody();
  }

  private resetSortIndicators(thead: HTMLTableSectionElement): void {
    thead
      .querySelectorAll("th")
      .forEach((th) => th.removeAttribute("data-sortDirection"));
  }

  private updateSortIndicator(
    thead: HTMLTableSectionElement,
    column: keyof T
  ): void {
    const th = thead.querySelector(`th[data-key="${String(column)}"]`);
    if (th) th.setAttribute("data-sortDirection", this.sortDirection);
  }

  private attachEditEventListeners(): void {
    const tableBody = this.tableElement.querySelector("tbody");
    if (!tableBody) return;
    tableBody.addEventListener("dblclick", (e) => this.handleEditClick(e));
  }

  private handleEditClick(e: Event): void {
    const target = e.target as HTMLTableCellElement;
    if (
      target.tagName === "TD" &&
      target.getAttribute("data-editable") === "true"
    ) {
      this.handleEdit(target);
    }
  }

  private attachPaginationEventListeners(): void {
    if (!this.paginationContainer) return;
    this.paginationContainer.addEventListener("click", (e) =>
      this.handlePaginationClick(e)
    );
  }

  private handlePaginationClick(e: Event): void {
    const target = e.target as HTMLElement;
    if (target.tagName !== "BUTTON") return;

    const totalPages = Math.ceil(this.options.data.length / this.itemsPerPage);
    const prevButton = this.paginationContainer!.querySelector(
      `#${this.options.paginationContainer}-prev-button`
    ) as HTMLButtonElement;
    const nextButton = this.paginationContainer!.querySelector(
      `#${this.options.paginationContainer}-next-button`
    ) as HTMLButtonElement;
    const pageInfo = this.paginationContainer!.querySelector(
      `#${this.options.paginationContainer}-page-info`
    ) as HTMLSpanElement;

    if (!prevButton || !nextButton || !pageInfo) return;

    if (target.textContent === "Prev") {
      this.currentPage--;
    } else if (target.textContent === "Next") {
      this.currentPage++;
    }

    this.updatePaginationButtons(prevButton, nextButton, totalPages);
    pageInfo.textContent = `Page ${this.currentPage} of ${totalPages}`;
    this.renderTableBody();
  }

  private updatePaginationButtons(
    prevButton: HTMLButtonElement,
    nextButton: HTMLButtonElement,
    totalPages: number
  ): void {
    prevButton.disabled = this.currentPage === 1;
    nextButton.disabled = this.currentPage === totalPages;
  }

  private handleSelectAll(e: Event): void {
    const checkbox = e.target as HTMLInputElement;
    const tableBody = this.tableElement.querySelector("tbody");
    if (!tableBody) return;

    const rows = tableBody.querySelectorAll("tr");
    rows.forEach((row) => this.updateRowSelection(row, checkbox.checked));
  }

  private handleRowSelection(e: Event, id: string | number): void {
    const checkbox = e.target as HTMLInputElement;
    const tr = checkbox.closest("tr") as HTMLTableRowElement;
    this.updateRowSelection(tr, checkbox.checked);
    this.updateSelectAllCheckbox();
  }

  private updateRowSelection(
    row: HTMLTableRowElement,
    isSelected: boolean
  ): void {
    const checkbox = row.querySelector("input") as HTMLInputElement;
    const id = row.getAttribute("data-id");
    if (checkbox) checkbox.checked = isSelected;
    row.classList.toggle("selected", isSelected);
    row.setAttribute("aria-selected", isSelected.toString());
    row.setAttribute("data-selected", isSelected.toString());
    this.updateSelectedRows(String(id), isSelected);
  }

  private updateSelectedRows(id: string | number, isSelected: boolean): void {
    if (isSelected) {
      this.selectedRows.add(id);
    } else {
      this.selectedRows.delete(id);
    }
  }

  private updateSelectAllCheckbox(): void {
    const selectAllCheckbox = this.tableElement.querySelector(
      "thead tr input[type='checkbox']"
    ) as HTMLInputElement;
    const visibleRows = this.tableElement.querySelectorAll("tbody tr");
    if (!selectAllCheckbox || !visibleRows.length) return;
    selectAllCheckbox.checked = this.selectedRows.size === visibleRows.length;
  }

  private handleEdit(cell: HTMLTableCellElement): void {
    const originalValue = cell.textContent;
    const input = this.createEditInput(cell);
    const { saveButton, cancelButton } = this.createEditButtons();
    const actionButtonContainer = document.createElement("div");
    actionButtonContainer.classList.add("action-button-container");
    actionButtonContainer.append(saveButton, cancelButton);

    cell.textContent = "";
    cell.append(input, actionButtonContainer);
    input.focus();

    saveButton.addEventListener("click", () =>
      this.handleSaveEdit(cell, input)
    );
    cancelButton.addEventListener("click", () =>
      this.handleCancelEdit(cell, originalValue)
    );
  }

  private createEditInput(cell: HTMLTableCellElement): HTMLInputElement {
    const input = document.createElement("input");
    const key = cell.getAttribute("data-key") as keyof T;
    input.value = cell.textContent || "";
    input.type =
      this.options.columns.find((column) => column.key === key)?.inputType ||
      "text";
    input.required = true;
    if (key === "number") {
      input.min = "1";
    }
    return input;
  }

  private createEditButtons(): {
    saveButton: HTMLButtonElement;
    cancelButton: HTMLButtonElement;
  } {
    const saveButton = document.createElement("button");
    const cancelButton = document.createElement("button");
    saveButton.textContent = "Save";
    cancelButton.textContent = "Cancel";
    saveButton.classList.add("submit-button", "add-cell-button");
    cancelButton.classList.add("cancel-button", "add-cell-button");
    return { saveButton, cancelButton };
  }

  private handleSaveEdit(
    cell: HTMLTableCellElement,
    input: HTMLInputElement
  ): void {
    if (!input.validity.valid) {
      alert("Please fill in required fields");
      return;
    }

    const rowId = cell.parentElement?.getAttribute("data-id");
    const key = cell.getAttribute("data-key") as keyof T;
    if (!rowId || !key) return;

    const item = this.options.data.find((item) => item.id.toString() === rowId);
    if (item) {
      const updatedItem = { ...item, [key]: input.value };
      this.options.data = this.options.data.map((old) =>
        old.id === updatedItem.id ? updatedItem : old
      );
      cell.textContent = input.value;
      this.persistData();
    }
  }

  private handleCancelEdit(
    cell: HTMLTableCellElement,
    originalValue: string | null
  ): void {
    cell.textContent = originalValue;
  }

  public deleteSelectedRows(): void {
    console.log(this.selectedRows);
    if (this.selectedRows.size === 0) return;
    this.options.data = this.options.data.filter(
      (item) => !this.selectedRows.has(String(item.id))
    );
    this.selectedRows.clear();
    this.persistData();
    this.renderTableBody();
    this.renderPagination();
    this.updateSelectAllCheckbox();
  }

  public moveRow(direction: "up" | "down"): void {
    if (this.selectedRows.size === 0) {
      alert("No row selected");
      return;
    }
    if (this.selectedRows.size > 1) {
      alert("Can only move one row at a time");
      return;
    }

    const selectedRowId = this.selectedRows.values().next().value;
    const index = this.options.data.findIndex(
      (item) => String(item.id) === selectedRowId
    );

    if (index === -1) {
      alert("Row not found");
      return;
    }

    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= this.options.data.length) {
      alert("Cannot move further in this direction");
      return;
    }

    // Move the selected row to the new position using splice
    const [movedRow] = this.options.data.splice(index, 1);
    this.options.data.splice(newIndex, 0, movedRow);

    console.log({
      data: this.options.data,
    });

    this.renderTableBody();
    this.reselectedMovedRow(selectedRowId);
    this.persistData();
  }

  private reselectedMovedRow(selectedRowId: string | number): void {
    const selectedRowElement = this.tableElement.querySelector(
      `tr[data-id="${selectedRowId}"]`
    );
    const checkbox = selectedRowElement?.querySelector(
      "input[type='checkbox']"
    ) as HTMLInputElement;
    if (checkbox && selectedRowElement) {
      checkbox.checked = true;
      selectedRowElement.classList.add("selected");
      selectedRowElement.setAttribute("aria-selected", "true");
      selectedRowElement.setAttribute("data-selected", "true");
    }
  }

  public addNewRow(data: T): void {
    this.options.data.unshift(data);
    this.renderTableBody();
    this.persistData();
  }

  public getTotalRowsLength(): number {
    return this.options.data.length;
  }

  public exportToCSV = (filename: string = "table_data.csv") => {
    // remove the html tags and action header
    const headers = this.options.columns
      .filter((column) => column.key !== "action")
      .map((column) => column.key);

    // Get the data rows
    const dataRows = this.options.data.map((item) =>
      this.options.columns
        .filter((column) => column.key !== "action")
        .map((column) => {
          const value = item[column.key as keyof T];
          return typeof value === "string" && value.includes(",")
            ? `"${value}"`
            : value;
        })
    );

    // Combine headers and data
    const csvContent = [
      headers.join(","),
      ...dataRows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    // Create a download link
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  public getTableElement(): HTMLTableElement {
    return this.tableElement;
  }
}
