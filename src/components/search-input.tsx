import * as React from 'react';
import styled from 'styled-components';
import { Vendor } from '../Item';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 20px;
	position: relative;
`

const Input = styled.input`
	width: 100%;
	margin: 20px;
	margin-left: 0;
	border: none;
	padding-bottom: 8px;
	outline: none;
	font-size: 20px;
	box-sizing: border-box;
	border-bottom: 1px solid #9e9e9e;
	font-family: 'Roboto', sans-serif;

	&:focus {
		border-bottom: 1px solid #26a69a;
		box-shadow: 0 1px 0 0 #26a69a;
	}
`

const Button = styled.button`
	cursor: pointer;
	text-decoration: none;
	color: #fff;
	background-color: #26a69a;
	text-align: center;
	letter-spacing: .5px;
	font-size: 14px;
	outline: 0;
	border: none;
	border-radius: 2px;
	height: 36px;
	line-height: 36px;
	padding: 0 16px;
	text-transform: uppercase;
	box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
	font-family: 'Roboto', sans-serif;
`

const LoadingStatus = styled.div`
	position: absolute;
	right: 130px;
	color: #26a69a;
	font-family: 'Roboto', sans-serif;
	font-size: 16px;
	display: flex;
	align-items: center;

`

const LoadingSpinner = styled.img`
	width: 25px;
	height: 25px;
	margin-left: 5px;
`

interface Props {
	onSearch: (query: string) => void,
	loading: number
}

function Loading(props: { current: number, max: number }) {
	return (
		<LoadingStatus>
			{props.max - props.current} / {props.max}
			<LoadingSpinner src="oval.svg" />
		</LoadingStatus>
	)
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
					type="text"
					value={this.state.value}
					onChange={this.handleInputChange}
					onKeyPress={this.handleKeyPress}
					onFocus={this.handleFocus}
				/>
				{this.props.loading > 0 && <Loading current={this.props.loading} max={Object.keys(Vendor).length} /> }
				<Button onClick={this.handleClick}>Kereses</Button>
			</Wrapper>
		)
	}
}