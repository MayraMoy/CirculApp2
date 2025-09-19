// pages/Help.js - Centro de Ayuda
import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    TextField,
    InputAdornment,
    Chip,
    Divider,
    Alert,
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    Search as SearchIcon,
    HelpOutline as HelpIcon,
    RecyclingRounded as RecycleIcon,
    SwapHoriz as ExchangeIcon,
    Schedule as ScheduleIcon,
    Security as SecurityIcon,
    AccountCircle as AccountIcon,
    Chat as ChatIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6),
}));

const HeroSection = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(135deg, #16A085 0%, #2C3E50 100%)',
    color: 'white',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(6, 4),
    marginBottom: theme.spacing(4),
    textAlign: 'center',
}));

const CategoryCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
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

const Help = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [expandedPanel, setExpandedPanel] = useState(false);

    const helpCategories = [
        {
            id: 'getting-started',
            title: 'Primeros Pasos',
            icon: <HelpIcon sx={{ fontSize: 40, color: '#16A085' }} />,
            description: 'Todo lo que necesitas para comenzar en CirculApp',
            articles: 12,
    } ,
    {
        id: 'products',
        title: 'Gestión de Productos',
        icon: <RecycleIcon sx={{ fontSize: 40, color: '#3498DB' }} />,
        description: 'Cómo publicar, buscar y gestionar productos',
        articles: 8,
    },
    {
        id: 'exchanges',
        title: 'Intercambios',
        icon: <ExchangeIcon sx={{ fontSize: 40, color: '#E74C3C' }} />,
        description: 'Proceso de intercambio y coordinación',
        articles: 6,
    },
    {
        id: 'schedule',
        title: 'Agenda de Recolección',
        icon: <ScheduleIcon sx={{ fontSize: 40, color: '#F39C12' }} />,
        description: 'Programar y gestionar recolecciones',
        articles: 5,
    },
    {
        id: 'account',
        title: 'Mi Cuenta',
        icon: <AccountIcon sx={{ fontSize: 40, color: '#9B59B6' }} />,
        description: 'Configuración de perfil y preferencias',
        articles: 7,
    },
    {
        id: 'security',
        title: 'Seguridad',
        icon: <SecurityIcon sx={{ fontSize: 40, color: '#E67E22' }} />,
        description: 'Privacidad, seguridad y reportes',
        articles: 4,
    },
    ];

    const faqData = [
    {
        category: 'getting-started',
        question: '¿Cómo me registro en CirculApp?',
        answer: 'Para registrarte, haz clic en "Registrarse" en la página principal. Completa el formulario con tu información básica, verifica tu email y ¡listo! Podrás comenzar a participar en la economía circular de tu comunidad.',
    },
    {
        category: 'products',
        question: '¿Qué tipo de productos puedo publicar?',
        answer: 'Puedes publicar cualquier producto reutilizable: muebles, electrodomésticos, ropa, libros, materiales de construcción, herramientas, etc. Solo asegúrate de que estén en condiciones de uso y sean seguros para otros usuarios.',
    },
    {
        category: 'products',
        question: '¿Cómo subo fotos de mis productos?',
        answer: 'En el formulario de publicación, haz clic en "Agregar fotos" y selecciona hasta 5 imágenes desde tu dispositivo. Las fotos ayudan a otros usuarios a conocer mejor tu producto.',
    },
    {
        category: 'exchanges',
        question: '¿Cómo funciona el intercambio de productos?',
        answer: 'Busca productos que te interesen, contacta al dueño a través del chat integrado, acuerden los detalles del intercambio y coordinen el encuentro. Siempre en lugares públicos y seguros.',
    },
    {
        category: 'exchanges',
        question: '¿Puedo intercambiar por dinero o solo por productos?',
        answer: 'CirculApp fomenta el intercambio directo de productos para promover la economía circular, pero los usuarios pueden acordar entre ellos las condiciones del intercambio.',
    },
    {
        category: 'schedule',
        question: '¿Cómo programo una recolección?',
        answer: 'Ve a "Agenda de Recolección", selecciona la fecha y hora preferida, agrega los detalles de los materiales y confirma. Recibirás notificaciones y recordatorios.',
    },
    {
        category: 'account',
        question: '¿Cómo cambio mi contraseña?',
        answer: 'Ve a tu perfil, selecciona "Configuración de cuenta", luego "Cambiar contraseña". Ingresa tu contraseña actual y la nueva. Te enviaremos un email de confirmación.',
    },
    {
        category: 'security',
        question: '¿Cómo reporto un usuario o producto?',
        answer: 'En cualquier perfil o producto, encontrarás un botón "Reportar". Selecciona el motivo del reporte y proporciona detalles. Nuestro equipo revisará el caso en menos de 24 horas.',
    },
    ];

    const handlePanelChange = (panel) => (event, isExpanded) => {
        setExpandedPanel(isExpanded ? panel : false);
    };

    const filteredFAQs = faqData.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
    });

    return (
        <StyledContainer maxWidth="lg">
            {/* Hero Section */}
        <HeroSection>
            <HelpIcon sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
            <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                Centro de Ayuda
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
                Encuentra respuestas a tus preguntas y aprende a sacar el máximo provecho de CirculApp
            </Typography>
        </HeroSection>

            {/* Search Bar */}
        <Box sx={{ mb: 4 }}>
            <TextField
                fullWidth
                placeholder="¿Qué necesitas saber? Busca aquí..."
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

      {/* Categories Grid */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Categorías de Ayuda
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {helpCategories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <CategoryCard onClick={() => setSelectedCategory(category.id)}>
              <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                <Box sx={{ mb: 2 }}>
                  {category.icon}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom fontWeight="600">
                  {category.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {category.description}
                </Typography>
                <Chip 
                  label={`${category.articles} artículos`} 
                  size="small" 
                  variant="outlined"
                  color="primary"
                />
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  Ver Artículos
                </Button>
              </CardActions>
            </CategoryCard>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* FAQ Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h2" fontWeight="600">
          Preguntas Frecuentes
        </Typography>
        {selectedCategory !== 'all' && (
          <Button 
            variant="text" 
            onClick={() => setSelectedCategory('all')}
            color="primary"
          >
            Ver todas las categorías
          </Button>
        )}
      </Box>

      {filteredFAQs.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No se encontraron preguntas que coincidan con tu búsqueda.
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
      )}

      {/* Contact Support */}
      <Box sx={{ mt: 6, p: 4, backgroundColor: '#f8f9fa', borderRadius: 2, textAlign: 'center' }}>
        <ChatIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h5" component="h3" gutterBottom fontWeight="600">
          ¿No encontraste lo que buscabas?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Nuestro equipo de soporte está aquí para ayudarte
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" color="primary" href="/contact">
            Contactar Soporte
          </Button>
          <Button variant="outlined" color="primary" href="/chat">
            Chat en Vivo
          </Button>
        </Box>
      </Box>
    </StyledContainer>
  );
};

export default Help;