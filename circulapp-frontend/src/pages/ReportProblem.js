// pages/ReportProblem.js - Reportar Problema
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Report as ReportIcon,
  CloudUpload as UploadIcon,
  Send as SendIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Security as SecurityIcon,
  BugReport as BugIcon,
  Feedback as FeedbackIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(6),
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)',
  color: 'white',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(6, 4),
  marginBottom: theme.spacing(4),
  textAlign: 'center',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1),
  },
}));

const UploadBox = styled(Paper)(({ theme }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderColor: theme.palette.primary.dark,
  },
}));

const ReportProblem = () => {
  const [formData, setFormData] = useState({
    type: '',
    priority: '',
    title: '',
    description: '',
    stepsToReproduce: '',
    expectedBehavior: '',
    actualBehavior: '',
    userAgent: navigator.userAgent,
    url: window.location.href,
    email: '',
    phone: '',
  });

  const [files, setFiles] = useState([]);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [reportId, setReportId] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const reportTypes = [
    { value: 'bug', label: 'Error técnico / Bug', icon: <BugIcon />, color: '#E74C3C' },
    { value: 'security', label: 'Problema de seguridad', icon: <SecurityIcon />, color: '#8E44AD' },
    { value: 'user', label: 'Usuario problemático', icon: <ReportIcon />, color: '#E67E22' },
    { value: 'content', label: 'Contenido inapropiado', icon: <WarningIcon />, color: '#F39C12' },
    { value: 'payment', label: 'Problema de pago', icon: <ErrorIcon />, color: '#C0392B' },
    { value: 'feature', label: 'Solicitud de función', icon: <FeedbackIcon />, color: '#27AE60' },
    { value: 'other', label: 'Otro', icon: <InfoIcon />, color: '#34495E' },
  ];

  const priorityLevels = [
    { value: 'low', label: 'Baja - No afecta el uso', color: '#27AE60' },
    { value: 'medium', label: 'Media - Afecta algunas funciones', color: '#F39C12' },
    { value: 'high', label: 'Alta - Afecta funciones importantes', color: '#E67E22' },
    { value: 'critical', label: 'Crítica - La app no funciona', color: '#E74C3C' },
  ];

  const steps = ['Información básica', 'Detalles del problema', 'Archivos adjuntos', 'Confirmación'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles(prev => [...prev, ...uploadedFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simular envío del reporte
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newReportId = 'CR-' + Date.now().toString().slice(-6);
      setReportId(newReportId);
      setSubmitStatus('success');
      setShowSuccessDialog(true);
      
      // Reset form
      setFormData({
        type: '', priority: '', title: '', description: '',
        stepsToReproduce: '', expectedBehavior: '', actualBehavior: '',
        userAgent: navigator.userAgent, url: window.location.href,
        email: '', phone: '',
      });
      setFiles([]);
      setActiveStep(0);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Tipo de problema</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  label="Tipo de problema"
                  required
                >
                  {reportTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ mr: 2, color: type.color }}>{type.icon}</Box>
                        {type.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Prioridad</InputLabel>
                <Select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  label="Prioridad"
                  required
                >
                  {priorityLevels.map((priority) => (
                    <MenuItem key={priority.value} value={priority.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: priority.color,
                            mr: 2,
                          }}
                        />
                        {priority.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Título del problema"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Describe brevemente el problema"
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Descripción detallada"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="Describe el problema en detalle..."
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Pasos para reproducir el problema"
                name="stepsToReproduce"
                multiline
                rows={3}
                value={formData.stepsToReproduce}
                onChange={handleInputChange}
                placeholder="1. Primero hice esto... 2. Luego hice esto... 3. Entonces pasó esto..."
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Comportamiento esperado"
                name="expectedBehavior"
                multiline
                rows={2}
                value={formData.expectedBehavior}
                onChange={handleInputChange}
                placeholder="¿Qué esperabas que pasara?"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Comportamiento actual"
                name="actualBehavior"
                multiline
                rows={2}
                value={formData.actualBehavior}
                onChange={handleInputChange}
                placeholder="¿Qué pasó en realidad?"
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Archivos adjuntos (opcional)
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Sube capturas de pantalla, videos o archivos que ayuden a entender el problema.
              Máximo 5 archivos, 10MB cada uno.
            </Typography>
            
            <input
              accept="image/*,video/*,.pdf,.doc,.docx,.txt"
              style={{ display: 'none' }}
              id="file-upload"
              multiple
              type="file"
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload">
              <UploadBox component="div">
                <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Arrastra archivos aquí o haz clic para seleccionar
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  JPG, PNG, MP4, PDF, DOC (máx. 10MB)
                </Typography>
              </UploadBox>
            </label>

            {files.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Archivos seleccionados:
                </Typography>
                {files.map((file, index) => (
                  <Chip
                    key={index}
                    label={file.name}
                    onDelete={() => removeFile(index)}
                    sx={{ m: 0.5 }}
                    variant="outlined"
                  />
                ))}
              </Box>
            )}
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Información de contacto
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Email de contacto"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="tu@email.com"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Teléfono (opcional)"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+54 11 1234-5678"
                />
                              </Grid>
            </Grid>
          </Box>
        );

      default:
        return 'Paso desconocido';
    }
  };

  return (
    <StyledContainer maxWidth="md">
      <HeroSection>
        <Typography variant="h3" gutterBottom>
          Reportar un problema
        </Typography>
        <Typography variant="h6">
          Ayúdanos a mejorar la aplicación enviando un reporte detallado del
          problema que encontraste.
        </Typography>
      </HeroSection>

      <Card>
        <CardContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mt: 4 }}>{getStepContent(activeStep)}</Box>

          {submitStatus === 'error' && (
            <Alert severity="error" sx={{ mt: 3 }}>
              Ocurrió un error al enviar tu reporte. Intenta nuevamente.
            </Alert>
          )}

          {loading && <LinearProgress sx={{ mt: 3 }} />}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 4,
            }}
          >
            <Button
              disabled={activeStep === 0 || loading}
              onClick={handleBack}
            >
              Atrás
            </Button>

            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={loading}
                endIcon={<SendIcon />}
              >
                Enviar reporte
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={loading}
              >
                Siguiente
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Diálogo de éxito */}
      <Dialog
        open={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <CheckIcon color="success" sx={{ mr: 1, verticalAlign: 'middle' }} />
          Reporte enviado con éxito
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            ¡Gracias por tu ayuda! Hemos recibido tu reporte.
          </Typography>
          <Typography gutterBottom>
            ID de seguimiento: <strong>{reportId}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Conserva este ID para futuras referencias si necesitas hacer
            seguimiento de tu reporte.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSuccessDialog(false)} autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default ReportProblem;
