import PropTypes from 'prop-types';
import s from './Contacts.module.css';

export default function Contacts({ data, deleteContact }) {
  return (
    <ul className={s.list}>
      <h3 className={s.listTitle}>Total contacts: {data.length}</h3>
      {data.map(({ id, name, number }) => {
        return (
          <li key={id} className={s.item}>
            <p className={s.text}>{name}</p>
            <p className={s.text}>{number}</p>
            <button
              className={s.btn}
              type="submit"
              onClick={() => deleteContact(id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}

Contacts.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func,
};
