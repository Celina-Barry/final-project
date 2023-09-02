import styled from 'styled-components';

const InputField = ({ type, name, placeholder, required, handlechange }) => {

    return (
        <StyledInput
            type={type}
            placeholder={placeholder}
            required={required}
            onChange={(e) => handlechange(name, e.target.value)}
        />
    );
};

const StyledInput = styled.input`
    border: none;
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 5px 25px;
    outline: none;
`;

export default InputField;