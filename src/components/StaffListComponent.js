import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardTitle, Button, Row, Col, Form, FormGroup, Input }
    from "reactstrap";
import { Loading } from "./LoadingComponent";
import { Fade } from 'react-animation-components';

function RenderStaff({ staff, deleteStaff }) {
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