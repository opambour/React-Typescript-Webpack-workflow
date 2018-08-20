import React, { Component, MouseEventHandler, ReactNode } from 'react';

export interface IButtonProps {
    readonly buttonType?: string,
    readonly buttonClasses?: string,
    readonly buttonStyle?: any,
    readonly buttonClick?: MouseEventHandler<HTMLButtonElement>,
    readonly children?: ReactNode,
}

export class Button extends Component<IButtonProps, {}> {
    // default props values if unspecified...
    public static defaultButtonProps: Partial<IButtonProps> = {
        buttonType: 'button',
    };

    constructor(props: IButtonProps) {
        super(props);
    }

    public render() {
        return (
            <button type={this.props.buttonType} className={this.props.buttonClasses} style={this.props.buttonStyle} onClick={this.props.buttonClick}>
                {this.props.children}
            </button>
        );
    }
}
