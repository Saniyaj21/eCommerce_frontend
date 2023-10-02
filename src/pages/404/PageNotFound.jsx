import "./pageNotFound.scss";
import {Link} from 'react-router-dom'

const PageNotFound = () => {
	return (
		<div className="page-not-found">
			<h1>404</h1>
			<h2>Page Not Found</h2>
			<Link to={'/'}><button className="page-not-found-btn">Go Home</button></Link>
		</div>
	);
};

export default PageNotFound;
