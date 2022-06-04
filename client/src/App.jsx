import React from 'react';
import './App.scss';

const API_URL = process.env.REACT_APP_API_URL + '/api/data/';
const getDataFromDB = async () => {
	const res = await fetch(API_URL);
	const data = await res.json();
	return data;
};

const Mobile = ({data, setData}) => {
	const [material, setMaterial] = React.useState('');
	const [chargenr, setChargenr] = React.useState('');
	const [amount, setAmount] = React.useState('');

	const handleButtonClick = () => {
		if (material && chargenr && amount) {
			//add new data to backend
			fetch(API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					material: material,
					chargenr: chargenr,
					amount: amount,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					//add new data to state after added successfully
					getDataFromDB().then((data) => {
						setData(data);
					});
				})
				.catch((err) => {
					console.log(err);
				});
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
						<option value='Material1'>Material1</option>
						<option value='Material2'>Material2</option>
						<option value='Material3'>Material3</option>
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

const DataRow = ({data, setData}) => {
	const [material, setMaterial] = React.useState(data.material);
	const [chargenr, setChargenr] = React.useState(data.chargenr);
	const [amount, setAmount] = React.useState(data.amount);

	const updateData = (newData, id) => {
		//send update data to backend
		fetch(API_URL + id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newData),
		})
			.then((res) => res.json())
			.then((data) => {
				//update state after update successfully
				getDataFromDB().then((data) => {
					setData(data);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const handleMaterialChange = (e) => {
		setMaterial(e.target.value);
		updateData(
			{
				material: e.target.value,
				chargenr: chargenr,
				amount: amount,
			},
			data._id
		);
	};
	const handleChargenrChange = (e) => {
		setChargenr(e.target.value);
		updateData(
			{
				material: material,
				chargenr: e.target.value,
				amount: amount,
			},
			data._id
		);
	};
	const handleAmountChange = (e) => {
		setAmount(e.target.value);
		updateData(
			{
				material: material,
				chargenr: chargenr,
				amount: e.target.value,
			},
			data._id
		);
	};

	const date = new Date(parseInt(data.time)).toLocaleDateString();
	const time = new Date(parseInt(data.time)).toLocaleTimeString();
	return (
		<div className='DataRow'>
			<input type='text' disabled value={data.index} />
			<input type='text' value={material} onChange={handleMaterialChange} />
			<input type='text' value={chargenr} onChange={handleChargenrChange} />
			<input type='number' value={amount} onChange={handleAmountChange} />
			<input type='text' disabled value={`${date + ' ' + time}`} />
		</div>
	);
};

const Desktop = ({data, setData}) => {
	return (
		<div className='Desktop'>
			<p>Material Erfassung:</p>
			<div className='Grid'>
				<div className='Header'>
					<input type='text' disabled placeholder='Order-Nr' />
					<input type='text' disabled placeholder='Material' />
					<input type='text' disabled placeholder='Changen-Nr.' />
					<input type='text' disabled placeholder='Menge' />
					<input type='text' disabled placeholder='Datum' />
				</div>

				{
					/*Map over DB data*/
					data.map((row) => {
						return <DataRow data={row} setData={setData} key={row._id} />;
					})
				}
			</div>
		</div>
	);
};

export default function App() {
	const [data, setData] = React.useState([]);
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

	React.useEffect(() => {
		if (!data.length) {
			//get data from backend initially
			getDataFromDB().then((data) => {
				setData(data);
			});
		}
	}, [data]);

	return <div className='App'>{isMobile ? <Mobile data={data} setData={setData} /> : <Desktop data={data} setData={setData} />}</div>;
}
