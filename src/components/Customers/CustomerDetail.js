import moment from 'moment';
import React from 'react';
import { Redirect, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
const CustomerDetails = () => {
    const location = useLocation();
    const [custId, setCustId] = React.useState('');
    const [redirect, setRedirect] = React.useState(false);
    const [bidsList, setBidsList] = React.useState([]);
    const [custDetails, setCustDetails] = React.useState({});
    React.useEffect(() => {
        let isActive = true;
        if (isActive) {
            if (location.state) {
                setCustId(location.state.custId);
                setCustDetails(location.state.custDetails);
                setBidsList(location.state.custDetails['bids'])
            }
            else {
                setRedirect(true)
            }
        }
        return () => {
            isActive = false;
        }
    }, [location.state])
    console.log(custId, bidsList)
    if (redirect) {
        return <Redirect to="/customer" />
    }
    return (
        <React.Fragment>
            <div className="m-2 d-flex justify-content-end">
                <Button className="btn-falcon-primary" tag={Link} to="/customer"><i className="fa fa-arrow-left" />&nbsp;Back</Button>
            </div>
            <div className="d-flex justify-content-center">
                <Card className="border">
                    <CardBody className="text-center">
                        <img src={custDetails['avatarUrl']} alt="cust_img" className="mx-2" style={{ width: '70%' }} />
                        <div className="text-center">
                            <div className="d-flex justify-content-center">
                                <div className="text-primary mr-2">Name: </div>
                                {custDetails['firstname'] + ' ' + custDetails['lastname']}</div>
                            <div className="d-flex justify-content-center"> <div className="text-primary mr-2">
                                Phone: </div> {custDetails['phone']}</div>
                            <div className="d-flex justify-content-center "><div className="text-primary mr-2">
                                Email: </div> {custDetails['email']}</div>

                        </div>
                    </CardBody>
                </Card>
            </div>
            <Card className="border p-2 m-2">
                <h2 className="text-center">
                    Bids
                    </h2>
                <Row >
                    {
                        bidsList && bidsList.map((item, index) => (
                            <Col lg={3} md={6} xs={12}>
                                <Card key={index} className="m-3">
                                    <CardHeader>
                                        <div>{item.carTitle}</div>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="d-flex"><div className="text-primary fs--1">Amount:- </div><div className="fs--1">{item.amount}</div></div>
                                        <div className="d-flex"><div className="text-primary fs--1">Created At:- </div><div className="fs--1">{moment(Number(item.created)).format("MM-DD-YYYY HH:MM")}</div></div>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </Card>
        </React.Fragment>
    )
}
export default CustomerDetails;
