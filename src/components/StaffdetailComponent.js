import React, { useEffect, useState } from "react";
import { Card, CardText, CardBody, CardTitle, CardImg, Breadcrumb, BreadcrumbItem, Button, Row, Col, Modal,
    ModalHeader, ModalBody, Label } from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from 'dateformat';
import { Control, LocalForm, Errors } from "react-redux-form";

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    function toggleModal() {
        setIsModalOpen(!isModalOpen);
    }

    function handleUpdate(values) {
        toggleModal();
        let department;
        switch (values.department) {
            case "Sale": {
                department = "Dept01";
                break;
            }
            case "HR": {
                department = "Dept02";
                break;
            }
            case "Marketing": {
                department = "Dept03";
                break;
            }
            case "IT": {
                department = "Dept04";
                break;
            }
            case "Finance": {
                department = "Dept05";
                break;
            }
            default:
                break;
        }
        props.patchStaff({...values, image:"/assets/images/alberto.png", departmentId: department, id: props.staff.id});
    }

    // Validate
    const required = (val) => val && val.length;

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
                    <div className="col-5">
                        <Button onClick={toggleModal} color="primary"><span>Update</span></Button>
                    </div>
                    <Modal isOpen={isModalOpen} toggle={toggleModal}>
                        <ModalHeader toggle={toggleModal}>Cập Nhật Thông Tin</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => handleUpdate(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="name" md={4}><strong>Tên</strong></Label>
                                    <Col md={8}>
                                        <Control.text model=".name" id="name" name="name"
                                            className="form-control"
                                            validators={{required}}
                                            defaultValue={props.staff.name}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".name"
                                            show="touched"
                                            messages={{required: "Yêu cầu nhập"}}
                                        /> 
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="doB" md={4}><strong>Ngày sinh</strong></Label>
                                    <Col md={8}>
                                        <Control type="date" model=".doB" id="doB" name="doB"
                                            className="form-control"
                                            validators={{required}}
                                            defaultValue={dateFormat(props.staff.doB, "yyyy-mm-dd")}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".doB"
                                            show="touched"
                                            messages={{required: "Yêu cầu nhập"}}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="startDate" md={4}><strong>Ngày vào công ty</strong></Label>
                                    <Col md={8}>
                                        <Control type="date" model=".startDate" id="startDate" name="startDate"
                                            className="form-control"
                                            validators={{required}}
                                            defaultValue={dateFormat(props.staff.startDate, "yyyy-mm-dd")}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".startDate"
                                            show="touched"
                                            messages={{required: "Yêu cầu nhập"}}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="department" md={4}><strong>Phòng ban</strong></Label>
                                    <Col md={8}>
                                        <Control.select model=".department" id="department" name="department" 
                                            className="form-control"
                                            defaultValue={dataDepart.name}>
                                            <option>Sale</option>
                                            <option>HR</option>
                                            <option>Marketing</option>
                                            <option>IT</option>
                                            <option>Finance</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="salaryScale" md={4}><strong>Hệ số lương</strong></Label>
                                    <Col md={8}>
                                        <Control.text model=".salaryScale" id="salaryScale" name="salaryScale"
                                            placeholder="1.0 -> 3.0"
                                            className="form-control"
                                            validators={{required}}
                                            defaultValue={props.staff.salaryScale}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".salaryScale"
                                            show="touched"
                                            messages={{required: "Yêu cầu nhập"}}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="annualLeave" md={4}><strong>Số ngày nghỉ còn lại</strong></Label>
                                    <Col md={8}>
                                        <Control.text model=".annualLeave" id="annualLeave" name="annualLeave"
                                            placeholder="1"
                                            className="form-control"
                                            validators={{required}}
                                            defaultValue={props.staff.annualLeave}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".annualLeave"
                                            show="touched"
                                            messages={{required: "Yêu cầu nhập"}}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="overTime" md={4}><strong>Số ngày đã làm thêm</strong></Label>
                                    <Col md={8}>
                                        <Control.text model=".overTime" id="overTime" name="overTime" placeholder="1"
                                            className="form-control"
                                            validators={{required}}
                                            defaultValue={props.staff.overTime}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".overTime"
                                            show="touched"
                                            messages={{required: "Yêu cầu nhập"}}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{size: 7, offset:5}}>
                                        <Button type="submit" color="primary">Update</Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
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