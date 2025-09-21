import React from 'react';
import styled from 'styled-components';
import { MessageCircle, Send, Plus } from 'lucide-react';

const ChatContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const ChatIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${props => props.theme.colors.gradient};
  border-radius: ${props => props.theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const ChatTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const ChatContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xxxl};
  text-align: center;
`;

const ComingSoon = styled.div`
  max-width: 500px;
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

const StartChatButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.gradient};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.normal};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const Chat = () => {
  return (
    <ChatContainer>
      <ChatHeader>
        <ChatIcon>
          <MessageCircle size={20} />
        </ChatIcon>
        <ChatTitle>AI Wellness Chat</ChatTitle>
      </ChatHeader>
      
      <ChatContent>
        <ComingSoon>
          <ComingSoonTitle>Chat Feature Coming Soon</ComingSoonTitle>
          <ComingSoonText>
            We're working hard to bring you an amazing AI-powered chat experience. 
            Soon you'll be able to have confidential, empathetic conversations with our AI wellness companion.
          </ComingSoonText>
          <StartChatButton>
            <Plus size={18} />
            Start New Chat
          </StartChatButton>
        </ComingSoon>
      </ChatContent>
    </ChatContainer>
  );
};

export default Chat;
