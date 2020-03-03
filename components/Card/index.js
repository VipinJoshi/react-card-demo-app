import React, { Component } from 'react';
import _ from 'lodash';

import Search from '../Search';
import CardDetail from './CardDetail';
import './Card.css'

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, data: null, actualData: null, sortOrder: null };
    }

    componentDidMount() {
        const totalRecord = 500;
        fetch(`https://randomuser.me/api/?results=${totalRecord}`).then(res => res.json()).then((response) => {
            const results = _.get(response, 'results');
            // I need to change the format as to apply sorting and filter locally, As I didn't find any request for sorting and filter
            const data = results.map(res => {
                const { name, email, cell, location, picture } = res;
                return { name: `${name.first} ${name.last}`, email: email, cell: cell, address: `${location.city}, ${location.state}`, avatar: picture.medium }
            });
            // actual Data is a true copy not only memory reference
            this.setState({ data: data, actualData: [...data], loading: false })
        }, (error) => {
            this.setState({ data: null, loading: false })
            console.log('issue in api call', error);
        });
    }

    onSearchChange = (e) => {
        const val = e.target.value.toLowerCase();

        /* api not accepting name and phone filter in api so I will do local filter and sorting,
        as its not a correct approach wo its not work perfectly here 
        example when you remove the search text data has few record, I am adding new object that has actual data
*/
        const { actualData } = this.state;
        // filter on email and name
        const filterData = actualData.filter(d => d.name.toLowerCase().indexOf(val) > -1 || d.email.toLowerCase().indexOf(val) > -1);
        this.setState({ data: filterData });

        /*
        const totalRecord = 500;
        
        fetch(`https://randomuser.me/api/?results=${totalRecord}&phone=${e.target.value}`).then(res => res.json()).then((response) => {
            const results = _.get(response, 'results');

            results.map(res=>{
                const {name, email, cell, location, picture } = res;
                return {name : `${name.first} ${name.last}`, email: email, cell : cell , address: `${location.city}, ${location.state}`, avatar: picture.medium }
            })
            this.setState({ data: results, loading: false })
        }, (error) => {
            this.setState({ data: null, loading: false })
            console.log('issue in api call', error);
        });
        */
    }

    sortByName = () => {
        const { sortOrder, actualData, data } = this.state;
        if (!sortOrder) {
            data.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase())
                    return -1;
            });
            this.setState({ sortOrder: 'asc', data: data })
        } else if (sortOrder === 'asc') {
            data.sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase())
                    return -1;
            });
            this.setState({ sortOrder: 'desc', data: data })
        } else {
            this.setState({ sortOrder: null, data: actualData })
        }
    }

    sortStatus = () => {
        const { sortOrder } = this.state;
        switch (sortOrder) {
            case 'asc': return 'btn btn-primary';
            case 'desc': return 'btn btn-secondary';
            default: return 'btn'
        }
    }

    render() {
        const { loading, data } = this.state;
        return <div className="main">
            <div className="grid">
                <div>
                    <Search onChange={this.onSearchChange} />
                </div>
                <div className="right-align">
                    <div className="sortArea">
                        <button className={this.sortStatus()} onClick={this.sortByName}> Sort By Name </button>
                    </div>
                </div>
            </div>
            {loading && <div>loading....</div>}
            {data &&

                <div className="grid">
                    {data.map((user, index) =>
                        <CardDetail data={user}  key={`${index}_${user.name}`} />
                    )}
                </div>
            }
        </div>
    }
}

export default Card;
