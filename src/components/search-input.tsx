import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 20px;
`

const Input = styled.input`
	width: 100%;
	margin-right: 20px;
	padding: 10px;
	font-size: 20px;
	box-sizing: border-box;
	height: 25px;
`

const Button = styled.button`
	width: 100px;
	padding: 10px;
	font-size: 20px;
	box-sizing: border-box;
	text-align: center;
`

interface Props {
	onSearch: (query: string) => void
}

export default class SearchComponent extends React.Component<Props> {
	public state = {
		value: ''
	}
	public handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			value: event.target.value
		})
	}
	public handleClick = (event: React.MouseEvent) => {
		this.props.onSearch(this.state.value)
	}
	public render() {
		return (
			<Wrapper>
				<Input type="search" value={this.state.value} onChange={this.handleInputChange} />
				<Button onClick={this.handleClick}>Kereses</Button>
			</Wrapper>
		)
	}
}