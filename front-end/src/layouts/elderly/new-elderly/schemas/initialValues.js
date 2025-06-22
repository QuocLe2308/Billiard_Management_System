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

import checkout from "layouts/elderly/new-elderly/schemas/form";

const {
  formField: {
    Name,
    Birthday,
    domicile,
    cardNo,
    placeOfIssue,
    placeOfConsultation,
    dateOfEffect,
    cardNoID,
    placeOfOrigin,
    placeOfResidence,
    placeOfIssueID,
    dateOfIssue,
    expiredDate,
    history,
    signs,
    surgicalHistory,
    allergyHistory,
    psychologicalHistory,

    address1,
    address2,
    city,
    zip,
    twitter,
    facebook,
    instagram,
    publicEmail,
    bio,
  },
} = checkout;

const initialValues = {
  [Name.name]: "",
  [Birthday.name]: "",
  [domicile.name]: "",
  [cardNo.name]: "",
  [placeOfIssue.name]: "",
  [placeOfConsultation.name]: "",
  [dateOfEffect.name]: "",
  [cardNoID.name]: "",
  [placeOfOrigin.name]: "",
  [placeOfResidence.name]: "",
  [placeOfIssueID.name]: "",
  [dateOfIssue.name]: "",
  [expiredDate.name]: "",
  [history.name]: "",
  [signs.name]: "",
  [surgicalHistory.name]: "",
  [allergyHistory.name]: "",
  [psychologicalHistory.name]: "",
  [address1.name]: "",
  [address2.name]: "",
  [city.name]: "",
  [zip.name]: "",
  [twitter.name]: "",
  [facebook.name]: "",
  [instagram.name]: "",
  [publicEmail.name]: "",
  [bio.name]: "",
};

export default initialValues;
