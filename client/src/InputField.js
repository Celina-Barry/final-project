import styled from 'styled-components';

const InputField = ({ type, name, value, placeholder, required, handleChange }) => {

    return (
        <StyledInput
            type={type}
            placeholder={placeholder}
            value={value}
            required={required}
            onChange={(e) => handleChange(name, e.target.value)}
        />
    );
};

const StyledInput = styled.input`
    width: 88%;

    margin-bottom: 2px;
    padding: 10px 20px;
    
`;

export default InputField;