import React from "react";


const MainContent = ({children}: { children: React.ReactNode }) => {
    return <div style={ {minHeight: "100vh", height: "auto"} }>{ children } </div>
}

export default MainContent