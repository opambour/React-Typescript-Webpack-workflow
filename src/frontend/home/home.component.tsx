import React, { Component, Fragment } from 'react';
import { Button } from '../components/form_components/button.component';

export interface IHomeProps {
	readonly reactMessage: string;
	readonly tsMessage?: string;
}

interface IHomeState {
    counter: number;
}

export class HomeComponent extends Component<IHomeProps, IHomeState> {
    // default props values if unspecified...
    public static defaultProps: Partial<IHomeProps> = {
        tsMessage: 'Typescript',
    };

	constructor(props: IHomeProps) {
		super(props);
		this.incrementCounterHandler = this.incrementCounterHandler.bind(this);
		this.decrementCounterHandler = this.decrementCounterHandler.bind(this);
		this.resetCounterButton = this.resetCounterButton.bind(this);

		this.state = {
		    counter: 0,
        };
	}

    public render() {
        return (
            <Fragment>
                <h1>Welcome to {this.props.reactMessage} with {this.props.tsMessage}!!</h1>
                <Button buttonClick={this.decrementCounterHandler} children={'- Decrease'}/>
                {/*<button type="button" onClick={this.decrementCounterHandler}>- Decrease</button>*/}
                counter: <strong>{this.state.counter}</strong>
                <Button buttonClick={this.incrementCounterHandler} children={'Increase +'}/>
                <Button buttonClick={this.resetCounterButton}>Reset Button <strong>Counter</strong></Button>
            </Fragment>
        );
    }

    private incrementCounterHandler() {
        this.setState((prevState): IHomeState => (
            {
                counter: prevState.counter + 1,
            }
        ));
    }

    private decrementCounterHandler() {
	    if (this.state.counter >= 1) { // avoid negative numbers
            this.setState((prevState): IHomeState => (
                {
                    counter: prevState.counter - 1,
                }
            ));
        }
    }

    private resetCounterButton() {
	    this.setState((): IHomeState => (
            {
                counter: 0,
            }
        ));
    }
}
