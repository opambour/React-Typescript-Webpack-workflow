import React, {Component, Fragment} from 'react';
import { HomeComponent } from './home/home.component';
import { Header } from './components/includes/header.component';
import { Footer } from './components/includes/footer.component';

export default class App extends Component {
    public render() {
        return(
			<Fragment>
				{/* -- Header component -- */}
				<Header/>

				<main role="main">
					<HomeComponent reactMessage={'React Fiber (v.16)'}/>
				</main>

				{/* -- Footer component -- */}
				<Footer/>
			</Fragment>
		);
    }
}
