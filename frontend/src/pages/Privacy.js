// pages/Privacy.js - Política de Privacidad
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Button,
  Grid,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Security as SecurityIcon,
  Update as UpdateIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Shield as ShieldIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(6),
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #8E44AD 0%, #3498DB 100%)',
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

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  '&:before': {
    display: 'none',
  },
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  borderRadius: `${theme.spacing(1)} !important`,
}));

const PrivacyCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
  },
}));

const Privacy = () => {
  const [expandedPanel, setExpandedPanel] = useState('panel1');
  const [privacySettings, setPrivacySettings] = useState({
    analytics: true,
    marketing: false,
    notifications: true,
    dataSharing: false,
  });

  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  const handleSettingChange = (setting) => (event) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: event.target.checked
    }));
  };

  const lastUpdated = "15 de septiembre de 2024";
  const effectiveDate = "1 de octubre de 2024";

  const dataTypes = [
    {
      category: 'Información Personal',
      items: ['Nombre completo', 'Correo electrónico', 'Número de teléfono', 'Dirección'],
      purpose: 'Identificación y comunicación',
      retention: '5 años tras inactividad',
    },
    {
      category: 'Información de Ubicación',
      items: ['Coordenadas GPS', 'Dirección aproximada', 'Zona de actividad'],
      purpose: 'Servicios de geolocalización',
      retention: '1 año',
    },
    {
      category: 'Datos de Uso',
      items: ['Páginas visitadas', 'Tiempo de sesión', 'Interacciones', 'Errores'],
      purpose: 'Mejora del servicio',
      retention: '2 años',
    },
    {
      category: 'Contenido del Usuario',
      items: ['Publicaciones', 'Fotos', 'Mensajes', 'Comentarios'],
      purpose: 'Funcionalidad de la plataforma',
      retention: 'Hasta eliminación por usuario',
    },
  ];

  const privacyPrinciples = [
    {
      icon: <ShieldIcon sx={{ fontSize: 40, color: '#27AE60' }} />,
      title: 'Transparencia Total',
      description: 'Te informamos claramente qué datos recopilamos y cómo los usamos.',
    },
    {
      icon: <LockIcon sx={{ fontSize: 40, color: '#3498DB' }} />,
      title: 'Seguridad Robusta',
      description: 'Implementamos las mejores prácticas de seguridad para proteger tu información.',
    },
    {
      icon: <VisibilityIcon sx={{ fontSize: 40, color: '#9B59B6' }} />,
      title: 'Control del Usuario',
      description: 'Tienes control total sobre tus datos y puedes modificar o eliminar tu información.',
    },
    {
      icon: <DeleteIcon sx={{ fontSize: 40, color: '#E74C3C' }} />,
      title: 'Minimización de Datos',
      description: 'Solo recopilamos los datos necesarios para brindarte nuestros servicios.',
    },
  ];

  const privacyData = [
    {
      id: 'panel1',
      title: '1. Información que Recopilamos',
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            Recopilamos diferentes tipos de información para proporcionar y mejorar nuestros servicios.
          </Typography>
          
          <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
            Información que proporcionas directamente:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Datos de registro" 
                secondary="Nombre, email, teléfono, fecha de nacimiento"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Información de perfil" 
                secondary="Foto, biografía, preferencias, ubicación"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Contenido generado" 
                secondary="Publicaciones, fotos de productos, mensajes, reseñas"
              />
            </ListItem>
          </List>

          <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
            Información recopilada automáticamente:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Datos de uso" 
                secondary="Páginas visitadas, funciones utilizadas, tiempo de sesión"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Información técnica" 
                secondary="Dirección IP, tipo de dispositivo, navegador, sistema operativo"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Datos de ubicación" 
                secondary="Ubicación aproximada basada en IP y GPS (con permiso)"
              />
            </ListItem>
          </List>
        </Box>
      )
    },
    {
      id: 'panel2',
      title: '2. Cómo Usamos tu Información',
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            Utilizamos tu información para los siguientes propósitos:
          </Typography>
          
          <Typography variant="subtitle2" gutterBottom>
            Servicios principales:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Facilitar intercambios" 
                secondary="Conectar usuarios y coordinar transacciones"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Comunicación" 
                secondary="Chat entre usuarios, notificaciones, soporte técnico"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Personalización" 
                secondary="Recomendar productos relevantes según tus intereses"
              />
            </ListItem>
          </List>

          <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
            Mejora y seguridad:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Análisis y mejoras" 
                secondary="Entender cómo se usa la plataforma para mejorarla"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Seguridad" 
                secondary="Prevenir fraudes, spam y actividades maliciosas"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Cumplimiento legal" 
                secondary="Cumplir con obligaciones legales y regulatorias"
              />
            </ListItem>
          </List>

          <Alert severity="info" sx={{ mt: 2 }}>
            <strong>Nunca vendemos tu información personal a terceros.</strong> 
            Solo compartimos datos cuando es necesario para el servicio o requerido por ley.
          </Alert>
        </Box>
      )
    },
    {
      id: 'panel3',
      title: '3. Compartir y Divulgar Información',
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            Solo compartimos tu información en circunstancias específicas y con tu control.
          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            Compartimos información cuando:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Con otros usuarios" 
                secondary="Información de perfil público y productos que publicas"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Proveedores de servicios" 
                secondary="Empresas que nos ayudan a operar la plataforma (hosting, analytics)"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Requerimientos legales" 
                secondary="Cuando la ley lo requiere o para proteger derechos"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Transacciones comerciales" 
                secondary="En caso de fusión, adquisición o venta de la empresa"
              />
            </ListItem>
          </List>

          <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
            Nunca compartimos:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Contraseñas o información de autenticación" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Mensajes privados sin consentimiento" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Datos financieros sensibles" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Información con fines de marketing de terceros" />
            </ListItem>
          </List>
        </Box>
      )
    },
    {
      id: 'panel4',
      title: '4. Seguridad de los Datos',
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            Implementamos múltiples capas de seguridad para proteger tu información.
          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            Medidas técnicas:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Encriptación" 
                secondary="SSL/TLS para datos en tránsito, AES-256 para datos en reposo"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Acceso restringido" 
                secondary="Solo personal autorizado puede acceder a datos sensibles"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Monitoreo continuo" 
                secondary="Sistemas de detección de intrusiones y análisis de vulnerabilidades"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Backups seguros" 
                secondary="Respaldos encriptados y geográficamente distribuidos"
              />
            </ListItem>
          </List>

          <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
            Medidas organizacionales:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Capacitación regular del personal en seguridad" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Auditorías de seguridad periódicas" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Políticas estrictas de manejo de datos" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Plan de respuesta a incidentes de seguridad" />
            </ListItem>
          </List>

          <Alert severity="warning" sx={{ mt: 2 }}>
            Si detectamos una brecha de seguridad que afecte tus datos personales, 
            te notificaremos dentro de 72 horas y tomaremos medidas correctivas inmediatas.
          </Alert>
        </Box>
      )
    },
    {
      id: 'panel5',
      title: '5. Tus Derechos y Controles',
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            Tienes varios derechos respecto a tu información personal que respetamos plenamente.
          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            Tus derechos incluyen:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Acceso" 
                secondary="Solicitar una copia de todos los datos que tenemos sobre ti"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Rectificación" 
                secondary="Corregir información incorrecta o desactualizada"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Eliminación" 
                secondary="Solicitar la eliminación de tus datos (derecho al olvido)"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Portabilidad" 
                secondary="Obtener tus datos en un formato estructurado y legible"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Oposición" 
                secondary="Oponerte al procesamiento de tus datos para ciertos fines"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Limitación" 
                secondary="Solicitar la restricción del procesamiento de tus datos"
              />
            </ListItem>
          </List>

          <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
            Cómo ejercer tus derechos:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="A través de tu configuración de cuenta" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Enviando un email a privacy@circulapp.com" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Contactando nuestro soporte técnico" />
            </ListItem>
          </List>
        </Box>
      )
    },
    {
      id: 'panel6',
      title: '6. Cookies y Tecnologías Similares',
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            Utilizamos cookies y tecnologías similares para mejorar tu experiencia.
          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            Tipos de cookies que usamos:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Esenciales" 
                secondary="Necesarias para el funcionamiento básico de la plataforma"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Funcionales" 
                secondary="Recuerdan tus preferencias y configuraciones"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Analíticas" 
                secondary="Nos ayudan a entender cómo usas la plataforma"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Publicitarias" 
                secondary="Para mostrar contenido relevante (solo con tu consentimiento)"
              />
            </ListItem>
          </List>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Puedes controlar las cookies a través de la configuración de tu navegador 
            o usando nuestro centro de preferencias de cookies.
          </Typography>
        </Box>
      )
    },
    {
      id: 'panel7',
      title: '7. Retención de Datos',
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            Conservamos tu información solo durante el tiempo necesario para los fines establecidos.
          </Typography>

          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Tipo de Dato</strong></TableCell>
                  <TableCell><strong>Período de Retención</strong></TableCell>
                  <TableCell><strong>Justificación</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataTypes.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.retention}</TableCell>
                    <TableCell>{row.purpose}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Alert severity="info" sx={{ mt: 2 }}>
            Cuando eliminas tu cuenta, la mayoría de tus datos se eliminan inmediatamente. 
            Algunos datos pueden conservarse por períodos más largos por razones legales o de seguridad.
          </Alert>
        </Box>
      )
    },
    {
      id: 'panel8',
      title: '8. Transferencias Internacionales',
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            Algunos de nuestros proveedores de servicios pueden estar ubicados fuera de Argentina.
          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            Salvaguardas para transferencias:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Cláusulas contractuales estándar" 
                secondary="Contratos que garantizan protección equivalente"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Países con decisiones de adecuación" 
                secondary="Transferimos solo a países con protección reconocida"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Certificaciones de privacidad" 
                secondary="Proveedores certificados bajo marcos internacionales"
              />
            </ListItem>
          </List>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Siempre mantenemos el mismo nivel de protección para tus datos, 
            independientemente de dónde se procesen.
          </Typography>
        </Box>
      )
    },
  ];

  return (
    <StyledContainer maxWidth="lg">
      {/* Hero Section */}
      <HeroSection>
        <SecurityIcon sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Política de Privacidad
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
          Tu privacidad es nuestra prioridad. Conoce cómo protegemos y manejamos tu información.
        </Typography>
      </HeroSection>

      {/* Document Info */}
      <StyledPaper>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <UpdateIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="subtitle1">
                Última actualización: <strong>{lastUpdated}</strong>
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Esta política entra en vigencia el {effectiveDate}. 
              Te notificaremos sobre cambios importantes en nuestra política de privacidad.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              onClick={() => window.print()}
              sx={{ mr: 1, mb: 1 }}
            >
              Imprimir
            </Button>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              sx={{ mb: 1 }}
            >
              Descargar PDF
            </Button>
          </Grid>
        </Grid>
      </StyledPaper>

      {/* Privacy Principles */}
      <Typography variant="h4" component="h2" gutterBottom fontWeight="600" sx={{ mb: 3 }}>
        Nuestros Principios de Privacidad
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {privacyPrinciples.map((principle, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <PrivacyCard>
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>
                  {principle.icon}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom fontWeight="600">
                  {principle.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {principle.description}
                </Typography>
              </CardContent>
            </PrivacyCard>
          </Grid>
        ))}
      </Grid>

      {/* Privacy Controls */}
      <StyledPaper sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Controla tu Privacidad
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Ajusta estas configuraciones para controlar cómo usamos tu información.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={privacySettings.analytics}
                  onChange={handleSettingChange('analytics')}
                  color="primary"
                />
              }
              label="Permitir análisis de uso"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={privacySettings.marketing}
                  onChange={handleSettingChange('marketing')}
                  color="primary"
                />
              }
              label="Recibir comunicaciones de marketing"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={privacySettings.notifications}
                  onChange={handleSettingChange('notifications')}
                  color="primary"
                />
              }
              label="Notificaciones personalizadas"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={privacySettings.dataSharing}
                  onChange={handleSettingChange('dataSharing')}
                  color="primary"
                />
              }
              label="Compartir datos para investigación"
            />
          </Grid>
        </Grid>
      </StyledPaper>

      {/* Privacy Content */}
      <Box>
        {privacyData.map((section, index) => (
          <StyledAccordion
            key={section.id}
            expanded={expandedPanel === section.id}
            onChange={handlePanelChange(section.id)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${section.id}bh-content`}
              id={`${section.id}bh-header`}
            >
              <Typography variant="h6" fontWeight="600">
                {section.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {section.content}
            </AccordionDetails>
          </StyledAccordion>
        ))}
      </Box>

      {/* Contact Info */}
      <StyledPaper sx={{ mt: 4, backgroundColor: '#f8f9fa' }}>
        <Typography variant="h6" gutterBottom>
          Contacto para Temas de Privacidad
        </Typography>
        <Typography variant="body1" paragraph>
          Si tienes preguntas sobre esta política o quieres ejercer tus derechos:
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Oficial de Protección de Datos" 
              secondary="privacy@circulapp.com" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Soporte General" 
              secondary="soporte@circulapp.com" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Teléfono" 
              secondary="+54 11 1234-5678" 
            />
          </ListItem>
        </List>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" href="/contact">
            Contactar sobre Privacidad
          </Button>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Privacy;