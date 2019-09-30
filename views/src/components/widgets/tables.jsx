import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import { Button } from 'reactstrap'
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
                // console.log(response.data)
                this.formatData(response.data.results.students)
            })
            .catch(err => console.log(err))
    }
    formatData = (data) => {
        const newData = {
            columns: [
                {
                    label: 'Profile',
                    field: 'link',
                    width: 150
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Id',
                    field: 'id',
                    width: 200
                },
                {
                    label: 'Group',
                    field: 'group',
                    width: 100
                },
                {
                    label: 'Score',
                    field: 'score',
                    width: 100
                }
            ],
            rows: [
            ]
        }
        data.forEach(elem => {
            //console.log(elem)
            newData.rows.push({
                link: <Link to={`/admin/student/${elem._id}`}><Button size='sm' color='primary'>Open Profile</Button></Link>,
                email: elem.email,
                id: elem._id,
                group: <Link to={`/admin/students/${elem.meta.group}`}><Button size='sm' color='primary'>Group: {elem.meta.group}</Button></Link>,
                score: elem.score
            })
        })

        this.setState({ data: newData })
    }
    render() {
        // console.log(`state`, this.state)
        return (
            <div className="p-4" style={{ transition: '1s' }}>
                <MDBDataTable
                    responsive
                    striped
                    fixed
                    scrollY
                    maxHeight="50vh"
                    data={this.state.data}
                />
            </div>
        );
    }
}

export default withRouter(Table)