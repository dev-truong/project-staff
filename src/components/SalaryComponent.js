import React, { useState } from "react";
import { Card, CardTitle, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { FadeTransform } from "react-animation-components";

function RenderSalary({salary}) {
    return(
        <div key={salary.id} className="col-12 col-sm-6 col-md-4">
            <FadeTransform in transformProps={{exitTransform: "scale(0.5) translateY(50%)"}}>
                <Card className="m-1">
                    <CardTitle>{salary.name}</CardTitle>
                    <CardBody className="m-2">
                        <CardText>Mã nhân viên: {salary.id}</CardText>
                        <CardText>Hệ số lương: {salary.salaryScale}</CardText>
                        <CardText>Số ngày làm thêm: {salary.overTime}</CardText>
                        <CardText className="text-info">{`Lương: ${salary.salary}`}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    );
}


const Salary = (props) => {
// Sort Salary
    const [sortSalary, setSortSalary] = useState(props.salary.salary);
    
    const increase = () => {
        const x = sortSalary.sort((a,b) => {
            return (a.salary - b.salary);
        });
        setSortSalary(JSON.parse(JSON.stringify(x)));
    };
    
    const decrease = () => {
        const y = sortSalary.sort((a,b) => {
            return (b.salary - a.salary);
        });
        setSortSalary(JSON.parse(JSON.stringify(y)));
    };

// Display Salary Table
    const salary = sortSalary.map((salary) => {
        return(
            <RenderSalary salary={salary} />
        );
    });

    if (props.salary.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.salary.errMess}</h4>
                </div>
            </div>
        );
    }
    else     
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/staff">Nhân Viên</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row">
                    <div className="col-2 col-lg-1 mr-1">
                        <Button color="primary" onClick={increase}>Lương <i class="fa fa-long-arrow-up"></i></Button>
                    </div>
                    <div className="col-2 col-lg-1">
                        <Button color="primary" onClick={decrease}>Lương <i class="fa fa-long-arrow-down"></i></Button>
                    </div>
                </div>
                <div className="row">
                    {salary}
                </div>
            </div>
        );
}

export default Salary;