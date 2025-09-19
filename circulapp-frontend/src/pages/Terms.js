// pages/Terms.js - Términos de Uso
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
  Chip,
  Grid,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Gavel as LegalIcon,
  Update as UpdateIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(6),
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #34495E 0%, #2C3E50 100%)',
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

const Terms = () => {
  const [expandedPanel, setExpandedPanel] = useState('panel1');

  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  const lastUpdated = "15 de septiembre de 2025";
  const effectiveDate = "1 de octubre de 2025";

  const termsData = [
    {
      id: 'panel1',
      title: '1. Definiciones y Aceptación',
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            Al acceder y utilizar CirculApp ("la Plataforma"), usted acepta estar sujeto a estos Términos de Uso y todas las leyes y regulaciones aplicables.
          </Typography>
          <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
            Definiciones importantes:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Usuario" 
                secondary="Cualquier persona que acceda o utilice la Plataforma"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Contenido" 
                secondary="Cualquier información, texto, imágenes, o datos compartidos en la Plataforma"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Servicios" 
                secondary="Todas las funcionalidades ofrecidas por CirculApp"
              />
            </ListItem>
          </List>
        </Box>
      )
    },
    {
      id: 'panel2',
      title: '2. Registro y Cuentas de Usuario',
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            Para utilizar ciertos servicios de CirculApp, debe crear una cuenta proporcionando información precisa y completa.
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Responsabilidades del usuario:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Proporcionar información veraz y actualizada" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Mantener la confidencialidad de sus credenciales" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Notificar inmediatamente cualquier uso no autorizado" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Ser mayor de 18 años o tener autorización parental" />
            </ListItem>
          </List>
          <Alert severity="warning" sx={{ mt: 2 }}>
            CirculApp se reserva el derecho de suspender o eliminar cuentas que violen estos términos.
          </Alert>
        </Box>
      )
    },
    {
      id: 'panel3',
      title: '3. Uso de la Plataforma',
      content: (
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Usos permitidos:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Intercambiar productos en buen estado y legales" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Coordinar recolecciones de materiales reciclables" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Participar en actividades de economía circular" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Usar las herramientas educativas proporcionadas" />
            </ListItem>
          </List>
          
          <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
            Usos prohibidos:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Publicar contenido ilegal, dañino o inapropiado" 
                secondary="Incluyendo material que viole derechos de autor o sea discriminatorio"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Usar la plataforma con fines comerciales no autorizados" 
                secondary="Sin el consentimiento explícito de CirculApp"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Interferir con el funcionamiento de la plataforma" 
                secondary="Incluyendo ataques de denegación de servicio o hacking"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Suplantar identidades o proporcionar información falsa" 
                secondary="Esto incluye crear perfiles falsos o múltiples cuentas"
              />
            </ListItem>
          </List>
        </Box>
      )
    },
    {
      id: 'panel4',
      title: '4. Contenido del Usuario',
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            Los usuarios son responsables de todo el contenido que publican en CirculApp.
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Derechos de contenido:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Propiedad" 
                secondary="Usted conserva los derechos de propiedad de su contenido"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Licencia a CirculApp" 
                secondary="Otorga una licencia no exclusiva para mostrar y procesar su contenido"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Moderación" 
                secondary="CirculApp se reserva el derecho de moderar y remover contenido"
              />
            </ListItem>
          </List>
          <Alert severity="info" sx={{ mt: 2 }}>
            Todo contenido debe cumplir con nuestras políticas de comunidad y las leyes aplicables.
          </Alert>
        </Box>
      )
    },
    {
      id: 'panel5',
      title: '5. Transacciones e Intercambios',
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            CirculApp facilita el intercambio entre usuarios pero no es parte directa de las transacciones.
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Responsabilidades en intercambios:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Encuentros seguros" 
                secondary="Los usuarios deben reunirse en lugares públicos y seguros"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Verificación de productos" 
                secondary="Inspeccionar productos antes de completar intercambios"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Comunicación clara" 
                secondary="Acordar todos los términos del intercambio previamente"
              />
            </ListItem>
          </List>
          <Alert severity="warning" sx={{ mt: 2 }}>
            CirculApp no se hace responsable por disputas entre usuarios o problemas con productos intercambiados.
          </Alert>
        </Box>
      )
    },
    {
      id: 'panel6',
      title: '6. Privacidad y Protección de Datos',
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            La recopilación y uso de datos personales se rige por nuestra Política de Privacidad.
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Compromisos de privacidad:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Transparencia en el uso de datos" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Seguridad en el almacenamiento de información" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Control del usuario sobre sus datos" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Cumplimiento con regulaciones locales e internacionales" />
            </ListItem>
          </List>
        </Box>
      )
    },
    {
      id: 'panel7',
      title: '7. Limitación de Responsabilidad',
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            CirculApp proporciona la plataforma "tal como está" y no garantiza resultados específicos.
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Exclusiones de responsabilidad:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Disponibilidad del servicio" 
                secondary="No garantizamos funcionamiento ininterrumpido"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Contenido de terceros" 
                secondary="No nos hacemos responsables por contenido de usuarios"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Transacciones entre usuarios" 
                secondary="Los intercambios son responsabilidad de los participantes"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Pérdidas indirectas" 
                secondary="No somos responsables por daños consecuenciales"
              />
            </ListItem>
          </List>
        </Box>
      )
    },
    {
      id: 'panel8',
      title: '8. Modificaciones y Terminación',
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            CirculApp se reserva el derecho de modificar estos términos y terminar el servicio.
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Proceso de modificaciones:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Notificación previa" 
                secondary="30 días de aviso para cambios significativos"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Publicación en la plataforma" 
                secondary="Los cambios se publican en esta página"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Continuación del uso" 
                secondary="El uso continuado implica aceptación de nuevos términos"
              />
            </ListItem>
          </List>
          <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
            Terminación del servicio:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Por parte del usuario: puede eliminar su cuenta en cualquier momento" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Por parte de CirculApp: por violación de términos o cese de operaciones" />
            </ListItem>
          </List>
        </Box>
      )
    },
  ];

  return (
    <StyledContainer maxWidth="lg">
      {/* Hero Section */}
      <HeroSection>
        <LegalIcon sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Términos de Uso
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
          Condiciones que rigen el uso de CirculApp y nuestros servicios
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
              Estos términos entran en vigencia el {effectiveDate}. 
              Al continuar usando CirculApp después de esta fecha, acepta los términos actualizados.
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

      {/* Important Notice */}
      <Alert severity="info" sx={{ mb: 4 }}>
        <Typography variant="subtitle2" gutterBottom>
          Resumen ejecutivo:
        </Typography>
        <Typography variant="body2">
          Al usar CirculApp, usted acepta participar en una comunidad de economía circular de manera responsable, 
          respetando a otros usuarios y cumpliendo con las leyes aplicables. Somos un facilitador de intercambios, 
          no un intermediario comercial.
        </Typography>
      </Alert>

      {/* Terms Content */}
      <Box>
        {termsData.map((term, index) => (
          <StyledAccordion
            key={term.id}
            expanded={expandedPanel === term.id}
            onChange={handlePanelChange(term.id)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${term.id}bh-content`}
              id={`${term.id}bh-header`}
            >
              <Typography variant="h6" fontWeight="600">
                {term.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {term.content}
            </AccordionDetails>
          </StyledAccordion>
        ))}
      </Box>

      {/* Contact Info */}
      <StyledPaper sx={{ mt: 4, backgroundColor: '#f8f9fa' }}>
        <Typography variant="h6" gutterBottom>
          ¿Preguntas sobre estos términos?
        </Typography>
        <Typography variant="body1" paragraph>
          Si tiene preguntas sobre estos Términos de Uso, puede contactarnos:
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Email legal" 
              secondary="legal@circulapp.com" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Soporte general" 
              secondary="soporte@circulapp.com" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Dirección" 
              secondary="Cordoba, Argentina" 
            />
          </ListItem>
        </List>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" href="/contact">
            Contactar Equipo Legal
          </Button>
        </Box>
      </StyledPaper>

      {/* Version History */}
      <StyledPaper>
        <Typography variant="h6" gutterBottom>
          Historial de versiones
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Versión 2.0 - 15 de septiembre de 2025"
              secondary="Actualización completa de términos, nuevas secciones de privacidad y responsabilidad"
            />
            <Chip label="Actual" color="primary" size="small" />
          </ListItem>
        </List>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Terms;