import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';
import { linode } from '../../variables/url'
import axios from "axios"
class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: null
        }
    }
    componentWillMount = () => {
        this.setState({ url: url.testing })
        this.fetchData()
    }
    fetchData = () => {
        axios({
            url: `${linode}/api/players/list`,
            method: 'get',
            withCredentials: true
        })
            .then(response => {
                console.log(response.data)
                this.formatData(response.data.results.students)
            })
            .catch(err => console.log(err))
    }
    formatData = (data) => {
        const newData = {
            columns: [
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Id',
                    field: 'id',
                    sort: 'asc',
                    width: 270
                }
            ],
            rows: [
            ]
        }
        data.forEach(elem => {
            //console.log(elem)
            newData.rows.push({ email: elem.email, id: elem._id })
        })

        this.setState({ data: newData })
    }
    fetchTestData = () => {
        const data = {
            columns: [
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Position',
                    field: 'position',
                    sort: 'asc',
                    width: 270
                },
            ],
            rows: [
                {
                    name: 'Tiger Nixon',
                    position: 'System Architect'
                },
                {
                    name: 'Garrett Winters',
                    position: 'Accountant'
                }
            ]
        }
        this.setState({ data: data })
    }
    render() {
        //console.log(`state`, this.state)
        return (
            <div className="p-4">
                <MDBDataTable
                    data={this.state.data}
                />
            </div>
        );
    }
}

export default Table;