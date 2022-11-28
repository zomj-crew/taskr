import React from "react";
import TicketCreator from "./TicketCreator";
import Header from "./Header";
import Dashboard from "./Dashboard";


const MainPage = (props) => {

    return (
        <div className="mainPage">
            <Header firstName = {props.firstName}/>
            <Dashboard />
            <TicketCreator userId = {props.userId}/>
        </div>
    )

};

export default MainPage;