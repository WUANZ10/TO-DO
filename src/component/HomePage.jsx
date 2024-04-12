import React, { useEffect, useState } from 'react';
import '../style/style.css';
export default function HomePage() {
    const [data, setData] = useState([
        {
            id: 0,
            content: 'Do coding challenges',
            status: false
        },
        {
            id: 1,
            content: 'AIOT',
            status: false
        }
    ]);

    //LocalStorage
    useEffect(() => {
        const storedData = localStorage.getItem('todoData');
        if (storedData) {
            setData(JSON.parse(storedData));
        }
    }, []);

    // Get input
    const [input, setInput] = useState('');
    const changeInput = (event) => {
        setInput(event.target.value);
    };

    // Add
    const add = (event) => {
        event.preventDefault();
        let newData = [...data];
        let findIndex = newData.findIndex((item) => {
            return input === item.content;
        });
        if (input.trim() !== '') {
            if (findIndex === -1) {
                newData.push({
                    id: Math.floor(Math.random() * 100),
                    content: input.trim(),
                    status: false
                });
                setData(newData);
                setInput('');
                localStorage.setItem('todoData', JSON.stringify(newData));
            }
            else {
                alert("Exist!")
            }
        } else {
            alert('Please input!');
        }
    };

    // Check
    const checkboxChange = (id) => {
        const index = data.findIndex((item) => item.id === id);
        if (index !== -1) {
            const updatedData = [...data];
            updatedData[index] = { ...updatedData[index], status: !updatedData[index].status };
            setData(updatedData);
            localStorage.setItem('todoData', JSON.stringify(updatedData));
        }
    };

    //Delete
    const handleDelete = (id) => {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
        localStorage.setItem('todoData', JSON.stringify(updatedData));
    };

    // Delete all 
    const handleDeleteAll = (event) => {
        event.preventDefault();
        setData([]);
        localStorage.removeItem('todoData');
    };
    // Render
    const render = (filter) => {
        return data.map((value) => {
            if (filter === 'all' || (filter === 'active' && !value.status) || (filter === 'complete' && value.status)) {
                let className = 'task-detail';
                if (value.status) {
                    className += ' completed-task';
                }
                return (
                    <div className={className} key={value.id}>
                        <ul>
                            <input type="checkbox" onChange={() => checkboxChange(value.id)} name={value.id} checked={value.status} />
                            <li>{value.content}</li>
                        </ul>
                        {value.status && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="delete" onClick={() => handleDelete(value.id)}>
                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                            </svg>
                        )}
                    </div>
                );
            }
        });
    };

    return (
        <div className='container'>
            <form action="">
                <div className='header'>
                    <h1>#todo</h1>
                </div>
                <div className='body'>
                    <div className="nav-tab">
                        <div>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">All</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Active</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Completed</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
                                    <div className="add-todos">
                                        <input value={input} type='text' id='' placeholder='add details' onChange={changeInput} />
                                        <div className='btn-add'>
                                            <button onClick={add}>Add</button>
                                        </div>
                                    </div>
                                    <div className="content-todos">
                                        {render('all')}
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
                                    <div className="add-todos">
                                        <input value={input} type='text' id='' placeholder='add details' onChange={changeInput} />
                                        <div className='btn-add'>
                                            <button onClick={add}>Add</button>
                                        </div>
                                    </div>
                                    <div className="content-todos">
                                        {render('active')}
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex={0}>
                                    <div className="content-todos">
                                        {render('complete')}
                                    </div>
                                    <div className="delete-all">
                                        <button onClick={handleDeleteAll}>Delete all</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}