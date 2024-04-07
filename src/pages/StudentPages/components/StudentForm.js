import React, { useEffect, useState } from "react";
import { TextField, Grid } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import MKTypography from "components/MKTypography";
import HttpCommon from "utils/http-common";
import message from "utils/messages";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import MKButton from "components/MKButton";

function StudentForm({ data, handleClose, getStudentData }) {
  const [studentName, setStudentName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    tempErrors.studentName = studentName ? "" : "This field is required.";
    tempErrors.address = address ? "" : "This field is required.";
    tempErrors.contactNumber = contactNumber.match(/^\d{10}$/)
      ? ""
      : "Enter a valid contact number.";
    tempErrors.dateOfBirth = dateOfBirth ? "" : "This field is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const resetfields = () => {
    setStudentName("");
    setAddress("");
    setContactNumber("");
    setDateOfBirth(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (data != undefined) {
        const body = {
          id: data.id,
          name: studentName,
          address: address,
          contactNo: contactNumber,
          dob: dateOfBirth,
        };
        console.log(body);
        HttpCommon.put(`/api/student`, body).then((response) => {
          console.log(response);
          message.addMessage({
            title: "Succesful!",
            msg: "Student Edit Succefully",
            type: "success",
          });
          handleClose();
          getStudentData();
        });
      } else {
        const body = {
          name: studentName,
          address: address,
          contactNo: contactNumber,
          dob: dateOfBirth,
        };
        console.log(body);
        HttpCommon.post(`/api/student`, body).then((response) => {
          console.log(response);
          resetfields();
          message.addMessage({
            title: "Succesful!",
            msg: "Student Added Succefully",
            type: "success",
          });
        });
      }
    } else {
      message.addMessage({
        title: "Error Occured!",
        msg: "Enter all the field correctly",
        type: "danger",
      });
    }
  };

  useEffect(() => {
    const setStudentData = () => {
      if (data != undefined) {
        setStudentName(data.name);
        setAddress(data.address);
        setContactNumber(data.contactNo);
        try {
          const dateForPicker = dayjs(data.dob);
          setDateOfBirth(dateForPicker);
        } catch (error) {
          console.log(error);
        }
      }
    };
    setStudentData();
  }, []);
  return (
    <>
      <Grid container direction="column" justifyContent="center" alignItems="center" xs={12} py={3}>
        <MKTypography variant="h3">Student Form</MKTypography>
        <MKTypography component="span" variant="body2" color="text">
          Please add correct and valid information befor submit.
        </MKTypography>
        <Grid container direction="column" alignItems="center" xs={8} pt={1} spacing={0}>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Grid item xs={12} my={2}>
              <TextField
                fullWidth
                label="Student Full Name"
                variant="outlined"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                error={!!errors.studentName}
                helperText={errors.studentName}
              />
            </Grid>
            <Grid item xs={12} my={2}>
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
            <Grid item xs={12} my={2}>
              <TextField
                fullWidth
                label="Contact Number"
                variant="outlined"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                error={!!errors.contactNumber}
                helperText={errors.contactNumber}
              />
            </Grid>
            <Grid item xs={12} my={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: "100%" }}
                  label="Date of Birth"
                  value={dateOfBirth}
                  onChange={(newValue) => setDateOfBirth(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={!!errors.dateOfBirth}
                      helperText={errors.dateOfBirth}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <MKButton type="submit" variant="gradient" color="info" fullWidth>
                Submit
              </MKButton>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

StudentForm.propTypes = {
  data: PropTypes.any,
  handleClose: PropTypes.any,
  getStudentData: PropTypes.any,
};

export default StudentForm;
