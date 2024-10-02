import { Table } from "./table-core/table";
import { TableOptions } from "./types/table.types";

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
    density: 2.16,
    viscosity: 1.5,
    packaging: "Bag",
    packSize: 25,
    unit: "kg",
    quantity: 100,
  },
  {
    id: 2,
    chemicalName: "Ethanol",
    vendor: "BioSolutions",
    density: 0.789,
    viscosity: 1.2,
    packaging: "Drum",
    packSize: 200,
    unit: "L",
    quantity: 500,
  },
  {
    id: 3,
    chemicalName: "Acetic Acid",
    vendor: "ChemSupply",
    density: 1.05,
    viscosity: 1.8,
    packaging: "Bottle",
    packSize: 5,
    unit: "L",
    quantity: 20,
  },
  {
    id: 4,
    chemicalName: "Sodium Hydroxide",
    vendor: "BaseChem",
    density: 2.13,
    viscosity: 2.0,
    packaging: "Bag",
    packSize: 50,
    unit: "kg",
    quantity: 60,
  },
  {
    id: 5,
    chemicalName: "Sulfuric Acid",
    vendor: "AcidInc",
    density: 1.84,
    viscosity: 26.7,
    packaging: "Drum",
    packSize: 250,
    unit: "L",
    quantity: 800,
  },
  {
    id: 6,
    chemicalName: "Potassium Nitrate",
    vendor: "FertiChem",
    density: 2.11,
    viscosity: 2.5,
    packaging: "Bag",
    packSize: 25,
    unit: "kg",
    quantity: 200,
  },
  {
    id: 7,
    chemicalName: "Methanol",
    vendor: "BioSolutions",
    density: 0.791,
    viscosity: 0.59,
    packaging: "Drum",
    packSize: 200,
    unit: "L",
    quantity: 350,
  },
  {
    id: 8,
    chemicalName: "Hydrochloric Acid",
    vendor: "AcidInc",
    density: 1.19,
    viscosity: 1.9,
    packaging: "Bottle",
    packSize: 10,
    unit: "L",
    quantity: 50,
  },
  {
    id: 9,
    chemicalName: "Calcium Carbonate",
    vendor: "MineralSupply",
    density: 2.71,
    viscosity: 0.89,
    packaging: "Bag",
    packSize: 40,
    unit: "kg",
    quantity: 120,
  },
  {
    id: 10,
    chemicalName: "Ammonium Nitrate",
    vendor: "FertiChem",
    density: 1.72,
    viscosity: 1.3,
    packaging: "Bag",
    packSize: 50,
    unit: "kg",
    quantity: 75,
  },
  {
    id: 11,
    chemicalName: "Sodium Bicarbonate",
    vendor: "ChemCo",
    density: 2.2,
    viscosity: 1.0,
    packaging: "Bag",
    packSize: 25,
    unit: "kg",
    quantity: 90,
  },
  {
    id: 12,
    chemicalName: "Glycerol",
    vendor: "BioSolutions",
    density: 1.26,
    viscosity: 1490,
    packaging: "Bottle",
    packSize: 5,
    unit: "L",
    quantity: 30,
  },
  {
    id: 13,
    chemicalName: "Ammonia",
    vendor: "ChemSupply",
    density: 0.73,
    viscosity: 0.28,
    packaging: "Drum",
    packSize: 100,
    unit: "L",
    quantity: 150,
  },
  {
    id: 14,
    chemicalName: "Phosphoric Acid",
    vendor: "AcidInc",
    density: 1.88,
    viscosity: 85,
    packaging: "Drum",
    packSize: 250,
    unit: "L",
    quantity: 400,
  },
  {
    id: 15,
    chemicalName: "Magnesium Sulfate",
    vendor: "MineralSupply",
    density: 2.66,
    viscosity: 1.8,
    packaging: "Bag",
    packSize: 50,
    unit: "kg",
    quantity: 110,
  },
];

const headerWithImage = (text: string) => {
  const headerEle = document.createElement("div");
  headerEle.innerHTML = `
      <div class="flex-center">
      <div>${text}</div>
      <div class="sort-icons">
        <img
          src="/images/descending.svg"
          alt="logo"
        />
        <img
          src="./images/ascending.svg"
          alt="logo"
        />
        <img
          src="./images/sort.svg"
          alt="logo"
        />
      </div>
    </div>
  `;
  return headerEle;
};

