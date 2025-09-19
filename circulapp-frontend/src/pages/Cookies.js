// pages/Cookies.js - Política de Cookies
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel,
  Button,
  Grid,
  Card,
  CardContent,
  Alert,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Cookie as CookieIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
  Analytics as AnalyticsIcon,
  Campaign as AdsIcon,
  Build as BuildIcon,
  ExpandMore as ExpandMoreIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(6),
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #F39C12 0%, #E67E22 100%)',
  color: 'white',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(6, 4),
  marginBottom: theme.spacing(4),
  textAlign: 'center',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
}));

const CookieCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
  },
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  '&:before': {
    display: 'none',
  },
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  borderRadius: `${theme.spacing(1)} !important`,
}));

const Cookies = () => {
  const [cookieSettings, setCookieSettings] = useState({
    essential: true, // Always enabled
    functional: true,
    analytics: true,
    advertising: false,
    social: false,
  });

  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const handleSettingChange = (setting) => (event) => {
    if (setting === 'essential') return; // Essential cookies cannot be disabled
    
    setCookieSettings(prev => ({
      ...prev,
      [setting]: event.target.checked
    }));
  };

  const handleSaveSettings = () => {
    // Simular guardado de configuraciones
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('success');
      setShowSettingsDialog(false);
      setTimeout(() => setSaveStatus(null), 3000);
    }, 1000);
  };

  const cookieTypes = [
    {
      id: 'essential',
      name: 'Cookies Esenciales',
      icon: <SecurityIcon sx={{ fontSize: 40, color: '#E74C3C' }} />,
      description: 'Necesarias para el funcionamiento básico del sitio web.',
      enabled: cookieSettings.essential,
      canDisable: false,
      examples: ['Autenticación de sesión', 'Configuración de seguridad', 'Funciones básicas'],
    },
    {
      id: 'functional',
      name: 'Cookies Funcionales',
      icon: <BuildIcon sx={{ fontSize: 40, color: '#3498DB' }} />,
      description: 'Mejoran la funcionalidad y personalización del sitio.',
      enabled: cookieSettings.functional,
      canDisable: true,
      examples: ['Idioma preferido', 'Configuración de tema', 'Productos favoritos'],
    },
    {
      id: 'analytics',
      name: 'Cookies de Análisis',
      icon: <AnalyticsIcon sx={{ fontSize: 40, color: '#27AE60' }} />,
      description: 'Nos ayudan a entender cómo los usuarios interactúan con el sitio.',
      enabled: cookieSettings.analytics,
      canDisable: true,
      examples: ['Google Analytics', 'Métricas de uso', 'Análisis de rendimiento'],
    },
    {
      id: 'advertising',
      name: 'Cookies Publicitarias',
      icon: <AdsIcon sx={{ fontSize: 40, color: '#9B59B6' }} />,
      description: 'Se utilizan para mostrar anuncios relevantes.',
      enabled: cookieSettings.advertising,
      canDisable: true,
      examples: ['Anuncios personalizados', 'Seguimiento de conversiones', 'Remarketing'],
    },
    {
      id: 'social',
      name: 'Cookies de Redes Sociales',
      icon: <CookieIcon sx={{ fontSize: 40, color: '#E67E22' }} />,
      description: 'Permiten la integración con redes sociales.',
      enabled: cookieSettings.social,
      canDisable: true,
      examples: ['Botones de compartir', 'Login social', 'Widgets de redes sociales'],
    },
  ];

  const cookieDetails = [
    {
      name: '_session_id',
      type: 'Esencial',
      purpose: 'Mantener la sesión del usuario activa',
      duration: 'Sesión',
      domain: 'circulapp.com',
    },
    {
      name: 'auth_token',
      type: 'Esencial',
      purpose: 'Autenticación segura del usuario',
      duration: '30 días',
      domain: 'circulapp.com',
    },
    {
      name: 'csrf_token',
      type: 'Esencial',
      purpose: 'Protección contra ataques CSRF',
      duration: 'Sesión',
      domain: 'circulapp.com',
    },
    {
      name: 'user_preferences',
      type: 'Funcional',
      purpose: 'Recordar configuraciones del usuario',
      duration: '1 año',
      domain: 'circulapp.com',
    },
    {
      name: 'theme_mode',
      type: 'Funcional',
      purpose: 'Recordar tema elegido (claro/oscuro)',
      duration: '6 meses',
      domain: 'circulapp.com',
    },
    {
      name: '_ga',
      type: 'Análisis',
      purpose: 'Google Analytics - Identificar usuarios únicos',
      duration: '2 años',
      domain: '.circulapp.com',
    },
    {
      name: '_gid',
      type: 'Análisis',
      purpose: 'Google Analytics - Identificar usuarios únicos',
      duration: '24 horas',
      domain: '.circulapp.com',
    },
    {
      name: '_fbp',
      type: 'Publicitaria',
      purpose: 'Facebook Pixel - Seguimiento de conversiones',
      duration: '3 meses',
      domain: '.circulapp.com',
    },
    {
      name: 'social_share_prefs',
      type: 'Redes Sociales',
      purpose: 'Recordar preferencias de compartir',
      duration: '30 días',
      domain: 'circulapp.com',
    },
  ];

  const faqData = [
    {
      id: 'panel1',
      question: '¿Qué son las cookies?',
      answer: 'Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Contienen información que ayuda a los sitios web a recordar tus preferencias y mejorar tu experiencia de navegación.',
    },
    {
      id: 'panel2',
      question: '¿Por qué CirculApp usa cookies?',
      answer: 'Utilizamos cookies para proporcionar funcionalidades esenciales como mantener tu sesión activa, recordar tus preferencias, analizar el uso del sitio para mejorarlo, y personalizar tu experiencia. Nunca usamos cookies para rastrearte sin tu consentimiento.',
    },
    {
      id: 'panel3',
      question: '¿Puedo desactivar las cookies?',
      answer: 'Sí, puedes controlar la mayoría de las cookies a través de la configuración de tu navegador o usando nuestro centro de preferencias. Sin embargo, desactivar las cookies esenciales puede afectar el funcionamiento del sitio.',
    },
    {
      id: 'panel4',
      question: '¿Las cookies contienen información personal?',
      answer: 'La mayoría de nuestras cookies no contienen información personal identificable. Las cookies esenciales pueden contener identificadores de sesión, pero están encriptados. Las cookies de terceros tienen sus propias políticas de privacidad.',
    },
    {
      id: 'panel5',
      question: '¿Con qué frecuencia se actualiza esta política?',
      answer: 'Revisamos y actualizamos esta política según sea necesario. Te notificaremos sobre cambios importantes a través de nuestro sitio web o por correo electrónico.',
    },
  ];

  return (
    <StyledContainer maxWidth="lg">
      {/* Hero Section */}
      <HeroSection>
        <CookieIcon sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Política de Cookies
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
          Información sobre cómo utilizamos cookies para mejorar tu experiencia en CirculApp
        </Typography>
      </HeroSection>

      {/* Quick Settings */}
      <StyledPaper>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Configuración Rápida de Cookies
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Controla qué tipos de cookies quieres permitir. Los cambios se aplicarán inmediatamente.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Button
              variant="contained"
              startIcon={<SettingsIcon />}
              onClick={() => setShowSettingsDialog(true)}
              size="large"
            >
              Configurar Cookies
            </Button>
          </Grid>
        </Grid>
      </StyledPaper>

      {/* Save Status Alert */}
      {saveStatus === 'success' && (
        <Alert severity="success" sx={{ mb: 3 }}>
          ¡Configuración de cookies guardada exitosamente!
        </Alert>
      )}

      {/* Cookie Types Overview */}
      <Typography variant="h4" component="h2" gutterBottom fontWeight="600" sx={{ mb: 3 }}>
        Tipos de Cookies que Utilizamos
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {cookieTypes.map((type, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <CookieCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ textAlign: 'center', flexGrow: 1 }}>
                    {type.icon}
                    <Typography variant="h6" component="h3" gutterBottom fontWeight="600">
                      {type.name}
                    </Typography>
                  </Box>
                  <Switch
                    checked={type.enabled}
                    onChange={handleSettingChange(type.id)}
                    disabled={!type.canDisable}
                    color="primary"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {type.description}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Ejemplos:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {type.examples.map((example, idx) => (
                    <Chip
                      key={idx}
                      label={example}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                  ))}
                </Box>
                {!type.canDisable && (
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    * Estas cookies no se pueden desactivar
                  </Typography>
                )}
              </CardContent>
            </CookieCard>
          </Grid>
        ))}
      </Grid>

      {/* Detailed Cookie Table */}
      <Typography variant="h5" component="h3" gutterBottom fontWeight="600" sx={{ mb: 3 }}>
        Lista Detallada de Cookies
      </Typography>
      <StyledPaper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Nombre</strong></TableCell>
                <TableCell><strong>Tipo</strong></TableCell>
                <TableCell><strong>Propósito</strong></TableCell>
                <TableCell><strong>Duración</strong></TableCell>
                <TableCell><strong>Dominio</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cookieDetails.map((cookie, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>
                      {cookie.name}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={cookie.type}
                      size="small"
                      color={
                        cookie.type === 'Esencial' ? 'error' :
                        cookie.type === 'Funcional' ? 'primary' :
                        cookie.type === 'Análisis' ? 'success' :
                        cookie.type === 'Publicitaria' ? 'secondary' : 'default'
                      }
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{cookie.purpose}</TableCell>
                  <TableCell>{cookie.duration}</TableCell>
                  <TableCell>
                    <code style={{ fontSize: '0.8rem' }}>{cookie.domain}</code>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledPaper>

      {/* Browser Instructions */}
      <StyledPaper>
        <Typography variant="h6" gutterBottom>
          Cómo Gestionar Cookies en tu Navegador
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Además de nuestro centro de preferencias, también puedes controlar las cookies directamente desde tu navegador:
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="subtitle2" gutterBottom fontWeight="600">
                Chrome
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Configuración → Privacidad y seguridad → Cookies
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="subtitle2" gutterBottom fontWeight="600">
                Firefox
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Opciones → Privacidad y seguridad → Cookies
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="subtitle2" gutterBottom fontWeight="600">
                Safari
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Preferencias → Privacidad → Cookies
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="subtitle2" gutterBottom fontWeight="600">
                Edge
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Configuración → Cookies y permisos del sitio
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </StyledPaper>

      {/* FAQ Section */}
      <Typography variant="h5" component="h3" gutterBottom fontWeight="600" sx={{ mb: 3 }}>
        Preguntas Frecuentes sobre Cookies
      </Typography>
      <Box>
        {faqData.map((faq, index) => (
          <StyledAccordion key={faq.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${faq.id}bh-content`}
              id={`${faq.id}bh-header`}
            >
              <Typography variant="subtitle1" fontWeight="500">
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </StyledAccordion>
        ))}
      </Box>

      {/* Third Party Cookies */}
      <StyledPaper sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Cookies de Terceros
        </Typography>
        <Typography variant="body1" paragraph>
          Algunos servicios de terceros que utilizamos pueden establecer sus propias cookies:
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Google Analytics"
              secondary="Análisis de tráfico web - Política: https://policies.google.com/privacy"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Google Maps"
              secondary="Servicios de mapas y geolocalización"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Cloudinary"
              secondary="Almacenamiento y optimización de imágenes"
            />
          </ListItem>
        </List>
        <Alert severity="info">
          Estas cookies de terceros están sujetas a las políticas de privacidad de sus respectivos proveedores.
        </Alert>
      </StyledPaper>

      {/* Settings Dialog */}
      <Dialog
        open={showSettingsDialog}
        onClose={() => setShowSettingsDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SettingsIcon sx={{ mr: 2 }} />
            Configuración de Cookies
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" paragraph>
            Personaliza qué tipos de cookies quieres permitir. Los cambios se aplicarán inmediatamente.
          </Typography>
          
          {cookieTypes.map((type, index) => (
            <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" fontWeight="600">
                  {type.name}
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={type.enabled}
                      onChange={handleSettingChange(type.id)}
                      disabled={!type.canDisable}
                      color="primary"
                    />
                  }
                  label={type.enabled ? 'Activado' : 'Desactivado'}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {type.description}
              </Typography>
              {!type.canDisable && (
                <Typography variant="caption" color="error.main" sx={{ mt: 1, display: 'block' }}>
                  Estas cookies son necesarias para el funcionamiento básico del sitio
                </Typography>
              )}
            </Box>
          ))}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setShowSettingsDialog(false)}
            color="inherit"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSaveSettings}
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={saveStatus === 'saving'}
          >
            {saveStatus === 'saving' ? 'Guardando...' : 'Guardar Configuración'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Contact Section */}
      <StyledPaper sx={{ mt: 4, backgroundColor: '#f8f9fa' }}>
        <Typography variant="h6" gutterBottom>
          ¿Tienes más preguntas sobre cookies?
        </Typography>
        <Typography variant="body1" paragraph>
          Si necesitas más información sobre nuestra política de cookies o tienes alguna pregunta específica:
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="contained" color="primary" href="/contact">
            Contactar Soporte
          </Button>
          <Button variant="outlined" color="primary" href="/privacy">
            Política de Privacidad
          </Button>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Cookies;