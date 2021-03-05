import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavigation = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	box-shadow: 0 -10px 10px rgba(0,0,0,.1);
	display: flex;
	justify-content: center;

	nav {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		background: #fff;
		
		width: 100%;
		max-width: 1000px;
	}

	.add-button {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		padding: 20px 30px;
		
		img {
			width: 80px;
		}
	}

	.home-icon, .profile-icon {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		text-decoration: none;
		padding: 20px 30px;
		color: #999;
		text-transform: uppercase;

		img {
			width: 30px;
		}
	}
`;

const Navigation = () => {
	return (
		<StyledNavigation>
			<nav>
				<Link to="/plants" className="home-icon">
					<img src="/home-icon.png" />
					<span>Home</span>
				</Link>
				<Link to="/plants/add" className="add-button">
					<img src="/add-button.png" />
				</Link>
				<Link to="/profile" className="profile-icon">
					<img src="/profile-icon.png" />
					<span>Profile</span>
				</Link>
			</nav>
		</StyledNavigation>
	);
};

export default Navigation;
