// pages/Contact.js - Página de Contacto
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Chip,
  MenuItem,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Send as SendIcon,
  SupportAgent as SupportIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(6),
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #2C3E50 0%, #16A085 100%)',
  color: 'white',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(6, 4),
  marginBottom: theme.spacing(4),
  textAlign: 'center',
}));

const ContactCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1),
  },
}));

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular envío
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', category: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <EmailIcon color="primary" />,
      title: 'Correo Electrónico',
      value: 'soporte@circulapp.com',
      description: 'Respuesta en 24 horas',
    },
    {
      icon: <PhoneIcon color="primary" />,
      title: 'Teléfono',
      value: '+54 11 1234-5678',
      description: 'Lun-Vie 9:00-18:00',
    },
    {
      icon: <LocationIcon color="primary" />,
      title: 'Oficina',
      value: 'Cordoba, Argentina',
      description: 'Visitas con cita previa',
    },
    {
      icon: <TimeIcon color="primary" />,
      title: 'Horarios de Atención',
      value: 'Lun-Vie 9:00-18:00',
      description: 'Soporte técnico',
    },
  ];

  const teamMembers = [
    {
      name: 'Mayra Moyano',
      role: 'Líder del Proyecto',
      email: 'mayrayazminmoyano@gmail.com',
      avatar: '/api/placeholder/60/60',
      specialties: ['Desarrollo Frontend', 'UX/UI', 'Arquitectura'],
    },
    {
      name: 'Marilen Cornejo',
      role: 'QA Tester',
      email: 'marilencornejo12@gmail.com',
      avatar: '/api/placeholder/60/60',
      specialties: ['Testing', 'Calidad', 'Documentación'],
    },
  ];

  const categories = [
    'Soporte Técnico',
    'Problemas de Cuenta',
    'Reportar Error',
    'Sugerencias',
    'Colaboración',
    'Otros',
  ];

  return (
    <StyledContainer maxWidth="lg">
      {/* Hero Section */}
      <HeroSection>
        <SupportIcon sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Contáctanos
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
          ¿Tienes preguntas, sugerencias o necesitas ayuda? Estamos aquí para ayudarte.
        </Typography>
      </HeroSection>

      <Grid container spacing={4}>
        {/* Formulario de Contacto */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="600" sx={{ mb: 3 }}>
              Envíanos un mensaje
            </Typography>

            {submitStatus === 'success' && (
              <Alert severity="success" sx={{ mb: 3 }}>
                ¡Mensaje enviado exitosamente! Te responderemos pronto.
              </Alert>
            )}

            {submitStatus === 'error' && (
              <Alert severity="error" sx={{ mb: 3 }}>
                Error al enviar el mensaje. Por favor, inténtalo de nuevo.
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="Nombre completo"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="Correo electrónico"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="Asunto"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    select
                    label="Categoría"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                  >
                    <MenuItem value="">
                      <em>Selecciona una categoría</em>
                    </MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </StyledTextField>
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Mensaje"
                    name="message"
                    multiline
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    placeholder="Describe tu consulta o problema en detalle..."
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  startIcon={<SendIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                  }}
                >
                  {loading ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>
              </Box>
            </form>
          </Card>
        </Grid>

        {/* Información de Contacto */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            {/* Información básica */}
            {contactInfo.map((info, index) => (
              <Grid item xs={12} key={index}>
                <ContactCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ mr: 2 }}>{info.icon}</Box>
                      <Typography variant="h6" fontWeight="600">
                        {info.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                      {info.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {info.description}
                    </Typography>
                  </CardContent>
                </ContactCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Equipo */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight="600" sx={{ mb: 4 }}>
          Nuestro Equipo
        </Typography>
        <Grid container spacing={3}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar
                    src={member.avatar}
                    sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}
                  >
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="600">
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="primary.main" fontWeight="500">
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {member.email}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="subtitle2" gutterBottom color="text.secondary">
                    Especialidades:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {member.specialties.map((specialty, idx) => (
                      <Chip
                        key={idx}
                        label={specialty}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    ))}
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Otras formas de contacto */}
      <Paper sx={{ mt: 6, p: 4, backgroundColor: '#f8f9fa' }}>
        <Typography variant="h5" component="h3" gutterBottom fontWeight="600" sx={{ mb: 3 }}>
          Otras formas de conectar
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <GitHubIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="GitHub"
                  secondary="Contribuye al proyecto open source"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LinkedInIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="LinkedIn"
                  secondary="Síguenos para actualizaciones profesionales"
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 2, backgroundColor: 'white', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Tiempo de respuesta promedio:
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                • Email: 24 horas<br />
                • Chat: 2 horas<br />
                • Teléfono: Inmediato
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </StyledContainer>
  );
};

export default Contact;