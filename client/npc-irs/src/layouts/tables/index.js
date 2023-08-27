import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import MyTables from "../../myCode/components/MyTables/MyTables";
import MDBox from "../../components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDTypography from "../../components/MDTypography";
import MyNavbar from "../../myCode/components/MyNavbar/MyNavbar";

function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  return (
    <DashboardLayout>
      {/*<DashboardNavbar />*/}
      <MyNavbar />
      <MDBox pt={6} pb={3}>
        <MyTables />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
