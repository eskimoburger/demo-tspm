import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Profile from "../components/profilecomponent";
import Link from "next/link";
import StudentLayout from "../components/students/studentLayout";

export default function newUser() {
  
 return (
   <StudentLayout>
     <Profile/>
   </StudentLayout>
 )
}
