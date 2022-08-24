import { useState, useEffect } from 'react';
import { Form, Contacts, Filter } from 'components';

import shortid from 'shortid';

export function App() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('Contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });

  useEffect(() => {
    localStorage.setItem('Contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitData = contact => {
    const newContactName = contact.name.toLowerCase();

    if (contacts.some(el => el.name.toLowerCase() === newContactName)) {
      alert(`${contact.name} is already in contacts`);
    } else {
      const newContact = {
        id: shortid(),
        ...contact,
      };
      setContacts(prevState => [...prevState, newContact]);
    }
  };

  const changeFilter = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  const deleteContact = todoId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== todoId)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: 18,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <Form formSubmitData={formSubmitData} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <Contacts data={filteredContacts} deleteContact={deleteContact} />
    </div>
  );
}
