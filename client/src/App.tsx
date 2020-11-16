import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import UrlList from './components/UrlList';
import 'bootstrap/dist/css/bootstrap.css';
import Notifications, { NotificationProvider, NotificationContext } from './components/Notification';
import Button from './components/Button';
import Modal from './components/Modal';
import Form, { IFormData } from './components/Form';
import Field from './components/Form/Field';

const App = () => {

    const [list, setList] = useState([]);
    const [showAddUrlModal, setshowAddUrlModal] = useState(false);
    const { addNotification } = useContext(NotificationContext);

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
    }, []);

    const addShortUrl = async (formData: IFormData) => {
        try {
            const result = await fetch('/api/shortUrl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const response = await result.json();
            addNotification({ type: 'success', message: 'New Short Url created!' });
            return response;
        } catch (e) {
            console.log('Error >> ', e);
            addNotification({ type: 'error', message: 'Error trying to create short url.' });
            return { status: 'error', ...e };
        }
    }

    return (
        <NotificationProvider>
            <div className="App">
                <h1>Url List:</h1>
                <div className='actionWrp'>
                    <Button onClick={() => setshowAddUrlModal(true)}>Add Short Url</Button>
                    <Modal showModal={showAddUrlModal}>
                        <div className='modal-body'>
                            <Form
                                submit={async (formdata) => {
                                    console.log('formdata >> ', formdata);
                                    await addShortUrl(formdata);
                                    setshowAddUrlModal(false);
                                }}
                            >
                                <Field
                                    type='multiSelect'
                                    label='Http Code'
                                    name='httpCode'
                                    options={[
                                        { label: '301', value: 301 },
                                        { label: '302', value: 302, isSelected: true }
                                    ]}
                                />
                                <Field
                                    type='text'
                                    label='From'
                                    placeholder='Short Url'
                                    name='shortUrl'
                                    value=''
                                />
                                <Field
                                    type='text'
                                    label='To'
                                    placeholder='Long Url'
                                    name='longUrl'
                                    value=''
                                />
                                <Field
                                    type='datetime-local'
                                    label='Start Date'
                                    name='startDate'
                                    value=''
                                />
                                <Field
                                    type='datetime-local'
                                    label='End Date'
                                    name='endDate'
                                    value=''
                                />
                            </Form>
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
