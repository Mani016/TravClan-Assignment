import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import { pageButtonRenderer, customTotal, MySearch, MyExportCSV } from '../../common/Table/CustomOptions';
import {
    Card, CardHeader, Input
} from 'reactstrap';
import agent from '../../agent';
import { Redirect } from 'react-router-dom';
import CustomerContext from '../../context';
const CustomersList = () => {
    const [customersList, setCustomersList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [filterType, setFilterType] = React.useState('');
    const [redirect, setRedirect] = React.useState(false);
    const { custDetails, setCustDetails } = React.useContext(CustomerContext);
    React.useEffect(() => {
        setLoading(true)
        agent.Customers.list().then((res) => {
            setCustomersList(res)
            setLoading(false);

        }).catch((err) => console.error(err))
    }, [filterType]);
    let options = {
        // custom: true,
        sizePerPage: 10,
        paginationSize: 4,
        pageStartIndex: 1,
        alwaysShowAllBtns: true, // Always show next and previous button
        withFirstAndLast: false, // Hide the going to First and Last page button
        hideSizePerPage: true, // Hide the sizePerPage dropdown always
        hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
        firstPageText: 'First',
        lastPageText: 'Last',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        pageButtonRenderer,
        disablePageTitle: true,
        totalSize: customersList.length,
        paginationTotalRenderer: customTotal,
        showTotal: true
    };
    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            setCustDetails(row);
            setRedirect(true);
        },

    };
    const columns = [
        {
            dataField: 'firstname',
            text: 'Customer Name',
            headerClasses: 'text-primary pl-2',
            classes: 'py-2 align-middle pl-2',
            formatter: (dataField, row) => {
                return (<div className="text-primary" >
                    <img src={row['avatarUrl']} style={{ width: '10%' }} alt="cust_img" className="mx-2" />
                    {row['firstname'] + ' ' + row['lastname']}
                </div>)
            }
        },
        {
            dataField: 'email',
            text: 'Email',
            classes: 'py-2 align-middle',
            headerClasses: 'text-primary ',
        },
        {
            dataField: 'phone',
            text: 'Phone',
            classes: 'py-2 align-middle',
            headerClasses: 'text-primary ',
        },
        {
            dataField: 'hasPremium',
            text: 'Premium',
            classes: 'py-2 text-center align-middle',
            headerClasses: 'text-primary text-center',
            formatter: (dataField, row) => <i className={'fa fa-' + (row['hasPremium'] ? 'check text-success' : 'times text-danger')}></i>
        },
        {
            dataField: 'bids',
            text: 'Max/Min Bid',
            classes: 'py-2 text-center align-middle',
            headerClasses: 'text-primary text-center',
            sort: true,
            formatter: (dataField, row) => {
                const max = row['bids']?.length > 0 ? row['bids'].reduce((prev, current) => (prev.amount > current.amount) ? prev : current) : '-';
                const min = row['bids']?.length > 0 ? row['bids'].reduce((prev, current) => (prev.amount < current.amount) ? prev : current) : '-';
                return (
                    <>
                        {Number(filterType) === 0 ?
                            <>
                                <div className="d-flex justify-content-center">
                                    <div className="text-primary"> Max:</div>&nbsp;{max !== '-' ? max['amount'] : 'NA'}
                                </div>
                                <div className="d-flex justify-content-center">
                                    <div className="text-primary"> Min:</div>&nbsp;{min !== '-' ? min['amount'] : 'NA'}
                                </div>
                            </>
                            : <BidFormatter max={max} min={min} />}

                    </>
                )
            }

        },

    ];
    const BidFormatter = (props) => {
        return (<>
            {Number(filterType) === 1 ?
                <div className="d-flex justify-content-center">
                    <div className="text-primary"> Max:</div>&nbsp;{props.max !== '-' ? props.max['amount'] : 'NA'}
                </div> :
                <div className="d-flex justify-content-center">
                    <div className="text-primary"> Min:</div>&nbsp;{props.min !== '-' ? props.min['amount'] : 'NA'}
                </div>
            }
        </>)
    }
    if (redirect) {
        return <Redirect to={{
            pathname: `/customer-detail/${custDetails['id']}`
        }} />
    }
    const FiltersList = [
        { id: 0, label: 'Both' },
        { id: 1, label: 'Maximum Bid' },
        { id: 2, label: 'Minimum Bid' },
    ]

    return (
        <React.Fragment>
            <Card className="p-1 m-2">
                <div className="d-flex justify-content-end">
                    <Input type="select" name="select" className="border-300 my-2 p-0" value={filterType}
                        onChange={({ target }) => { setFilterType(target.value); console.log(target.value) }} style={{ width: '200px' }}>
                        {FiltersList.map((item, index) => (
                            <option key={index} value={item.id} >
                                {item.label}
                            </option>
                        ))}
                    </Input>
                </div>
                <div className="border">
                    {loading ? <h3 className="d-flex justify-content-center">Loading....</h3> :
                        <PaginationProvider pagination={paginationFactory(options)}>
                            {({ paginationTableProps }) => {
                                return (
                                    <React.Fragment>
                                        <ToolkitProvider
                                            data={customersList}
                                            columns={columns}
                                            keyField="id"
                                            exportCSV={{
                                                fileName: 'Customers.csv',
                                            }}
                                            search>
                                            {props => (
                                                <div>

                                                    <CardHeader  >
                                                        <div className="d-flex justify-content-between">
                                                            Customers List
                                                <div className="d-flex">
                                                                <MySearch {...props.searchProps} />

                                                                <MyExportCSV {...props.csvProps} />
                                                            </div>
                                                        </div>
                                                    </CardHeader>
                                                    <div className="scrollbar">
                                                        <BootstrapTable
                                                            {...props.baseProps}
                                                            {...paginationTableProps}
                                                            bootstrap4
                                                            rowClasses={'cursor-pointer'}
                                                            classes={"table-dashboard fs--1 border-bottom border-200 mb-0 table-dashboard "}
                                                            headerClasses="bg-200 text-900 border-y border-200"
                                                            filterPosition="top"
                                                            striped
                                                            // condensed
                                                            hover
                                                            keyField="id"
                                                            rowEvents={rowEvents}
                                                        />
                                                    </div>
                                                </div>

                                            )
                                            }
                                        </ToolkitProvider>
                                    </React.Fragment>
                                );
                            }}
                        </PaginationProvider>
                    }
                </div>
            </Card>

        </React.Fragment >
    )
}
export default CustomersList;