import React, { useEffect, useState } from 'react';
import { db } from '../FirebaseConfig';
import { collection, onSnapshot, query, where, startAt, endAt } from 'firebase/firestore';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'post'),
      where('name', '>=', searchTerm),
      where('name', '<=', searchTerm + '\uf8ff')
    );

    const unsub = onSnapshot(
      q,
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, [searchTerm]);

  console.log(data);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search by name" />
      {data.map((item) => (
        <div key={item.id}>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
}
