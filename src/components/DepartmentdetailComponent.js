import React, { useEffect, useState } from "react";
import { Card, CardTitle, CardImg, Breadcrumb, BreadcrumbItem} from "reactstrap";
import { Link } from "react-router-dom";

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

function DepartDetail(props) {

    const [dataDepart, setDatalDepart] = useState([]);
    
    useEffect(() => {
        if(props.departname){
            setDatalDepart(props.departname);
        }
    }, [dataDepart]);
    
    if (props.staff != null){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/department">Phòng Ban</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dataDepart.name}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row">
                    {props.staff.map((staff) => {
                        return(
                            <div key={staff.id} className="col-6 col-sm-4 col-md-2 p-1">
                                <RenderStaff staff={staff} />
                            </div>
                        );
                    })}
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

export default DepartDetail;