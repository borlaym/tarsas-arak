import * as React from 'react';
import './App.css';
import szellemlovas from './scrapers/szellemlovas';
import ItemComponent from './components/item-component';
import Item from './Item';
import SearchComponent from './components/search-input';

class App extends React.Component {
	public state = {
		items: [],
		query: ''
	}
	
	public componentDidMount() {
		szellemlovas('scythe').then(items => this.setState({ items }));
	}
	public startSearch = (query: string) => {
		this.setState({
			items: []
		}, () => szellemlovas(query).then(items => this.setState({ items })))
	}
	public render() {
		return (
			<div>
				<SearchComponent onSearch={this.startSearch} />
				{this.state.items.map((item: Item, index: number) => <ItemComponent key={index} {...item} />)}
			</div>
		);
	}
}

export default App;
