import { useReducer, createContext, useContext } from 'react'

const detailsContext = createContext()

export const DetailsContextProvider = ({ children }) => {

    const contactReducer = (state, action) => {
        switch (action.type) {
            case 'CreateCompany':
                return {
                    companies: [action.payload, ...state.companies]
                }
            case 'SetCompany':
                return {
                    companies: action.payload
                }
            case 'DeleteCompany':
                return {
                    companies: state.companies.filter((w) => w._id !== action.payload),
                }
            case 'UpdateCompany':
                return {
                    companies: state.companies.map((company) =>
                    company._id === action.payload._id ? action.payload : company
                    )
                }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(contactReducer, {
        companies: []
    })

    console.log('ContactContext state', state)

    return (
        <detailsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </detailsContext.Provider>
    )
}

export const useDetailsContext = () => {
    return useContext(detailsContext)
}