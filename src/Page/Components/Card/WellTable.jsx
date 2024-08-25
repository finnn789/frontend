import { Box, Button, Badge } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import "./../../../assets/css/ag-grid-theme-builder.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Komponen StatusBadge
function StatusBadge({ value }) {
  let colorScheme = "gray";

  if (value === "Selesai") {
    colorScheme = "green";
  } else if (value === "Proses") {
    colorScheme = "yellow";
  } else if (value === "Menunggu") {
    colorScheme = "orange";
  }

  return (
    <Badge
      colorScheme={colorScheme}
      whiteSpace={"normal"}
      lineHeight={"1.2"}
      padding={"4px 8px"}
      borderRadius={"6px"}
      width={100}
      textAlign={"center"}
      variant="solid"
    >
      {value}
    </Badge>
  );
}

StatusBadge.propTypes = {
  value: PropTypes.string.isRequired,
};

// Komponen ActionButtons
function ActionButtons({ id }) {
  return (
    <Box display="flex" gap="2">
      <Button
        leftIcon={<EditIcon />}
        colorScheme="blue"
        size="sm"
        variant="solid"
      >
        Edit
      </Button>
      <Button leftIcon={<DeleteIcon />} colorScheme="red" size="sm">
        Delete
      </Button>
      <Button
        as={Link} // Gunakan Link dari react-router-dom
        to={`/viewplanning/${id}/`}
        leftIcon={<ViewIcon />}
        colorScheme="green"
        size="sm"
      >
        View
      </Button>
    </Box>
  );
}

ActionButtons.propTypes = {
  id: PropTypes.number.isRequired, // Prop untuk id
};

// Komponen WellTable
const WellTable = () => {
  const columnDefs = [
    {
      headerName: "No",
      field: "no",
      width: 0,
      filter: "agNumberColumnFilter",
    },
    {
      headerName: "Nama Sumur",
      field: "namaSumur",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Tanggal & Mulai",
      field: "tanggalMulai",
      filter: "agDateColumnFilter",
    },
    {
      headerName: "Status",
      field: "status",
      filter: "agTextColumnFilter",
      width: 150, // Atur lebar kolom agar cukup untuk badge
      cellRenderer: StatusBadge,
      cellStyle: { overflow: "visible" }, // Pastikan overflow visible
    },
    {
      headerName: "Aksi",
      field: "id", // Kolom id untuk diteruskan ke ActionButtons
      cellRenderer: (params) => <ActionButtons id={params.value} />, // Kirim id ke ActionButtons
      // cellRenderer: ActionButtons,
    },
  ];

  const rowData = [
    {
      no: 1,
      namaSumur: "Sumur A",
      tanggalMulai: "2024-08-01 08:00",
      status: "Selesai",
      id: 1, // id yang sesuai untuk tiap item
    },
    {
      no: 2,
      namaSumur: "Sumur B",
      tanggalMulai: "2024-08-02 09:00",
      status: "Proses",
      id: 2,
    },
    {
      no: 3,
      namaSumur: "Sumur C",
      tanggalMulai: "2024-08-03 07:30",
      status: "Menunggu",
      id: 3,
    },
    {
      no: 4,
      namaSumur: "Sumur D",
      tanggalMulai: "2024-08-04 10:00",
      status: "Proses",
      id: 4,
    },
    {
      no: 5,
      namaSumur: "Sumur E",
      tanggalMulai: "2024-08-05 11:00",
      status: "Selesai",
      id: 5,
    },
    {
      no: 6,
      namaSumur: "Sumur F",
      tanggalMulai: "2024-08-06 06:00",
      status: "Menunggu",
      id: 6,
    },
  ];

  return (
    <Box
      className="ag-theme-alpine"
      style={{ height: 400, width: "100%" }}
      shadow={"md"}
      rounded={"2xl"}
      p={2}
    >
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={{
          flex: 1,
          minWidth: 100,
          filter: true,
          sortable: true,
        }}
      />
    </Box>
  );
};

export default WellTable;
