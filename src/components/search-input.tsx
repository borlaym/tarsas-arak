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
	private inputEl: React.RefObject<HTMLInputElement>
	public state = {
		value: ''
	}
	constructor(props: Props) {
		super(props);
		this.inputEl = React.createRef()
	}
	public handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			value: event.target.value
		})
	}
	public handleClick = (event: React.MouseEvent) => {
		this.props.onSearch(this.state.value)
	}
	public handleKeyPress = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			this.props.onSearch(this.state.value)
		}
	}
	public handleFocus = () => {
		this.setState({
			value: ''
		})
	}

	public componentDidMount() {
		if (this.inputEl.current) {
			this.inputEl.current.focus();
		}
	}
	public render() {
		return (
			<Wrapper>
				<Input
					innerRef={this.inputEl}
					type="search"
					value={this.state.value}
					onChange={this.handleInputChange}
					onKeyPress={this.handleKeyPress}
					onFocus={this.handleFocus}
				/>
				<Button onClick={this.handleClick}>Kereses</Button>
			</Wrapper>
		)
	}
}