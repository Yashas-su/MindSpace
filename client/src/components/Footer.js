import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Shield, Heart, Mail, Phone, MapPin } from 'lucide-react';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.backgroundTertiary};
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.xxxl} 0 ${props => props.theme.spacing.xl};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const FooterTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  transition: color ${props => props.theme.transitions.fast};
  font-size: ${props => props.theme.typography.fontSize.sm};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const FooterText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
  margin: 0;
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${props => props.theme.colors.border};
  padding-top: ${props => props.theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  align-items: center;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary};
`;

const LogoIcon = styled.div`
  width: 24px;
  height: 24px;
  background: ${props => props.theme.colors.gradient};
  border-radius: ${props => props.theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const Copyright = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin: 0;
`;

const CrisisNotice = styled.div`
  background-color: ${props => props.theme.colors.errorLight};
  border: 1px solid ${props => props.theme.colors.error};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
  text-align: center;
`;

const CrisisText = styled.p`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  margin: 0;
`;

const CrisisLink = styled.a`
  color: ${props => props.theme.colors.error};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <CrisisNotice>
          <CrisisText>
            <Heart size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            If you're in crisis, please call <CrisisLink href="tel:988">988</CrisisLink> (Suicide & Crisis Lifeline) 
            or text <CrisisLink href="sms:741741">HOME to 741741</CrisisLink> (Crisis Text Line)
          </CrisisText>
        </CrisisNotice>

        <FooterTop>
          <FooterSection>
            <FooterLogo>
              <LogoIcon>
                <Shield size={16} />
              </LogoIcon>
              MindSpace
            </FooterLogo>
            <FooterText>
              AI-powered mental wellness support designed specifically for youth. 
              Your safe space for confidential, empathetic mental health care.
            </FooterText>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Quick Links</FooterTitle>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/resources">Resources</FooterLink>
            <FooterLink to="/crisis">Crisis Support</FooterLink>
            <FooterLink to="/login">Login</FooterLink>
            <FooterLink to="/register">Sign Up</FooterLink>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Support</FooterTitle>
            <FooterLink to="/resources">Mental Health Resources</FooterLink>
            <FooterLink to="/crisis">Crisis Intervention</FooterLink>
            <FooterLink to="/resources/professional">Find Professional Help</FooterLink>
            <FooterLink to="/resources/self-help">Self-Help Tools</FooterLink>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Privacy & Safety</FooterTitle>
            <FooterText>
              Your privacy is our priority. All conversations are encrypted and confidential. 
              We never share your personal information.
            </FooterText>
            <FooterText>
              Data is automatically deleted based on your preferences, 
              ensuring your privacy is protected.
            </FooterText>
          </FooterSection>
        </FooterTop>

        <FooterBottom>
          <Copyright>
            © 2025 MindSpace. All rights reserved. Built with ❤️ for youth mental health.
          </Copyright>
          <FooterText>
            This platform is for informational purposes only and does not replace professional mental health care.
          </FooterText>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
