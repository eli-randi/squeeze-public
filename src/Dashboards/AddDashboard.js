import React from 'react'
import { ClippedDrawer } from '../Components/ClippedDrawer'
import {BackButton} from '../util/Utils'
import { Dashboard } from './Dashboard';



export function AddDashboard() {


    return (
        <>
            <ClippedDrawer>
            <BackButton
            url={'/dashboards'} />
                <Dashboard 
                />
            </ClippedDrawer>
        </>
    )
}