import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import { database } from './page';

const DataTable = () => {
  const [colorData, setColorData] = useState([]);

  useEffect(() => {
    const databaseRef = database.ref('colorDataref');

    databaseRef
      .orderByKey()
      .limitToLast(10)
      .on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const colorDataArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }));

          colorDataArray.sort((a, b) => b.timestamp - a.timestamp);
          setColorData(colorDataArray);
        }
      });

    return () => {
      databaseRef.off();
    };
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Color</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {colorData.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.color}</td>
            <td>{item.timestamp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ColorDataTable;