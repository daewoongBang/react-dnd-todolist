import styled from 'styled-components';

interface IToDoGroupProps {
  title: string;
}

const Container = styled.div`
  padding: 16px;
  background-color: #cecece;
  border-radius: 5px;

  > h3 {
    font-size: 18px;
    font-weight: 600;
  }

  > ul {
    margin-top: 10px;
  }
`;

const ToDoGroup = ({ title }: IToDoGroupProps) => {
  return (
    <Container>
      <h3>{title}</h3>

      <ul>
        <li>item-1</li>
      </ul>
    </Container>
  );
};

export default ToDoGroup;
