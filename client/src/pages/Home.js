import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Shield, 
  MessageCircle, 
  Heart, 
  Lock, 
  Users, 
  Brain,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
`;

const HeroSection = styled.section`
  background: ${props => props.theme.colors.gradient};
  color: white;
  padding: ${props => props.theme.spacing.xxxl} 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled(motion.h1)`
  font-size: ${props => props.theme.typography.fontSize.xxxl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: ${props => props.theme.typography.lineHeight.tight};

  @media (max-width: 768px) {
    font-size: ${props => props.theme.typography.fontSize.xxl};
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${props => props.theme.typography.fontSize.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  opacity: 0.9;
  line-height: ${props => props.theme.typography.lineHeight.relaxed};

  @media (max-width: 768px) {
    font-size: ${props => props.theme.typography.fontSize.md};
  }
`;

const CTAButtons = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
`;

const CTAButton = styled(Link)`
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
    background-color: white;
    color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.md};

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.shadows.lg};
    }
  }

  &.secondary {
    background-color: transparent;
    color: white;
    border: 2px solid white;

    &:hover {
      background-color: white;
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const FeaturesSection = styled.section`
  padding: ${props => props.theme.spacing.xxxl} 0;
  background-color: ${props => props.theme.colors.backgroundSecondary};
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: ${props => props.theme.typography.fontSize.xxl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text};
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.xxxl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xxxl};
`;

const FeatureCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.md};
  text-align: center;
  transition: all ${props => props.theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  background: ${props => props.theme.colors.gradient};
  border-radius: ${props => props.theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.lg};
  color: white;
`;

const FeatureTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
`;

const StatsSection = styled.section`
  padding: ${props => props.theme.spacing.xxxl} 0;
  background-color: ${props => props.theme.colors.background};
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.xl};
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: ${props => props.theme.spacing.lg};
`;

const StatNumber = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xxxl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const StatLabel = styled.div`
  font-size: ${props => props.theme.typography.fontSize.md};
  color: ${props => props.theme.colors.textSecondary};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const TestimonialSection = styled.section`
  padding: ${props => props.theme.spacing.xxxl} 0;
  background-color: ${props => props.theme.colors.backgroundSecondary};
`;

const TestimonialContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  text-align: center;
`;

const TestimonialCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.xxxl};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const TestimonialText = styled.blockquote`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-style: italic;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
`;

const AuthorAvatar = styled.div`
  width: 48px;
  height: 48px;
  background: ${props => props.theme.colors.gradient};
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
`;

const AuthorInfo = styled.div`
  text-align: left;
`;

const AuthorName = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
`;

const AuthorTitle = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
`;

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <Shield size={32} />,
      title: 'Confidential & Secure',
      description: 'Your conversations are encrypted and completely private. We never share your data with anyone.'
    },
    {
      icon: <Brain size={32} />,
      title: 'AI-Powered Support',
      description: 'Get 24/7 empathetic support from our AI companion trained specifically for youth mental health.'
    },
    {
      icon: <Heart size={32} />,
      title: 'Evidence-Based',
      description: 'Access proven wellness techniques like CBT, mindfulness, and stress management tools.'
    },
    {
      icon: <Users size={32} />,
      title: 'Stigma-Free Zone',
      description: 'A safe space where you can talk openly about mental health without judgment or shame.'
    },
    {
      icon: <MessageCircle size={32} />,
      title: 'Always Available',
      description: 'Get support whenever you need it, day or night. No appointments or waiting lists.'
    },
    {
      icon: <Lock size={32} />,
      title: 'Privacy First',
      description: 'Your data is automatically deleted based on your preferences. You control your privacy.'
    }
  ];

  const stats = [
    { number: '24/7', label: 'Available Support' },
    { number: '100%', label: 'Confidential' },
    { number: '13-25', label: 'Age Range' },
    { number: '0', label: 'Judgment' }
  ];

  const testimonials = [
    {
      text: "MindSpace helped me understand my anxiety better. The AI was so understanding and gave me practical tools I could use right away.",
      author: "Alex, 17",
      title: "Student"
    },
    {
      text: "I was scared to talk about my feelings, but MindSpace made it feel safe. It's like having a supportive friend who's always there.",
      author: "Jordan, 19",
      title: "College Student"
    }
  ];

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Your Safe Space for Mental Wellness
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            AI-powered, confidential, and empathetic mental health support designed specifically for youth. 
            Break the stigma and get the help you deserve.
          </HeroSubtitle>
          <CTAButtons
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {user ? (
              <CTAButton to="/dashboard" className="primary">
                Go to Dashboard
                <ArrowRight size={18} />
              </CTAButton>
            ) : (
              <>
                <CTAButton to="/register" className="primary">
                  Get Started Free
                  <ArrowRight size={18} />
                </CTAButton>
                <CTAButton to="/login" className="secondary">
                  Sign In
                </CTAButton>
              </>
            )}
          </CTAButtons>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <FeaturesContainer>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Why Choose MindSpace?
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We're built with youth mental health in mind, combining cutting-edge AI with proven therapeutic techniques.
          </SectionSubtitle>
          
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </FeaturesContainer>
      </FeaturesSection>

      <StatsSection>
        <StatsContainer>
          <StatsGrid>
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsGrid>
        </StatsContainer>
      </StatsSection>

      <TestimonialSection>
        <TestimonialContainer>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            What Youth Are Saying
          </SectionTitle>
          
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <TestimonialText>"{testimonial.text}"</TestimonialText>
              <TestimonialAuthor>
                <AuthorAvatar>
                  {testimonial.author.charAt(0)}
                </AuthorAvatar>
                <AuthorInfo>
                  <AuthorName>{testimonial.author}</AuthorName>
                  <AuthorTitle>{testimonial.title}</AuthorTitle>
                </AuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>
          ))}
        </TestimonialContainer>
      </TestimonialSection>
    </HomeContainer>
  );
};

export default Home;
