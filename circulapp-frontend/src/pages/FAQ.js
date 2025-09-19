// pages/FAQ.js - Preguntas Frecuentes
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Chip,
  Grid,
  Card,
  CardContent,
  Button,
  Alert,
  Divider,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  QuestionAnswer as FAQIcon,
  HelpOutline as HelpIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  SupportAgent as SupportIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(6),
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #9B59B6 0%, #3498DB 100%)',
  color: 'white',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(6, 4),
  marginBottom: theme.spacing(4),
  textAlign: 'center',
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  '&:before': {
    display: 'none',
  },
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  borderRadius: `${theme.spacing(1)} !important`,
  '&.Mui-expanded': {
    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
  },
}));

const CategoryChip = styled(Chip)(({ theme, selected }) => ({
  margin: theme.spacing(0.5),
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: selected ? theme.palette.primary.main : 'transparent',
  color: selected ? 'white' : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: selected ? theme.palette.primary.dark : theme.palette.primary.light,
    color: 'white',
  },
}));

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedPanel, setExpandedPanel] = useState(false);
  const [feedback, setFeedback] = useState({});

  const categories = [
    { id: 'all', label: 'Todas', count: 25 },
    { id: 'account', label: 'Mi Cuenta', count: 6 },
    { id: 'products', label: 'Productos', count: 8 },
    { id: 'exchanges', label: 'Intercambios', count: 5 },
    { id: 'security', label: 'Seguridad', count: 4 },
    { id: 'technical', label: 'Técnico', count: 2 },
  ];

  const faqData = [
    {
      category: 'account',
      question: '¿Cómo creo una cuenta en CirculApp?',
      answer: 'Para crear tu cuenta: 1) Haz clic en "Registrarse" en la página principal, 2) Completa el formulario con tu información personal, 3) Verifica tu correo electrónico haciendo clic en el enlace que te enviamos, 4) ¡Listo! Ya puedes comenzar a usar CirculApp.',
      tags: ['registro', 'cuenta', 'email'],
      helpful: 45,
      notHelpful: 2,
    },
    {
      category: 'account',
      question: '¿Puedo cambiar mi información de perfil?',
      answer: 'Sí, puedes actualizar tu información en cualquier momento. Ve a tu "Perfil" > "Editar perfil" y modifica los campos que desees. Los cambios se guardan automáticamente.',
      tags: ['perfil', 'editar', 'información'],
      helpful: 38,
      notHelpful: 1,
    },
    {
      category: 'account',
      question: '¿Cómo recupero mi contraseña?',
      answer: 'En la página de inicio de sesión, haz clic en "¿Olvidaste tu contraseña?" Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.',
      tags: ['contraseña', 'recuperar', 'email'],
      helpful: 52,
      notHelpful: 3,
    },
    {
      category: 'products',
      question: '¿Qué productos puedo intercambiar?',
      answer: 'Puedes intercambiar cualquier objeto que esté en buenas condiciones y sea legal: muebles, electrodomésticos, ropa, libros, herramientas, materiales de construcción, plantas, y mucho más. Solo asegúrate de que sea seguro para otros usuarios.',
      tags: ['productos', 'intercambio', 'materiales'],
      helpful: 67,
      notHelpful: 4,
    },
    {
      category: 'products',
      question: '¿Cómo subo fotos de mis productos?',
      answer: 'Al crear una publicación, haz clic en "Agregar fotos" y selecciona hasta 5 imágenes desde tu dispositivo. Recomendamos fotos claras y bien iluminadas desde diferentes ángulos.',
      tags: ['fotos', 'imágenes', 'publicar'],
      helpful: 41,
      notHelpful: 2,
    },
    {
      category: 'products',
      question: '¿Puedo editar mi publicación después de crearla?',
      answer: 'Sí, puedes editar tu publicación en cualquier momento desde "Mis Productos" > "Editar". Puedes cambiar la descripción, fotos, categoría y estado del producto.',
      tags: ['editar', 'publicación', 'modificar'],
      helpful: 29,
      notHelpful: 1,
    },
    {
      category: 'exchanges',
      question: '¿Cómo funciona el proceso de intercambio?',
      answer: 'El proceso es simple: 1) Busca productos que te interesen, 2) Contacta al propietario mediante el chat, 3) Acuerden los detalles del intercambio, 4) Reúnanse en un lugar público y seguro, 5) ¡Disfruten sus nuevos productos!',
      tags: ['proceso', 'intercambio', 'pasos'],
      helpful: 78,
      notHelpful: 5,
    },
    {
      category: 'exchanges',
      question: '¿Hay algún costo por usar CirculApp?',
      answer: 'No, CirculApp es completamente gratuita. Nuestra misión es promover la economía circular sin barreras económicas. Solo pagas los costos de transporte si decides enviar productos.',
      tags: ['gratis', 'costo', 'precio'],
      helpful: 89,
      notHelpful: 1,
    },
    {
      category: 'security',
      question: '¿Es seguro intercambiar con desconocidos?',
      answer: 'Sí, si sigues nuestras recomendaciones de seguridad: reúnete en lugares públicos durante el día, lleva acompañante si es posible, confía en tu instinto, y usa nuestro sistema de reputación para verificar usuarios.',
      tags: ['seguridad', 'desconocidos', 'precauciones'],
      helpful: 95,
      notHelpful: 3,
    },
    {
      category: 'security',
      question: '¿Cómo reporto un usuario problemático?',
      answer: 'En el perfil del usuario, haz clic en "Reportar usuario". Selecciona el motivo del reporte, proporciona detalles específicos y adjunta evidencia si la tienes. Nuestro equipo revisará el caso en 24 horas.',
      tags: ['reportar', 'usuario', 'problema'],
      helpful: 34,
      notHelpful: 0,
    },
    {
      category: 'technical',
      question: '¿Por qué no puedo subir fotos?',
      answer: 'Esto puede deberse a: archivos muy grandes (máximo 5MB), formato no compatible (usa JPG, PNG, WEBP), o problemas de conexión. Intenta redimensionar las imágenes o usar una conexión más estable.',
      tags: ['fotos', 'error', 'subir'],
      helpful: 23,
      notHelpful: 2,
    },
    {
      category: 'technical',
      question: 'La aplicación se cierra inesperadamente, ¿qué hago?',
      answer: 'Intenta: 1) Reiniciar la aplicación, 2) Actualizar a la última versión, 3) Reiniciar tu dispositivo, 4) Limpiar caché de la app. Si el problema persiste, contáctanos con detalles de tu dispositivo.',
      tags: ['crash', 'cierra', 'error'],
      helpful: 18,
      notHelpful: 1,
    },
  ];

  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  const handleFeedback = (index, type) => {
    setFeedback(prev => ({
      ...prev,
      [index]: type
    }));
  };

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <StyledContainer maxWidth="lg">
      {/* Hero Section */}
      <HeroSection>
        <FAQIcon sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Preguntas Frecuentes
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
          Encuentra respuestas rápidas a las preguntas más comunes sobre CirculApp
        </Typography>
      </HeroSection>

      {/* Search Bar */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Busca tu pregunta aquí..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              backgroundColor: 'white',
            }
          }}
        />
      </Box>

      {/* Category Filters */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Filtrar por categoría:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {categories.map((category) => (
            <CategoryChip
              key={category.id}
              label={`${category.label} (${category.count})`}
              selected={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? 'filled' : 'outlined'}
              color="primary"
            />
          ))}
        </Box>
      </Box>

      {/* Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="primary.main" fontWeight="bold">
                {filteredFAQs.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Preguntas disponibles
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="success.main" fontWeight="bold">
                96%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Satisfacción promedio
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="info.main" fontWeight="bold">
                &lt;2h
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tiempo de respuesta
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* FAQ List */}
      {filteredFAQs.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No se encontraron preguntas que coincidan con tu búsqueda. 
          <Button variant="text" color="primary" href="/contact" sx={{ ml: 1 }}>
            Contáctanos
          </Button>
        </Alert>
      ) : (
        <Box>
          {filteredFAQs.map((faq, index) => (
            <StyledAccordion
              key={index}
              expanded={expandedPanel === `panel${index}`}
              onChange={handlePanelChange(`panel${index}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}bh-content`}
                id={`panel${index}bh-header`}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <HelpIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight="500">
                      {faq.question}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {faq.tags.map((tag, tagIndex) => (
                        <Chip
                          key={tagIndex}
                          label={tag}
                          size="small"
                          variant="outlined"
                          sx={{ mr: 0.5, fontSize: '0.7rem' }}
                        />
                      ))}
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                    <ThumbUpIcon sx={{ fontSize: 16, mr: 0.5, color: 'success.main' }} />
                    <Typography variant="caption" sx={{ mr: 1 }}>
                      {faq.helpful}
                    </Typography>
                    <ThumbDownIcon sx={{ fontSize: 16, mr: 0.5, color: 'error.main' }} />
                    <Typography variant="caption">
                      {faq.notHelpful}
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
                    {faq.answer}
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                      ¿Te fue útil esta respuesta?
                    </Typography>
                    <Box>
                      <Button
                        size="small"
                        startIcon={<ThumbUpIcon />}
                        onClick={() => handleFeedback(index, 'helpful')}
                        color={feedback[index] === 'helpful' ? 'success' : 'inherit'}
                        variant={feedback[index] === 'helpful' ? 'contained' : 'outlined'}
                        sx={{ mr: 1 }}
                      >
                        Sí
                      </Button>
                      <Button
                        size="small"
                        startIcon={<ThumbDownIcon />}
                        onClick={() => handleFeedback(index, 'notHelpful')}
                        color={feedback[index] === 'notHelpful' ? 'error' : 'inherit'}
                        variant={feedback[index] === 'notHelpful' ? 'contained' : 'outlined'}
                      >
                        No
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </AccordionDetails>
            </StyledAccordion>
          ))}
        </Box>
      )}

      {/* Contact Support */}
      <Box sx={{ mt: 6, p: 4, backgroundColor: '#f8f9fa', borderRadius: 2, textAlign: 'center' }}>
        <SupportIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h5" component="h3" gutterBottom fontWeight="600">
          ¿Tu pregunta no está aquí?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
          Si no encontraste la respuesta que buscabas, nuestro equipo de soporte está disponible 
          para ayudarte de forma personalizada.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" color="primary" href="/contact" size="large">
            Contactar Soporte
          </Button>
          <Button variant="outlined" color="primary" href="/help" size="large">
            Centro de Ayuda
          </Button>
        </Box>
      </Box>
    </StyledContainer>
  );
};

export default FAQ;