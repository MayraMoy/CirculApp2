// Crear endpoints para las nuevas funcionalidades
// routes/support.js
router.post('/contact', validateContactForm, sendContactEmail);
router.post('/report', validateReport, createReport);
router.get('/faq', getFAQs);