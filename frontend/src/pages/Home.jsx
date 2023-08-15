import React from 'react'
import '../main/App.css'
import AddCompany from '../Components/Page Components/AddCompany'
import ViewAllCompanies from '../Components/Page Components/ViewAllCompanies'

const Home = () => {
  return (
    <div className="homeComponents">
      {/* Add a company form */}
        <AddCompany />
      {/* View All Company*/}
        <ViewAllCompanies />
    </div>
  )
}

export default Home