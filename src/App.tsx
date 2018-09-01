import * as React from 'react';
import './App.css';
import szellemlovas from './scrapers/szellemlovas';
import ItemComponent from './components/item-component';
import Item from './Item';

class App extends React.Component {
	public state = {
		items: [],
		query: ''
	}
	public handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			query: event.target.value
		})
	}
	public componentDidMount() {
		szellemlovas('scythe').then(items => this.setState({ items }));
	}
	public startSearch = () => {
		const query = this.state.query
		this.setState({
			items: []
		}, () => szellemlovas(query).then(items => this.setState({ items })))
	}
	public render() {
		return (
			<div>
				<input type="search" value={this.state.query} onChange={this.handleInputChange}/>
				<button onClick={this.startSearch}>Kereses</button>
				{this.state.items.map((item: Item, index: number) => <ItemComponent key={index} {...item} />)}
			</div>
		);
	}
}

export default App;
