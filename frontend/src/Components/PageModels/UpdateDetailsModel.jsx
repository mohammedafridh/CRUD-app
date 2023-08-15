import { Modal, useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react'
import { Input, Button } from '@mantine/core';
import { useDetailsContext } from '../../contexts/DetailsContext';
import './UpdateDetailsModel.css'

function UpdateDetailsModel({ modalOpened, setModalOpened, company }) {
    const theme = useMantineTheme();
    const [error, setError] = useState('')
    const [name, setName] = useState(company.name)
    const [address, setAddress] = useState(company.address)
    const [contactNumber, setContactNumber] = useState(company.contactNumber)
    const [staff, setStaff] = useState(company.staff)
    const { dispatch } = useDetailsContext()

    useEffect(() => {
        setName(company.name)
        setContactNumber(company.contactNumber)
        setAddress(company.address)
        setStaff(company.staff)
    }, [company])

    const updateHandler = async (e) => {
        e.preventDefault()
        console.log('update', company._id)
        const details = { name, address, contactNumber, staff }

        const response = await fetch(`/details/${company._id}`, {
            method: 'PUT',
            body: JSON.stringify(details),
            headers: { 'Content-Type': 'application/json' }
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'UpdateCompany', payload: json })
            setError('')
            setModalOpened(false)
        } if (!response.ok) {
            setError(json.error)
        }
    }

    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.10}
            overlayBlur={1}
            size='30%'
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
        >

            <form className='updateForm' onSubmit={updateHandler}>
                <h3 style={{ color: 'orangered' }}><strong>Update Company Details</strong></h3>

                {/* Display errors */}
                {error && <p className='error'>{error}</p>}

                {/* user inputs */}
                <div className="updateInputs">
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
                        placeholder="Staff (Optional)"
                        onChange={(e) => setStaff(e.target.value)}
                        value={staff}
                    />
                </div>

                {/* update details btn */}
                <div className="editBtnContainer">
                    <Button type='submit'>SAVE</Button>
                </div>


            </form>


        </Modal>
    );
}

export default UpdateDetailsModel