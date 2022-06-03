import React from 'react';

const Mobile = () => {
	const [material, setMaterial] = React.useState('');
	const [chargenr, setChargenr] = React.useState('');
	const [amount, setAmount] = React.useState('');

	return (
		<div className='Mobile'>
			<p>Material Erfassung:</p>
			<div className='Inputs'>
				<div className='Dropdown'>
					<label>Material:</label>
					<select>
						<option>Material1</option>
						<option>Material2</option>
						<option>Material3</option>
					</select>
				</div>
				<div className='Fields'>
					<input type='text' placeholder='Chargen-Nr.' />
					<input type='number' placeholder='Menge' />
				</div>
				<div className='Buttons'>
					<input type='button' value='Speichern' />
				</div>
			</div>
		</div>
	);
};

const Desktop = () => {
	return (
		<div className='Desktop'>
			<p>Desktop</p>
		</div>
	);
};

export default function App() {
	const [isMobile, setIsMobile] = React.useState(false);
	React.useEffect(() => {
		setIsMobile(window.innerWidth < 768);

		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const getDataFromDB = () => {
		fetch(process.env.REACT_APP_API_URL + '/api/getData')
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			});
	};

	return <div className='App'>{isMobile ? <Mobile /> : <Desktop />}</div>;
}
