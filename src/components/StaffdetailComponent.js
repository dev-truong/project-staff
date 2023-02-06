import React, { useEffect, useState } from "react";
import { Card, CardText, CardBody, CardTitle, CardImg, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from 'dateformat';

function RenderStaff({staff, departstaff}) {
    return(
        <React.Fragment>
            <div className="col-12 col-sm-4 col-md-3">
                <Card>
                    <CardImg width="100%" src={staff.image} alt={staff.name}></CardImg>
                </Card>
            </div>
            <div className="col-12 col-sm-8 col-md-9">
                <CardBody>
                    <CardTitle>Họ và tên: {staff.name}</CardTitle>
                    <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                    <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                    <CardText>Phòng ban: {departstaff.name}</CardText>
                    <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                    <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                </CardBody>
            </div>
        </React.Fragment>
    );
}
const StaffDetail = (props) => {
    
    const [dataDepart, setDataDepart] = useState([]);
    
    useEffect(() => {
        if(props.depart.depart.length > 0){
            setDataDepart(props.depart.depart.filter((departid) => props.staff.departmentId === departid.id)[0]);
        }
    }, [dataDepart]);
   
    if (props.staff != null){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/staff">Nhân Viên</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row">
                    <RenderStaff staff={props.staff} departstaff={dataDepart}/>
                </div>
            </div>
        );
    }
    else {
        return(
            <div></div>
        );
    }
}

export default StaffDetail;