/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useAuth } from '../services/providers/Auth'
import Loading from '../components/shared/loading/Loading'
import apiInstance from '../services/api/apiInstance'

const UserFetch = ({ children }) => {
    const [fetchingEmployeeMaster, setFetchingEmployeeMaster] = useState(true)
    const auth = useAuth()

    useEffect(() => {
        if (!auth.employeeMaster) {
            const fetchEmployeeMaster = async () => {
                try {
                    const res = await apiInstance.get('/employeeMaster')
                    await auth.employeeMasterLogin(res.data.employeeMaster)
                } catch (error) {
                    console.error(error)
                } finally {
                    setFetchingEmployeeMaster(false)
                }
            }
            fetchEmployeeMaster()
        } else {
            setFetchingEmployeeMaster(false)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return fetchingEmployeeMaster ? <Loading /> : children
}

export default UserFetch
