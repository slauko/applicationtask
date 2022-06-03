import React from 'react';
import './App.scss';

const Mobile = () => {
	const [material, setMaterial] = React.useState('');
	const [chargenr, setChargenr] = React.useState('');
	const [amount, setAmount] = React.useState('');

	const handleButtonClick = () => {
		//TODO: send data to backend
		if (material && chargenr && amount) {
			console.log(material, chargenr, amount);
		}
	};

	return (
		<div className='Mobile'>
			<p>Material Erfassung:</p>
			<div className='Inputs'>
				<div className='Dropdown'>
					<select
						onChange={(e) => {
							setMaterial(e.target.value);
						}}
						defaultValue=''
					>
						<option value='' disabled>
							Material auswählen
						</option>
						<option value='1'>Material1</option>
						<option value='2'>Material2</option>
						<option value='3'>Material3</option>
					</select>
				</div>
				<div className='Fields'>
					<input
						type='text'
						placeholder='Chargen-Nr.'
						onChange={(e) => {
							setChargenr(e.target.value);
						}}
					/>
					<input
						type='number'
						placeholder='Menge'
						onChange={(e) => {
							setAmount(e.target.value);
						}}
					/>
				</div>
				<div className='Buttons'>
					<input type='button' value='Speichern' onClick={handleButtonClick} />
				</div>
			</div>
		</div>
	);
};

const Desktop = ({data, setData}) => {
	return (
		<div className='Desktop'>
			<p>Material Erfassung:</p>
			<div className='Grid'>
				<div className='Header'>
					<input type='text' disabled placeholder='Material' />
					<input type='text' disabled placeholder='Changen-Nr.' />
					<input type='text' disabled placeholder='Menge' />
				</div>

				{/*TODO: Map over DB data below*/}
				<div className='Row'>
					<input type='text' />
					<input type='text' />
					<input type='text' />
				</div>
			</div>
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
