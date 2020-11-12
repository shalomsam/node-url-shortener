import React, { FC, useContext } from 'react';
import './styles.css';
import Editable from '../Editable';
import { NotificationContext } from '../Notification';

interface IUrlList {
    _id: string;
    httpCode: number;
    shortPath: string;
    longUrl: string;
    options: object;
    createdOn: Date;
    startDate: Date;
    endDate: Date;
}

interface Props {
    list: any[];
}

const UrlList: FC<Props>  = ({ list = [] }: Props) => {

    const { addNotification } = useContext(NotificationContext);

    const update = async (id: string, data: Partial<IUrlList>) => {
        if (data && id) {
            try {
                const result = await fetch(`/api/shorturl/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const response = await result.json();
                console.log('Saved! >> ', response);
                addNotification({ type: 'success', message: 'Saved!' });
                return response;
            } catch (e) {
                console.error('Update Error > ', e);
                addNotification({ type: 'error', message: `Update Error > ${e.message}` });
                return false;
            }
        }

        console.log('Update Error');
        addNotification({ type: 'error', message: 'Update Error!' });
        return false;
    }

    const content = list.sort((a, b) => a.createdOn - b.createdOn).map((item: IUrlList, index: number) => {

        let createdOn: any = new Date(item.createdOn);
        createdOn = createdOn.toDateString();

        let startDate: any = item.startDate ? (new Date(item.startDate)).toDateString() : 'None';
        let endDate: any = item.endDate ? (new Date(item.endDate)).toDateString() : 'None';

        return (
            <tr key={`listItem${index}`} className='listItem'>
                <td className='httpCode'>
                    <Editable onUpdate={(httpCode) => update(item._id, { httpCode })}>
                        {item.httpCode}
                    </Editable>
                </td>
                <td className='urlFrom'>
                    /{item.shortPath}
                </td>
                <td className='urlTo'>
                    <Editable onUpdate={(longUrl) => update(item._id, { longUrl })}>
                        {item.longUrl}
                    </Editable>
                </td>
                <td className='startDate'>
                    {startDate}
                </td>
                <td className='endDate'>
                    {endDate}
                </td>
                <td className='createdOn'>
                    {createdOn}
                </td>
                <td className='options'>
                    
                </td>
            </tr>
        );
    });

    const showDefault = () => (<tr className='listItem'><td rowSpan={7}>No Items</td></tr>)

    return (
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <td><h4>Http Code</h4></td>
                    <td><h4>From</h4></td>
                    <td><h4>To</h4></td>
                    <td><h4>Start Date</h4></td>
                    <td><h4>End Date</h4></td>
                    <td><h4>createdOn</h4></td>
                    <td><h4>Options</h4></td>
                </tr>
            </thead>
            <tbody>
                {list.length ? content : showDefault()}
            </tbody>
        </table>
    );
}

export default UrlList;
