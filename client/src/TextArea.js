import styled from 'styled-components';

const TextArea = ({ type, name, placeholder, required, handleChange }) => {

    return (
        <StyledTextArea
            type={type}
            placeholder={placeholder}
            required={required}
            onChange={(e) => handleChange(name, e.target.value)}
        />
    );
};

const StyledTextArea = styled.textarea`
    width: 100%;
    height: 150px;
    resize: none;

`;

export default TextArea;