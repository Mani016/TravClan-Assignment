import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import { pageButtonRenderer, customTotal, MySearch, MyExportCSV } from '../../common/Table/CustomOptions';
import { Card, CardHeader } from 'reactstrap';
import agent from '../../agent';
const CustomersList = () => {
    let options = {
        // custom: true,
        sizePerPage: 15,
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
        // totalSize: campaignsStatusWise.length,
        paginationTotalRenderer: customTotal,
        showTotal: true
    };
    const columns = [
        {
            dataField: 'name',
            text: 'Campaign Name',
            headerClasses: 'text-10 text-primary pl-2',
            classes: 'py-2 text-10 align-middle pl-2',

        },
        {
            dataField: 'group_name',
            text: 'Group',
            classes: 'py-2 text-10 align-middle',
            headerClasses: 'text-10 text-primary ',
            sort: true,
        },
        {
            dataField: 'channel',
            text: 'Channel',
            classes: 'py-2 text-10 align-middle',
            headerClasses: 'text-10 text-primary ',
            sort: true,
        },
        {
            dataField: 'totalTargets',
            text: 'Users',
            classes: 'py-2 text-10 text-center align-middle',
            headerClasses: 'text-10 text-primary text-center',
            sort: true
        },
        {
            dataField: 'phishProne',
            text: 'Risk Prone %',
            classes: 'py-2 text-10 text-center align-middle',
            headerClasses: 'text-10 text-primary text-center',
        },
        {
            dataField: 'start_date_in_utc',
            text: 'Start Date',
            classes: 'py-2 text-10 text-center align-middle',
            headerClasses: 'text-10 text-primary text-center',
            sort: true,
        },
        {
            dataField: 'end_date_in_utc',
            text: 'End Date',
            classes: 'py-2 text-10 text-center align-middle',
            headerClasses: 'text-10 text-primary text-center',
            sort: true,
        },
        {
            dataField: 'campaign_status',
            text: 'Status',
            classes: 'py-2 text-center align-middle',
            headerClasses: 'text-10 text-primary text-center',

        },
        {
            dataField: 'campaignDays',
            text: 'Duration (Days)',
            classes: 'py-2 text-10 text-center align-middle',
            headerClasses: 'text-10 text-primary text-center',
            sort: true
        },

    ];
    React.useEffect(()=>{
        agent.Customers.list().then((res)=>{
            console.log(res)
        })
    },[])
    return (
        <React.Fragment>
            <Card className="p-1 m-2">
                <div className="border">
                    <PaginationProvider pagination={paginationFactory(options)}>
                        {({ paginationTableProps }) => {
                            return (
                                <React.Fragment>
                                    <ToolkitProvider
                                        data={[]}
                                        columns={columns}
                                        keyField="id"
                                        exportCSV={{
                                            fileName: 'Customers.csv',
                                            // onlyExportFiltered: false,
                                            // exportAll: false,
                                            // separator: '|',
                                            // blobType: 'text/csv;charset=ansi'
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
                                                        classes={"table-dashboard fs--1 border-bottom border-200 mb-0 table-dashboard "}
                                                        headerClasses="bg-200 text-900 border-y border-200"
                                                        filterPosition="top"
                                                        striped
                                                        condensed
                                                        hover
                                                        keyField="id"
                                                        wrapperClasses="standard_table_height"
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
                </div>
            </Card>

        </React.Fragment >
    )
}
export default CustomersList;