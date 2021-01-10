import styled from 'styled-components';

const Paragraph = styled.p`
  color: ${({ theme }) => theme.grey};
  font-size: ${({ theme, big }) => (big ? theme.fontSize.l : theme.fontSize.s)};
  margin-bottom: ${({ theme, big }) => (big ? theme.fontSize.l : theme.fontSize.xxs)};
  line-height: ${({ theme, big }) => (big ? theme.fontSize.xxl : theme.fontSize.m)};
`;

export default Paragraph;