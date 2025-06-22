import * as Yup from "yup";
import checkout from "layouts/elderly/new-elderly/schemas/form";

const nameReg = /^(?![\s\d]+$)[a-zA-Z]{2,}(?:\s[a-zA-Z]{2,})+$/;
const stringRg = /^(?!\s)(?!\d)(?!.*[~`!@#$%^&*()_+={}[\]:;'"<>?,./])[^\s].*/;
const dateRg = "";
const carIDReg = /^[0-9]{12}$/;
const dateOfBirthReg = /^(19[0-5][0-9]|196[0-3])-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

;


const {
  formField: { Name, Birthday, resident, domicile, cardNoID, placeOfOrigin, placeOfResidence, placeOfIssueID, dateOfIssue, expiredDate, history, signs, surgicalHistory, allergyHistory, psychologicalHistory, address1, city, zip, twitter, cardNo, placeOfIssue, placeOfConsultation, dateOfEffect },
} = checkout;

const validations = [
  Yup.object().shape({
    [Name.name]: Yup.string().required().matches(nameReg, Name.errorMsg),
    [domicile.name]: Yup.string().required().matches(nameReg, domicile.errorMsg),
    [Birthday.name]: Yup.string().required().matches(dateOfBirthReg, Birthday.errorMsg)
  }),
  Yup.object().shape({
    [cardNo.name]: Yup.string().matches(/^[0-9]{10}$/, cardNo.errorMsg), // Example regex for 16-digit card number
    [placeOfIssue.name]: Yup.string().matches(nameReg, placeOfIssue.errorMsg), // Regex for at least one non-space character
    [placeOfConsultation.name]: Yup.string().matches(nameReg, placeOfConsultation.errorMsg),
    [dateOfEffect.name]: Yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, dateOfEffect.errorMsg), // Example regex for date in YYYY-MM-DD format
  }),
  Yup.object().shape({
    [cardNoID.name]: Yup.string().required().matches(/^[0-9]{12}$/, cardNoID.errorMsg),
    [placeOfOrigin.name]: Yup.string().required().matches(nameReg, placeOfOrigin.errorMsg),
    [placeOfResidence.name]: Yup.string().required().matches(nameReg, placeOfResidence.errorMsg),
    [placeOfIssueID.name]: Yup.string().required().matches(nameReg, placeOfIssueID.errorMsg),
    [dateOfIssue.name]: Yup.string().required().matches(/^\d{4}-\d{2}-\d{2}$/, placeOfIssueID.errorMsg),
    [expiredDate.name]: Yup.string().required().matches(/^\d{4}-\d{2}-\d{2}$/, placeOfIssueID.errorMsg),
  }),
  Yup.object().shape({
    [history.name]: Yup.string().required().matches(nameReg, history.errorMsg),
    [signs.name]: Yup.string().required().matches(nameReg, signs.errorMsg),
    [surgicalHistory.name]: Yup.string().required().matches(nameReg, surgicalHistory.errorMsg),
    [allergyHistory.name]: Yup.string().required().matches(nameReg, allergyHistory.errorMsg),
    [psychologicalHistory.name]: Yup.string().required().matches(nameReg, psychologicalHistory.errorMsg),
  }),
];

export default validations;
