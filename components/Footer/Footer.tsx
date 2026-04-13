"use client";
import React from 'react';
import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        {/* Logo */}
        <Typography variant="h6" align="center" gutterBottom>
          Minha Loja
        </Typography>

        {/* Links */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 3,
            mb: 2,
          }}
        >
          <Link href="/" passHref legacyBehavior>
            <MuiLink color="inherit" underline="hover">
              Início
            </MuiLink>
          </Link>
          <Link href="/sobre" passHref legacyBehavior>
            <MuiLink color="inherit" underline="hover">
              Sobre
            </MuiLink>
          </Link>
          <Link href="/contato" passHref legacyBehavior>
            <MuiLink color="inherit" underline="hover">
              Contato
            </MuiLink>
          </Link>
        </Box>

        {/* Copyright */}
        <Typography
          variant="body2"
          align="center"
          sx={{ opacity: 0.8 }}
        >
          © {new Date().getFullYear()} Minha Loja. Todos os direitos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;