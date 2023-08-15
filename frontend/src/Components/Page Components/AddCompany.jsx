import React, { useState } from 'react'
import { Input, Button } from '@mantine/core';
import './AddCompany.css'
import { useDetailsContext } from '../../contexts/DetailsContext';

const AddCompany = () => {

    const [name, setName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [address, setAddress] = useState('')
    const [staff, setStaff] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { dispatch } = useDetailsContext()

    const AddCompanyHandler = async (e) => {
        e.preventDefault()
        setLoading(true)

        const company = { name, address, contactNumber, staff }

        const response = await fetch('/details/create', {
            method: 'POST',
            body: JSON.stringify(company),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const json = await response.json()

        if (!response.ok) {
            // fetching error from backend
            setError(json.error)
            setLoading(false)
        } if (response.ok) {
            dispatch({ type: 'CreateCompany', payload: json })
            setLoading(false)
            setError(null)
            setName('')
            setContactNumber('')
            setAddress('')
            setStaff('')
        }

    }

    return (
        // add contact form
        <form className="AddContactForm" onSubmit={AddCompanyHandler}>
            <div className="addContacts">
                <h2>Add Company Details</h2>

                {/* display errors */}
                {error &&
                    <p className='error'>{error}</p>
                }

                <div className="detailsInput">
                    <Input
                        placeholder="Company Name (Required)"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />

                    <Input
                        placeholder="Address (Required)"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                    />

                    <Input
                        placeholder="Contact Number (Required)"
                        onChange={(e) => setContactNumber(e.target.value)}
                        value={contactNumber}
                    />

                    <Input
                        placeholder="Number of Staff (Optional)"
                        onChange={(e) => setStaff(e.target.value)}
                        value={staff}
                    />
                </div>

                <div className="btnContainer">
                    <Button type='submit'>SAVE DETAILS</Button>
                </div>
            </div>
        </form>
    )
}

export default AddCompany