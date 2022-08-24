import PropTypes from 'prop-types';
import s from './Filter.module.css';

export default function Filter({ onChange, value }) {
  return (
    <div className={s.filter}>
      <label htmlFor="filter" className={s.labelFilter}>
        Find contacts by name
        <input
          className={s.filterInput}
          onChange={onChange}
          type="name"
          name="filter"
          id="filter"
          value={value}
          required
        />
      </label>
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
