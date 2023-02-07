import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardTitle, Button, Row, Col, Form, FormGroup, Input, Modal, ModalHeader, ModalBody, Label }
    from "reactstrap";
import { Loading } from "./LoadingComponent";
import { Fade } from 'react-animation-components';
import { Control, LocalForm, Errors } from "react-redux-form";

function RenderStaff({ staff }) {
    return(
        <Card>
            <Link to={`/staff/${staff.id}`} style={{ textDecoration: "none", color: "black"}} className="text-center">
                <CardImg width="100%" src={staff.image} alt={staff.name}></CardImg>
                <CardTitle>{staff.name}</CardTitle>
            </Link>
        </Card>
    );
}

const Staff = (props) => {
    
    const inputref = useRef(null);
    const [searchStaff, setSearchStaff] = useState(props.staffs.staffs);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    function toggleModal() {
        setIsModalOpen(!isModalOpen);
    }

     // Add Staff
     function handleAdd(values){
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
        props.postStaff({...values, image:"/assets/images/alberto.png", departmentId: department});
    }

    // Validate
    const required = (val) => val && val.length;
    
    // Search
    const handleSearch = (e) => {
        e.preventDefault(); 
        setSearchStaff(props.staffs.staffs.filter((staff) => staff.name.toLowerCase().indexOf(
            inputref.current.value.toLowerCase()) !== -1))
    }

    if (props.staffs.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.staffs.errMess) {
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
                <div className="row m-1">
                    <div className="col-2">
                        <h3>Nhân Viên</h3>
                    </div>
                    <div className="col-5">
                        <Button onClick={toggleModal}><span className="fa fa-plus"></span></Button>
                    </div>
                    <Modal isOpen={isModalOpen} toggle={toggleModal}>
                        <ModalHeader toggle={toggleModal}>Thêm Nhân Viên</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => handleAdd(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="name" md={4}><strong>Tên</strong></Label>
                                    <Col md={8}>
                                        <Control.text model=".name" id="name" name="name"
                                            className="form-control"
                                            validators={{required}}
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
                                            defaultValue="Sale">
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
                                        <Button type="submit" color="primary">Thêm</Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                    <div className="col-4">
                        <Form onSubmit={handleSearch}>
                            <Row>
                                <Col md={11}>
                                    <FormGroup>
                                        <Input type="text" id="search" name="search"
                                            innerRef={inputref}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={1}>
                                    <Button type="submit" color="primary">Tìm</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <div className="col-12">
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {searchStaff.map((staff) => {
                        return(
                            <div className="col-6 col-sm-4 col-md-2 p-1">
                                <Fade in>
                                    <div key={staff.id}>
                                        <RenderStaff staff={staff} />
                                    </div>
                                </Fade>
                            </div>
                        );
                    })}
                </div>
            </div>
        ); 
}

export default Staff;