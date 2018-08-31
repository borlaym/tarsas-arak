import * as React from 'react';
import './App.css';
import szellemlovas from './scrapers/szellemlovas';
import ItemComponent from './components/item-component';
import Item from './Item';

class App extends React.Component {
	public state = {
		items: []
	}
	public componentDidMount() {
		szellemlovas('scythe').then(items => this.setState({ items }));
	}
	public render() {
		return (
			<div>
				{this.state.items.map((item: Item, index: number) => <ItemComponent key={index} {...item} />)}
			</div>
		);
	}
}

export default App;
