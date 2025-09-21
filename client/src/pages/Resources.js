import React from 'react';
import styled from 'styled-components';
import { BookOpen, Phone, Users, Heart, Shield, ExternalLink } from 'lucide-react';

const ResourcesContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.xl} 0;
`;

const ResourcesContent = styled.div`
  max-width: 1200px;
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
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Subtitle = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`;

const CrisisAlert = styled.div`
  background-color: ${props => props.theme.colors.errorLight};
  border: 1px solid ${props => props.theme.colors.error};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  text-align: center;
`;

const CrisisText = styled.p`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  margin: 0;
`;

const CrisisLink = styled.a`
  color: ${props => props.theme.colors.error};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  text-decoration: none;
  margin: 0 ${props => props.theme.spacing.sm};

  &:hover {
    text-decoration: underline;
  }
`;

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.xl};
`;

const ResourceCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.xl};
  transition: all ${props => props.theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const ResourceIcon = styled.div`
  width: 64px;
  height: 64px;
  background: ${props => props.theme.colors.gradient};
  border-radius: ${props => props.theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ResourceTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
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

const Resources = () => {
  const resources = [
    {
      icon: <Phone size={32} />,
      title: 'Crisis Support',
      description: '24/7 crisis intervention and suicide prevention resources',
      link: '/crisis',
      linkText: 'Get Crisis Help'
    },
    {
      icon: <Users size={32} />,
      title: 'Professional Help',
      description: 'Find therapists, counselors, and mental health professionals',
      link: '/resources/professional',
      linkText: 'Find Professionals'
    },
    {
      icon: <BookOpen size={32} />,
      title: 'Self-Help Resources',
      description: 'Books, apps, and tools for mental wellness and self-care',
      link: '/resources/self-help',
      linkText: 'Explore Resources'
    },
    {
      icon: <Heart size={32} />,
      title: 'Support Groups',
      description: 'Connect with others who understand what you\'re going through',
      link: '/resources/support',
      linkText: 'Find Support'
    }
  ];

  return (
    <ResourcesContainer>
      <ResourcesContent>
        <Header>
          <Title>Mental Health Resources</Title>
          <Subtitle>
            Comprehensive resources and support for your mental wellness journey
          </Subtitle>
        </Header>

        <CrisisAlert>
          <CrisisText>
            <Heart size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            In crisis? Call <CrisisLink href="tel:988">988</CrisisLink> (Suicide & Crisis Lifeline) 
            or text <CrisisLink href="sms:741741">HOME to 741741</CrisisLink> (Crisis Text Line)
          </CrisisText>
        </CrisisAlert>

        <ResourcesGrid>
          {resources.map((resource, index) => (
            <ResourceCard key={index}>
              <ResourceIcon>{resource.icon}</ResourceIcon>
              <ResourceTitle>{resource.title}</ResourceTitle>
              <ResourceDescription>{resource.description}</ResourceDescription>
              <ResourceLink href={resource.link}>
                {resource.linkText}
                <ExternalLink size={16} />
              </ResourceLink>
            </ResourceCard>
          ))}
        </ResourcesGrid>
      </ResourcesContent>
    </ResourcesContainer>
  );
};

export default Resources;
