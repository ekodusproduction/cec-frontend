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
    label: "Address ( Permanent )",
    placeholder: "Please enter premanent address",
    type: "text",
    name: "addressPrm",
    id: "addressPrm",
  },
  {
    label: "House No ( Permanent )",
    placeholder: "House No / Flat No",
    type: "text",
    name: "housePrm",
    id: "housePrm",
  },
  {
    label: "State ( Permanent )",
    placeholder: "Please enter your permanent state",
    type: "text",
    name: "statePrm",
    id: "statePrm",
  },
  {
    label: "Country ( Permanent )",
    placeholder: "Please enter permanent country",
    type: "text",
    name: "countryPrm",
    id: "countryPrm",
  },
  {
    label: "Pin Code ( Permanent )",
    placeholder: "Please enter permanent Pin Code",
    type: "text",
    name: "pincodePrm",
    id: "pincodePrm",
  },
  {
    label: "ISD/STD code",
    placeholder: "Please enter ISD/STD code",
    type: "number",
    name: "sdt",
    id: "sdt",
  },
  {
    label: "phone",
    placeholder: "Please enter the phone Number",
    type: "number",
    name: "phoneS",
    id: "phoneS",
  },
  {
    label: "email",
    placeholder: "please enter the email address",
    type: "email",
    name: "email",
    id: "email",
  },
  {
    label: "Address ( Present )",
    placeholder: "Please enter premanent address",
    type: "text",
    name: "addressPst",
    id: "addressPst",
  },
  {
    label: "House No ( Present )",
    placeholder: "House No / Flat No",
    type: "text",
    name: "housePst",
    id: "housePst",
  },
  {
    label: "State ( Present )",
    placeholder: "Please enter your present state",
    type: "text",
    name: "statePst",
    id: "statePst",
  },
  {
    label: "Country ( Present )",
    placeholder: "Please enter present country",
    type: "text",
    name: "countryPst",
    id: "countryPst",
  },
  {
    label: "Pin Code ( Present )",
    placeholder: "Please enter present Pin Code",
    type: "text",
    name: "pincodePst",
    id: "pincodePst",
  },
  {
    label: "Phone (Personal)",
    placeholder: "Please enter phone number",
    type: "number",
    name: "phoneP",
    id: "phoneP",
  },
  // {
  //     label: 'Course (Applied for)',
  //     placeholder: 'Please enter the Course Name',
  //     type:'text',
  //     name: 'course',
  //     id: 'course'
  // },
  // {
  //     label: 'Academic Qualification',
  //     placeholder: 'enter the highest qualifications',
  //     type:'text',
  //     name: 'qualicationName',
  //     id: 'qualificatonName'
  // },
  // {
  //     label: 'Year',
  //     placeholder: 'Please enter the passing year',
  //     type:'number',
  //     name: 'year',
  //     id: 'year'
  // },
  // {
  //     label: 'University/Board',
  //     placeholder: 'Enter the institute name',
  //     type:'text',
  //     name: 'institutue',
  //     id: 'institute'
  // },
  // {
  //     label: 'Class/Divison/Grade',
  //     placeholder: 'please enter the Divion',
  //     type:'number',
  //     name: 'division',
  //     id: 'divison'
  // },
  // {
  //     label: 'percentage %',
  //     placeholder: 'please enter marks in %',
  //     type:'number',
  //     name: 'marks',
  //     id: 'marks'
  // },
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
    gender: Yup.string().required("Gender is a required field"),
    bloodgrp: Yup.string().required("Blood Group is a required field"),
    caste: Yup.string().required("Caste is a required field"),
    fName: Yup.string().required("Father's Name is a required field"),
    mName: Yup.string().required("Mother's Name is a required field"),
    bpl: Yup.string().required("BPL is a required field"),
    addressPrm: Yup.string().required("Permanent Address is a required field"),
    housePrm: Yup.string().required(
      "Permanent House Number is a required field"
    ),
    statePrm: Yup.string().required("Permanent State is a required field"),
    countryPrm: Yup.string().required("Permanent Country is a required field"),
    pincodePrm: Yup.string().required("Permanent Pincode is a required field"),
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
