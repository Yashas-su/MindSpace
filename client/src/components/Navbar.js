import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  MessageCircle, 
  Heart, 
  BookOpen, 
  User, 
  LogOut, 
  Settings,
  Sun,
  Moon,
  Shield
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const NavbarContainer = styled.nav`
  background-color: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all ${props => props.theme.transitions.normal};
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  transition: color ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.primaryHover};
  }
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: ${props => props.theme.colors.gradient};
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: all ${props => props.theme.transitions.fast};
  position: relative;

  &:hover {
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.primaryLight};
  }

  &.active {
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.primaryLight};
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: transparent;
  color: ${props => props.theme.colors.textSecondary};
  border: 1px solid ${props => props.theme.colors.border};
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.theme.colors.surfaceHover};
    color: ${props => props.theme.colors.primary};
  }
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: transparent;
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};
  transition: all ${props => props.theme.transitions.fast};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.surfaceHover};
  }
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: ${props => props.theme.spacing.sm};
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.lg};
  min-width: 200px;
  overflow: hidden;
  z-index: 1001;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  transition: background-color ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.theme.colors.surfaceHover};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  width: 100%;
  background-color: transparent;
  color: ${props => props.theme.colors.error};
  border: none;
  text-align: left;
  transition: background-color ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.theme.colors.errorLight};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: transparent;
  color: ${props => props.theme.colors.textSecondary};
  border: 1px solid ${props => props.theme.colors.border};
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.theme.colors.surfaceHover};
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.lg};
  z-index: 999;
`;

const MobileNavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: all ${props => props.theme.transitions.fast};
  border-bottom: 1px solid ${props => props.theme.colors.border};

  &:hover {
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.primaryLight};
  }

  &.active {
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.primaryLight};
  }
`;

const Navbar = () => {
  const { user, logout } = useAuth();
  const { themeName, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getUserInitials = () => {
    if (user?.anonymousId) {
      return user.anonymousId.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  return (
    <NavbarContainer>
      <NavContent>
        <Logo to="/">
          <LogoIcon>
            <Shield size={20} />
          </LogoIcon>
          MindSpace
        </Logo>

        <NavLinks>
          <NavLink to="/" className={isActive('/') ? 'active' : ''}>
            <Home size={18} />
            Home
          </NavLink>
          
          {user && (
            <>
              <NavLink to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
                <MessageCircle size={18} />
                Dashboard
              </NavLink>
              <NavLink to="/chat" className={isActive('/chat') ? 'active' : ''}>
                <MessageCircle size={18} />
                Chat
              </NavLink>
              <NavLink to="/wellness" className={isActive('/wellness') ? 'active' : ''}>
                <Heart size={18} />
                Wellness
              </NavLink>
            </>
          )}
          
          <NavLink to="/resources" className={isActive('/resources') ? 'active' : ''}>
            <BookOpen size={18} />
            Resources
          </NavLink>
        </NavLinks>

        <UserSection>
          <ThemeToggle onClick={toggleTheme} title={`Switch to ${themeName === 'light' ? 'dark' : 'light'} mode`}>
            {themeName === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </ThemeToggle>

          {user ? (
            <UserMenu>
              <UserButton onClick={() => setShowUserMenu(!showUserMenu)}>
                <UserAvatar>{getUserInitials()}</UserAvatar>
                <span>Account</span>
              </UserButton>

              <AnimatePresence>
                {showUserMenu && (
                  <DropdownMenu
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DropdownItem to="/profile" onClick={() => setShowUserMenu(false)}>
                      <User size={18} />
                      Profile
                    </DropdownItem>
                    <DropdownItem to="/dashboard" onClick={() => setShowUserMenu(false)}>
                      <Settings size={18} />
                      Settings
                    </DropdownItem>
                    <LogoutButton onClick={handleLogout}>
                      <LogOut size={18} />
                      Logout
                    </LogoutButton>
                  </DropdownMenu>
                )}
              </AnimatePresence>
            </UserMenu>
          ) : (
            <NavLinks>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Sign Up</NavLink>
            </NavLinks>
          )}

          <MobileMenuButton onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
          </MobileMenuButton>
        </UserSection>
      </NavContent>

      <AnimatePresence>
        {showMobileMenu && (
          <MobileMenu
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <MobileNavLink to="/" className={isActive('/') ? 'active' : ''} onClick={() => setShowMobileMenu(false)}>
              <Home size={18} />
              Home
            </MobileNavLink>
            
            {user && (
              <>
                <MobileNavLink to="/dashboard" className={isActive('/dashboard') ? 'active' : ''} onClick={() => setShowMobileMenu(false)}>
                  <MessageCircle size={18} />
                  Dashboard
                </MobileNavLink>
                <MobileNavLink to="/chat" className={isActive('/chat') ? 'active' : ''} onClick={() => setShowMobileMenu(false)}>
                  <MessageCircle size={18} />
                  Chat
                </MobileNavLink>
                <MobileNavLink to="/wellness" className={isActive('/wellness') ? 'active' : ''} onClick={() => setShowMobileMenu(false)}>
                  <Heart size={18} />
                  Wellness
                </MobileNavLink>
                <MobileNavLink to="/profile" className={isActive('/profile') ? 'active' : ''} onClick={() => setShowMobileMenu(false)}>
                  <User size={18} />
                  Profile
                </MobileNavLink>
              </>
            )}
            
            <MobileNavLink to="/resources" className={isActive('/resources') ? 'active' : ''} onClick={() => setShowMobileMenu(false)}>
              <BookOpen size={18} />
              Resources
            </MobileNavLink>
            
            {!user && (
              <>
                <MobileNavLink to="/login" onClick={() => setShowMobileMenu(false)}>
                  Login
                </MobileNavLink>
                <MobileNavLink to="/register" onClick={() => setShowMobileMenu(false)}>
                  Sign Up
                </MobileNavLink>
              </>
            )}
          </MobileMenu>
        )}
      </AnimatePresence>
    </NavbarContainer>
  );
};

export default Navbar;
