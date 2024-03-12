'use client'

import AdminDashboard from "@/components/AdminDashboard";
import CustomerDashboard from "@/components/CustomerDashboard";


// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
    return <CustomerDashboard></CustomerDashboard>
    //return <AdminDashboard></AdminDashboard>
  }