import React, { Component } from 'react';
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
          dropdownLabel: "Country",
          dropdownSelect: [
            { key: 'country', text: 'India' },
            { key: 'country', text: 'USA' },
            { key: 'country', text: 'Germany' },
            { key: 'country', text: 'Canada' },
            { key: 'country', text: 'Roam' }
          ]
        },
        {
          dropdownLabel: "State",
          dropdownSelect: [
            { key: 'state', text: 'Karnataka' },
            { key: 'state', text: 'Andra' },
            { key: 'state', text: 'Tamilnadu' },
            { key: 'state', text: 'Kerala' },
            { key: 'state', text: 'Dheli' }
          ]
        },
        {
          dropdownLabel: "City",
          dropdownSelect: [
            { key: 'city', text: 'Bangalore' },
            { key: 'city', text: 'DVG' },
            { key: 'city', text: 'Tumkur' },
            { key: 'city', text: 'Shimoga' },
            { key: 'city', text: 'Belgam' }
          ]
        },
        {
          dropdownLabel: "Area",
          dropdownSelect: [
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
  dropdownChange(event) {
    let currentKey = event.key;
    switch (event.key) {
      case "country":
        this.tableData[event.key] = event.text;
        break;

      case "state":
        this.tableData[event.key] = event.text;
        break;

      case "city":
        this.tableData[event.key] = event.text;
        break;

      case "area":
        this.tableData[event.key] = event.text;
        break;

      default:
        break;
    }
  }

  addDataToTable() {
    this.selectedData.push(this.tableData);
    this.setState({ selectedData: this.selectedData });
  }

  clearTable() {
    this.selectedData = [];
    this.setState({ selectedData: [] });
  }

  clearDropdownSelect() {
    let dropdownList = this.state.dropdownList;

    this.setState((prevState) => {
      return {
        dropdownList: dropdownList
      }
    });
  }

  setUserId(event) {
    this.setState({ userID: event.currentTarget.value })
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
        {this.state.dropdownList.map((item) =>
          (<Dropdown
            onChanged={(e) => this.dropdownChange(e)}
            placeHolder={item.dropdownLabel}
            options={item.dropdownSelect}
          />
          )
        )}

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

