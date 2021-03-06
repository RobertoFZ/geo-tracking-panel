import styled from 'styled-components';
import { Layout } from 'antd';
const { Content } = Layout;

const SPACING = '160px'

const AppContent = styled(Content)`
  padding: 0;
  margin: 0;
  min-height: calc(100vh - ${SPACING});
  position: relative;
`;

export default AppContent;