import React from 'react';
import styled from 'styled-components';
import { Phone, MessageSquare, Heart, Shield, AlertTriangle } from 'lucide-react';

const CrisisContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.xl} 0;
`;

const CrisisContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xxxl};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.fontSize.xxxl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.error};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Subtitle = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.textSecondary};
`;

const EmergencySection = styled.div`
  background-color: ${props => props.theme.colors.errorLight};
  border: 2px solid ${props => props.theme.colors.error};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.xxxl};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xxxl};
`;

const EmergencyTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.xxl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.error};
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
`;

const EmergencyText = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.error};
  margin-bottom: ${props => props.theme.spacing.xl};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const EmergencyButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xxxl};
  background-color: ${props => props.theme.colors.error};
  color: white;
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  transition: all ${props => props.theme.transitions.normal};

  &:hover {
    background-color: ${props => props.theme.colors.error};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const ResourcesSection = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.xl};
`;

const ResourceCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.xl};
`;

const ResourceHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ResourceIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${props => props.theme.colors.gradient};
  border-radius: ${props => props.theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const ResourceTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const ResourceDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ResourceLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  text-decoration: none;
  transition: color ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.primaryHover};
  }
`;

const Crisis = () => {
  const resources = [
    {
      icon: <Phone size={24} />,
      title: 'Suicide & Crisis Lifeline',
      description: '24/7 crisis support for suicide prevention and mental health crises. Available in English and Spanish.',
      link: 'tel:988',
      linkText: 'Call 988'
    },
    {
      icon: <MessageSquare size={24} />,
      title: 'Crisis Text Line',
      description: 'Text HOME to 741741 to connect with a crisis counselor. Available 24/7.',
      link: 'sms:741741',
      linkText: 'Text HOME to 741741'
    },
    {
      icon: <Shield size={24} />,
      title: 'Emergency Services',
      description: 'If you or someone you know is in immediate danger, call 911 or go to the nearest emergency room.',
      link: 'tel:911',
      linkText: 'Call 911'
    }
  ];

  return (
    <CrisisContainer>
      <CrisisContent>
        <Header>
          <Title>Crisis Support</Title>
          <Subtitle>
            If you're in crisis, help is available 24/7. You are not alone.
          </Subtitle>
        </Header>

        <EmergencySection>
          <EmergencyTitle>
            <AlertTriangle size={32} />
            Need Immediate Help?
          </EmergencyTitle>
          <EmergencyText>
            If you're having thoughts of suicide or self-harm, please reach out for help right now.
          </EmergencyText>
          <EmergencyButton href="tel:988">
            <Phone size={24} />
            Call 988 Now
          </EmergencyButton>
        </EmergencySection>

        <ResourcesSection>
          {resources.map((resource, index) => (
            <ResourceCard key={index}>
              <ResourceHeader>
                <ResourceIcon>{resource.icon}</ResourceIcon>
                <ResourceTitle>{resource.title}</ResourceTitle>
              </ResourceHeader>
              <ResourceDescription>{resource.description}</ResourceDescription>
              <ResourceLink href={resource.link}>
                {resource.linkText}
              </ResourceLink>
            </ResourceCard>
          ))}
        </ResourcesSection>
      </CrisisContent>
    </CrisisContainer>
  );
};

export default Crisis;
