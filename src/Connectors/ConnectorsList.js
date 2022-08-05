import { ClippedDrawer } from "../Components/ClippedDrawer"
import { Connectors } from "./Connectors"
import { PageTitle } from "../util/Utils"

export const ConnectorsList = () => {
    return (
        <ClippedDrawer>
            <PageTitle 
            title={'Connector List'}/>
            <Connectors />
        </ClippedDrawer>
    )
}