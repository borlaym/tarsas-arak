import * as React from 'react';
import Item from '../Item';

const ItemComponent = (item: Item) => {
	return (
		<div>
			<div>{item.title}</div>
			<div>{item.price}</div>
			<div>{item.language}</div>
		</div>
	)
}

export default ItemComponent;