const tableOption: TableOptions<Invoice> = {
  columns: [
    {
      key: "id",
      header: "",
      sortable: false,
      editable: false,
      width: 100,
      inputType: null,
    },
    {
      key: "chemicalName",
      header: headerWithImage("Chemical Name"),
      sortable: true,
      editable: true,
      inputType: "text",
    },
    {
      key: "vendor",
      header: headerWithImage("Vendor"),
      sortable: true,
      editable: true,
      inputType: "text",
    },
    {
      key: "density",
      header: (() => {
        const headerEle = document.createElement("div");
        headerEle.innerHTML = `
             <div class="flex-center flex-col flex-gap-1">
      <div class="flex-center">
        <span>Density</span>
        <div class="sort-icons">
          <img
            src="/images/descending.svg"
            alt="logo"
          />
          <img
            src="./images/ascending.svg"
            alt="logo"
          />
          <img
            src="./images/sort.svg"
            alt="logo"
          />
        </div>
      </div>
      <span class="sub-script">g / <var>m<sup>2</sup></var></span>
    </div>
        `;
        return headerEle;
      })(),
      sortable: true,
      editable: true,
      inputType: "number",
    },
    {
      key: "viscosity",
      header: (() => {
        const headerEle = document.createElement("div");
        headerEle.innerHTML = `<div class="flex-center flex-col flex-gap-1">
      <div class="flex-center">
        <span>Viscosity</span>
        <div class="sort-icons">
          <img
            src="/images/descending.svg"
            alt="logo"
          />
          <img
            src="./images/ascending.svg"
            alt="logo"
          />
          <img
            src="./images/sort.svg"
            alt="logo"
          />
        </div>
      </div>
      <span class="sub-script"><var>m<sup>2</sup></var> / s</span>
    </div>
                `;
        return headerEle;
      })(),
      sortable: true,
      editable: true,
      inputType: "number",
    },
    {
      key: "packaging",
      header: headerWithImage("Packaging"),
      sortable: true,
      editable: true,
      inputType: "text",
    },
    {
      key: "packSize",
      header: headerWithImage("Package Size"),
      sortable: true,
      editable: true,
      inputType: "number",
    },
    {
      key: "unit",
      header: headerWithImage("Unit"),
      sortable: true,
      editable: true,
      inputType: "text",
    },
    {
      key: "quantity",
      header: headerWithImage("Quantity"),
      sortable: true,
      editable: true,
      inputType: "number",
    },
  ],
  data: invoiceData,
  itemsPerPage: 10,
  sortable: true,
  editable: true,
  deleteTable: true,
  moveable: true,
  paginationContainer: "paginationContainer",
  persistData: true,
  persistKey: "invoiceTable",
};

document.addEventListener("DOMContentLoaded", () => {
  const invoiceTable = new Table(tableOption);

  const invoiceTableContainer = document.getElementById(
    "invoiceTableContainer"
  );
  if (!invoiceTableContainer) return alert("Table container not found");

  invoiceTableContainer.appendChild(invoiceTable.getTableElement());

  const deleteButton = document.getElementById("delete-button");
  const moveDownButton = document.getElementById("move-down-button");
  const moveUpButton = document.getElementById("move-up-button");
  const showModelButton = document.getElementById("show-model-button");
  const cancelButton = document.getElementById("cancel-button");
  const exportButton = document.getElementById("export-button");
  const model = document.getElementById("model");

  // Add event listeners only if the elements exist
  deleteButton?.addEventListener("click", () =>
    invoiceTable.deleteSelectedRows()
  );
  moveDownButton?.addEventListener("click", () => invoiceTable.moveRow("down"));
  moveUpButton?.addEventListener("click", () => invoiceTable.moveRow("up"));

  showModelButton?.addEventListener("click", () => {
    model?.classList.remove("hide-model");
    model?.classList.add("show-model");
  });

  cancelButton?.addEventListener("click", () => {
    model?.classList.remove("show-model");
    model?.classList.add("hide-model");
  });

  exportButton?.addEventListener("click", () => invoiceTable.exportToCSV());

  const invoiceForm = document.getElementById(
    "invoice-form"
  ) as HTMLFormElement | null;
  invoiceForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(invoiceForm);
    const data: Invoice = {
      id: invoiceTable.getTotalRowsLength() + 1,
      chemicalName: formData.get("chemical-name") as string,
      vendor: formData.get("vendor") as string,
      density: Number(formData.get("density")),
      viscosity: Number(formData.get("viscosity")),
      packaging: formData.get("packaging") as string,
      packSize: Number(formData.get("package-size")),
      unit: formData.get("unit") as string,
      quantity: Number(formData.get("quantity")),
    };

    invoiceTable.addNewRow(data);

    model?.classList.remove("show-model");
    model?.classList.add("hide-model");
    invoiceForm.reset();
  });
});
