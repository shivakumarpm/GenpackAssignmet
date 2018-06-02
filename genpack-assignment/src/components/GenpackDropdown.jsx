import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { TablePagination } from 'react-pagination-table';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import './GenpackDropdown.css';

export default class GenpackDropdown extends Component {
  constructor(props) {
    super(props);
    
    this.tableData = {
      country: '',
      state: '',
      city: '',
      area: ''
    };
    this.selectedData = [];
    this.state = {
      header: ["Country", "State", "City", "Area"],
      userID: '',
      userName: '',
      userImg: '',
      dropdownList: [
        {
          dropdownLabel: "country",
          dropdownSelect: [
            { key: 'country', text: 'Country' },
            { key: 'country', text: 'India' },
            { key: 'country', text: 'USA' },
            { key: 'country', text: 'Germany' },
            { key: 'country', text: 'Canada' },
            { key: 'country', text: 'Roam' }
          ]
        },
        {
          dropdownLabel: "state",
          dropdownSelect: [
            { key: 'state', text: 'State' },
            { key: 'state', text: 'Karnataka' },
            { key: 'state', text: 'Andra' },
            { key: 'state', text: 'Tamilnadu' },
            { key: 'state', text: 'Kerala' },
            { key: 'state', text: 'Dheli' }
          ]
        },
        {
          dropdownLabel: "city",
          dropdownSelect: [
            { key: 'city', text: 'City' },
            { key: 'city', text: 'Bangalore' },
            { key: 'city', text: 'DVG' },
            { key: 'city', text: 'Tumkur' },
            { key: 'city', text: 'Shimoga' },
            { key: 'city', text: 'Belgam' }
          ]
        },
        {
          dropdownLabel: "area",
          dropdownSelect: [
            { key: 'area', text: 'Area' },
            { key: 'area', text: 'JP Nagar' },
            { key: 'area', text: 'Mejestic' },
            { key: 'area', text: 'Koramangla' },
            { key: 'area', text: 'Marathahalli' },
            { key: 'area', text: 'Vijaynagar' }
          ]
        }
      ],
      selectedData: []
    }
  }

  selectableDropdown() {
    let dropdownList = this.state.dropdownList;
    dropdownList.forEach((item,index) => {
      item.selectedKey = undefined;
    });
    this.setState({dropdownList});
  }

  dropdownChange(event) {
    this.selectableDropdown();
    switch (event.key) {
      case "country":
        this.tableData.country = event.text;
        break;

      case "state":
        this.tableData.state = event.text;
        break;

      case "city":
        this.tableData.city = event.text;
        break;

      case "area":
        this.tableData.area = this.tableData.area  + ', ' + event.text;
        break;

      default:
        break;
    }
  }

  addDataToTable() {
    this.selectedData.push({
      "country":this.tableData.country,
     "state":this.tableData.state,
     "city":this.tableData.city,
     "area":this.tableData.area
    });
    this.setState(
      { selectedData: this.selectedData,
        isAddInitiated: true
      });
  }

  clearTable() {
    this.selectedData = [];
    this.setState({ selectedData: [] });
    this.tableData = {
      country: '',
      state: '',
      city: '',
      area: ''
    };
  }
  clearDropdownSelect() {
    let dropdownList = this.state.dropdownList;
    dropdownList.forEach((item,index) => {
      item.selectedKey = item.dropdownLabel;
    });
    this.setState({dropdownList});
    this.tableData = {
      country: '',
      state: '',
      city: '',
      area: ''
    };
  }

  setUserId(event) {
    this.setState({ userID: event.currentTarget.value });
    return true;
  }

  getUserDetails() {
    let userDetailUrl = `https://reqres.in/api/users/${this.state.userID}`;
    fetch(userDetailUrl, {
      method: 'GET',
      body: {}
    })
      .then(response => response.json())
      .then((userInfo) => {
        let userFullName = '',
          userData = userInfo.data;
        if (userData.first_name || userData.last_name)
          userFullName = userData.first_name + ' ' + userData.last_name
        this.setState({
          userID: userData.id,
          userName: userFullName,
          userImg: userData.avatar
        })
      })
      .catch((error) => {
        console.error('Failed to get user detials:', error);
      });
  }
  render() {
    return (

      <div className="dropdown-wrapper">
        <div ref="dropdownSelector" id="container">
        {this.state.dropdownList.map((item, index) =>
          (<Dropdown
            selectedKey={(item.selectedKey? item.selectedKey: undefined)}
            onChanged={(e) => this.dropdownChange(e)}
            placeHolder={item.dropdownLabel}
            options={item.dropdownSelect}
            multiSelect={((index == 3)? 'multiSelect' : undefined)}
            defaultSelectedKeys={(item.selectedKey? undefined: undefined)}
            selectedKeys={(item.selectedKey? item.selectedKey: undefined)}
          />
          )
        )}
        </div>

        <div className="btns-wrapper">
          <DefaultButton
            data-automation-id='test'
            text='Add to table'
            onClick={(e) => this.addDataToTable(e)}
          />
          <DefaultButton
            data-automation-id='test'
            text='Clear table'
            onClick={(e) => this.clearTable(e)}
          />

          <DefaultButton
            data-automation-id='test'
            text='Resect Select'
            onClick={(e) => this.clearDropdownSelect(e)}
          />
        </div>
        <TablePagination
          className="markdown"
          headers={this.state.header}
          data={this.state.selectedData}
          columns="country.state.city.area"
          perPageItemCount={4}
          totalCount={4}
          arrayOption={[["size", 'all', ' ']]}
        />
        <div className="user-profile-wrapper">
          <div className="get-details-wrapper">
            <label for="userid" class="userid-label">Get User Details</label>
            <input name="userid" placeholder="user id" className="userid-input" onChange={(e) => this.setUserId(e)} />
            <DefaultButton
              className="get-user-btn"
              data-automation-id='test'
              text='Get Details'
              onClick={(e) => this.getUserDetails(e)}
            />
          </div>
          <div className="user-details-display">
            <div className="user-image">
              <img src={this.state.userImg} alt={`user ${this.state.userName} image`} />
            </div>
            <div className="user-id-name">
              <span className="user-id">ID: {this.state.userID}</span>
              <span className="user-name">Name: {this.state.userName}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

