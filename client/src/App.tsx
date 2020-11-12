import React, { useEffect, useState } from 'react';
import './App.css';
import UrlList from './components/UrlList';
import 'bootstrap/dist/css/bootstrap.css';
import Notifications, { NotificationProvider, NotificationContext } from './components/Notification';
import Button from './components/Button';
import Modal from './components/Modal';

const App = () => {

    const [list, setList] = useState([]);
    const [showAddUrlModal, setshowAddUrlModal] = useState(false);

    useEffect(() => {
        const fetchUrlList = async () => {
            let data;
            try {
                const result = await fetch('/api/shorturl');
                data = await result.json();
                console.log('data >>', data);
                setList(data);
            } catch (e) {
                console.error('Error >>', e);
            }
        }
        fetchUrlList();
    }, [])

    return (
        <NotificationProvider>
            <div className="App">
                <h1>Url List:</h1>
                <div className='actionWrp'>
                    <Button onClick={() => setshowAddUrlModal(true)}>Add Short Url</Button>
                    <Modal showModal={showAddUrlModal}>
                        <div className='modal-body'>
                            <form id='newUrlForm'>
                                <div className="form-group">
                                    <label htmlFor="httpCode">Http Code</label>
                                    <input type="text" className="form-control" id="httpCode" placeholder="Http Code" />
                                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="shortUrl">Short Url</label>
                                    <input type="text" className="form-control" id="shortUrl" placeholder="Short Url" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="shortUrl">Start Date</label>
                                    <input type="text" className="form-control" id="shortDate" placeholder="Short Date" />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </Modal>
                </div>
                <UrlList list={list} />
            </div>
            <NotificationContext.Consumer>
                {({ notifications }) => {
                    return (
                        <Notifications notifications={notifications} />
                    )
                }}
            </NotificationContext.Consumer>
        </NotificationProvider>
    );
}

export default App;
