import React from "react";
import { Grid } from "@mui/material";

// @mui material components
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Routes
import routes from "routes";

// Images
import bgImage from "assets/images/add-student2.jpg";
import MKTypography from "components/MKTypography";
import Container from "@mui/material/Container";
import StudentForm from "./components/StudentForm";

function AddStudent() {
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
        dark
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
                Add Student
              </MKTypography>
              <MKTypography
                variant="body2"
                color="dark"
                textAlign="center"
                px={{ xs: 6, lg: 12 }}
                mt={1}
              >
                Welcome to our student enrollment portal. Here, you can easily add new students to
                our system, Please fill in the form below with the student&apos;s information, and
                click &apos;Submit&apos; to complete the enrollment process.
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
          <StudentForm />
        </Card>
        {/* <Contact />
        <Footer /> */}
      </MKBox>
    </>
  );
}

export default AddStudent;
