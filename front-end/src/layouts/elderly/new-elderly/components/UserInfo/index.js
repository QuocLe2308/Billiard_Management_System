/**
=========================================================
* Viện Dưỡng Lão An Nghỉ MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// NewUser page components
import FormField from "layouts/elderly/new-elderly/components/FormField";

import { useState } from "react";
import ArgonInput from "components/ArgonInput";
import ArgonDatePicker from "components/ArgonDatePicker";

function UserInfo({ formData, genderV, setGenderV, setBirthdayV }) {
  const { formField, values, errors, touched } = formData;
  const { Name, Birthday, domicile, gender } = formField;
  const { Name: NameV, domicile: domicileV, Birthday: BirthdayV } = values;
  const [selectData, setSelectData] = useState({
    elderly: [],
  });

  return (
    <ArgonBox>
      <ArgonBox lineHeight={0}>
        <ArgonTypography variant="h5" fontWeight="bold">
          About Elderly
        </ArgonTypography>
        <ArgonTypography variant="button" fontWeight="regular" color="text">
          Mandatory informations
        </ArgonTypography>
      </ArgonBox>
      <ArgonBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={Name.type}
              label={Name.label}
              name={Name.name}
              value={NameV}
              placeholder={Name.placeholder}
              error={errors.Name && touched.Name}
              success={NameV.length > 0 && !errors.Name}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormField
              inputProps={{ type: "date" }}
              type={Birthday.type}
              label={Birthday.label}
              name={Birthday.name}
              value={BirthdayV}
              placeholder={Birthday.placeholder}
              error={errors.Birthday && touched.Birthday}
              success={BirthdayV.length > 0 && !errors.Birthday}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <FormField
              type={domicile.type}
              label={domicile.label}
              name={domicile.name}
              placeholder={domicile.placeholder}
              error={errors.domicile && touched.domicile}
              success={domicileV.length > 0 && !errors.domicile}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}>
            <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <ArgonTypography
                component="label"
                variant="caption"
                fontWeight="bold"
                textTransform="capitalize"
              >
                Gender
              </ArgonTypography>
            </ArgonBox>
            <Select
              input={<ArgonInput />}
              name={gender.name}
              label={gender.label}
              value={genderV}
              onChange={setGenderV}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </ArgonBox>
    </ArgonBox>
  );
}
// typechecking props for UserInfo
UserInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  genderV: PropTypes.string.isRequired,
  setGenderV: PropTypes.func.isRequired,
  setBirthdayV: PropTypes.func.isRequired,
};

export default UserInfo;
