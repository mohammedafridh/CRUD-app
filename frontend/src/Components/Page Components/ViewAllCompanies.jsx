import React, { useState, useEffect } from 'react'
import { Input, Button } from '@mantine/core';
import './ViewAllCompanies.css'
import { Table } from '@mantine/core';
import { useDetailsContext } from '../../contexts/DetailsContext';
import UpdateDetailsModel from '../PageModels/UpdateDetailsModel';

const ViewAllCompanies = () => {

  // states
  const [search, setSearch] = useState('')
  const { companies, dispatch } = useDetailsContext()
  const [selectedCompany, setSelectedCompany] = useState({})
  const [modalOpened, setModalOpened] = useState(false)

  // getting search values
  const handleSearch = (e) => {
    setSearch(e.target.value)
    searchOperation(e.target.value)
  }

  // implementing search operation
  const searchOperation = async (keyword) => {
    const response = await fetch(`/details?search=${keyword}`, {
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'SetCompany', payload: json })
    }
  }

  // displaying all companies
  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await fetch("/details/", {
        headers: {
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SetCompany', payload: json })
      }
    }
    fetchCompanies()

  }, [])

  // edit model open function
  const editHandler = (company) => {
    setSelectedCompany(company)
    setModalOpened(true)
  }

  // delete a record function
  const dltHandler = async (id) => {

    const response = await fetch(`/details/${id}`, {
      method: 'DELETE',
    })

    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DeleteCompany', payload: id })
    }
  }

  // assigning data to rows
  const rows = companies && companies.map((company) => (
    <tr key={company._id}>
      <td className='outputDetails'>{company._id}</td>
      <td className='outputDetails'>{company.name}</td>
      <td className='outputDetails'>{company.address}</td>
      <td className='outputDetails'>{company.contactNumber}</td>
      <td className='outputDetails'>{company.staff}</td>
      <td className='outputDetails'>
        <div className="actionContainer">
          <Button onClick={() => editHandler(company)}>Edit</Button>
          <Button className='dltBtn' onClick={() => dltHandler(company._id)}>Delete</Button>
        </div>
      </td>
    </tr>
  ));

  // View All Companies 
  return (
    <div className="viewAllDetailsContainer">
      <div className="viewAllDetails">
        <div className='searchContainer'>
          <span className='search'>Search</span>
          <Input
            type='text'
            placeholder='Enter Company Name'
            value={search}
            className='searchInput'
            onChange={handleSearch}
          />
        </div>

        <div className="tableContainer">
          <Table className='table'>
            <thead className='thead'>
              <tr className='tr'>
                <th className='th'>Company ID</th>
                <th>Company name</th>
                <th>Address</th>
                <th>Contact Number</th>
                <th>Total Staff</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </div>
        <UpdateDetailsModel
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          company={selectedCompany}
        />
      </div>
    </div>
  )
}

export default ViewAllCompanies