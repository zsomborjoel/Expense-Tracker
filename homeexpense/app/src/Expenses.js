import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Button, Container, FormGroup, Form, Label, Input, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class Expense extends Component {

    // read only - passed to component
    // automaticaly binds after submit (callback need to be bind)
    constructor(props) {
        super(props)

        this.state = {
            date: new Date(),
            isLoading: true,
            item: this.emptyItem,
            Categorires: [],
            Expenses: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    // default send item construct
    emptyItem = {
        id: '100',
        expenseDate: new Date(),
        description: '',
        location: '',
        category: {id:1, name:'Travel'}
    }

    // based on events
    // prevent auto submittion
    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        await fetch('/api/expenses', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        console.log(this.state);
        this.props.history.push("/expenses")
    }

    async handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});

        console.log(this.state);
    }

    async handleDateChange(date) {
        let item = {...this.state.item};
        item.expenseDate = date;
        this.setState({item});
    }

    async remove(id) {
        await fetch(`/api/expenses/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            // get from state and filter on id
            let updatedExpenses = [...this.state.Expenses].filter(i => i.id !== id);
            this.setState({Expenses: updatedExpenses});
        });
    }

    // await lets you it fetched data and it is ready
    // always modify state with setState
    async componentDidMount() {
        const responsCategories = await fetch('/api/categories');
        const bodyCategories = await responsCategories.json();
        this.setState({Categorires: bodyCategories, isLoading: false});

        const responseExpenses = await fetch('/api/expenses');
        const bodyExpenses = await responseExpenses.json();
        this.setState({Expenses: bodyExpenses, isLoading: false});        
    }

    // isLoading to last to wait for both calls
    render() { 
        const title = <h3>Add Expense</h3>;
        const {Categorires} = this.state;
        const {Expenses, isLoading} = this.state;

        if (isLoading)
            return<div>Loading...</div>

        let optionList = 
            Categorires.map( (category) => 
                <option value={category.id} key={category.id}>
                    {category.name}
                </option>
            )

        let rows =
            Expenses.map( expense => 
                <tr key={expense.id}>
                    <td>{expense.description}</td>
                    <td>{expense.place}</td>
                    <td><Moment date={expense.expenseDate} format="YYYY/MM/DD"/></td>
                    <td>{expense.category.name}</td>
                    <td><Button size="sm" color="danger" onClick={ () => this.remove(expense.id)}>Delete</Button></td>
                </tr>
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

                <Container>
                    <h3>Expense list</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th with="20%">Description</th>
                                <th with="10%">Location</th>
                                <th>Date</th>
                                <th>Category</th>
                                <th with="10%">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </Container>
            </div>   
        );
    }
}
 
export default Expense;