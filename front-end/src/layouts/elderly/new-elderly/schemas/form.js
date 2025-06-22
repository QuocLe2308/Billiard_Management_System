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

const form = {
  formId: "new-user-elderly",
  formField: {
    Name: {
      name: "Name",
      label: "name",
      type: "text",
      placeholder: "eg. Micheal",
      errorMsg: "Please enter a valid name.",
    },
    Birthday: {
      name: "Birthday",
      label: "Birthday",
      type: "text",
      placeholder: "eg. 65",
      errorMsg: "The date of birth should be before 1964",
    },
    domicile: {
      name: "domicile",
      label: "domicile",
      type: "text",
      placeholder: "eg. Sai Gon",
      errorMsg: "Please enter a valid Domicile.",
    },
    gender: {
      name: "gender",
      label: "gender",
      type: "text",
      errorMsg: "Gender is required.",
    },
    cardNo: {
      name: "cardNo",
      label: "CardNo",
      type: "text",
      placeholder: "eg. H1522666555",
      errorMsg: "CardNo is required.",
    },
    placeOfIssue: {
      name: "placeOfIssue",
      label: "PlaceOfIssue",
      type: "text",
      placeholder: "eg. Street 111",
      errorMsg: "PlaceOfIssue is required.",
    },
    placeOfConsultation: {
      name: "placeOfConsultation",
      label: "PlaceOfConsultation",
      type: "text",
      placeholder: "eg. Ho Chi Minh Hospital",
      errorMsg: "PlaceOfConsultation is required.",
    },
    dateOfEffect: {
      name: "dateOfEffect",
      label: "DateOfEffect",
      type: "text",
      placeholder: "eg. 18/12/2023",
      errorMsg: "DateOfEffect is required.",
    },


    cardNoID: {
      name: "cardNoID",
      label: "CardNoID",
      type: "text",
      placeholder: "eg. 158856522",
      errorMsg: "CardNoID is required.",
    },
    placeOfOrigin: {
      name: "placeOfOrigin",
      label: "PlaceOfOrigin",
      type: "text",
      placeholder: "eg. Street 111",
      errorMsg: "PlaceOfOrigin is required.",
    },
    placeOfResidence: {
      name: "placeOfResidence",
      label: "PlaceOfResidence",
      type: "text",
      placeholder: "eg. Street 111",
      errorMsg: "PlaceOfResidence is required.",
    },
    placeOfIssueID: {
      name: "placeOfIssueID",
      label: "PlaceOfIssueID",
      type: "text",
      placeholder: "eg. Bo cong an",
      errorMsg: "PlaceOfIssueID is required.",
    },
    dateOfIssue: {
      name: "dateOfIssue",
      label: "DateOfIssue",
      type: "text",
      placeholder: "eg. 19/08/2015",
      errorMsg: "DateOfIssue is required.",
    },
    expiredDate: {
      name: "expiredDate",
      label: "ExpiredDate",
      type: "text",
      placeholder: "eg. 20/15/2029",
      errorMsg: "ExpiredDate is required.",
    },
    history: {
      name: "history",
      label: "History",
      type: "text",
      placeholder: "eg. Street 111",
      errorMsg: "Address is required.",
    },
    signs: {
      name: "signs",
      label: "Signs",
      type: "text",
      placeholder: "eg. Street 111",
      errorMsg: "Signs is required.",
    },
    surgicalHistory: {
      name: "surgicalHistory",
      label: "SurgicalHistory",
      type: "text",
      placeholder: "eg. Street 111",
      errorMsg: "SurgicalHistory is required.",
    },
    allergyHistory: {
      name: "allergyHistory",
      label: "AllergyHistory",
      type: "text",
      placeholder: "eg. Street 111",
      errorMsg: "AllergyHistory is required.",
    },
    psychologicalHistory: {
      name: "psychologicalHistory",
      label: "PsychologicalHistory",
      type: "text",
      placeholder: "eg. Street 111",
      errorMsg: "PsychologicalHistory is required.",
    },

    servicepack: {
      name: "servicepack",
      label: "Service Pack",
      type: "text",
      placeholder: "eg. Pack One",
      errorMsg: "ServicePack is required.",
    },

    room: {
      name: "room",
      label: "Room",
      type: "text",
      placeholder: "eg. Pack One",
      errorMsg: "Room is required.",
    },



    address1: {
      name: "address1",
      label: "address 1",
      type: "text",
      placeholder: "eg. Street 111",
      errorMsg: "Address is required.",
    },
    address2: {
      name: "address2",
      label: "address 2",
      type: "text",
      placeholder: "eg. Street 221",
    },
    city: {
      name: "city",
      label: "city",
      type: "text",
      placeholder: "eg. Tokyo",
      errorMsg: "City is required.",
    },
    zip: {
      name: "zip",
      label: "zip",
      type: "number",
      placeholder: "7 letters",
      errorMsg: "Zip is required.",
      invalidMsg: "Zipcode is not valie (e.g. 70000).",
    },
    twitter: {
      name: "twitter",
      label: "twitter handle",
      type: "text",
      placeholder: "@soft",
      errorMsg: "Twitter profile is required.",
    },
    facebook: {
      name: "facebook",
      label: "facebook account",
      type: "text",
      placeholder: "https://...",
    },
    instagram: {
      name: "instagram",
      label: "instagram account",
      type: "text",
      placeholder: "https://...",
    },
    publicEmail: {
      name: "publicEmail",
      label: "public email",
      type: "email",
      placeholder: "Use an address you don't use frequently",
    },
    bio: {
      name: "bio",
      label: "bio",
      placeholder: "Say a few words about who you are or what you're working on.",
    },
  },
};

export default form;
