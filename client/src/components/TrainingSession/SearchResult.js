import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import {Link} from "react-router-dom";

var dateFormat = require('dateformat');

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search : '',
            sessions: [],
            allSessions : []
        }
    }
    componentDidMount(){
        axios.get('/trainingSession/all')
            .then(response => {
                this.setState({allSessions: response.data});
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getInfo(search) {
        axios.post('/trainingSession/get',{name:search})
            .then(response => {
                console.log(search);
                this.setState({sessions: response.data});
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleChange = (e) => {
        this.setState({
            search: e.target.value
        })//, () => {
         //   if (this.state.search && this.state.search.length > 1) {
         //       console.log(this.state.search);
         //       this.getInfo(this.state.search)
         //   }
        //})
    };
    render() {
        //console.log(this.state.search);
        const { search } = this.state.search;
        const filteredSessions = this.state.allSessions.filter(session => {
            return session.name.toString().toLowerCase().indexOf(this.state.search.toString().toLowerCase()) !== -1;
        });
        console.log(filteredSessions);
        //console.log(this.state.search);
        //console.log(filteredSessions.map(a=>(a.name)))
        return (
            <div>
                <div className="padding-y-60 bg-cover" data-dark-overlay={6}
                     style={{background: 'url(assets/img/breadcrumb-bg.jpg) no-repeat'}}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 my-2 text-white">
                                <ol className="breadcrumb breadcrumb-double-angle bg-transparent p-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item">My training sessions</li>
                                </ol>
                                <h2 className="h1">
                                    My Training sessions Gird
                                </h2>
                            </div>
                            <form className="col-lg-5 my-2 ml-auto">
                                <div className="input-group bg-white rounded p-1">
                                    <input type="text" className="form-control border-white" id="filter"
                                           placeholder="What do you want to learn?"
                                           value={this.state.search}
                                           onChange={this.handleChange}
                                    />
                                    <div className="input-group-append">
                                        <button className="btn btn-info rounded" type="submit">
                                            Search
                                            <i className="ti-angle-right small"/>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <section className="paddingTop-50 paddingBottom-100 bg-light-v2">
                    <div className="container">
                        {filteredSessions.map(session => (
                            <div className="list-card align-items-center shadow-v1 marginTop-30">
                                <div className="col-lg-4 px-lg-4 my-4">
                                    <img className="w-100" src="assets/img/360x220/4.jpg" alt="true"/>
                                </div>
                                <div className="col-lg-8 paddingRight-30 my-4">
                                    <div className="media justify-content-between">
                                        <div className="group">
                                            <Link to={"/allCourses/" + session._id}>
                                                <strong>{session.name}</strong>
                                            </Link>
                                            <ul className="list-inline mt-3">
                                                {session.tutor !== undefined &&
                                                <li className="list-inline-item mr-2">
                                                    <i className="ti-user mr-2"/>
                                                    {session.tutor.username}
                                                </li>}
                                                <li className="list-inline-item mr-2">
                                                    <i className="fas fa-star text-warning"/>
                                                    <i className="fas fa-star text-warning"/>
                                                    <i className="fas fa-star text-warning"/>
                                                    <i className="fas fa-star text-warning"/>
                                                    <i className="fas fa-star text-warning"/>
                                                </li>
                                            </ul>
                                        </div>
                                        <Link to="/all" className="btn btn-opacity-primary iconbox iconbox-sm"
                                              data-container="body" data-toggle="tooltip" data-placement="top"
                                              data-skin="light" title="Add to favorite"
                                              data-original-title="to favorite">
                                            <i className="ti-heart"/>
                                        </Link>
                                    </div>
                                    <p>
                                        {session.description}
                                    </p>
                                    <ul className="list-inline mb-0">
                                        <li className="list-inline-item mr-3">
                                            <i className="ti-time small mr-2"/>
                                            {dateFormat(session.startDate, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
                                        </li>
                                    </ul>
                                    <br/>

                                    {session.studentsList.length !== 0
                                        ?
                                        session.studentsList.map(list => (
                                            list._id === this.props.user.user._id
                                                ? <button className="btn btn-success shadow-success mr-3 mb-3">
                                                    Already participated</button>
                                                : <button className="btn btn-outline-success shadow-success mr-3 mb-3">
                                                    <Link to="/all">Participate now</Link></button>))

                                        : <button className="btn btn-outline-success shadow-success mr-3 mb-3">
                                            <Link to="/all">Participate now</Link></button>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {alert} = state;
    const {authentication} = state;
    const {user} = authentication;

    return {
        alert,
        user
    };
}

const connectedLoginPage = connect(mapStateToProps)(SearchResult);
export {connectedLoginPage as Search};
