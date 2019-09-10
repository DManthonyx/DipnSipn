import styled from 'styled-components'

export const Div = styled.div`
  padding-top: 80px;
`

export const H1 = styled.h1`
  text-align: center;
  color: #FF3F00;
  font-size: 1em;
`

export const Form = styled.form`
  width: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Input = styled.input`
  text-align: center;
  height: 30px;
  width: 90%;
  font-size: 1em;
  margin-bottom: 6px;
  border: 1px solid #00A6ED;
  box-shadow: 0px 0px 8px #00A6ED;
`

export const Small = styled.small`
  font-size: 1.2em;
  margin-right: 2px;
`

export const DivInput = styled.div`
  width: 90%;
  height: 33px;
  margin-bottom: 3px;
  & Input {
    width: 88%;
  }
`
export const Button = styled.button`
  width: 91%;
  height: 34px;
  border: 1px solid #FF3F00;
  background: white;
  color: gray;
  box-shadow: 0px 0px 8px #FF3F00;
  font-size: 1em;
`

export const DeleteUser = styled.p`
  &:hover {
    text-decoration: underline;
  }
`
