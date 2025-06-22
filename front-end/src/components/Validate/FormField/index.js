/**
=========================================================
* Argon Dashboard 2 PRO  MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Argon Dashboard 2 PRO  MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";

function FormField({ label, errorMessage, error, ...rest }) {
  return (
    <ArgonBox display="flex" flexDirection="column" height="100%">
      <ArgonBox mb={1}>
        <ArgonTypography
          component="label"
          variant="caption"
          fontWeight="bold"
          textTransform="capitalize"
        >
          {label}
        </ArgonTypography>
      </ArgonBox>
      <ArgonBox>
        <ArgonInput error={error} {...rest} />
      </ArgonBox>
      {error && (
        <ArgonBox mt={0.75}>
          <ArgonTypography component="div" variant="caption" color="error">
            {errorMessage}
          </ArgonTypography>
        </ArgonBox>
      )}
    </ArgonBox>
  );
}


// Setting default values for the props of FormField
FormField.defaultProps = {
  label: " ",
};

// Typechecking props for FormField
FormField.propTypes = {
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  error: PropTypes.bool
};

export default FormField;
