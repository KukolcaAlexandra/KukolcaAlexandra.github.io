import React, { Component } from 'react';
import { ButtonToolbar, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, ButtonGroup } from 'react-bootstrap';
//import numToMonth from './functions/numToMonth';
//import addEventsToWeeks from './functions/addEventsToWeeks';
import numToMonth from '../functions/numToMonth';

class Header extends Component{
	
	render(){
		let month = numToMonth(this.props.month);
		let d = {}
		const buttonGroupInstance = (
		  <ButtonGroup>
		    <Button bsStyle="warning" onClick={(month) => this.props.onBackClick(month)} value={this.props.month}>
		    	back
		    </Button>
		    <Button bsStyle="warning" onClick={(month) => this.props.onNextClick(month)} value={this.props.month}>
		    	next
		    </Button>
		  </ButtonGroup>
		);

		const navbarInstance = (
		  <Navbar inverse collapseOnSelect>
		    <Navbar.Collapse>
		      <Nav pullLeft>
		        <NavItem eventKey={1} href="#">
		        	{buttonGroupInstance}
		        </NavItem>
		      </Nav>
		      <Nav center>
		      		<NavItem>
		      			<h4>{month} {this.props.year}</h4>
		      		</NavItem>
		      </Nav>
		      <Nav pullRight>
		        <NavItem eventKey={1} href="#">
		        	<ButtonGroup>
			        	<Button bsStyle="warning">week</Button>
			        	<Button bsStyle="warning">month</Button>
		        	</ButtonGroup>
		        </NavItem>
		      </Nav>
		    </Navbar.Collapse>
		  </Navbar>
		);

		return (
			<div>
				{navbarInstance}
			</div>
		)
	}
}

export default Header;