import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Button, Container, FormGroup, Form, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

class Expense extends Component {

    state = { 
        date: new Date(),
        isLoading: true,
        expenses: [],
        categorires: []
    }

    // await lets you it fetched data and it is ready
    // always modify state with setState
    async componentDidMount() {
        const response = await fetch('/api/categories');
        const body = await response.json();

        this.setState({Categorires: body, isLoading: false});
    }

    render() { 
        const title = <h3>Add Expense</h3>;
        const {Categorires, isLoading} = this.state;


        if (isLoading)
            return<div>Loading...</div>

        let optionList = 
            Categorires.map( (category) => 
                <option value={category.id} key={category.id}>
                    {category.name}
                </option>
            )
    
        return (
            <div>
                <AppNav/>
                <Container>
                    {title}

                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input type="text" name="title" id="title" onChange={this.handleChange}/>
                        </FormGroup>
                            
                        <FormGroup>
                            <Label for="title">Category</Label>
                            <select>
                                {optionList}
                            </select>

                            <Input type="text" name="category" id="category" onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="title">Expense Date</Label>
                            <DatePicker selected={this.state.date} onChange={this.handleDateChange}/>
                        </FormGroup>

                        <div className="row">
                            <FormGroup className="col-md-4 mb-3">
                            <Label for="location">Location</Label>
                            <Input tpye="text" name="location" id="location"/>   
                            </FormGroup>
                        </div>

                        <FormGroup>
                            <Label for="title">Location</Label>
                            <Input type="text" name="location" id="location" onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/">Cancel</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>   
        );
    }
}
 
export default Expense;