export const formData = [
  {
    label: "First Name",
    placeholder: "Please enter the First Name",
    type: "text",
    name: "Fname",
    id: "Fname",
  },
  {
    label: "Last Name",
    placeholder: "Please enter last Name",
    type: "text",
    name: "Lname",
    id: "Lname",
  },
  {
    label: "Date of Birth",
    placeholder: "Please enter the DOB",
    type: "date",
    name: "dob",
    id: "dob",
  },
  {
    label: "phone",
    placeholder: "Please enter the phone Number",
    type: "number",
    name: "phoneS",
    id: "phoneS",
  },
  {
    label: "Address",
    placeholder: "Please enter present address",
    type: "text",
    name: "addressPresent",
    id: "addressPresent",
  },
  {
    label: "House No",
    placeholder: "House No / Flat No",
    type: "text",
    name: "housePresent",
    id: "housePresent",
  },
  {
    label: "State",
    placeholder: "Please enter your present state",
    type: "text",
    name: "statePresent",
    id: "statePresent",
  },
  {
    label: "Pin Code ",
    placeholder: "Please enter present Pin Code",
    type: "text",
    name: "pincodePresent",
    id: "pincodePresent",
  },
  {
    label: "Address",
    placeholder: "Please enter premanent address",
    type: "text",
    name: "addressPermanent",
    id: "addressPermanent",
  },
  {
    label: "House No",
    placeholder: "House No / Flat No",
    type: "text",
    name: "housePermanent",
    id: "housePermanent",
  },
  {
    label: "State",
    placeholder: "Please enter your permanent state",
    type: "text",
    name: "statePermanent",
    id: "statePermanent",
  },
  {
    label: "Pin Code",
    placeholder: "Please enter permanent Pin Code",
    type: "text",
    name: "pincodePermanent",
    id: "pincodePermanent",
  },
];

export const studentExtraData = [
  {
    label: "Emergency Phone Number",
    placeholder: "Please enter phone number",
    type: "number",
    name: "emergencyPhoneNo",
    id: "emergencyPhoneNo",
  },
  {
    label: "email",
    placeholder: "please enter the email address",
    type: "email",
    name: "email",
    id: "email",
  },
  {
    label: "Gender",
    placeholder: "M / F / Others",
    type: "text",
    name: "gender",
    id: "gender",
  },
  {
    label: "Blood Group",
    placeholder: "Please enter blood group",
    type: "text",
    name: "bloodgp",
    id: "bloodgrp",
  },
  {
    label: "Caste",
    placeholder: "Please enter your caste",
    type: "text",
    name: "caste",
    id: "caste",
  },
  {
    label: "Father's Name",
    placeholder: "Please enter father's name",
    type: "text",
    name: "fName",
    id: "fName",
  },
  {
    label: "Mother's Name",
    placeholder: "Please enter mother's name",
    type: "text",
    name: "mName",
    id: "mName",
  },
  {
    label: "BPL",
    placeholder: "Does applicant have a BPL",
    type: "text",
    name: "bpl",
    id: "bpl",
  },
  {
    label: "Country ( Permanent )",
    placeholder: "Please enter permanent country",
    type: "text",
    name: "countryPrm",
    id: "countryPrm",
  },
  {
    label: "Country ( Present )",
    placeholder: "Please enter present country",
    type: "text",
    name: "countryPst",
    id: "countryPst",
  },
  {
    label: "passing year",
    placeholder: "Please enter the passing year",
    type: "number",
    name: "passingYear",
    id: "passingYear",
  },
  {
    label: "University/Board",
    placeholder: "Enter the institute name",
    type: "text",
    name: "institutueName",
    id: "instituteName",
  },
  {
    label: "Class/Divison/Grade",
    placeholder: "please enter the Divion",
    type: "number",
    name: "PassingDivision",
    id: "passingDivison",
  },
  {
    label: "percentage %",
    placeholder: "please enter marks in %",
    type: "number",
    name: "passingPercentage",
    id: "passingPercentage",
  },
  {
    label: "ISD/STD code",
    placeholder: "Please enter ISD/STD code",
    type: "number",
    name: "sdt",
    id: "sdt",
  },
];

import * as Yup from "yup";

export const getStudentSchema = () => {
  return Yup.object({
    Fname: Yup.string().required("This is a required field"),
    Lname: Yup.string().required("Last Name is a required field"),
    dob: Yup.date()
      .nullable()
      .required("Birthdate is a required field")
      .max(new Date(), "Birthdate cannot be in the future"),
    addressPermanent: Yup.string().required(
      "Permanent Address is a required field"
    ),
    housePermanent: Yup.string().required(
      "Permanent House Number is a required field"
    ),
    statePermanent: Yup.string().required(
      "Permanent State is a required field"
    ),
    pincodePresent: Yup.string().required(
      "Permanent Pincode is a required field"
    ),
    sdt: Yup.string().required("SDT is a required field"),
    phoneS: Yup.string().required("Phone number is a required field"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is a required field"),
    addressPst: Yup.string().required("Present Address is a required field"),
    housePst: Yup.string().required("Present House Number is a required field"),
    statePst: Yup.string().required("Present State is a required field"),
    countryPst: Yup.string().required("Present Country is a required field"),
    pincodePst: Yup.string().required("Present Pincode is a required field"),
    phoneP: Yup.string().required("Phone is a required field"),
    qualification: Yup.string().required("qulaification is a required field"),
    courses: Yup.string().required("courses is a required field"),
  });
};

export const data = [
  {
    image: "/images/1.png",
    name: "CEC Adabari",
    number: "CECC012016",
    date: "06-11-2017",
    extra: [
      {
        quantity: 170,
        title: "Total Students",
      },
      {
        quantity: 25,
        title: "New Registration",
      },
    ],
  },
  {
    image: "/images/1.png",
    name: "CEC Adabari",
    number: "CECC012016",
    date: "06-11-2017",
    extra: [
      {
        quantity: 170,
        title: "Total Students",
      },
    ],
  },
  {
    image: "/images/1.png",
    name: "CEC Adabari",
    number: "CECC012016",
    date: "06-11-2017",
    extra: [
      {
        quantity: 170,
        title: "Total Students",
      },
    ],
  },
];

import { BiHomeCircle } from "react-icons/bi";
import { RiFilePaper2Line } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";

export const getSidebarData = (type) => {
  const commonItems = [
    {
      icon: BiHomeCircle,
      title: "Home",
      link: "/",
    },
  ];

  const superItems = [
    ...commonItems,
    {
      icon: RiFilePaper2Line,
      title: "Center",
      link: "/center",
    },
    {
      icon: BsFillPersonFill,
      title: "Students",
      link: "/new",
    },
  ];

  const regularItems = [...commonItems];

  return type === "super" ? superItems : regularItems;
};

export const extraData = [
  {
    link: "/multiform",
    title: "Multi form",
  },
  {
    link: "/newcenter",
    title: "New Center",
  },
];
