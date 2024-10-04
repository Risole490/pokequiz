import styled from "styled-components";

const InputStyled = styled.input`
    width: 250px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 5px;
    font-size: 1.2rem;

    @media (min-width: 320px) and (max-width: 425px) {
        width: 200px;
        font-size: 1rem;
    }
`;



const Input = ({ type, placeholder, value, onBlur }) => {
    return (
        <InputStyled 
            type={type} 
            placeholder={placeholder} 
            value={value} 
            onBlur={onBlur} // onBlur é um evento que ocorre quando o input perde o foco
        />
    )
}

export { Input };