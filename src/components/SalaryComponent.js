import React from "react";
import { Card, CardTitle, CardText, CardBody, Breadcrumb, BreadcrumbItem } from "reactstrap";
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

    const salary = props.salary.salary.map((salary) => {
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
                    {salary}
                </div>
            </div>
        );
}

export default Salary;