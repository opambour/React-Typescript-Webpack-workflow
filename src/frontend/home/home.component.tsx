import React, {Component} from 'react';

export interface IProps {
	message: string;
}

export class HomeComponent extends Component<IProps, {}> {
	constructor(props: IProps) {
		super(props);
	}

	public render(): JSX.Element {
		return (
			<h1>Welcome to {this.props.message}!!</h1>
		);
	}
}
