import React, { useEffect, useState } from "react";
import { Grid, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// @mui material components
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Routes
import routes from "routes";

// Images
import bgImage from "assets/images/view-student.jpg";
import MKTypography from "components/MKTypography";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import HttpCommon from "utils/http-common";
import EditDialog from "./components/EditDialog";
import ConfirmationDialog from "./components/ConfirmationDialog";
import message from "utils/messages";

// const rows = [{ id: 1, name: "Snow", address: "Jon", conatctNo: 14, dob: "231325146" }];

function ViewStudent() {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Full Name",
      width: 150,
      editable: false,
    },
    {
      field: "address",
      headerName: "Address",
      width: 150,
      editable: false,
    },
    {
      field: "contactNo",
      headerName: "Contact No",
      width: 110,
      editable: false,
    },
    {
      field: "dob",
      headerName: "Birthday",
      width: 160,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // dont select this row after clicking

          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach((c) => (thisRow[c.field] = params.row[c.field]));
          setSelectedRow(thisRow);
          console.log("Edit clicked on row: ", thisRow);
          setOpen(true);
          // Place your edit logic here
        };

        const onDeleteClick = (e) => {
          e.stopPropagation(); // dont select this row after clicking

          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach((c) => (thisRow[c.field] = params.row[c.field]));
          setSelectedRow(thisRow);
          console.log("Delete clicked on row: ", thisRow);
          setOpenConfirmation(true);
          // Place your edit logic here
        };

        return (
          <>
            <Grid container direction="row">
              <IconButton onClick={onClick}>
                <EditIcon color="info" sx={{ fontSize: 400 }} />
              </IconButton>
              <IconButton onClick={onDeleteClick}>
                <DeleteForeverIcon color="error" sx={{ fontSize: 400 }} />
              </IconButton>
            </Grid>
          </>
        );
      },
    },
  ];

  const deleteStudent = async () => {
    try {
      const response = await HttpCommon.delete(`/api/student/${selectedRow.id}`);
      console.log(response);
      setOpenConfirmation(false);
      message.addMessage({
        title: "Succesful!",
        msg: "Student Delete Succefully",
        type: "success",
      });
      getStudentData();
    } catch (error) {
      console.error("Failed to delete student data:", error);
    }
  };

  const getStudentData = async () => {
    try {
      const response = await HttpCommon.get(`/api/student`);
      console.log(response);
      setStudents(response.data);
    } catch (error) {
      console.error("Failed to fetch student data:", error);
    }
  };

  useEffect(() => {
    getStudentData();
  }, []);
  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "internal",
          route: "/pages/authentication/sign-in",
          label: "sign in",
          color: "info",
        }}
      />
      <MKBox bgColor="white">
        <MKBox
          minHeight="40rem"
          width="100%"
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.dark.main, 0.1),
                rgba(gradients.dark.state, 0.2)
              )}, url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Container>
            <Grid container item xs={12} lg={7} justifyContent="center">
              <MKTypography
                variant="h1"
                color="dark"
                mt={-6}
                mb={1}
                sx={({ breakpoints, typography: { size } }) => ({
                  [breakpoints.down("md")]: {
                    fontSize: size["3xl"],
                  },
                })}
              >
                View Student
              </MKTypography>
              <MKTypography
                variant="body2"
                color="dark"
                textAlign="center"
                px={{ xs: 6, lg: 12 }}
                mt={1}
              >
                Access student names, IDs, addresses, and dates of birth in our &apos;View
                Student&apos; section. Efficiently search and review essential information to keep
                track of every student&apos;s details.
              </MKTypography>
            </Grid>
          </Container>
        </MKBox>
        <Card
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mt: -8,
            mb: 4,
            backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
            backdropFilter: "saturate(200%) blur(30px)",
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            xs={12}
            py={6}
          >
            <MKTypography variant="h3">Student Detail</MKTypography>
            <MKTypography component="span" variant="body2" color="text">
              Staff members can view and change student details.
            </MKTypography>
            <Grid item xs={12} md={12} my={2}>
              <MKBox sx={{ width: "100%" }}>
                <DataGrid
                  rows={students}
                  autoHeight
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5, 10, 25]}
                  checkboxSelection
                  disableRowSelectionOnClick
                />
              </MKBox>
            </Grid>
          </Grid>

          {/* <Profile />
          <Posts /> */}
        </Card>
        {/* <Contact />
        <Footer /> */}
      </MKBox>
      <EditDialog
        data={selectedRow}
        open={open}
        setOpen={setOpen}
        getStudentData={getStudentData}
      />
      <ConfirmationDialog
        open={openConfirmation}
        setOpen={setOpenConfirmation}
        onConfirm={deleteStudent}
        msg="If you click Yes this student will delete permenently."
      />
    </>
  );
}

export default ViewStudent;
