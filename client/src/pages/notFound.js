import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFoundContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.lg};
`;

const NotFoundContent = styled.div`
  text-align: center;
  max-width: 600px;
`;

const NotFoundIcon = styled.div`
  width: 120px;
  height: 120px;
  background: ${props => props.theme.colors.gradient};
  border-radius: ${props => props.theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.xl};
  color: white;
`;

const NotFoundTitle = styled(motion.h1)`
  font-size: ${props => props.theme.typography.fontSize.xxxl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const NotFoundText = styled(motion.p)`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.textSecondary};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
  margin-bottom: ${props => props.theme.spacing.xxxl};
`;

const ActionButtons = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
`;

const ActionButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  text-decoration: none;
  transition: all ${props => props.theme.transitions.normal};
  font-size: ${props => props.theme.typography.fontSize.md};

  &.primary {
    background: ${props => props.theme.colors.gradient};
    color: white;
    box-shadow: ${props => props.theme.shadows.md};

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.shadows.lg};
    }
  }

  &.secondary {
    background-color: transparent;
    color: ${props => props.theme.colors.text};
    border: 2px solid ${props => props.theme.colors.border};

    &:hover {
      background-color: ${props => props.theme.colors.surfaceHover};
      border-color: ${props => props.theme.colors.primary};
    }
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundContent>
        <NotFoundIcon>
          <Search size={48} />
        </NotFoundIcon>
        
        <NotFoundTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Page Not Found
        </NotFoundTitle>
        
        <NotFoundText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Sorry, we couldn't find the page you're looking for. 
          It might have been moved, deleted, or you entered the wrong URL.
        </NotFoundText>
        
        <ActionButtons
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ActionButton to="/" className="primary">
            <Home size={18} />
            Go Home
          </ActionButton>
          <ActionButton to="javascript:history.back()" className="secondary">
            <ArrowLeft size={18} />
            Go Back
          </ActionButton>
        </ActionButtons>
      </NotFoundContent>
    </NotFoundContainer>
  );
};

export default NotFound;
