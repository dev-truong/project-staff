import React from "react";
import { Link } from "react-router-dom";
import { Card, CardText, CardTitle } from "reactstrap";
import { FadeTransform } from 'react-animation-components';

function RenderDepart({depart}) {
    return(
        <div key={depart.id} className="col-12 col-sm-6 col-md-4">
            <FadeTransform in transformProps={{exitTransform: "scale(0.5) translateX(-50%)"}}>
                <Card className="m-1">
                    <Link to={`/department/${depart.id}`}>
                        <CardTitle>{depart.name}</CardTitle>
                        <CardText className="m-3">Số lượng nhân viên: {depart.numberOfStaff}</CardText>   
                    </Link>
                </Card>
            </FadeTransform>
        </div>
    );
}

function Department(props) {

    const department = props.depart.depart.map((depart) => {
        return(
            <RenderDepart depart={depart} />
        );
    });

    if (props.depart.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.staffs.errMess}</h4>
                </div>
            </div>
        );
    }
    else
        return(
            <div className="container">
                <div className="row">
                    {department}
                </div>
            </div>
        );
}

export default Department;