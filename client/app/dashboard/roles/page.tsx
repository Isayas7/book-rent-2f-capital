"use client"
import { roleAndPermissionsColumns } from '@/components/tables/columns/role-and-permissions-columns'
import GenericTable from '@/components/tables/custom-table'
import { Box } from '@mui/material'
import React from 'react'

const Role = () => {
    return (
        <Box>
            <GenericTable
                columns={roleAndPermissionsColumns}
                maxHeight="470px"
                title="List of Owner"
                fetchUrl="/api/user/owner-list"
                queryKey="ownerList"
            />
        </Box>
    )
}

export default Role