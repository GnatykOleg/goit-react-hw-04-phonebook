import { Form, Contacts, Filter } from 'components';
import React, { Component } from 'react';
import shortid from 'shortid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('Contacts', JSON.stringify(contacts));
    }
  }

  componentDidMount() {
    const contactsLocalStorage = localStorage.getItem('Contacts');
    const parsed = JSON.parse(contactsLocalStorage);
    if (parsed) {
      this.setState({ contacts: parsed });
    }
  }

  formSubmitData = contact => {
    const newContactName = contact.name.toLowerCase();

    if (
      this.state.contacts.some(el => el.name.toLowerCase() === newContactName)
    ) {
      alert(`${contact.name} is already in contacts`);
    } else {
      const newContact = {
        id: shortid(),
        ...contact,
      };

      this.setState(({ contacts }) => ({
        contacts: [...contacts, newContact],
      }));
    }
  };

  changeFilter = event => {
    const { value } = event.currentTarget;
    this.setState({ filter: value });
  };

  deleteContact = todoId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== todoId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

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
        <Form formSubmitData={this.formSubmitData} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <Contacts data={filteredContacts} deleteContact={this.deleteContact} />
      </div>
    );
  }
}
