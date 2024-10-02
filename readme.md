# Chemical Supplies Management

A reusable, customizable, and feature-rich table component for managing chemical supplies data with advanced functionality.

## Demo Video and Live Site

- **[Live Site](https://table-assignment-gamma.vercel.app/)**  
  Explore the live version of the table component.

- **Video**  
  [![Watch the video](/public/images/app-big.png)](/public/demo-video.mp4)

- **Image**
  ![view](/public/images/app-big.png)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Quick Start](#quick-start)
- [Component Structure](#component-structure)
- [Configuration](#configuration)
- [API Reference](#api-reference)
  - [Table Class](#table-class)
  - [TableOptions Interface](#tableoptions-interface)
  - [TableColumn Interface](#tablecolumn-interface)
- [Developer Contact](#developer-contact)

## Overview

The **Chemical Supplies Management** project provides a powerful and flexible table component designed to manage chemical supplies data. With features like sortable columns, inline editing, data persistence, and export functionality, this component can be easily integrated into various projects requiring advanced table management features.

## Features

- **Dynamic Data Handling:** Supports various data types and structures for flexible integration.
- **Column Sorting:** Clickable column headers allow for sorting data.
- **Inline Editing:** Double-click on table cells to edit data directly within the table.
- **Row Management:**
  - Add new rows
  - Delete selected rows
  - Move rows up or down
- **Pagination:** Easily navigate through large datasets with built-in pagination.
- **Data Persistence:** Automatically saves table data to local storage (optional, can be disabled).
- **Export to CSV:** Export table data into a CSV file with a single click.
- **Progressive Web App (PWA):** Installable as a PWA, enabling offline functionality.
- **Responsive Design:** Optimized for different screen sizes to ensure usability across devices.

## Tech Stack

- **Frontend:** HTML5, CSS3, TypeScript

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Sujeet76/table-assignment.git
   ```

2. Navigate to the project directory:

   ```bash
   cd table-assignment.git
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   This will launch the project locally. Open your browser and navigate to `http://localhost:5173`.

## Usage

### Quick Start

1. **Define Your Data Structure:**

   Define your table's data interface (e.g., `Invoice`) and populate it with data:

   ```ts
   interface Invoice {
     id: number;
     chemicalName: string;
     vendor: string;
     density: number;
     viscosity: number;
     packaging: string;
     packSize: number;
     unit: string;
     quantity: number;
   }

   const invoiceData: Invoice[] = [
     {
       id: 1,
       chemicalName: "Sodium Chloride",
       vendor: "ChemCo",
       density: 2.17,
       viscosity: 1.002,
       packaging: "Bottle",
       packSize: 500,
       unit: "g",
       quantity: 100,
     },
     // ...more data
   ];
   ```

2. **Configure the Table Options:**

   Set up your table configuration:

   ```ts
   const tableOptions: TableOptions<Invoice> = {
     columns: [
       { key: "id", header: "ID", sortable: false, editable: false },
       {
         key: "chemicalName",
         header: "Chemical Name",
         sortable: true,
         editable: true,
       },
       { key: "vendor", header: "Vendor", sortable: true, editable: true },
       // ... other columns
     ],
     data: invoiceData,
     itemsPerPage: 10,
     sortable: true,
     editable: true,
     paginationContainer: "paginationContainer",
     persistData: true,
     persistKey: "invoiceTable",
   };
   ```

3. **Create and Display the Table:**

   Instantiate the `Table` class and append it to the DOM:

   ```ts
   const invoiceTable = new Table(tableOptions);

   const container = document.getElementById("tableContainer");
   container?.appendChild(invoiceTable.getTableElement());
   ```

## Component Structure

- **table-core/**: Contains the core logic for the table component.
- **types/**: Holds the TypeScript type definitions and interfaces used across the project.
- **main.ts**: The main entry point and example usage of the table component.
- **style.css**: Basic styles for the table and the overall application.

## Configuration

The table component is highly configurable and can be adapted for various data structures. Below is an example configuration:

```ts
const tableOptions: TableOptions<Invoice> = {
  columns: [
    { key: "id", header: "ID", sortable: false, editable: false },
    {
      key: "chemicalName",
      header: "Chemical Name",
      sortable: true,
      editable: true,
    },
    { key: "vendor", header: "Vendor", sortable: true, editable: true },
    // Additional columns for density, viscosity, etc.
  ],
  data: invoiceData,
  itemsPerPage: 10,
  sortable: true,
  editable: true,
  paginationContainer: "paginationContainer",
  persistData: true,
  persistKey: "invoiceTable",
};
```

## API Reference

### Table Class

#### Constructor

```ts
constructor(options: TableOptions<T>)
```

Creates a new `Table` instance using the provided configuration options.

#### Public Methods

- **`deleteSelectedRows()`**: Deletes all selected rows from the table.
- **`moveRow(direction: "up" | "down")`**: Moves the currently selected row up or down.
- **`addNewRow(data: T)`**: Adds a new row with the provided data.
- **`getTotalRowsLength()`**: Returns the total number of rows in the table.
- **`exportToCSV(filename?: string)`**: Exports the current table data to a CSV file.
- **`getTableElement()`**: Returns the `HTMLTableElement` representing the table.

### TableOptions Interface

```ts
interface TableOptions<T> {
  columns: TableColumn<T>[];
  data: T[];
  itemsPerPage?: number;
  sortable?: boolean;
  editable?: boolean;
  paginationContainer?: string;
  persistData?: boolean;
  persistKey?: string;
}
```

### TableColumn Interface

```ts
interface TableColumn<T> {
  key: keyof T;
  header: string | HTMLElement;
  sortable: boolean;
  editable: boolean;
  inputType?: string | null; // Determines the input type for editable cells
}
```

## Developer Contact

- **Email:** ksujeetkumar7678@gmail.com
- **GitHub:** [github.com/Sujeet76](https://github.com/Sujeet76)
- **LinkedIn:** [linkedin.com/in/sujeetkumar-tech](www.linkedin.com/in/sujeetkumar-tech)
