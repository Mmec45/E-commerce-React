import './form-input.styles.scss';

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className='group'>
      <input className='form-input' {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-input-label`} // faire rétrécisse l'equitte et la longuer des caracteres à zero avec la classe shrink
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;