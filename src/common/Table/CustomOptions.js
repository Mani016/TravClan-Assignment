import React from 'react';
import {
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,   
  Button
} from 'reactstrap';
export function pageButtonRenderer({
  page,
  active,
  onPageChange
}) {
  const handleClick = (e) => {
    e.preventDefault();
    onPageChange(page);
  };
  return (
    <Button
      color={active ? 'primary' : 'travclan-default'}
      size="sm"
      className="ml-2 mt-2"
      onClick={handleClick}
      key={page}>
      <div className="text-10"> {page}</div>
    </Button>
  );
};
export function customTotal(from, to, size) {
  return (
    <span className="react-bootstrap-table-pagination-total text-10 pl-3">
      Showing { from} to { to} of { size} Results
    </span>
  )
};

export function MyExportCSV (props) {
  const handleClick = () => {
      props.onExport();
  };
  return (
      <Button  transform="shrink-3 down-2" color="primary" size="sm" onClick={handleClick} className="text-10 ml-3">
          <i className="fa fa-download" />  Export CSV
      </Button>   
  );
};   

export function MySearch (props)  {
  const handleClick = () => {
      var x = document.getElementById("fname");
      props.onSearch(x.value.toLowerCase())
  };
  return (
      <div className="d-flex align-items-center">
          <InputGroup>
              <Input placeholder="Search" className="text-10 table-search-box" onKeyUp={handleClick} id="fname" />
              <InputGroupAddon addonType="append">
                  <InputGroupText>
                  <i className="fa fa-search" />
                  </InputGroupText>
              </InputGroupAddon>
          </InputGroup>
      </div>
  );
};