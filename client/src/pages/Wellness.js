import React from 'react';
import styled from 'styled-components';
import { Heart, Activity, BookOpen, Target } from 'lucide-react';

const WellnessContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.xl} 0;
`;

const WellnessContent = styled.div`
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

const ComingSoon = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xxxl};
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.xl};
  border: 1px solid ${props => props.theme.colors.border};
`;

const ComingSoonTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.xxl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ComingSoonText = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.textSecondary};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const FeaturesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.xl};
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.backgroundSecondary};
  border-radius: ${props => props.theme.borderRadius.lg};
`;

const FeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${props => props.theme.colors.gradient};
  border-radius: ${props => props.theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const FeatureText = styled.div`
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text};
`;

const Wellness = () => {
  const features = [
    { icon: <Heart size={24} />, text: 'Mood Tracking' },
    { icon: <Activity size={24} />, text: 'Breathing Exercises' },
    { icon: <BookOpen size={24} />, text: 'Journaling Prompts' },
    { icon: <Target size={24} />, text: 'Wellness Goals' }
  ];

  return (
    <WellnessContainer>
      <WellnessContent>
        <Header>
          <Title>Wellness Hub</Title>
          <Subtitle>
            Your personal space for mental wellness activities, tracking, and growth
          </Subtitle>
        </Header>

        <ComingSoon>
          <ComingSoonTitle>Wellness Features Coming Soon</ComingSoonTitle>
          <ComingSoonText>
            We're building a comprehensive wellness hub with tools to help you track your mood, 
            practice mindfulness, set goals, and develop healthy habits.
          </ComingSoonText>
          
          <FeaturesList>
            {features.map((feature, index) => (
              <FeatureItem key={index}>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureText>{feature.text}</FeatureText>
              </FeatureItem>
            ))}
          </FeaturesList>
        </ComingSoon>
      </WellnessContent>
    </WellnessContainer>
  );
};

export default Wellness;
