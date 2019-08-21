import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import URL from '../../variables/url'
import axios from "axios"
class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentWillMount = () => {
        this.fetchData()
    }
    hasGroupId = () => {
        return this.props.match.params.group ? this.props.match.params.group : ''
    }
    fetchData = () => {
        axios({
            url: `${URL.testing}/api/players/list/?group=${this.hasGroupId()}`,
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
            const endPoint = `/admin/student/${elem._id}`
            newData.rows.push({ email: <Link to={endPoint}>{elem.email}</Link>, id: elem._id })
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
            <div className="p-4" style={{ transition: '1s' }}>
                <MDBDataTable
                    data={this.state.data}
                />
            </div>
        );
    }
}

export default withRouter(Table)