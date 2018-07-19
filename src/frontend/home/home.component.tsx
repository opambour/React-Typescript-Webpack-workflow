import React, {Component} from 'react';

export interface IHomeProps {
	reactMessage: string;
	tsMessage: string;
}

export class HomeComponent extends Component<IHomeProps, {}> {
	constructor(props: IHomeProps) {
		super(props);
	}

	public render(): JSX.Element {
		return (
			<h1>Welcome to {this.props.reactMessage} with {this.props.tsMessage}!!</h1>
		);
	}
}
